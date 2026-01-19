/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import Navbar from '../../../components/Navbar';
import BackButton from '../../../ui/BackButton';
import FormSelect from '../../../ui/FormSelect';
import ShowTableForm from '../../../ui/ShowTableForm';
import FormInput from '../../../ui/FormInput';
import FormUploadFile from '../../../ui/FormUploadFile';
import { useAuth } from '../../../context/AuthContext';
import LoadingSpinner from '../../../ui/LoadingSpinner';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import useUserHooks from '../../../hooks/UserHooks';
import useDataEntryHooks from '../../../hooks/DataEntryHooks';
import SubmitButton from '../../../ui/SubmitButton';

export default function PokjaLaporanPenjabatPengadaanUpdateView() {
    const { id } = useParams();
    const [metodePengadaan, setMetodePengadaan] = useState<any>("");
    const [showTender, setShowTender] = useState<any>('');
    const [selectedTender, setSelectedTender] = useState<NewTenderProps | any>(null);
    const { user, loading } = useAuth();
    const { listUser } = useUserHooks();
    const [userPPK, setUserPPK] = useState<UserProps[]>([]);
    const [isDisabled, setIsDisabled] = useState(false);
    const location = useLocation();
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

    useEffect(() => {
        const fetchtenderId = () => {
            if (id) {
                setSelectedId(id);
            }

            if (location.pathname.startsWith("/pokja/data-entry-penjabat-pengadaan/lihat/")) {
                setIsDisabled(true);
            }
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

        const filteringUserPPK = () => {
            const filteringData = listUser?.filter((item: UserProps) => {
                const filter = item.role_id === 2;
                return filter;
            });

            setUserPPK(filteringData);
        }

        fetchTender();
        filteringUserPPK();
        fetchtenderId();
    }, [selectedTender, showTender, listUser, id, setSelectedId, location]);

    const isEPurchasing = String(metodePengadaan ? metodePengadaan : dataEntryPengadaanById?.procurement_method?.toString()) === 'E-Purchasing V5' || String(metodePengadaan ? metodePengadaan : dataEntryPengadaanById?.procurement_method?.toString()) === 'E-Purchasing V6';
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

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h1 className="font-poppins-bold text-2xl text-gray-800 mb-8">
                            {isDisabled ? "Lihat" : "Ubah"} Laporan Penjabat Pengadaan
                        </h1>

                        <div className="space-y-8">
                            <div>
                                <h2 className="font-poppins-semibold text-lg text-gray-800 mb-4 pb-2 border-b-2 border-primary/20">
                                    1. TRANSAKSI INFORMASI
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <FormSelect disabled={isDisabled} title="Metode Pengadaan" name="" value={dataEntryPengadaanById?.procurement_method?.toString()} onChange={(e) => {
                                            setMetodePengadaan(e.target.value);
                                        }}>
                                            {metodePengadaanOptions.map((item, index) => (
                                                <option key={index} value={item.name}>{item.name}</option>
                                            ))}
                                        </FormSelect>
                                    </div>

                                    <div className="md:col-span-2">
                                        <ShowTableForm disabled={true} tenderCode={dataEntryPengadaanById?.tender_code} onClick={() => {
                                            if (!isDisabled) {
                                                setShowTender(true);
                                                setSelectedTender(null);
                                            }
                                        }} />
                                    </div>

                                    <FormInput disabled={true} title="Kode RUP" name="" value={dataEntryPengadaanById?.rup_code} placeholder="Otomatis terisi" />
                                    <FormInput disabled={true} title="Tahun Anggaran" name="" value={dataEntryPengadaanById?.fiscal_year.toString()} placeholder="Otomatis terisi" />

                                    <div className="md:col-span-2">
                                        <FormInput disabled={true} title="Satuan Kerja" name="" value={dataEntryPengadaanById?.satker_name} placeholder="Otomatis terisi" />
                                    </div>

                                    <div className="md:col-span-2">
                                        <FormInput disabled={true} title="Nama Paket" name="" value={dataEntryPengadaanById?.package_name?.toString()} placeholder="Otomatis terisi" />
                                    </div>

                                    <div className="md:col-span-2">
                                        <FormInput disabled={true} title="Tanggal Masuk" name="" value={dataEntryPengadaanById?.contact_initial?.toString()} placeholder="Otomatis terisi" />
                                    </div>

                                    <FormInput disabled={true} title="Sumber Dana" name="" value={dataEntryPengadaanById?.funding_source} placeholder="Otomatis terisi" />

                                    {!isEPurchasing && (
                                        <FormInput disabled={true} title="Jenis Pengadaan" name="" value={dataEntryPengadaanById?.procurement_type?.toString()} placeholder="Otomatis terisi" />
                                    )}
                                </div>
                            </div>

                            {isEPurchasing && (
                                <div>
                                    <h2 className="font-poppins-semibold text-lg text-gray-800 mb-4 pb-2 border-b-2 border-primary/20">
                                        2. REALISASI PAKET
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormInput disabled={true} title="Status Paket" name="" value={dataEntryPengadaanById?.package_status} placeholder="Otomatis terisi" />
                                        <FormInput disabled={true} title="Status Pengiriman" name="" value={dataEntryPengadaanById?.delivery_status} placeholder="Otomatis terisi" />
                                    </div>
                                </div>
                            )}

                            <div>
                                <h2 className="font-poppins-semibold text-lg text-gray-800 mb-4 pb-2 border-b-2 border-primary/20">
                                    {isEPurchasing ? '3' : '2'}. INFORMASI KEUANGAN
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormInput disabled={true} title="Nilai Pagu (Rp)" name="" value={dataEntryPengadaanById?.budget_value?.toString()} placeholder="Otomatis terisi" />
                                    <FormInput disabled={true} title="Nilai HPS (Rp)" name="" value={dataEntryPengadaanById?.hps_value?.toString()} placeholder="Otomatis terisi" />
                                </div>
                            </div>

                            <div>
                                <h2 className="font-poppins-semibold text-lg text-gray-800 mb-4 pb-2 border-b-2 border-primary/20">
                                    {isEPurchasing ? '4' : '3'}. DETAIL KONTRAK
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormInput disabled={true} title="Nomor Kontrak" name="" value={dataEntryPengadaanById?.contract_number?.toString()} placeholder="Otomatis terisi" />
                                    <FormInput disabled={true} title="Tanggal Kontrak" name="" value={dataEntryPengadaanById?.contract_date?.toString()} placeholder="Otomatis terisi" />
                                    <FormInput disabled={true} title="Nama PPK" name="" value={dataEntryPengadaanById?.ppk_name?.toString()} placeholder="Otomatis terisi" />
                                    <FormInput disabled={true} title="Jabatan PPK" name="" value={dataEntryPengadaanById?.ppk_position?.toString()} placeholder="Otomatis terisi" />
                                    <FormInput disabled={true} title="Nama Pimpinan Perusahaan" name="" value={dataEntryPengadaanById?.company_leader?.toString()} placeholder="Otomatis terisi" />
                                    <FormInput disabled={true} title="Jabatan Pimpinan" name="" value={dataEntryPengadaanById?.leader_position?.toString()} placeholder="Otomatis terisi" />
                                </div>
                            </div>

                            <div>
                                <h2 className="font-poppins-semibold text-lg text-gray-800 mb-4 pb-2 border-b-2 border-primary/20">
                                    {isEPurchasing ? '5' : '4'}. INFORMASI PEMENANG
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormInput disabled={true} title="Pemenang" name="" value={dataEntryPengadaanById?.winner_name?.toString()} placeholder="Otomatis terisi" />
                                    <FormInput disabled={true} title={isEPurchasing ? 'Nilai Total' : 'Nilai Penawaran'} name="" value={dataEntryPengadaanById?.total_value?.toString()} placeholder="Otomatis terisi" />
                                    <FormInput disabled={true} title="Nilai Negosiasi/Nilai SPK (Rp)" name="" value={dataEntryPengadaanById?.negotiation_value?.toString()} placeholder="Otomatis terisi" />
                                    <FormInput disabled={true} title="Nomor Telepon/HP" name="" value={dataEntryPengadaanById?.phone?.toString()} placeholder="Otomatis terisi" />
                                    <FormInput disabled={true} title="Email" name="" value={dataEntryPengadaanById?.email?.toString()} placeholder="Otomatis terisi" />
                                    <FormInput disabled={true} title="NPWP" name="" value={dataEntryPengadaanById?.npwp?.toString()} placeholder="Otomatis terisi" />
                                </div>
                            </div>

                            <div>
                                <h2 className="font-poppins-semibold text-lg text-gray-800 mb-4 pb-2 border-b-2 border-primary/20">
                                    {isEPurchasing ? '6' : '5'}. LOKASI & ALAMAT
                                </h2>
                                <div className="grid grid-cols-1 gap-6">
                                    <FormInput disabled={true} title="Alamat Pemenang" name="" value={dataEntryPengadaanById?.winner_address?.toString()} placeholder="Otomatis terisi" />
                                    <FormInput disabled={true} title="Lokasi Pekerjaan" name="" value={dataEntryPengadaanById?.work_location?.toString()} placeholder="Otomatis terisi" />
                                </div>
                            </div>

                            <div>
                                <h2 className="font-poppins-semibold text-lg text-gray-800 mb-4 pb-2 border-b-2 border-primary/20">
                                    {isEPurchasing ? '7' : '6'}. LAMPIRAN DAN CATATAN
                                </h2>
                                <div className="grid grid-cols-1 gap-6">
                                    <FormUploadFile disabled={isDisabled} value={dataEntryPengadaanById ? dataEntryPengadaanById.evidence_file : ''} title="Evidence/Bukti Laporan Hasil Pemilihan PP" name="file" onChange={handleChangeFileEntryPenjabatPengadaan} />
                                    <FormInput disabled={isDisabled} title="Catatan" type='textarea' name="note" value={note != "" ? note as any : dataEntryPengadaanById?.note} onChange={handleChangeEntryPenjabatPengadaan} placeholder="Catatan" />

                                    {!isEPurchasing && (
                                        <FormSelect disabled={isDisabled} title="Ditujukan ke PPK" name="ppk" value={selectedPPK ? selectedPPK : dataEntryPengadaanById?.selected_ppk_id?.toString()} onChange={handleChangeEntryPenjabatPengadaan}>
                                            {userPPK.map((item, index) => (
                                                <option key={index} value={item.id}>PPK - {item.fullname}</option>
                                            ))}
                                        </FormSelect>
                                    )}
                                </div>
                            </div>

                            {!isDisabled && (
                                <div className="flex justify-end gap-4 pt-4">
                                    <SubmitButton text='Simpan' onClick={() => handleEntryPenjabatPengadaanPut(metodePengadaan ? metodePengadaan : dataEntryPengadaanById?.procurement_method?.toString())} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}