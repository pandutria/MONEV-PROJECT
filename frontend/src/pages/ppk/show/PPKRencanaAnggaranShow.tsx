/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/Navbar';
import { FormatCurrency } from '../../../libs/FormatCurrency';

interface RABItem {
  keterangan: string;
  satuan: string;
  volume: number;
  hargaSatuan: number;
  jumlahHarga: number;
}

export default function PPKRencanaAnggaranShow() {
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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

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
                <div className="w-full bg-gray-100 text-gray-500 cursor-not-allowed text-[12px] px-4 py-2.5 border border-gray-300 rounded-lg font-poppins text-left transition-all duration-200 flex items-center justify-between">
                  <span>{formData.kodeTender || 'Pilih Tender'}</span>
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
                  placeholder="Masukkan tahun anggaran"
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
                  placeholder="Masukkan satuan kerja"
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
                  placeholder="Masukkan kode RUP"
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
                  className="w-full bg-gray-100 text-gray-500 cursor-not-allowed text-[12px] px-4 py-2.5 border border-gray-300 rounded-lg font-poppins focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                  placeholder="Masukkan program kegiatan"
                  disabled
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
                  className="w-full bg-gray-100 text-gray-500 cursor-not-allowed text-[12px] px-4 py-2.5 border border-gray-300 rounded-lg font-poppins focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                  disabled
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
                  className="w-full bg-gray-100 text-gray-500 cursor-not-allowed text-[12px] px-4 py-2.5 border border-gray-300 rounded-lg font-poppins focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                  disabled
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