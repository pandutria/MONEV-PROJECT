/* eslint-disable @typescript-eslint/no-explicit-any */
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import Navbar from '../../../components/Navbar';
import TableContent from '../../../ui/TableContent';
import BackButton from '../../../ui/BackButton';
import ShowTableForm from '../../../ui/ShowTableForm';
import FormInput from '../../../ui/FormInput';
import SubmitButton from '../../../ui/SubmitButton';
import { useAuth } from '../../../context/AuthContext';
import LoadingSpinner from '../../../ui/LoadingSpinner';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import TableHeader from '../../../ui/TableHeader';
import useScheduleHooks from '../../../hooks/ScheduleHooks';
import useRABHooks from '../../../hooks/RABHooks';
import WeekScheduleTable from '../../../ui/WeekScheduleTable';
import FormSelect from '../../../ui/FormSelect';

export default function PPKJadwalPelaksanaanUpdateView() {
  const [showTender, setShowTender] = useState(false);
  const [search, setSearch] = useState("");
  const [tahun, setTahun] = useState('');
  const [satuanKerja, setSatuanKerja] = useState('');
  const [selectedRab, setSelectedRab] = useState<any>(null);
  const [selectedRevision, setSelectedRevision] = useState<any>(null);

  const {
    setSelectedId,
    scheduleDataById,
    handleSchedulePut,
    scheduleData,
    revisionCount
  } = useScheduleHooks();
  const { rabData } = useRABHooks();
  const [rabDataFilter, setRabDataFilter] = useState<RABProps[]>([]);

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

      if (selectedRevision) {
        setSelectedId(Number(selectedRevision))
      } else {
        setSelectedId(id)
      }
    }

    fetchSelected();
  }, [showTender, selectedRab, location, isDisabled, id, setSelectedId, scheduleDataById, selectedRevision]);

  useEffect(() => {
    const filteringDataRab = () => {
      const dataFilter = rabData?.filter((item: RABProps) => {
        const searchFilter = search ? item?.data_entry?.nama_paket?.toString().toLowerCase().includes(search.toLowerCase()) : true;
        const isExisting = scheduleData.some(
          schedule => schedule?.rab?.data_entry?.kode_paket == item?.data_entry.kode_paket
        );

        return searchFilter && !isExisting;
      });

      setRabDataFilter(dataFilter);
    }

    filteringDataRab();
  }, [search, satuanKerja, tahun, rabData, scheduleData]);

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
              onTahunChange={(item) => setTahun(item)}
              onSatuanKerjaChange={(item) => setSatuanKerja(item)}
              onSearchChange={(item) => setSearch(item)}
              showTahunQuery={false}
            />
            <div className="overflow-y-auto max-h-[70vh] w-full">
              <TableContent
                columns={columns}
                data={rabDataFilter}
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
              {isDisabled ? "Lihat" : "Ubah"} Jadwal Pelaksanaan
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-poppins-regular">
              <ShowTableForm disabled={isDisabled} tenderCode={selectedRab?.data_entry?.kode_paket ? selectedRab?.data_entry?.kode_paket : scheduleDataById?.rab?.data_entry?.kode_paket} onClick={() => {
                if (!isDisabled) {
                  setShowTender(true);
                  setSelectedRab(null);
                }
              }} />

              <FormInput
                title='Tahun Anggaran'
                placeholder='Masukkan tahun anggaran (otomatis)'
                value={selectedRab?.data_entry?.tahun_anggaran ? selectedRab?.data_entry?.tahun_anggaran : scheduleDataById?.rab?.data_entry?.tahun_anggaran}
                disabled={true}
              />

              <FormInput
                title='Satuan Kerja'
                placeholder='Masukkan tahun satuan kerja (otomatis)'
                value={selectedRab?.data_entry?.satuan_kerja ? selectedRab?.data_entry?.satuan_kerja : scheduleDataById?.rab?.data_entry?.satuan_kerja}
                disabled={true}
              />

              <FormInput
                title='Kode RUP'
                placeholder='Masukkan tahun kode RUP (otomatis)'
                value={selectedRab?.data_entry?.kode_rup ? selectedRab?.data_entry?.kode_rup : scheduleDataById?.rab?.data_entry?.kode_rup}
                disabled={true}
              />

              <FormInput
                title='Lokasi Pekerjaan'
                placeholder='Masukkan lokasi pekerjaan (otomatis)'
                value={selectedRab?.data_entry?.lokasi_pekerjaan ? selectedRab?.data_entry?.lokasi_pekerjaan : scheduleDataById?.rab?.data_entry?.lokasi_pekerjaan}
                disabled={true}
                type='textarea'
              />

              <FormInput
                title='Program Kegiatan'
                placeholder='Masukkan program kegiatan'
                value={selectedRab?.program ? selectedRab?.program : scheduleDataById?.rab?.program}
                name='program'
                disabled={true}
              />

              <FormInput
                title='Kegiatan'
                placeholder='Masukkan kegiatan'
                value={selectedRab?.data_entry?.nama_paket ? selectedRab?.data_entry?.nama_paket : scheduleDataById?.rab?.data_entry?.nama_paket}
                name='activity'
                disabled={true}
              />

              <FormInput
                title='Tanggal Awal'
                placeholder='Masukkan tanggal awal'
                value={selectedRab?.tanggal_mulai ? selectedRab?.tanggal_mulai : scheduleDataById?.rab?.tanggal_mulai}
                name='start'
                disabled={true}
                type='date'
              />

              <FormInput
                title='Tanggal Akhir'
                placeholder='Masukkan tanggal akhir'
                value={selectedRab?.tanggal_akhir ? selectedRab?.tanggal_akhir : scheduleDataById?.rab?.tanggal_akhir}
                name='end'
                disabled={true}
                type='date'
              />

              <FormInput
                title={`Alasan (Revisi ke- ${scheduleDataById?.alasan_count ?? ""})`}
                placeholder='Alasan'
                value={scheduleDataById?.alasan_text?.toString()}
                disabled={true}
                type='textarea'
              />

              {isDisabled && (
                <FormSelect value={selectedRevision} onChange={(e) => setSelectedRevision(e.target.value)} title={`Revisi ke - ${revisionCount[revisionCount.length - 1]?.alasan_count}`}>
                  {revisionCount.map((item, index) => (
                    <option key={index} value={item.rab_id}>{item?.alasan_count}</option>
                  ))}
                </FormSelect>
              )}
            </div>
            {!isDisabled && (
              <SubmitButton text='Ubah Jadwal' onClick={() => handleSchedulePut(selectedRab as any, scheduleDataById.schedule_group_id, scheduleDataById.items as any, reason)} />
            )}
          </div>

          <WeekScheduleTable
            dataFile={scheduleDataById.items as any}
            totalMinggu={
              Math.max(
                ...(scheduleDataById?.items?.map(
                  (item: any) => item.schedule_weeks?.length || 0
                ) ?? [0])
              )
            }
            showDelete={false}
            handleDeleteRow={null as any}
          />
        </div>
      </div>
    </div>
  );
}