/* eslint-disable @typescript-eslint/no-explicit-any */
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import Navbar from '../../../components/Navbar';
import TableContent from '../../../ui/TableContent';
import BackButton from '../../../ui/BackButton';
import ShowTableForm from '../../../ui/ShowTableForm';
import FormInput from '../../../ui/FormInput';
import SubmitButton from '../../../ui/SubmitButton';
import useRABHooks from '../../../hooks/RABHooks';
import { useAuth } from '../../../context/AuthContext';
import LoadingSpinner from '../../../ui/LoadingSpinner';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import TableHeader from '../../../ui/TableHeader';
import useScheduleHooks from '../../../hooks/ScheduleHooks';

export default function PPKJadwalPelaksanaanUpdateView() {
  const [showTender, setShowTender] = useState(false);
  const [search, setSearch] = useState("");
  const [tenderDataFilter, setTenderDataFilter] = useState<NewTenderProps[]>([]);
  const [selectedRab, setSelectedRab] = useState<RABProps | null>(null);
  const { rabData } = useRABHooks();
  const {
    setSelectedId,
    scheduleDataById,
    handleSchedulePut
  } = useScheduleHooks();
  const { user, loading } = useAuth();
  const location = useLocation();
  const [isDisabled, setIsDisabled] = useState(false);
  const { id } = useParams();
  const { reason } = location.state;

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

    const fetchSelected = async () => {
      if (!isDisabled && location.pathname.startsWith("/ppk/jadwal-pelaksanaan/lihat")) {
        setIsDisabled(true);
      }

      if (id) {
        setSelectedId(id)
      }

      if (!selectedRab) {
        setSelectedRab(scheduleDataById?.rab)
      }
    }

    fetchSelected();
  }, [showTender, selectedRab, location, isDisabled, id, setSelectedId, scheduleDataById]);

  useEffect(() => {
    const filteringDataTender = () => {
      const filter = rabData?.filter((item: any) => {
        const data = item?.tender_code?.toLowerCase().includes(search.toLowerCase());
        return data;
      });

      setTenderDataFilter(filter as any);
    }

    filteringDataTender();
  }, [search, rabData]);

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
      key: 'kode_tender',
      label: 'kode Tender'
    },
    {
      key: 'nama_paket',
      label: 'Nama Paket'
    },
  ];

  if (loading || !scheduleDataById) {
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
              <ShowTableForm disabled={isDisabled} tenderCode={selectedRab?.kode_tender ? selectedRab?.kode_tender : scheduleDataById?.rab?.tender?.tender_code} onClick={() => {
                if (!isDisabled) {
                  setShowTender(true);
                  setSelectedRab(null);
                }
              }} />

              <FormInput
                title='Tahun Anggaran'
                placeholder='Masukkan tahun anggaran (otomatis)'
                value={selectedRab?.fiscal_year ? selectedRab?.fiscal_year : scheduleDataById?.rab?.tender?.fiscal_year as any}
                disabled={true}
              />

              <FormInput
                title='Satuan Kerja'
                placeholder='Masukkan tahun satuan kerja (otomatis)'
                value={selectedRab?.satker_name ? selectedRab?.satker_name : scheduleDataById?.rab?.tender?.satker_name as any}
                disabled={true}
              />

              <FormInput
                title='Kode RUP'
                placeholder='Masukkan tahun kode RUP (otomatis)'
                value={selectedRab?.rup_code ? selectedRab?.rup_code : scheduleDataById?.rab?.tender?.rup_code as any}
                disabled={true}
              />

              <FormInput
                title='Lokasi Pekerjaan'
                placeholder='Masukkan lokasi pekerjaan (otomatis)'
                value={selectedRab?.work_location ? selectedRab?.work_location : scheduleDataById?.rab?.tender?.work_location as any}
                disabled={true}
                type='textarea'
              />

              <FormInput
                title='Program Kegiatan'
                placeholder='Masukkan program kegiatan'
                value={selectedRab?.program ? selectedRab?.program : scheduleDataById?.rab?.program as any}
                name='program'
                disabled={true}
              />

              <FormInput
                title='Kegiatan'
                placeholder='Masukkan kegiatan'
                value={selectedRab?.activity ? selectedRab?.activity : scheduleDataById?.rab?.activity as any}
                name='activity'
                disabled={true}
              />

              <FormInput
                title='Tanggal Awal'
                placeholder='Masukkan tanggal awal'
                value={selectedRab?.start_date ? selectedRab?.start_date : scheduleDataById?.rab?.start_date as any}
                name='start'
                disabled={true}
                type='date'
              />

              <FormInput
                title='Tanggal Akhir'
                placeholder='Masukkan tanggal akhir'
                value={selectedRab?.end_date ? selectedRab?.end_date : scheduleDataById?.rab?.end_date as any}
                name='end'
                disabled={true}
                type='date'
              />

              <FormInput
                title={`Alasan (Revisi ke- ${selectedRab?.revision_count ?? ""})`}
                placeholder='Alasan'
                value={selectedRab?.revision_text ? selectedRab?.revision_text : scheduleDataById?.revision_text as any}
                disabled={true}
                type='textarea'
              />
              <p className='font-poppins-medium text-gray-600 text-[14px]'></p>
            </div>
            {!isDisabled && (
              <SubmitButton text='Ubah Jadwal' onClick={() => handleSchedulePut(selectedRab as any, reason)} />
            )}
          </div>

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
                    <th colSpan={((scheduleDataById?.schedule_details as any)?.[0]?.schedule_weeks?.length ?? 0)} className="px-6 py-4 text-center font-poppins-semibold text-gray-800 text-sm bg-primary/5">
                      Minggu Pelaksanaan
                    </th>
                  </tr>
                  <tr className="bg-primary/5 border-b border-gray-200">
                    <th colSpan={3}></th>
                    {Array.from({ length: ((scheduleDataById?.schedule_details as any)?.[0]?.schedule_weeks?.length ?? 0) }).map((_, i) => (
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
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {(scheduleDataById?.schedule_details as any)?.length === 0 ? (
                    <tr>
                      <td
                        colSpan={((scheduleDataById?.schedule_details as any)?.[0]?.schedule_weeks?.length ?? 0) + 3}
                        className="px-6 py-12 text-center"
                      >
                        <div className="flex flex-col items-center gap-3">
                          <div className="text-gray-300">
                            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <p className="font-poppins-medium text-gray-500">Tidak ada data</p>
                          <p className="font-poppins-regular text-gray-400 text-sm">Jadwal pelaksanaan belum tersedia</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    (scheduleDataById?.schedule_details as any)?.map((item: any, index: any) => (
                      <tr
                        key={item.id || index}
                        className="hover:bg-primary/2 transition-all duration-200 border-b border-gray-100"
                      >
                        <td className="px-6 py-4 font-poppins-medium text-sm text-gray-800 max-w-xs">
                          <div className="truncate hover:text-clip" title={item.description}>
                            {item.description}
                          </div>
                        </td>
                        <td className="px-6 py-4 font-poppins-regular text-sm text-center">
                          <span className="inline-flex items-center justify-center px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-poppins-medium text-xs ring-1 ring-blue-200">
                            {item.number}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-poppins-regular text-sm text-center">
                          <span className="inline-flex items-center justify-center px-3 py-1 bg-amber-50 text-amber-700 rounded-full font-poppins-medium text-xs ring-1 ring-amber-200">
                            {item.weight}%
                          </span>
                        </td>
                        {item.schedule_weeks?.map((val: any, i: any) => (
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
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {(scheduleDataById?.schedule_details as any)?.length > 0 && (
              <div className="bg-linear-to-r from-primary/5 to-primary/2 px-6 py-4 border-t-2 border-primary/20 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div className="flex gap-8">
                  <div>
                    <p className="font-poppins-regular text-gray-600 text-sm">Total Baris</p>
                    <p className="font-poppins-bold text-primary text-lg">{(scheduleDataById?.schedule_details as any)?.length}</p>
                  </div>
                  <div>
                    <p className="font-poppins-regular text-gray-600 text-sm">Total Bobot</p>
                    <p className="font-poppins-bold text-primary text-lg">
                      {(scheduleDataById?.schedule_details as any)?.reduce((sum: any, item: any) => sum + item.weight, 0)}%
                    </p>
                  </div>
                </div>
                <div className="bg-white px-6 py-3 rounded-lg border-2 border-primary/20 shadow-sm">
                  <p className="font-poppins-regular text-gray-600 text-xs mb-1">Target Bobot</p>
                  <p className="font-poppins-bold text-primary text-lg">
                    {(scheduleDataById?.schedule_details as any)?.reduce((sum: any, item: any) => sum + item.weight, 0)}/100%
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