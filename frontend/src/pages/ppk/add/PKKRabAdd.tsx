/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowLeft, Upload, Download, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/Navbar';
import { FormatCurrency } from '../../../libs/FormatCurrency';
import * as XLSX from 'xlsx';
import { SwalMessage } from '../../../libs/SwalMessage';

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

export default function PPKRabAdd() {
  const navigate = useNavigate();
  const [dataFile, setDataFile] = useState<any[]>([]);
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

  const [detailData, setDetailData] = useState([
    {
      keterangan: 'Pekerjaan Persiapan',
      satuan: 'M2',
      volume: 100,
      hargaSatuan: 50000,
      total: 5000000
    },
    {
      keterangan: 'Pekerjaan Struktur',
      satuan: 'M3',
      volume: 50,
      hargaSatuan: 500000,
      total: 25000000
    }
  ]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDeleteRow = (index: number) => {
    setDetailData(prev => prev.filter((_, i) => i !== index));
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

  console.log(dataFile);
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar type="ppk" />

      <div className="pt-24 pb-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 cursor-pointer text-gray-600 hover:text-primary font-poppins-medium mb-6 transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5" />
            Kembali
          </button>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h1 className="font-poppins-bold text-2xl text-gray-800 mb-6">
              Rencana Anggaran Biaya
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-poppins-regular">
              <div>
                <label className="block font-poppins-medium text-sm text-gray-700 mb-2">
                  Kode Tender
                </label>
                <div className="flex flex-row w-full gap-4 items-center">
                  <div className="w-full text-[12px] px-4 py-2.5 border border-gray-300 rounded-lg font-poppins text-left text-gray-700 hover:border-primary hover:bg-primary/5 transition-all duration-200 flex items-center justify-between">
                    <span>{formData.kodeTender || 'Pilih Tender'}</span>
                  </div>
                  <button className='font-poppins-regular text-white bg-primary px-4 py-2.5 w-32.5 text-[12px] rounded-lg cursor-pointer border-2 border-primary hover:bg-transparent hover:text-primary transition-all'>List Tender</button>
                </div>
              </div>

              <div>
                <label className="block font-poppins-medium text-sm text-gray-700 mb-2">
                  Tahun Anggaran
                </label>
                <input
                  type="text"
                  value={formData.tahunAnggaran}
                  onChange={(e) => handleInputChange('tahunAnggaran', e.target.value)}
                  className="w-full bg-gray-100 text-gray-500 cursor-not-allowed text-[12px] px-4 py-2.5 border border-gray-300 rounded-lg font-poppins focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                  placeholder="Masukkan tahun anggaran (otomatis)"
                  disabled
                />
              </div>

              <div>
                <label className="block font-poppins-medium text-sm text-gray-700 mb-2">
                  Satuan Kerja
                </label>
                <input
                  type="text"
                  value={formData.satuanKerja}
                  onChange={(e) => handleInputChange('satuanKerja', e.target.value)}
                  className="w-full bg-gray-100 text-gray-500 cursor-not-allowed text-[12px] px-4 py-2.5 border border-gray-300 rounded-lg font-poppins focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                  placeholder="Masukkan satuan kerja (otomatis)"
                  disabled
                />
              </div>

              <div>
                <label className="block font-poppins-medium text-sm text-gray-700 mb-2">
                  Kode RUP
                </label>
                <input
                  type="text"
                  value={formData.kodeRUP}
                  onChange={(e) => handleInputChange('kodeRUP', e.target.value)}
                  className="w-full bg-gray-100 text-gray-500 cursor-not-allowed text-[12px] px-4 py-2.5 border border-gray-300 rounded-lg font-poppins focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                  placeholder="Masukkan kode RUP (otomatis)"
                  disabled
                />
              </div>

              <div>
                <label className="block font-poppins-medium text-sm text-gray-700 mb-2">
                  Program Kegiatan
                </label>
                <input
                  type="text"
                  value={formData.programKegiatan}
                  onChange={(e) => handleInputChange('programKegiatan', e.target.value)}
                  className="w-full text-[12px] px-4 py-2.5 border border-gray-300 rounded-lg font-poppins focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                  placeholder="Masukkan program kegiatan"
                />
              </div>

              <div>
                <label className="block font-poppins-medium text-sm text-gray-700 mb-2">
                  Kegiatan
                </label>
                <input
                  type="text"
                  value={formData.kegiatan}
                  onChange={(e) => handleInputChange('kegiatan', e.target.value)}
                  className="w-full bg-gray-100 text-gray-500 cursor-not-allowed text-[12px] px-4 py-2.5 border border-gray-300 rounded-lg font-poppins focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                  placeholder="Masukkan kegiatan"
                  disabled
                />
              </div>

              <div className="md:col-span-2">
                <label className="block font-poppins-medium text-sm text-gray-700 mb-2">
                  Lokasi Pekerjaan
                </label>
                <textarea
                  value={formData.lokasiPekerjaan}
                  onChange={(e) => handleInputChange('lokasiPekerjaan', e.target.value)}
                  rows={3}
                  className="w-full bg-gray-100 text-gray-500 cursor-not-allowed text-[12px] px-4 py-2.5 border border-gray-300 rounded-lg font-poppins focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 resize-none"
                  placeholder="Masukkan lokasi pekerjaan (otomatis)"
                  disabled
                />
              </div>

              <div>
                <label className="block font-poppins-medium text-sm text-gray-700 mb-2">
                  Tanggal Mulai
                </label>
                <input
                  type="date"
                  value={formData.tanggalMulai}
                  onChange={(e) => handleInputChange('tanggalMulai', e.target.value)}
                  className="w-full text-[12px] px-4 py-2.5 border border-gray-300 rounded-lg font-poppins focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                />
              </div>

              <div>
                <label className="block font-poppins-medium text-sm text-gray-700 mb-2">
                  Tanggal Akhir
                </label>
                <input
                  type="date"
                  value={formData.tanggalAkhir}
                  onChange={(e) => handleInputChange('tanggalAkhir', e.target.value)}
                  className="w-full text-[12px] px-4 py-2.5 border border-gray-300 rounded-lg font-poppins focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block font-poppins-medium text-sm text-gray-700 mb-2">
                  Alasan
                </label>
                <textarea
                  value={formData.alasan}
                  disabled
                  rows={3}
                  className="w-full text-[12px] px-4 py-2.5 border border-gray-300 rounded-lg font-poppins bg-gray-100 text-gray-500 resize-none cursor-not-allowed"
                  placeholder="Alasan"
                />
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => console.log('Generate RAB')}
                className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-white font-poppins-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
              >
                Generate RAB
              </button>
            </div>
          </div>

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
                  Unduh Template RAB
                </button>
              </div>
              <div className="flex lg:justify-end justify-start items-end gap-4">
                {/* <button
                  onClick={() => handleFile()}
                  className="px-8 py-2.5 text-[12px] cursor-pointer border-2 border-primary hover:bg-transparent hover:text-primary bg-primary h-fit w-fit text-white font-poppins-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
                >
                  Impor data excel
                </button> */}
                <button
                  onClick={() => console.log('Simpan')}
                  className="px-8 py-2.5 text-[12px] cursor-pointer border-2 border-primary hover:bg-transparent hover:text-primary bg-primary h-fit w-fit text-white font-poppins-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>

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