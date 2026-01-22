/* eslint-disable @typescript-eslint/no-explicit-any */
import { Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import Navbar from '../../../components/Navbar';
import * as XLSX from 'xlsx';
import { SwalMessage } from '../../../utils/SwalMessage';
import TableContent from '../../../ui/TableContent';
import BackButton from '../../../ui/BackButton';
import ShowTableForm from '../../../ui/ShowTableForm';
import FormInput from '../../../ui/FormInput';
import SubmitButton from '../../../ui/SubmitButton';
import FormGenerateExcel from '../../../ui/FormGenerateExcel';
import useRABHooks from '../../../hooks/RABHooks';
import { useAuth } from '../../../context/AuthContext';
import LoadingSpinner from '../../../ui/LoadingSpinner';
import { Navigate } from 'react-router-dom';
import TableHeader from '../../../ui/TableHeader';
import useScheduleHooks from '../../../hooks/ScheduleHooks';

interface JadwalItem {
  description: string;
  total_price: string;
  weight: number;
  minggu: number[];
}

interface TenderProps {
  id: number;
  fiscal_year: string;
  satker_name: string;
  rup_code: string;
  tender_code: string;
  package_name: string;
  work_location: string;
  program: string;
  activity: string;
  start_date: string;
  end_date: string;
  revision_count: number;
  revision_text: string;
}

const WEEK_START_COL = 'P';

const formatLoopExcel = (index: number): string => {
  let col = '';
  while (index >= 0) {
    col = String.fromCharCode((index % 26) + 65) + col;
    index = Math.floor(index / 26) - 1;
  }
  return col;
};

const getTotalMingguFromExcel = (
  worksheet: XLSX.WorkSheet,
  startRow: number = 5,
  maxWeek: number = 20
): number => {
  const startColIndex = XLSX.utils.decode_col(WEEK_START_COL);
  let total = 0;

  for (let i = 0; i < maxWeek; i++) {
    const col = formatLoopExcel(startColIndex + i);
    const cell = worksheet[`${col}${startRow}`];

    if (cell && cell.v !== '' && cell.v !== null) {
      total = i + 1;
    }
  }

  return total;
};

const parseRABExcel = (
  worksheet: XLSX.WorkSheet,
  totalMinggu: number,
  startRow: number = 5,
  maxRow: number = 83
): JadwalItem[] => {
  const result: JadwalItem[] = [];

  const range = XLSX.utils.decode_range(worksheet['!ref'] as string);
  const endRow = Math.min(range.e.r + 1, maxRow);

  const getCell = (col: string, row: number) => {
    const cell = worksheet[`${col}${row}`];
    return cell ? cell.v : '';
  };

  const startColIndex = XLSX.utils.decode_col(WEEK_START_COL);

  for (let row = startRow; row <= endRow; row++) {
    const b = getCell('B', row);
    const c = getCell('C', row);
    const d = getCell('D', row);
    const e = getCell('E', row);
    const f = getCell('F', row);
    const g = getCell('G', row);

    if (!b && !c && !d && !e && !f && !g) continue;
    if (String(c).toUpperCase().includes('TOTAL')) break;

    const minggu: number[] = [];

    for (let i = 0; i < totalMinggu; i++) {
      const col = formatLoopExcel(startColIndex + i);
      minggu.push(Number(getCell(col, row)) || 0);
    }

    result.push({
      description: `${b} ${c} ${d} ${e} ${f} ${g}`.trim(),
      total_price: String(getCell('M', row)),
      weight: Number(getCell('O', row)) || 0,
      minggu
    });
  }

  return result;
};

export default function PPKJadwalPelaksanaanAdd() {
  const [dataFile, setDataFile] = useState<JadwalItem[]>([]);
  const [showDetail, setShowDetail] = useState(false);
  const [showTender, setShowTender] = useState(false);
  const [search, setSearch] = useState("");

  const [tenderDataFilter, setTenderDataFilter] = useState<TenderProps[]>([]);
  const [selectedRab, setSelectedRab] = useState<TenderProps | null>(null);
  const [totalMinggu, setTotalMinggu] = useState<number>(1);

  const { rabData } = useRABHooks();
  const { handleSchedulePost } = useScheduleHooks();
  const { user, loading } = useAuth();

  const handleDeleteRow = (index: number) => {
    setDataFile(prev => prev.filter((_, i) => i !== index));
  };

  const handleDownloadTemplate = () => {
    const link = document.createElement('a');
    link.href = '../../../../public/download/template-jadwal.xlsx';
    link.download = 'template-rab.xlsx';
    link.click();
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (evt) => {
      const data = evt.target?.result;
      const workbook = XLSX.read(data, { type: 'binary' });

      const worksheet = workbook.Sheets[workbook.SheetNames[0]];

      const total = getTotalMingguFromExcel(worksheet);
      setTotalMinggu(total);

      const parsedData = parseRABExcel(worksheet, total);

      SwalMessage({
        title: "Berhasil!",
        text: "Data berhasil diimpor",
        type: "success"
      });

      setDataFile(parsedData);
    };

    reader.readAsBinaryString(file);
  };

  const handleShowDetail = () => {
    if (!selectedRab) {
      SwalMessage({
        type: "error",
        title: "Gagal!",
        text: "Pilih Tender terlebih dahulu!"
      });

      return;
    }

    setShowDetail(true);
  }

  useEffect(() => {
    if (showTender && !selectedRab) {
      document.body.style.overflow = 'hidden';
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      document.body.style.overflow = "auto"
    }
  }, [showTender, selectedRab]);

  useEffect(() => {
    const filteringDataTender = () => {
      const filter = rabData?.filter((item: RABProps) => {
        const data = item?.data_entry?.kode_paket?.toLowerCase().includes(search.toLowerCase());
        return data;
      });

      setTenderDataFilter(filter as any);
    }

    filteringDataTender();  
  }, [search, rabData]);

  console.log(rabData)
  const columns = [
    {
      key: 'id',
      label: 'No'
    },
    {
      key: 'tahun_anggaran',
      label: 'Tahun Anggaran'
    },
    {
      key: 'satker_name',
      label: 'Satuan Kerja'
    },
    {
      key: 'rup_code',
      label: 'Kode RUP'
    },
    {
      key: 'tender_code',
      label: 'kode Tender'
    },
    {
      key: 'package_name',
      label: 'Nama Paket'
    },
  ];

  if (loading) {
    return <LoadingSpinner />
  }

  if (!user || user.role.name != "ppk") {
    return <Navigate to="/" replace />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {showTender && (
        <div className="absolute inset-0 h-screen flex justify-center items-center bg-black/20 z-20">
          <div className="bg-white p-4 rounded-lg flex flex-col max-w-[90vw] max-h-[70vh] gap-4 relative">
            <div className="absolute top-4 right-4 cursor-pointer text-primary" onClick={() => setShowTender(false)}>
              <X />
            </div>
            <TableHeader
              title="Data Tender Dari RAB"
              type='pokja'
              showHapus={false}
              showTambah={false}
              searchValue={search}
              onSearchChange={(item) => setSearch(item)}
            />
            <div className="overflow-y-auto max-h-[70vh] w-full">
              <TableContent
                columns={columns}
                data={tenderDataFilter}
                isSelect={false}
                showEdit={false}
                showPreview={false}
                showSelect={true}
                idKey="id"
                onSelectedDataChange={(item) => {
                  setSelectedRab(item as any)
                  setShowTender(false)
                }}
              />
            </div>
          </div>
        </div>
      )}

      <div className="pt-24 pb-12 px-4 md:px-8" data-aos="fade-up" data-aos-duration="1000">
        <div className="max-w-7xl mx-auto">
          <BackButton />
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h1 className="font-poppins-bold text-2xl text-gray-800 mb-6">
              Jadwal Pelaksanaan
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-poppins-regular">
              <ShowTableForm tenderCode={selectedRab?.tender_code} onClick={() => {
                setShowTender(true);
                setSelectedRab(null);
              }} />

              <FormInput
                title='Tahun Anggaran'
                placeholder='Masukkan tahun anggaran (otomatis)'
                value={selectedRab?.fiscal_year as any}
                disabled={true}
              />

              <FormInput
                title='Satuan Kerja'
                placeholder='Masukkan tahun satuan kerja (otomatis)'
                value={selectedRab?.satker_name}
                disabled={true}
              />

              <FormInput
                title='Kode RUP'
                placeholder='Masukkan tahun kode RUP (otomatis)'
                value={selectedRab?.rup_code}
                disabled={true}
              />

              <FormInput
                title='Lokasi Pekerjaan'
                placeholder='Masukkan lokasi pekerjaan (otomatis)'
                value={selectedRab?.work_location as any}
                disabled={true}
                type='textarea'
              />

              <FormInput
                title='Program Kegiatan'
                placeholder='Masukkan program kegiatan'
                value={selectedRab?.program}
                name='program'
                disabled={true}
              />

              <FormInput
                title='Kegiatan'
                placeholder='Masukkan kegiatan'
                value={selectedRab?.activity}
                name='activity'
                disabled={true}
              />

              <FormInput
                title='Tanggal Awal'
                placeholder='Masukkan tanggal awal'
                value={selectedRab?.start_date}
                name='start'
                disabled={true}
                type='date'
              />

              <FormInput
                title='Tanggal Akhir'
                placeholder='Masukkan tanggal akhir'
                value={selectedRab?.end_date}
                name='end'
                disabled={true}
                type='date'
              />

              <FormInput
                title={`Alasan (Revisi ke- ${selectedRab?.revision_count ?? ""})`}
                placeholder='Alasan'
                value={selectedRab?.revision_text}
                disabled={true}
                type='textarea'
              />
              <p className='font-poppins-medium text-gray-600 text-[14px]'></p>
            </div>
            <SubmitButton text='Buat Jadwal' onClick={() => handleShowDetail()} />
          </div>

          {showDetail && (
            <FormGenerateExcel handleSave={() => handleSchedulePost(selectedRab as any, dataFile as any)} title='jadwal Pelaksanaan' handleFileChange={handleFileChange} handleDownloadTemplate={handleDownloadTemplate} />
          )}

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-linear-to-r from-primary/20 to-primary/10 border-b-2 border-primary/30">
                    <th className="px-6 py-4 text-left font-poppins-semibold text-gray-800 text-sm">
                      Keterangan
                    </th>
                    <th className="px-6 py-4 text-center font-poppins-semibold text-gray-800 text-sm">
                      Jumlah
                    </th>
                    <th className="px-6 py-4 text-center font-poppins-semibold text-gray-800 text-sm">
                      Bobot (%)
                    </th>
                    <th colSpan={totalMinggu} className="px-6 py-4 text-center font-poppins-semibold text-gray-800 text-sm bg-primary/5">
                      Minggu Pelaksanaan
                    </th>
                    <th className="px-6 py-4 text-center font-poppins-semibold text-gray-800 text-sm">
                      Aksi
                    </th>
                  </tr>
                  <tr className="bg-primary/5 border-b border-gray-200">
                    <th colSpan={3}></th>
                    {Array.from({ length: totalMinggu }).map((_, i) => (
                      <th
                        key={i}
                        className="px-4 py-3 text-center font-poppins-medium text-xs text-gray-700 border-l border-gray-200 hover:bg-primary/10 transition-colors duration-200"
                      >
                        <div className="flex flex-col items-center gap-1">
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary font-poppins-bold text-xs ring-1 ring-primary/20">
                            {i + 1}
                          </span>
                        </div>
                      </th>
                    ))}
                    <th></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {dataFile.length === 0 ? (
                    <tr>
                      <td
                        colSpan={totalMinggu + 5}
                        className="px-6 py-12 text-center"
                      >
                        <div className="flex flex-col items-center gap-3">
                          <div className="text-gray-300">
                            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <p className="font-poppins-medium text-gray-500">Tidak ada data</p>
                          <p className="font-poppins-regular text-gray-400 text-sm">Upload file Excel untuk menampilkan jadwal pelaksanaan</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    dataFile.map((item: JadwalItem, index) => (
                      <tr
                        key={index}
                        className="hover:bg-primary/2 transition-all duration-200 border-b border-gray-100"
                      >
                        <td className="px-6 py-4 font-poppins-medium text-sm text-gray-800 max-w-xs">
                          <div className="truncate hover:text-clip" title={item.description}>
                            {item.description}
                          </div>
                        </td>
                        <td className="px-6 py-4 font-poppins-regular text-sm text-center">
                          <span className="inline-flex items-center justify-center px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-poppins-medium text-xs ring-1 ring-blue-200">
                            {item.total_price}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-poppins-regular text-sm text-center">
                          <span className="inline-flex items-center justify-center px-3 py-1 bg-amber-50 text-amber-700 rounded-full font-poppins-medium text-xs ring-1 ring-amber-200">
                            {item.weight}%
                          </span>
                        </td>
                        {item.minggu.map((val, i) => (
                          <td
                            key={i}
                            className="px-4 py-4 text-center border-l border-gray-200 font-poppins-semibold text-sm bg-primary/2 hover:bg-primary/5 transition-all duration-200"
                          >
                            <div className={`flex items-center justify-center h-8 rounded font-poppins-bold text-sm transition-all duration-200 ${val > 0
                                ? 'bg-green-100 text-green-700 ring-1 ring-green-200'
                                : 'text-gray-400'
                              }`}>
                              {val > 0 ? val : '-'}
                            </div>
                          </td>
                        ))}
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleDeleteRow(index)}
                              className="inline-flex items-center gap-2 px-3 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-all duration-200 hover:shadow-md active:scale-95 ring-1 ring-red-200"
                              title="Hapus baris"
                              aria-label="Hapus baris"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {dataFile.length > 0 && (
              <div className="bg-linear-to-r from-primary/5 to-primary/2 px-6 py-4 border-t-2 border-primary/20 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div className="flex gap-8">
                  <div>
                    <p className="font-poppins-regular text-gray-600 text-sm">Total Baris</p>
                    <p className="font-poppins-bold text-primary text-lg">{dataFile.length}</p>
                  </div>
                  <div>
                    <p className="font-poppins-regular text-gray-600 text-sm">Total Bobot</p>
                    <p className="font-poppins-bold text-primary text-lg">
                      {dataFile.reduce((sum, item) => sum + item.weight, 0)}%
                    </p>
                  </div>
                </div>
                <div className="bg-white px-6 py-3 rounded-lg border-2 border-primary/20 shadow-sm">
                  <p className="font-poppins-regular text-gray-600 text-xs mb-1">Target Bobot</p>
                  <p className="font-poppins-bold text-primary text-lg">
                    {dataFile.reduce((sum, item) => sum + item.weight, 0)}/100%
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}