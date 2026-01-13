/* eslint-disable @typescript-eslint/no-explicit-any */
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import Navbar from '../../../components/Navbar';
import BackButton from '../../../ui/BackButton';
import FormSelect from '../../../ui/FormSelect';
import ShowTableForm from '../../../ui/ShowTableForm';
import TableContent from '../../../ui/TableContent';
import FormInput from '../../../ui/FormInput';
import FormUploadFile from '../../../ui/FormUploadFile';
import { useAuth } from '../../../context/AuthContext';
import LoadingSpinner from '../../../ui/LoadingSpinner';
import { Navigate, useParams } from 'react-router-dom';
import useUserHooks from '../../../hooks/UserHooks';
import useTenderInaprocHooks from '../../../hooks/TenderInaprocHooks';
import useDataEntryHooks from '../../../hooks/DataEntryHooks';
import SubmitButton from '../../../ui/SubmitButton';
import TableHeader from '../../../ui/TableHeader';

export default function PokjaLaporanPenjabatPengadaanUpdate() {
    const { id } = useParams();
    const [metodePengadaan, setMetodePengadaan] = useState<any>("");
    const { tenderData } = useTenderInaprocHooks();
    const [tenderDataFilter, setTenderDataFilter] = useState<TenderProps[]>([]);
    const [showTender, setShowTender] = useState<any>('');
    const [selectedTender, setSelectedTender] = useState<TenderProps | any>(null);
    const { user, loading } = useAuth();
    const { listUser } = useUserHooks();
    const [userPPK, setUserPPK] = useState<UserProps[]>([]);
    const [search, setSearch] = useState("");
    const {
        selectedPPK,
        note,
        handleEntryPenjabatPengadaanPut,
        handleChangeEntryPenjabatPengadaan,
        handleChangeFileEntryPenjabatPengadaan,
        setSelectedId,
        dataEntryPengadaanById
    } = useDataEntryHooks();

    const metodePengadaanOptions = [
        { id: 1, name: 'Pengadaan Langsung' },
        { id: 2, name: 'E-Purchasing V5' },
        { id: 3, name: 'E-Purchasing V6' }
    ];

    const tenderColumns = [
        {
            key: "id",
            label: "No"
        },
        {
            key: "tender_code",
            label: "Kode Tender"
        },
        {
            key: "rup_code",
            label: "Kode RUP"
        },
        {
            key: "fiscal_year",
            label: "Tahun Anggaran"
        },
        {
            key: "satker_name",
            label: "Satuan Kerja"
        },
        {
            key: "rup_name",
            label: "Nama Paket"
        },
        {
            key: "funding_source",
            label: "Sumber Dana"
        },
    ]

    useEffect(() => {
        const fetchtenderId = () => {
            setSelectedId(id);
        }

        const fetchTender = () => {
            if (showTender) {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        }

        const filteringDataTender = () => {
            const filter = tenderData?.filter((item: TenderProps) => {
                const data = item?.tender_code?.toLowerCase().includes(search.toLowerCase());
                return data;
            });

            setTenderDataFilter(filter);
        }

        const filteringUserPPK = () => {
            const filteringData = listUser?.filter((item: UserProps) => {
                const filter = item.role_id === 2;
                return filter;
            });

            setUserPPK(filteringData);
        }

        fetchTender();
        filteringUserPPK();
        filteringDataTender();
        fetchtenderId();
    }, [selectedTender, showTender, listUser, search, tenderData, id, setSelectedId]);

    const isEPurchasing = String(metodePengadaan) === 'E-Purchasing V5' || String(metodePengadaan) === 'E-Purchasing V6';
    const finalTender = selectedTender && Object.keys(selectedTender).length > 0 ? selectedTender : dataEntryPengadaanById;


    if (loading) {
        return <LoadingSpinner />
    }

    if (!user || user.role.name != "pokja") {
        return <Navigate to="/" replace />
    }
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="pt-24 pb-12 px-4 md:px-8" data-aos="fade-up" data-aos-duration="1000">
                <div className="max-w-7xl mx-auto">
                    <BackButton />

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
                                        columns={tenderColumns}
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

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h1 className="font-poppins-bold text-2xl text-gray-800 mb-8">
                            Ubah Laporan Penjabat Pengadaan
                        </h1>

                        <div className="space-y-8">
                            <div>
                                <h2 className="font-poppins-semibold text-lg text-gray-800 mb-4 pb-2 border-b-2 border-primary/20">
                                    1. TRANSAKSI INFORMASI
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <FormSelect title="Metode Pengadaan" name="" value={metodePengadaan ? metodePengadaan : dataEntryPengadaanById?.procurement_method?.toString()} onChange={(e) => {
                                            setMetodePengadaan(e.target.value);
                                        }}>
                                            {metodePengadaanOptions.map((item, index) => (
                                                <option key={index} value={item.name}>{item.name}</option>
                                            ))}
                                        </FormSelect>
                                    </div>

                                    <div className="md:col-span-2">
                                        <ShowTableForm tenderCode={selectedTender?.tender_code ? selectedTender.tender_code : dataEntryPengadaanById?.tender_code} onClick={() => {
                                            setShowTender(true);
                                            setSelectedTender(null);
                                        }} />
                                    </div>

                                    <FormInput title="Kode RUP" name="" value={selectedTender?.rup_code ? selectedTender?.rup_code : dataEntryPengadaanById?.rup_code} placeholder="Otomatis terisi" disabled={true} />
                                    <FormInput title="Tahun Anggaran" name="" value={selectedTender?.fiscal_year ? selectedTender?.fiscal_year : dataEntryPengadaanById?.fiscal_year} placeholder="Otomatis terisi" disabled={true} />

                                    <div className="md:col-span-2">
                                        <FormInput title="Satuan Kerja" name="" value={selectedTender?.satker_name ? selectedTender.satker_name : dataEntryPengadaanById?.satker_name} placeholder="Otomatis terisi" disabled={true} />
                                    </div>

                                    <div className="md:col-span-2">
                                        <FormInput title="Nama Paket" name="" value={selectedTender?.rup_name ? selectedTender?.rup_name : dataEntryPengadaanById?.rup_name} placeholder="Otomatis terisi" disabled={true} />
                                    </div>

                                    <div className="md:col-span-2">
                                        <FormInput title="Tanggal Masuk" name="" value={selectedTender?.order_date ? selectedTender?.order_date : dataEntryPengadaanById?.order_date} placeholder="Otomatis terisi" disabled={true} />
                                    </div>

                                    <FormInput title="Sumber Dana" name="" value={selectedTender?.funding_source ? selectedTender?.funding_source : dataEntryPengadaanById?.funding_source} placeholder="Otomatis terisi" disabled={true} />

                                    {!isEPurchasing && (
                                        <FormInput title="Jenis Pengadaan" name="" value={selectedTender?.procurement_type ? selectedTender?.procurement_type : dataEntryPengadaanById?.procurement_type} placeholder="Otomatis terisi" disabled={true} />
                                    )}
                                </div>
                            </div>

                            {isEPurchasing && (
                                <div>
                                    <h2 className="font-poppins-semibold text-lg text-gray-800 mb-4 pb-2 border-b-2 border-primary/20">
                                        2. REALISASI PAKET
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormInput title="Status Paket" name="" value={selectedTender?.package_status ? selectedTender?.package_status : dataEntryPengadaanById?.package_status} placeholder="Otomatis terisi" disabled={true} />
                                        <FormInput title="Status Pengiriman" name="" value={selectedTender?.delivery_status ? selectedTender?.delivery_status : dataEntryPengadaanById?.delivery_status} placeholder="Otomatis terisi" disabled={true} />
                                    </div>
                                </div>
                            )}

                            <div>
                                <h2 className="font-poppins-semibold text-lg text-gray-800 mb-4 pb-2 border-b-2 border-primary/20">
                                    {isEPurchasing ? '3' : '2'}. INFORMASI KEUANGAN
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormInput title="Nilai Pagu (Rp)" name="" value={selectedTender?.budget_value ? selectedTender?.budget_value : dataEntryPengadaanById?.budget_value?.toString()} placeholder="Otomatis terisi" disabled={true} />
                                    <FormInput title="Nilai HPS (Rp)" name="" value={selectedTender?.hps_value ? selectedTender?.hps_value.toString() : dataEntryPengadaanById?.hps_value?.toString()} placeholder="Otomatis terisi" disabled={true} />
                                </div>
                            </div>

                            <div>
                                <h2 className="font-poppins-semibold text-lg text-gray-800 mb-4 pb-2 border-b-2 border-primary/20">
                                    {isEPurchasing ? '4' : '3'}. DETAIL KONTRAK
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormInput title="Nomor Kontrak" name="" value={selectedTender?.contract_number?.toString() ? selectedTender?.contract_number : dataEntryPengadaanById?.contract_number} placeholder="Otomatis terisi" disabled={true} />
                                    <FormInput title="Tanggal Kontrak" name="" value={selectedTender?.contract_date?.toString() ? selectedTender?.contract_date : dataEntryPengadaanById?.contract_date} placeholder="Otomatis terisi" disabled={true} />
                                    <FormInput title="Nama PPK" name="" value={selectedTender?.ppk_name?.toString()} placeholder="Otomatis terisi" disabled={true} />
                                    <FormInput title="Jabatan PPK" name="" value={selectedTender?.ppk_position?.toString() ? selectedTender?.ppk_position : dataEntryPengadaanById?.ppk_position} placeholder="Otomatis terisi" disabled={true} />
                                    <FormInput title="Nama Pimpinan Perusahaan" name="" value={selectedTender?.company_leader?.toString() ? selectedTender?.company_leader : dataEntryPengadaanById?.company_leader} placeholder="Otomatis terisi" disabled={true} />
                                    <FormInput title="Jabatan Pimpinan" name="" value={selectedTender?.leader_position?.toString() ? selectedTender?.leader_position : dataEntryPengadaanById?.leader_position} placeholder="Otomatis terisi" disabled={true} />
                                </div>
                            </div>

                            <div>
                                <h2 className="font-poppins-semibold text-lg text-gray-800 mb-4 pb-2 border-b-2 border-primary/20">
                                    {isEPurchasing ? '5' : '4'}. INFORMASI PEMENANG
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormInput title="Pemenang" name="" value={selectedTender?.winner_name ? selectedTender?.winner_name : dataEntryPengadaanById?.winner_name} placeholder="Otomatis terisi" disabled={true} />
                                    <FormInput title={isEPurchasing ? 'Nilai Total' : 'Nilai Penawaran'} name="" value={selectedTender?.total_value ? selectedTender?.total_value.toString() : dataEntryPengadaanById?.total_value} placeholder="Otomatis terisi" disabled={true} />
                                    <FormInput title="Nilai Negosiasi/Nilai SPK (Rp)" name="" value={selectedTender?.negotiation_value ? selectedTender?.negotiation_value.toString() : dataEntryPengadaanById?.negotiation_value?.toString()} placeholder="Otomatis terisi" disabled={true} />
                                    <FormInput title="Nomor Telepon/HP" name="" value={selectedTender?.phone ? selectedTender?.phone : dataEntryPengadaanById?.phone?.toString()} placeholder="Otomatis terisi" disabled={true} />
                                    <FormInput title="Email" name="" value={selectedTender?.email ? selectedTender?.email : dataEntryPengadaanById?.email?.toString()} placeholder="Otomatis terisi" disabled={true} />
                                    <FormInput title="NPWP" name="" value={selectedTender?.npwp ? selectedTender?.npwp : dataEntryPengadaanById?.npwp} placeholder="Otomatis terisi" disabled={true} />
                                </div>
                            </div>

                            <div>
                                <h2 className="font-poppins-semibold text-lg text-gray-800 mb-4 pb-2 border-b-2 border-primary/20">
                                    {isEPurchasing ? '6' : '5'}. LOKASI & ALAMAT
                                </h2>
                                <div className="grid grid-cols-1 gap-6">
                                    <FormInput title="Alamat Pemenang" name="" value={selectedTender?.winner_address ? selectedTender?.winner_address : dataEntryPengadaanById?.winner_address} placeholder="Otomatis terisi" disabled={true} />
                                    <FormInput title="Lokasi Pekerjaan" name="" value={selectedTender?.work_location ? selectedTender?.work_location : dataEntryPengadaanById?.work_location} placeholder="Otomatis terisi" disabled={true} />
                                </div>
                            </div>

                            <div>
                                <h2 className="font-poppins-semibold text-lg text-gray-800 mb-4 pb-2 border-b-2 border-primary/20">
                                    {isEPurchasing ? '7' : '6'}. LAMPIRAN DAN CATATAN
                                </h2>
                                <div className="grid grid-cols-1 gap-6">
                                    <FormUploadFile value={dataEntryPengadaanById ? dataEntryPengadaanById.evidence_file : ''} title="Evidence/Bukti Laporan Hasil Pemilihan PP" name="file" onChange={handleChangeFileEntryPenjabatPengadaan} />
                                    <FormInput title="Catatan" type='textarea' name="note" value={note ? note as any : dataEntryPengadaanById?.note} onChange={handleChangeEntryPenjabatPengadaan} placeholder="Catatan" />

                                    {!isEPurchasing && (
                                        <FormSelect title="Ditujukan ke PPK" name="ppk" value={selectedPPK ? selectedPPK as any : dataEntryPengadaanById?.selected_ppk_id} onChange={handleChangeEntryPenjabatPengadaan}>
                                            {userPPK.map((item, index) => (
                                                <option key={index} value={item.id}>PPK - {item.fullname}</option>
                                            ))}
                                        </FormSelect>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end gap-4 pt-4">
                                <SubmitButton text='Simpan' onClick={() => handleEntryPenjabatPengadaanPut(finalTender, metodePengadaan)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}