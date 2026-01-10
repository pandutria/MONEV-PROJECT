/* eslint-disable @typescript-eslint/no-explicit-any */
import { Upload, Download, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/Navbar';
import * as XLSX from 'xlsx';
import { SwalMessage } from '../../../utils/SwalMessage';
import TableContent from '../../../ui/TableContent';
import BackButton from '../../../ui/BackButton';
import ShowTableForm from '../../../ui/ShowTableForm';
import FormInput from '../../../ui/FormInput';
import SubmitButton from '../../../ui/SubmitButton';

interface RABItem {
  keterangan: string;
  jumlah: string;
  bobot: number;
  minggu: number[];
}

const WEEK_START_COL = 'P';
export const formatLoopExcel = (index: number): string => {
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
): RABItem[] => {
  const result: RABItem[] = [];

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
      keterangan: `${b} ${c} ${d} ${e} ${f} ${g}`.trim(),
      jumlah: String(getCell('M', row)),
      bobot: Number(getCell('O', row)) || 0,
      minggu
    });
  }

  return result;
};

export default function PPKJadwalPelaksanaanAdd() {
  const navigate = useNavigate();
  const [dataFile, setDataFile] = useState<any[]>([]);
  const [showDetail, setShowDetail] = useState(false);
  const [showTender, setShowTender] = useState(false);
  const [selectedTender, setSelectedTender] = useState<any | null>(null);
  const [totalMinggu, setTotalMinggu] = useState<number>(1);
  const [formData, setFormData] = useState({
    kodeTender: '',
    tahunAnggaran: '',
    satuanKerja: '',
    kodeRUP: '',
    programKegiatan: '',
    kegiatan: '',
    lokasiPekerjaan: '',
    tanggalMulai: '',
    tanggalAkhir: '',
    alasan: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

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
      const totalMinggu = getTotalMingguFromExcel(worksheet);
      const parsedData = parseRABExcel(worksheet, totalMinggu);

      SwalMessage({
        title: "Berhasil!",
        text: "Data berhasil diimpor",
        type: "success"
      });

      setTotalMinggu(totalMinggu);
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

      setFormData(prev => ({
        ...prev,
        kodeTender: selectedTender?.tender,
        tahunAnggaran: selectedTender?.tahun,
        satuanKerja: selectedTender?.satuan,
        kodeRUP: selectedTender?.rup,
        kegiatan: selectedTender?.paket
      }));
    }

    renderShowtender();
  }, [showTender, selectedTender]);

  console.log(formData, selectedTender);

  const columns = [
    {
      key: 'no',
      label: 'No'
    },
    {
      key: 'tahun',
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

  const data = [
    {
      no: 1,
      tahun: '2025',
      satuan: 'DINAS PEKERJAAN UMUM DAN PENATAAN RUANG',
      rup: '60986116',
      tender: '10093144000',
      paket: "Rekonstruksi/Peningkatan Jalan Wawongole - Teteona (Duriaasi)",
      revisi: "3"
    },
    {
      no: 2,
      tahun: '2024',
      satuan: 'DEWAN PERWAKILAN RAKYAT DAERAH (DPRD)',
      rup: '61328060',
      tender: '10094830000',
      paket: "Pemasangan Vaving blok Kantor DPRD Kab. Konawe",
      revisi: "0"
    },
  ];

  console.log(dataFile);
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar type="ppk" />

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
                data={data}
                isSelect={false}
                showEdit={false}
                showPreview={false}
                showSelect={true}
                idKey="no"
                onEdit={(item) => console.log('Edit:', item)}
                onPreview={(item) => console.log('Preview:', item)}
                onSelectedDataChange={(item) => setSelectedTender(item)}
              />
            </div>
          </div>
        </div>
      )}

      <div className="pt-24 pb-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <BackButton />

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h1 className="font-poppins-bold text-2xl text-gray-800 mb-6">
              Jadwal Pelaksanaan Pekerjaan
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-poppins-regular">
              <ShowTableForm
                tenderCode={formData.kodeTender}
                onClick={() => {
                  setShowTender(true);
                  setSelectedTender(null);
                }}
              />

              <FormInput
                title='Tahun Anggaran'
                placeholder='Masukkan tahun anggaran (otomatis)'
                value={formData.tahunAnggaran}
                disabled={true}
                onChange={(e) => handleInputChange('tahunAnggaran', e.target.value)}
              />

              <FormInput
                title='Satuan Kerja'
                placeholder='Masukkan tahun satuan kerja (otomatis)'
                value={formData.satuanKerja}
                disabled={true}
                onChange={(e) => handleInputChange('satuanKerja', e.target.value)}
              />

              <FormInput
                title='Kode RUP'
                placeholder='Masukkan tahun kode RUP (otomatis)'
                value={formData.kodeRUP}
                disabled={true}
                onChange={(e) => handleInputChange('kodeRUP', e.target.value)}
              />

              <FormInput
                title='Program Kegiatan'
                placeholder='Masukkan program kegiatan (otomatis)'
                value={formData.programKegiatan}
                disabled={true}
                onChange={(e) => handleInputChange('programKegiatan', e.target.value)}
              />

              <FormInput
                title='Kegiatan'
                placeholder='Masukkan kegiatan (otomatis)'
                value={formData.kegiatan}
                disabled={true}
                onChange={(e) => handleInputChange('kegiatan', e.target.value)}
              />

              <FormInput
                title='Lokasi Pekerjaan'
                placeholder='Masukkan lokasi pekerjaan (otomatis)'
                value={formData.lokasiPekerjaan}
                disabled={true}
                onChange={(e) => handleInputChange('lokasiPekerjaan', e.target.value)}
                type='textarea'
              />

              <FormInput
                title='Tanggal Awal'
                placeholder='Masukkan tanggal awal (otomatis)'
                value={formData.tanggalMulai}
                disabled={true}
                type='date'
                onChange={(e) => handleInputChange('tanggalAwal', e.target.value)}
              />

              <FormInput
                title='Tanggal Akhir'
                placeholder='Masukkan tanggal akhir (otomatis)'
                value={formData.tanggalAkhir}
                disabled={true}
                type='date'
                onChange={(e) => handleInputChange('tanggalAkhir', e.target.value)}
              />

              <FormInput
                title='Alasan'
                placeholder='Alasan'
                value={formData.alasan}
                disabled={true}
                type='textarea'
                onChange={(e) => handleInputChange('alasan', e.target.value)}
              />
            </div>

            <SubmitButton text='Buat Jadwal' onClick={() => handleShowDetail()}/>
          </div>

          {showDetail && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="font-poppins-bold text-xl text-gray-800 mb-6">
                Detail
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block font-poppins-medium text-sm text-gray-700 mb-2">
                    Input File .xlsx
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept=".xlsx"
                      className="hidden"
                      id="file-upload"
                      onChange={handleFileChange}
                    />
                    <label
                      htmlFor="file-upload"
                      className="flex items-center justify-center gap-2 w-full px-4 py-2.5 border border-gray-300 rounded-lg font-poppins text-gray-700 hover:border-primary hover:bg-primary/5 transition-all duration-200 cursor-pointer"
                    >
                      <Upload className="h-5 w-5 text-primary" />
                      <span>Pilih File Excel</span>
                    </label>
                  </div>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={() => handleDownloadTemplate()}
                    className="flex items-center text-[12px] cursor-pointer gap-2 px-6 py-2.5 border border-primary text-primary hover:bg-primary hover:text-white font-poppins-medium rounded-lg transition-all duration-200"
                  >
                    <Download className="h-4 w-4" />
                    Unduh Template Jadwal Pelaksaan
                  </button>
                </div>
                <div className="flex lg:justify-end justify-start items-end">
                  <button
                    onClick={() => console.log('Simpan')}
                    className="px-8 py-2.5 text-[12px] cursor-pointer border-2 border-primary hover:bg-transparent hover:text-primary bg-primary h-fit w-fit text-white font-poppins-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-primary/10 border-b border-gray-200">
                  <tr>
                    <th rowSpan={2}>Keterangan</th>
                    <th rowSpan={2}>Jumlah</th>
                    <th rowSpan={2}>Bobot</th>

                    <th colSpan={totalMinggu} className="text-center">
                      Minggu
                    </th>

                    <th rowSpan={2}>Aksi</th>
                  </tr>

                  <tr>
                    {Array.from({ length: totalMinggu }).map((_, i) => (
                      <th key={i} className="text-center px-4 py-2">
                        {i + 1}
                      </th>
                    ))}
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
                          {item.jumlah}
                        </td>
                        <td className="px-6 py-4 font-poppins text-sm text-gray-700">
                          {item.bobot}
                        </td>
                        {item.minggu.map((val, i) => (
                          <td key={i} className="px-4 py-2 text-center">
                            {val}
                          </td>
                        ))}
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