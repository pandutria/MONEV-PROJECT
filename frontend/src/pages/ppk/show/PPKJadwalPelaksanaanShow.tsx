/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/Navbar';

interface RABItem {
  keterangan: string;
  jumlah: string;
  bobot: number;
  minggu: number[];
}

export default function PPKJadwalPelaksanaanShow() {
  const navigate = useNavigate();
  const [dataFile, setDataFile] = useState<any[]>([]);
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
              Jadwal Pelaksanaan Pekerjaan
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
                  <button onClick={() => { setShowTender(true); setSelectedTender(null) }} className='font-poppins-regular text-white bg-primary px-4 py-2.5 w-32.5 text-[12px] rounded-lg cursor-pointer border-2 border-primary hover:bg-transparent hover:text-primary transition-all'>List Tender</button>
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
                    <th rowSpan={2}>Keterangan</th>
                    <th rowSpan={2}>Jumlah</th>
                    <th rowSpan={2}>Bobot</th>
                    <th colSpan={totalMinggu} className="text-center">
                      Minggu
                    </th>
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