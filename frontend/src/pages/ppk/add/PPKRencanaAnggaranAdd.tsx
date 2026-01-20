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
import useDataEntryHooks from '../../../hooks/DataEntryHooks';
import TableHeader from '../../../ui/TableHeader';
import FormatRupiah from '../../../utils/FormatRupiah';

const parseRABExcel = (
  worksheet: XLSX.WorkSheet,
  startRow: number = 13,
  maxRow: number = 121
): RABDetailProps[] => {
  const result: RABDetailProps[] = [];

  const range = XLSX.utils.decode_range(worksheet['!ref'] as string);
  const endRow = Math.min(range.e.r + 1, maxRow);

  const getCell = (col: string, row: number) => {
    const cell = worksheet[`${col}${row}`];
    return cell ? cell.v : '';
  };

  for (let row = startRow; row <= endRow; row++) {
    const c = getCell('C', row);
    const d = getCell('D', row);
    const e = getCell('E', row);

    if (!c && !d && !e) continue;
    if (String(c).toUpperCase().includes('TOTAL')) break;

    result.push({
      description: `${c} ${d} ${e}`.trim(),
      unit: String(getCell('F', row)),
      volume: Number(getCell('G', row)) || 0,
      unit_price: Number(getCell('H', row)) || 0,
      total: Number(getCell('I', row)) || 0,
    } as any);
  }

  return result;
};

