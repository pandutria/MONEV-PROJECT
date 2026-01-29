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
import FormSelect from '../../../ui/FormSelect';
import useDataEntryHooks from '../../../hooks/DataEntryHooks';
import RabDetailTable from '../../../ui/RabDetailTable';

export default function PPKRencanaAnggaranUpdateView() {
  const [showTender, setShowTender] = useState(false);
  const [search, setSearch] = useState("");
  const [tenderDataFilter, setTenderDataFilter] = useState<DataEntryProps[]>([]);
  const [selectedTender, setSelectedTender] = useState<DataEntryProps | any>(null);

  const location = useLocation();
  const [isDisabled, setIsDisabled] = useState(false);
  const {
    rabData,
    handleRABPut,
    handleChangeRAB,
    program,
    startDate,
    endDate,
    revisionCount,
    rabDataByid,
    setSelectedId
  } = useRABHooks();
  const { user, loading } = useAuth();

  const { dataEntryPengadaan } = useDataEntryHooks();
  const { id } = useParams();
  const { reason } = location.state;
  const [selectedRevision, setSelectedRevision] = useState<any>(null);

  useEffect(() => {
    const renderShowtender = () => {
      if (showTender) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = "auto"
        setShowTender(false)
      }
    }

    const filteringDataTender = () => {
      const filter = dataEntryPengadaan?.filter((item: DataEntryProps) => {
        const isGroup = item?.tipe?.includes("Kelompok");
        const isUser = item?.selected_ppk_id === user?.id;
        const data = item?.kode_paket?.toString().toLowerCase().includes(search.toLowerCase());

        const isExisting = rabData?.some(
          rab => String(rab?.data_entry?.kode_paket) == String(item?.kode_paket)
        );

        return data && !isExisting && isGroup && isUser;
      });

      setTenderDataFilter(filter);
    }

    filteringDataTender();
    renderShowtender();
  }, [showTender, selectedTender, search, dataEntryPengadaan, location, isDisabled, rabDataByid, rabData, user]);

  useEffect(() => {
    const fetchIsPreview = () => {
      if (location.pathname.startsWith("/ppk/rencana-anggaran/lihat")) {
        setIsDisabled(true);
      }

      if (selectedRevision) {
        setSelectedId(selectedRevision);
      } else {
        setSelectedId(id);
      }
    }

    fetchIsPreview();
  }, [id, location, selectedRevision, setSelectedId, revisionCount]);

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

  if (loading || !rabDataByid) {
    return <LoadingSpinner />
  }

  if (!user || user.role.name != "ppk") {
    return <Navigate to="/" replace />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {showTender && (
        <div className="fixed inset-0 h-screen flex justify-center items-center bg-black/20 z-20">
          <div className="bg-white p-4 rounded-lg flex flex-col max-w-[90vw] max-h-[70vh] gap-4 relative">
            <div className="fixed top-4 right-4 cursor-pointer text-primary" onClick={() => setShowTender(false)}>
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
          <BackButton type='custom' link='/ppk/rencana-anggaran' />
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h1 className="font-poppins-bold text-2xl text-gray-800 mb-6">
              {isDisabled ? "Lihat" : "Ubah"} Rencana Anggaran Biaya
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-poppins-regular">
              <ShowTableForm disabled={isDisabled} tenderCode={selectedTender?.kode_paket ? selectedTender.kode_paket : rabDataByid?.data_entry.kode_paket} onClick={() => {
                if (!isDisabled) {
                  setShowTender(true);
                  setSelectedTender(null);
                }
              }} />

              <FormInput
                title='Tahun Anggaran'
                placeholder='Masukkan tahun anggaran (otomatis)'
                value={selectedTender?.tahun_anggaran ? selectedTender?.tahun_anggaran : rabDataByid?.data_entry?.tahun_anggaran}
                disabled={true}
              />

              <FormInput
                title='Satuan Kerja'
                placeholder='Masukkan tahun satuan kerja (otomatis)'
                value={selectedTender?.satuan_kerja ? selectedTender?.satuan_kerja : rabDataByid?.data_entry?.satuan_kerja}
                disabled={true}
              />

              <FormInput
                title='Kode RUP'
                placeholder='Masukkan tahun kode RUP (otomatis)'
                value={selectedTender?.kode_rup ? selectedTender?.kode_rup : rabDataByid?.data_entry?.kode_rup}
                disabled={true}
              />

              <FormInput
                title='Lokasi Pekerjaan'
                placeholder='Lokasi pekerjaan (otomatis)'
                value={selectedTender?.lokasi_pekerjaan ? selectedTender?.lokasi_pekerjaan : rabDataByid?.data_entry?.lokasi_pekerjaan}
                disabled={true}
                type='textarea'
              />

              <FormInput
                title='Program Kegiatan'
                placeholder='Masukkan program kegiatan'
                value={program ? program : rabDataByid?.program}
                name='program'
                onChange={handleChangeRAB}
                disabled={isDisabled}
              />

              <FormInput
                title='Kegiatan'
                placeholder='Masukkan kegiatan'
                value={selectedTender?.nama_paket ? selectedTender?.nama_paket : rabDataByid?.data_entry?.nama_paket}
                name='activity'
                onChange={handleChangeRAB}
                disabled={isDisabled}
              />

              <FormInput
                title='Tanggal Awal'
                placeholder='Masukkan tanggal awal'
                value={startDate ? startDate : rabDataByid?.tanggal_mulai}
                name='start'
                onChange={handleChangeRAB}
                disabled={isDisabled}
                type='date'
              />

              <FormInput
                title='Tanggal Akhir'
                placeholder='Masukkan tanggal akhir'
                value={endDate ? endDate : rabDataByid?.tanggal_akhir}
                name='end'
                onChange={handleChangeRAB}
                disabled={isDisabled}
                type='date'
              />

              <FormInput
                title='Alasan'
                placeholder='Alasan'
                value={rabDataByid?.alasan_text}
                disabled={true}
                type='textarea'
              />

              {isDisabled && (
                <FormSelect value={selectedRevision} onChange={(e) => setSelectedRevision(e.target.value)} title={`Revisi ke - ${revisionCount?.[revisionCount.length - 1]?.alasan_count}`}>
                  {revisionCount.map((item, index) => (
                    <option key={index} value={item?.rab_id}>{item?.alasan_count}</option>
                  ))}
                </FormSelect>
              )}
            </div>

            {!isDisabled && (
              <SubmitButton text='Perbarui RAB' onClick={() => handleRABPut(selectedTender ? selectedTender.id : rabDataByid?.data_entry.id, rabDataByid as any, reason)} />
            )}
          </div>

          <RabDetailTable
            dataFile={rabDataByid?.rab_details as any}
            handleDeleteRow={null as any}
            showDelete={false}
          />
        </div>
      </div>
    </div>
  );
}