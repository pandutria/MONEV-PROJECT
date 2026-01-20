/* eslint-disable @typescript-eslint/no-explicit-any */
import {  X } from 'lucide-react';
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
import FormatRupiah from '../../../utils/FormatRupiah';
import useNewTenderInaprocHooks from '../../../hooks/NewTenderInaprocHooks';
import FormSelect from '../../../ui/FormSelect';

export default function PPKRencanaAnggaranUpdateView() {
  const [showTender, setShowTender] = useState(false);
  const [search, setSearch] = useState("");
  const [tenderDataFilter, setTenderDataFilter] = useState<NewTenderProps[]>([]);
  const [selectedTender, setSelectedTender] = useState<NewTenderProps | any>(null);
  const location = useLocation();
  const [isDisabled, setIsDisabled] = useState(false);
  const {
    handleRABPut,
    handleChangeRAB,
    program,
    activity,
    startDate,
    endDate,
    revisionCount
  } = useRABHooks();
  const { user, loading } = useAuth();
  const { newTenderInaprocHooks } = useNewTenderInaprocHooks();
  const { setSelectedId, rabDataByid } = useRABHooks();
  const { id } = useParams();
  const { reason } = location.state;
  const [selectedRevision, setSelectedRevision] = useState<any>(null);

  useEffect(() => {
    const renderShowtender = () => {
      if (showTender) {
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
      const filter = newTenderInaprocHooks?.filter((item: NewTenderProps) => {
        const data = item?.kd_tender?.toString()?.toLowerCase().includes(search.toLowerCase());
        return data;
      });

      setTenderDataFilter(filter);
    }

    const fetchIsPreview = () => {
      if (location.pathname.startsWith("/ppk/rencana-anggaran/lihat")) {
        setIsDisabled(true);
      }
    }

    if (id) { 
      setSelectedId(id)
    }

    filteringDataTender();
    fetchIsPreview();
    renderShowtender();
  }, [showTender, selectedTender, search, newTenderInaprocHooks, location, isDisabled, setSelectedId, id, rabDataByid]);

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
      key: 'nama_satker',
      label: 'Satuan Kerja'
    },
    {
      key: 'kd_rup',
      label: 'Kode RUP'
    },
    {
      key: 'kd_tender',
      label: 'kode Tender'
    },
    {
      key: 'nama_paket',
      label: 'Nama Paket'
    },
  ];

  if (loading || newTenderInaprocHooks.length === 0) {
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
              <ShowTableForm disabled={isDisabled} tenderCode={selectedTender?.kode_tender ? selectedTender.kode_tender : rabDataByid?.kode_tender} onClick={() => {
                if (!isDisabled) {
                  setShowTender(true);
                  setSelectedTender(null);
                }
              }} />

              <FormInput
                title='Tahun Anggaran'
                placeholder='Masukkan tahun anggaran (otomatis)'
                value={selectedTender?.tahun_anggaran ? selectedTender?.tahun_anggaran : rabDataByid?.tahun_anggaran}
                disabled={true}
              />

              <FormInput
                title='Satuan Kerja'
                placeholder='Masukkan tahun satuan kerja (otomatis)'
                value={selectedTender?.satuan_kerja ? selectedTender?.satuan_kerja : rabDataByid?.satuan_kerja}
                disabled={true}
              />

              <FormInput
                title='Kode RUP'
                placeholder='Masukkan tahun kode RUP (otomatis)'
                value={selectedTender?.kode_rup ? selectedTender?.kode_rup : rabDataByid?.kode_rup}
                disabled={true}
              />

              <FormInput
                title='Lokasi Pekerjaan'
                placeholder='Lokasi pekerjaan (otomatis)'
                value={selectedTender?.lokasi_pekerjaan ? selectedTender?.lokasi_pekerjaan : rabDataByid?.lokasi_pekerjaan}
                disabled={true}
                type='textarea'
              />

              <FormInput
                title='Program Kegiatan'
                placeholder='Masukkan program kegiatan'
                value={program ? program : rabDataByid?.program as any}
                name='program'
                onChange={handleChangeRAB}
                disabled={isDisabled}
              />

              <FormInput
                title='Kegiatan'
                placeholder='Masukkan kegiatan'
                value={activity ? activity : rabDataByid?.activity as any}
                name='activity'
                onChange={handleChangeRAB}
                disabled={isDisabled}
              />

              <FormInput
                title='Tanggal Awal'
                placeholder='Masukkan tanggal awal'
                value={startDate ? startDate : rabDataByid?.start_date as any}
                name='start'
                onChange={handleChangeRAB}
                disabled={isDisabled}
                type='date'
              />

              <FormInput
                title='Tanggal Akhir'
                placeholder='Masukkan tanggal akhir'
                value={endDate ? endDate : rabDataByid?.end_date as any}
                name='end'
                onChange={handleChangeRAB}
                disabled={isDisabled}
                type='date'
              />

              <FormInput
                title='Alasan'
                placeholder='Alasan'
                value={rabDataByid?.revision_text as any}
                disabled={true}
                type='textarea'
              />  

              <FormSelect value={selectedRevision} onChange={(e) => setSelectedRevision(e.target.value)} title={`Revisi ke - ${selectedRevision ? selectedRevision : revisionCount[revisionCount.length - 1].revisi}`}>
                {revisionCount.map((item, index) => (
                  <option key={index} value={item.revisi}>{item.revisi}</option>
                ))}
              </FormSelect>
            </div>

            {!isDisabled && (
              <SubmitButton text='Perbarui RAB' onClick={() => handleRABPut(selectedTender, rabDataByid as any, reason)} />
            )}
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
                  {rabDataByid?.rab_details?.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-8 text-center font-poppins text-gray-500"
                      >
                        Tidak ada data
                      </td>
                    </tr>
                  ) : (
                    rabDataByid?.rab_details?.map((item: RABDetailProps, index: any) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td className="px-6 py-4 font-poppins text-sm text-gray-700">
                          {item.description}
                        </td>
                        <td className="px-6 py-4 font-poppins text-sm text-gray-700">
                          {item.unit}
                        </td>
                        <td className="px-6 py-4 font-poppins text-sm text-gray-700">
                          {item.volume}
                        </td>
                        <td className="px-6 py-4 font-poppins text-sm text-gray-700">
                          {FormatRupiah(item.unit_price)}
                        </td>
                        <td className="px-6 py-4 font-poppins text-sm text-gray-700">
                          {FormatRupiah(item.total)}
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