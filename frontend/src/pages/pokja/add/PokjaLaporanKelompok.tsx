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
import { Navigate } from 'react-router-dom';
import useUserHooks from '../../../hooks/UserHooks';
import useTenderInaprocHooks from '../../../hooks/TenderInaprocHooks';
import useDataEntryHooks from '../../../hooks/DataEntryHooks';
import SubmitButton from '../../../ui/SubmitButton';
import TableHeader from '../../../ui/TableHeader';

export default function PokjaLaporanKelompokAdd() {
    const [metodePengadaan, setMetodePengadaan] = useState<any>("");
    const { tenderData } = useTenderInaprocHooks();
    const [tenderDataFilter, setTenderDataFilter] = useState<TenderProps[]>([]);
    const [showTender, setShowTender] = useState<any>('');
    const [selectedTender, setSelectedTender] = useState<TenderProps | any>(null);
    const { user, loading } = useAuth();
    const { listUser } = useUserHooks();
    const [search, setSearch] = useState("");
    const {
        note,
        handleEntryPenjabatPengadaanPost,
        handleChangeEntryPenjabatPengadaan,
        handleChangeFileEntryPenjabatPengadaan
    } = useDataEntryHooks();

    const metodePengadaanOptions = [
        {
            id: 1,
            name: "Kontes"
        },
        {
            id: 2,
            name: "Penunjukan Langsung"
        },
        {
            id: 3,
            name: "Sayembara"
        },
        {
            id: 4,
            name: "Seleksi"
        },
        {
            id: 5,
            name: "Tender"
        },
        {
            id: 6,
            name: "Tender Cepat"
        },
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
            key: "package_name",
            label: "Nama Paket"
        },
        {
            key: "funding_source",
            label: "Sumber Dana"
        },
    ]

    useEffect(() => {
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

        fetchTender();
        filteringDataTender();
    }, [selectedTender, showTender, listUser, search, tenderData]);

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
                            Tambah Laporan Kelompok Kerja
                        </h1>

                        <div className="space-y-8">
                            <div>
                                <h2 className="font-poppins-semibold text-lg text-gray-800 mb-4 pb-2 border-b-2 border-primary/20">
                                    1. TRANSAKSI INFORMASI
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <FormSelect title="Metode Pengadaan" name="" value={String(metodePengadaan)} onChange={(e) => {
                                            setMetodePengadaan(e.target.value);
                                        }}>
                                            {metodePengadaanOptions.map((item, index) => (
                                                <option key={index} value={item.name}>{item.name}</option>
                                            ))}
                                        </FormSelect>
                                    </div>

                                    <div className="md:col-span-2">
                                        <ShowTableForm tenderCode={selectedTender ? selectedTender.tender_code : "Kode tender / No Tender"} onClick={() => {
                                            setShowTender(true);
                                            setSelectedTender(null);
                                        }} />
                                    </div>

                                    <FormInput title="Kode RUP" name="" value={selectedTender?.rup_code} placeholder="Otomatis terisi" disabled={true} />
                                    <FormInput title="Tahun Anggaran" name="" value={selectedTender?.fiscal_year.toString()} placeholder="Otomatis terisi" disabled={true} />

                                    <div className="md:col-span-2">
                                        <FormInput title="Satuan Kerja" name="" value={selectedTender?.satker_name} placeholder="Otomatis terisi" disabled={true} />
                                    </div>

                                    <div className="md:col-span-2">
                                        <FormInput title="Nama Paket" name="" value={selectedTender?.package_name} placeholder="Otomatis terisi" disabled={true} />
                                    </div>

                                    <div className="md:col-span-2">
                                        <FormInput title="Tanggal Masuk" name="" value={selectedTender?.order_date} placeholder="Otomatis terisi" disabled={true} />
                                    </div>

                                    <FormInput title="Sumber Dana" name="" value={selectedTender?.funding_source} placeholder="Otomatis terisi" disabled={true} />
                                    <FormInput title="Jenis Pengadaan" name="" value={selectedTender?.procurement_method?.toString()} placeholder="Otomatis terisi" disabled={true} />
                                </div>
                            </div>

                            <div>
                                <h2 className="font-poppins-semibold text-lg text-gray-800 mb-4 pb-2 border-b-2 border-primary/20">
                                    2. INFORMASI KEUANGAN
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormInput title="Nilai Pagu (Rp)" name="" value={selectedTender?.budget_value?.toString()} placeholder="Otomatis terisi" disabled={true} />
                                    <FormInput title="Nilai HPS (Rp)" name="" value={selectedTender?.hps_value?.toString()} placeholder="Otomatis terisi" disabled={true} />
                                </div>
                            </div>

                            <div>
                                <h2 className="font-poppins-semibold text-lg text-gray-800 mb-4 pb-2 border-b-2 border-primary/20">
                                    3. DETAIL KONTRAK
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormInput title="Nomor Kontrak" name="" value={selectedTender?.contract_number?.toString()} placeholder="Otomatis terisi" disabled={true} />
                                    <FormInput title="Tanggal Kontrak" name="" value={selectedTender?.contract_date?.toString()} placeholder="Otomatis terisi" disabled={true} />
                                    <FormInput title="Nama PPK" name="" value={selectedTender?.ppk_name?.toString()} placeholder="Otomatis terisi" disabled={true} />
                                    <FormInput title="Jabatan PPK" name="" value={selectedTender?.ppk_position?.toString()} placeholder="Otomatis terisi" disabled={true} />
                                    <FormInput title="Nama Pimpinan Perusahaan" name="" value={selectedTender?.company_leader?.toString()} placeholder="Otomatis terisi" disabled={true} />
                                    <FormInput title="Jabatan Pimpinan" name="" value={selectedTender?.leader_position?.toString()} placeholder="Otomatis terisi" disabled={true} />
                                </div>
                            </div>

                            <div>
                                <h2 className="font-poppins-semibold text-lg text-gray-800 mb-4 pb-2 border-b-2 border-primary/20">
                                    4. INFORMASI PEMENANG
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormInput title="Pemenang" name="" value={selectedTender?.winner_name?.toString()} placeholder="Otomatis terisi" disabled={true} />
                                    <FormInput title="Nilai Penawaran" name="" value={selectedTender?.total_value?.toString()} placeholder="Otomatis terisi" disabled={true} />
                                    <FormInput title="Nilai Negosiasi/Nilai SPK (Rp)" name="" value={selectedTender?.negotiation_value?.toString()} placeholder="Otomatis terisi" disabled={true} />
                                    <FormInput title="Nomor Telepon/HP" name="" value={selectedTender?.phone?.toString()} placeholder="Otomatis terisi" disabled={true} />
                                    <FormInput title="Email" name="" value={selectedTender?.email?.toString()} placeholder="Otomatis terisi" disabled={true} />
                                    <FormInput title="NPWP" name="" value={selectedTender?.npwp?.toString()} placeholder="Otomatis terisi" disabled={true} />
                                </div>
                            </div>

                            <div>
                                <h2 className="font-poppins-semibold text-lg text-gray-800 mb-4 pb-2 border-b-2 border-primary/20">
                                    5. LOKASI & ALAMAT
                                </h2>
                                <div className="grid grid-cols-1 gap-6">
                                    <FormInput title="Alamat Pemenang" name="" value={selectedTender?.winner_address?.toString()} placeholder="Otomatis terisi" disabled={true} />
                                    <FormInput title="Lokasi Pekerjaan" name="" value={selectedTender?.work_location?.toString()} placeholder="Otomatis terisi" disabled={true} />
                                </div>
                            </div>

                            <div>
                                <h2 className="font-poppins-semibold text-lg text-gray-800 mb-4 pb-2 border-b-2 border-primary/20">
                                    6. LAMPIRAN DAN CATATAN
                                </h2>
                                <div className="grid grid-cols-1 gap-6">
                                    <FormUploadFile title="Evidence/Bukti Laporan Hasil Pemilihan PP" name="file" onChange={handleChangeFileEntryPenjabatPengadaan} />
                                    <FormInput title="Catatan" type='textarea' name="note" value={note} onChange={handleChangeEntryPenjabatPengadaan} placeholder="Catatan" />
                                </div>
                            </div>

                            <div className="flex justify-end gap-4 pt-4">
                                <SubmitButton text='Simpan' onClick={() => handleEntryPenjabatPengadaanPost(selectedTender, metodePengadaan)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}