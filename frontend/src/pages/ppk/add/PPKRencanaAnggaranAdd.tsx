/* eslint-disable @typescript-eslint/no-explicit-any */
import { Upload, Download, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import Navbar from '../../../components/Navbar';
import { FormatCurrency } from '../../../utils/FormatCurrency';
import * as XLSX from 'xlsx';
import { SwalMessage } from '../../../utils/SwalMessage';
import TableContent from '../../../ui/TableContent';
import BackButton from '../../../ui/BackButton';
import ShowTableForm from '../../../ui/ShowTableForm';
import FormInput from '../../../ui/FormInput';
import SubmitButton from '../../../ui/SubmitButton';
import FormGenerateExcel from '../../../ui/FormGenerateExcel';
import useRABHooks from '../../../hooks/RABHooks';
import useTenderInaprocHooks from '../../../hooks/TenderInaprocHooks';
import { useAuth } from '../../../context/AuthContext';
import LoadingSpinner from '../../../ui/LoadingSpinner';
import { Navigate } from 'react-router-dom';

interface RABItem {
  keterangan: string;
  satuan: string;
  volume: number;
  hargaSatuan: number;
  jumlahHarga: number;
}

const parseRABExcel = (
  worksheet: XLSX.WorkSheet,
  startRow: number = 13,
  maxRow: number = 121
): RABItem[] => {
  const result: RABItem[] = [];

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
      keterangan: `${c} ${d} ${e}`.trim(),
      satuan: String(getCell('F', row)),
      volume: Number(getCell('G', row)) || 0,
      hargaSatuan: Number(getCell('H', row)) || 0,
      jumlahHarga: Number(getCell('I', row)) || 0,
    });
  }

  return result;
};

export default function PPKRencanaAnggaranAdd() {
  const [dataFile, setDataFile] = useState<any[]>([]);
  const [showDetail, setShowDetail] = useState(false);
  const [showTender, setShowTender] = useState(false);
  const [selectedTender, setSelectedTender] = useState<TenderProps | null>(null);
  const { handleRABPost } = useRABHooks();
  const { user, loading } = useAuth();
  const { tenderData } = useTenderInaprocHooks();

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

    renderShowtender();
  }, [showTender, selectedTender]);

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
      key: 'satuan',
      label: 'Satuan Kerja'
    },
    {
      key: 'rup',
      label: 'Kode RUP'
    },
    {
      key: 'tender',
      label: 'kode Tender'
    },
    {
      key: 'paket',
      label: 'Nama Paket'
    },
    {
      key: 'revisi',
      label: 'Revisi'
    },
  ];

  if (loading) {
    return <LoadingSpinner/>
  }

  if (!user || user.role.name != "ppk") {
    return <Navigate to="/" replace/>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar/>

      {showTender && (
        <div className="absolute inset-0 flex justify-center items-center bg-black/20 z-20">
          <div className="bg-white p-4 rounded-lg flex flex-col max-w-[90vw] max-h-[60vh] gap-4 relative">
            <div className="absolute top-4 right-4 cursor-pointer text-primary" onClick={() => setShowTender(false)}>
              <X />
            </div>
            <h1 className="font-poppins-semibold text-center text-[26px] shrink-0 mb-6">
              Data Tender Pekerja Konstruksi
            </h1>
            <div className="overflow-y-auto max-h-[70vh] w-full">
              <TableContent
                columns={columns}
                data={tenderData}
                isSelect={false}
                showEdit={false}
                showPreview={false}
                showSelect={true}
                onEdit={(item) => console.log('Edit:', item)}
                onPreview={(item) => console.log('Preview:', item)}
                onSelectedDataChange={(item) => setSelectedTender(item)}
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
                value={selectedTender?.satker_code}
                disabled={true}
              />

              <FormInput
                title='Kode RUP'
                placeholder='Masukkan tahun kode RUP (otomatis)'
                value={selectedTender?.rup_code}
                disabled={true}
              />

              <FormInput
                title='Program Kegiatan'
                placeholder='Masukkan program kegiatan (otomatis)'
                value={selectedTender?.rup_name}
                disabled={true}
              />

              <FormInput
                title='Kegiatan'
                placeholder='Masukkan kegiatan (otomatis)'
                value={selectedTender?.rup_description}
                disabled={true}
              />

              <FormInput
                title='Lokasi Pekerjaan'
                placeholder='Masukkan lokasi pekerjaan (otomatis)'
                value={selectedTender?.work_location as any}
                disabled={true}
                type='textarea'
              />

              {/* <FormInput
                title='Tanggal Awal'
                placeholder='Masukkan tanggal awal (otomatis)'
                value={selectedTender.tanggalMulai}
                disabled={true}
                type='date'
              />

              <FormInput
                title='Tanggal Akhir'
                placeholder='Masukkan tanggal akhir (otomatis)'
                value={selectedTender.tanggalAkhir}
                disabled={true}
                type='date'
              /> */}

              {/* <FormInput
                title='Alasan'
                placeholder='Alasan'
                value={selectedTender.alasan}
                disabled={true}
                type='textarea'
              /> */}
            </div>

            <SubmitButton text='Buat RAB' onClick={() => handleShowDetail()}/>
          </div>

          {showDetail && (
            <FormGenerateExcel title='RAB' handleFileChange={handleFileChange} handleDownloadTemplate={handleDownloadTemplate}/>        
          )}

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-primary/10 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left font-poppins-semibold text-sm text-gray-700 uppercase tracking-wider">
                      Keterangan
                    </th>
                    <th className="px-6 py-4 text-left font-poppins-semibold text-sm text-gray-700 uppercase tracking-wider">
                      Satuan
                    </th>
                    <th className="px-6 py-4 text-left font-poppins-semibold text-sm text-gray-700 uppercase tracking-wider">
                      Volume
                    </th>
                    <th className="px-6 py-4 text-left font-poppins-semibold text-sm text-gray-700 uppercase tracking-wider">
                      Harga Satuan
                    </th>
                    <th className="px-6 py-4 text-left font-poppins-semibold text-sm text-gray-700 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-4 text-left font-poppins-semibold text-sm text-gray-700 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {dataFile.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-8 text-center font-poppins text-gray-500"
                      >
                        Tidak ada data
                      </td>
                    </tr>
                  ) : (
                    dataFile.map((item: RABItem, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td className="px-6 py-4 font-poppins text-sm text-gray-700">
                          {item.keterangan}
                        </td>
                        <td className="px-6 py-4 font-poppins text-sm text-gray-700">
                          {item.satuan}
                        </td>
                        <td className="px-6 py-4 font-poppins text-sm text-gray-700">
                          {item.volume}
                        </td>
                        <td className="px-6 py-4 font-poppins text-sm text-gray-700">
                          {FormatCurrency(item.hargaSatuan)}
                        </td>
                        <td className="px-6 py-4 font-poppins text-sm text-gray-700">
                          {FormatCurrency(item.jumlahHarga)}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleDeleteRow(index)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 cursor-pointer"
                            title="Hapus"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}