export default function PPKRencanaAnggaranAdd() {
  const [dataFile, setDataFile] = useState<any[]>([]);
  const [showDetail, setShowDetail] = useState(false);
  const [showTender, setShowTender] = useState(false);
  const [search, setSearch] = useState("");
  const [tenderDataFilter, setTenderDataFilter] = useState<TenderProps[]>([]);
  const [selectedTender, setSelectedTender] = useState<TenderProps | any>(null);
  const {
    handleRABPost,
    handleChangeRAB,
    program,
    activity,
    startDate,
    endDate
  } = useRABHooks();
  const { user, loading } = useAuth();
  const { dataEntryPengadaan } = useDataEntryHooks();

  const handleDeleteRow = (index: number) => {
    setDataFile(prev => prev.filter((_, i) => i !== index));
  };

  const handleDownloadTemplate = () => {
    const link = document.createElement('a');
    link.href = '../../../../public/download/template-rab.xlsx';
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
      const parsedData = parseRABExcel(worksheet);

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
    if (!selectedTender) {
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
    const renderShowtender = () => {
      if (showTender && !selectedTender) {
        document.body.style.overflow = 'hidden';
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      } else {
        document.body.style.overflow = "auto"
        setShowTender(false)
      }
    }

    const filteringDataTender = () => {
      const filter = dataEntryPengadaan?.filter((item: TenderProps) => {
        const data = item?.tender_code?.toLowerCase().includes(search.toLowerCase());
        return data;
      });

      setTenderDataFilter(filter);
    }

    filteringDataTender();
    renderShowtender();
  }, [showTender, selectedTender, search, dataEntryPengadaan]);

  const columns = [
    {
      key: 'id',
      label: 'No'
    },
    {
      key: 'fiscal_year',
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
              title="Data Tender"
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
                  setSelectedTender(item)
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
              Rencana Anggaran Biaya
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-poppins-regular">
              <ShowTableForm tenderCode={selectedTender?.tender_code} onClick={() => {
                setShowTender(true);
                setSelectedTender(null);
              }} />

              <FormInput
                title='Tahun Anggaran'
                placeholder='Masukkan tahun anggaran (otomatis)'
                value={selectedTender?.fiscal_year as any}
                disabled={true}
              />

              <FormInput
                title='Satuan Kerja'
                placeholder='Masukkan tahun satuan kerja (otomatis)'
                value={selectedTender?.satker_name}
                disabled={true}
              />

              <FormInput
                title='Kode RUP'
                placeholder='Masukkan tahun kode RUP (otomatis)'
                value={selectedTender?.rup_code}
                disabled={true}
              />

              <FormInput
                title='Lokasi Pekerjaan'
                placeholder='Masukkan lokasi pekerjaan (otomatis)'
                value={selectedTender?.work_location as any}
                disabled={true}
                type='textarea'
              />

              <FormInput
                title='Program Kegiatan'
                placeholder='Masukkan program kegiatan'
                value={program}
                name='program'
                onChange={handleChangeRAB}
              />

              <FormInput
                title='Kegiatan'
                placeholder='Masukkan kegiatan'
                value={activity}
                name='activity'
                onChange={handleChangeRAB}
              />

              <FormInput
                title='Tanggal Awal'
                placeholder='Masukkan tanggal awal'
                value={startDate}
                name='start'
                onChange={handleChangeRAB}
                type='date'
              />

              <FormInput
                title='Tanggal Akhir'
                placeholder='Masukkan tanggal akhir'
                value={endDate}
                name='end'
                onChange={handleChangeRAB}
                type='date'
              />

              <FormInput
                title='Alasan'
                placeholder='Alasan'
                // value={selectedTender.alasan}
                disabled={true}
                type='textarea'
              />
            </div>

            <SubmitButton text='Buat RAB' onClick={() => handleShowDetail()} />
          </div>

          {showDetail && (
            <FormGenerateExcel handleSave={() => handleRABPost(selectedTender, dataFile)} title='RAB' handleFileChange={handleFileChange} handleDownloadTemplate={handleDownloadTemplate} />
          )}

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-linear-to-r from-primary/20 to-primary/10 border-b-2 border-primary/30">
                    <th className="px-6 py-4 text-center font-poppins-semibold text-gray-800 text-sm uppercase tracking-wider">
                      Keterangan
                    </th>
                    <th className="px-6 py-4 text-center font-poppins-semibold text-gray-800 text-sm uppercase tracking-wider">
                      Satuan
                    </th>
                    <th className="px-6 py-4 text-center font-poppins-semibold text-gray-800 text-sm uppercase tracking-wider">
                      Volume
                    </th>
                    <th className="px-6 py-4 text-center font-poppins-semibold text-gray-800 text-sm uppercase tracking-wider">
                      Harga Satuan
                    </th>
                    <th className="px-6 py-4 text-center font-poppins-semibold text-gray-800 text-sm uppercase tracking-wider bg-primary/5">
                      Total
                    </th>
                    <th className="px-6 py-4 text-center font-poppins-semibold text-gray-800 text-sm uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {dataFile.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12">
                        <div className="flex flex-col items-center gap-3">
                          <div className="text-gray-300">
                            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <p className="font-poppins-medium text-gray-500">Tidak ada data</p>
                          <p className="font-poppins-regular text-gray-400 text-sm">Upload file Excel untuk menampilkan RAB</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    dataFile.map((item: RABDetailProps, index) => (
                      <tr
                        key={index}
                        className="hover:bg-primary/2 transition-all duration-200 border-b border-gray-100"
                      >
                        <td className="px-6 py-4 text-center font-poppins-medium text-sm text-gray-800 max-w-sm">
                          <div className="truncate hover:text-clip" title={item.description}>
                            {item.description}
                          </div>
                        </td>
                        <td className="px-6 py-4 font-poppins-regular text-center text-sm text-gray-700">
                          <span className="inline-flex items-center justify-center px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-poppins-medium text-xs whitespace-nowrap">
                            {item.unit}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-poppins-semibold text-sm text-gray-800 text-center">
                          <span className="inline-flex items-center justify-center px-3 py-1 bg-amber-50 text-amber-700 rounded-full font-poppins-bold text-xs">
                            {item.volume}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-poppins-semibold text-sm text-gray-800 text-center">
                          {FormatRupiah(item.unit_price)}
                        </td>
                        <td className="px-6 py-4 font-poppins-bold text-sm text-primary text-center bg-primary/3 hover:bg-primary/5 transition-all duration-200">
                          {FormatRupiah(item.total)}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleDeleteRow(index)}
                              className="inline-flex cursor-pointer items-center gap-2 px-3 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-all duration-200 hover:shadow-md active:scale-95"
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
                    <p className="font-poppins-regular text-gray-600 text-sm">Total Item</p>
                    <p className="font-poppins-bold text-primary text-lg">{dataFile.length}</p>
                  </div>
                  <div>
                    <p className="font-poppins-regular text-gray-600 text-sm">Total Volume</p>
                    <p className="font-poppins-bold text-primary text-lg">
                      {dataFile.reduce((sum, item) => sum + Number(item.volume), 0)}
                    </p>
                  </div>
                </div>
                <div className="bg-white px-6 py-3 rounded-lg border-2 border-primary/20 shadow-sm">
                  <p className="font-poppins-regular text-gray-600 text-sm mb-1">Total RAB</p>
                  <p className="font-poppins-bold text-primary text-xl">
                    {FormatRupiah(dataFile.reduce((sum, item) => sum + Number(item.total), 0))}
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