/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Search, Calendar, TrendingUp, X } from 'lucide-react';
import Navbar from '../../../components/Navbar';
import ShowTableForm from '../../../ui/ShowTableForm';
import useRealisasiHooks from '../../../hooks/RealisasiHooks';
import TableHeader from '../../../ui/TableHeader';
import { useAuth } from '../../../context/AuthContext';
import LoadingSpinner from '../../../ui/LoadingSpinner';
import { Navigate } from 'react-router-dom';
import TableContent from '../../../ui/TableContent';
import { FormatDate } from '../../../utils/FormatDate';
import { RemainingWeeks } from '../../../utils/RemainingWeek';
import { ScheduleWeekAggregate } from '../../../utils/ScheduleWeekAggregate';
import { buildKurvaData } from '../../../utils/BuildKurvaData';
import { RemainingProgress } from '../../../utils/RemainingProgress';
import { ConvertToPercent } from '../../../utils/CovertToPercent';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

export default function KepalaProjectKurvaS() {
  const [selectedProject, setSelectedProject] = useState<RealizationProps | null>(null);
  const [showTender, setShowTender] = useState(false);
  const { realisasiData } = useRealisasiHooks();
  const { loading, user } = useAuth();
  const [search, setSearch] = useState("");
  const [tenderDataFilter, setTenderDataFilter] = useState<RealizationProps[]>([]);

  useEffect(() => {
    if (showTender && !selectedProject) {
      document.body.style.overflow = 'hidden';
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      document.body.style.overflow = "auto"
    }
  }, [showTender, selectedProject]);

  useEffect(() => {
    const filteringDataTender = () => {
      const filter = realisasiData?.filter((item: RealizationProps) => {
        const data = item?.schedule?.rab?.data_entry?.kode_paket?.toLowerCase().includes(search.toLowerCase());
        return data;
      });

      setTenderDataFilter(filter);
    }

    filteringDataTender();
  }, [search, realisasiData]);

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
      key: 'satuan_kerja',
      label: 'Satuan Kerja'
    },
    {
      key: 'kode_rup',
      label: 'Kode RUP'
    },
    {
      key: 'kode_paket',
      label: 'kode Tender'
    },
    {
      key: 'nama_paket',
      label: 'Nama Paket'
    },
  ];

  if (loading) {
    return <LoadingSpinner />
  }

  if (!user || (user.role.name != "kepala bagian" && user.role.name != "kepala biro")) {
    return <Navigate to="/" replace />
  }

  const scheduleAggreateWeeks = ScheduleWeekAggregate(selectedProject?.schedule.items ?? []);
  const scheduleProgress = ConvertToPercent(RemainingProgress(scheduleAggreateWeeks), RemainingProgress(scheduleAggreateWeeks));
  const actualProgress = ConvertToPercent(RemainingProgress(selectedProject?.detail), RemainingProgress(scheduleAggreateWeeks));
  const kurvaData = buildKurvaData(selectedProject?.schedule, selectedProject as any);

  return (
    <div>
      <Navbar />

      {showTender && (
        <div className="absolute inset-0 h-screen flex justify-center items-center bg-black/20 z-20">
          <div className="bg-white p-4 rounded-lg flex flex-col max-w-[90vw] max-h-[70vh] gap-4 relative">
            <div className="absolute top-4 right-4 cursor-pointer text-primary" onClick={() => setShowTender(false)}>
              <X />
            </div>
            <TableHeader
              title="Data Tender Dari Realisasi"
              type='pokja'
              showHapus={false}
              showTambah={false}
              searchValue={search}
              onSearchChange={(item) => setSearch(item)}
              showTahunQuery={false}
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
                  setSelectedProject(item as any)
                  setShowTender(false)
                }}
              />
            </div>
          </div>
        </div>
      )}

      <div className="top-0 z-10 bg-white/95 border-primary/20-lg pt-24" data-aos="fade-up" data-aos-duration="1000">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-poppins-bold text-4xl text-gray-900 mb-2">Project Kurva S</h1>
              <p className="font-poppins-regular text-gray-500 text-sm">Monitor dan analisis progres proyek secara real-time</p>
            </div>
            <div className="w-16 h-16 bg-linear-to-br from-primary to-primary/60 rounded-2xl flex items-center justify-center shadow-lg">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="w-full gap-6 font-poppins-regular">
            <ShowTableForm tenderCode={selectedProject?.schedule?.rab?.data_entry?.kode_paket?.toString()} onClick={() => {
              setShowTender(true);
              setSelectedProject(null);
            }} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12" data-aos="fade-up" data-aos-duration="1000">
        {selectedProject && (
          <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-linear-to-br from-white to-primary/5 rounded-2xl shadow-lg p-6 border-2 border-primary/30 hover:shadow-2xl hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2 h-8 bg-linear-to-b from-primary to-primary/60 rounded-full"></div>
                  <p className="font-poppins-medium text-gray-600 text-xs uppercase tracking-wider">Program Kegiatan</p>
                </div>
                <p className="font-poppins-bold text-gray-900 text-sm leading-relaxed">{selectedProject.schedule.rab?.program}</p>
              </div>

              <div className="bg-linear-to-br from-white to-blue-50 rounded-2xl shadow-lg p-6 border-2 border-blue-200/50 hover:shadow-2xl hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2 h-8 bg-linear-to-b from-blue-500 to-blue-400 rounded-full"></div>
                  <p className="font-poppins-medium text-gray-600 text-xs uppercase tracking-wider">Kegiatan</p>
                </div>
                <p className="font-poppins-bold text-gray-900 text-sm leading-relaxed">{selectedProject.schedule.rab?.data_entry.nama_paket}</p>
              </div>

              <div className="bg-linear-to-br from-white to-yellow-50 rounded-2xl shadow-lg p-6 border-2 border-yellow-200/50 hover:shadow-2xl hover:border-yellow-300 transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2 h-8 bg-linear-to-b from-yellow-500 to-yellow-400 rounded-full"></div>
                  <p className="font-poppins-medium text-gray-600 text-xs uppercase tracking-wider">Sisa Minggu</p>
                </div>
                <p className="font-poppins-bold text-gray-900 text-sm leading-relaxed">{RemainingWeeks(String(selectedProject?.schedule?.rab?.tanggal_mulai), String(selectedProject?.schedule?.rab?.tanggal_akhir))} Minggu</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              <div className="bg-linear-to-br from-white to-cyan-50 rounded-2xl shadow-lg p-6 border-2 border-cyan-200/50 hover:shadow-2xl hover:border-cyan-300 transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-3">
                  <Calendar className="w-5 h-5 text-cyan-600" />
                  <p className="font-poppins-medium text-gray-600 text-xs uppercase tracking-wider">Tanggal Mulai</p>
                </div>
                <p className="font-poppins-bold text-gray-900 text-sm">
                  {FormatDate(String(selectedProject.schedule.rab?.tanggal_mulai))}
                </p>
              </div>

              <div className="bg-linear-to-br from-white to-purple-50 rounded-2xl shadow-lg p-6 border-2 border-purple-200/50 hover:shadow-2xl hover:border-purple-300 transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-3">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  <p className="font-poppins-medium text-gray-600 text-xs uppercase tracking-wider">Tanggal Selesai</p>
                </div>
                <p className="font-poppins-bold text-gray-900 text-sm">
                  {FormatDate(String(selectedProject.schedule.rab?.tanggal_akhir))}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-linear-to-br from-white to-orange-50 rounded-2xl shadow-lg p-8 border-2 border-orange-200/50 hover:shadow-2xl transition-all duration-300">
                <p className="font-poppins-bold text-gray-700 text-sm uppercase tracking-wider mb-6">Progress Perencanaan</p>
                <div className="space-y-4">
                  <div className="inline-flex items-center justify-center px-6 py-3 bg-linear-to-r from-orange-100 to-orange-50 text-orange-700 rounded-xl font-poppins-bold text-4xl border-2 border-orange-300/50">
                    {scheduleProgress}%
                  </div>
                  <div className="w-full bg-linear-to-r from-gray-200 to-gray-100 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-orange-500 to-orange-400 rounded-full transition-all duration-700 shadow-lg"
                      style={{ width: `${scheduleProgress}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="bg-linear-to-br from-white to-blue-50 rounded-2xl shadow-lg p-8 border-2 border-blue-200/50 hover:shadow-2xl transition-all duration-300">
                <p className="font-poppins-bold text-gray-700 text-sm uppercase tracking-wider mb-6">Progress Aktual</p>
                <div className="space-y-4">
                  <div className="inline-flex items-center justify-center px-6 py-3 bg-linear-to-r from-blue-100 to-blue-50 text-blue-700 rounded-xl font-poppins-bold text-4xl border-2 border-blue-300/50">
                    {actualProgress}%
                  </div>
                  <div className="w-full bg-linear-to-r from-gray-200 to-gray-100 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-700 shadow-lg"
                      style={{ width: `${actualProgress}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className={`bg-linear-to-br from-white rounded-2xl shadow-lg p-8 border-2 transition-all duration-300 hover:shadow-2xl ${Number(actualProgress) - Number(scheduleProgress) > 0 ? 'to-emerald-50 border-emerald-200/50' : 'to-red-50 border-red-200/50'}`}>
                <p className="font-poppins-bold text-gray-700 text-sm uppercase tracking-wider mb-6">Deviasi</p>
                <div className="space-y-4">
                  <div className={`inline-flex items-center justify-center px-6 py-3 rounded-xl font-poppins-bold text-4xl border-2 ${Number(actualProgress) - Number(scheduleProgress) > 0 ? 'bg-linear-to-r from-emerald-100 to-emerald-50 text-emerald-700 border-emerald-300/50' : 'bg-linear-to-r from-red-100 to-red-50 text-red-700 border-red-300/50'}`}>
                    {Number(actualProgress) - Number(scheduleProgress)}%
                  </div>
                  <p className={`font-poppins-medium text-sm ${Number(actualProgress) - Number(scheduleProgress) > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                    {Number(actualProgress) - Number(scheduleProgress) > 0 ? '✓ Lebih cepat dari rencana' : Number(actualProgress) - Number(scheduleProgress) < 0 ? '✗ Tertinggal dari rencana' : '= Sesuai rencana'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-linear-to-br from-white to-primary/5 rounded-2xl shadow-xl p-8 border-2 border-primary/20 hover:shadow-2xl transition-all duration-300">
              <h2 className="font-poppins-bold text-gray-900 text-xl mb-8 flex items-center gap-3">
                <div className="w-1.5 h-8 bg-linear-to-b from-primary to-primary/60 rounded-full"></div>
                Kurva S - Perbandingan Rencana vs Aktual
              </h2>
              <Line
                data={{
                  labels: kurvaData.map(d => d.minggu),
                  datasets: [
                    {
                      label: 'Rencana',
                      data: kurvaData.map(d => d.rencana),
                      borderColor: '#f60',
                      backgroundColor: 'rgba(255, 102, 0, 0.05)',
                      borderWidth: 3,
                      pointRadius: 5,
                      pointBackgroundColor: '#f60',
                      pointBorderColor: '#fff',
                      pointBorderWidth: 2,
                      pointHoverRadius: 7,
                      tension: 0.4,
                      fill: false
                    },
                    {
                      label: 'Aktual',
                      data: kurvaData.map(d => d.aktual),
                      borderColor: '#3b82f6',
                      backgroundColor: 'rgba(59, 130, 246, 0.05)',
                      borderWidth: 3,
                      pointRadius: 5,
                      pointBackgroundColor: '#3b82f6',
                      pointBorderColor: '#fff',
                      pointBorderWidth: 2,
                      pointHoverRadius: 7,
                      tension: 0.4,
                      fill: false
                    }
                  ]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  plugins: {
                    legend: {
                      display: true,
                      labels: {
                        font: { family: 'poppins-regular', size: 13 },
                        padding: 20,
                        usePointStyle: true,
                        pointStyle: 'circle'
                      }
                    },
                    tooltip: {
                      backgroundColor: '#fff',
                      borderColor: '#f60',
                      borderWidth: 2,
                      titleFont: { family: 'poppins-semibold', size: 13 },
                      bodyFont: { family: 'poppins-regular', size: 12 },
                      padding: 12,
                      displayColors: true,
                      cornerRadius: 10,
                      titleColor: '#111827',
                      bodyColor: '#111827'
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        font: { family: 'poppins-regular', size: 12 },
                        color: '#9ca3af'
                      },
                      grid: {
                        color: '#e5e7eb'
                      }
                    },
                    x: {
                      ticks: {
                        font: { family: 'poppins-regular', size: 12 },
                        color: '#9ca3af'
                      },
                      grid: {
                        display: false
                      }
                    }
                  }
                }}
                height={300}
              />
            </div>
          </div>
        )}

        {!selectedProject && (
          <div className="bg-linear-to-br from-white to-gray-50 rounded-2xl shadow-2xl p-20 text-center border-2 border-dashed border-primary/20">
            <div className="w-24 h-24 bg-linear-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Search className="w-12 h-12 text-primary" />
            </div>
            <p className="font-poppins-bold text-gray-900 text-2xl mb-3">Silahkan Cari Project</p>
            <p className="font-poppins-regular text-gray-500 text-lg">Masukkan Kode Tender untuk melihat detail analisis Kurva S</p>
          </div>
        )}
      </div>
    </div>
  );
}