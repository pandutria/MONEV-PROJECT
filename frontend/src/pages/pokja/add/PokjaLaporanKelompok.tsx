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
import useDataEntryHooks from '../../../hooks/DataEntryHooks';
import SubmitButton from '../../../ui/SubmitButton';
import TableHeader from '../../../ui/TableHeader';
import useNewTenderInaprocHooks from '../../../hooks/NewTenderInaprocHooks';

export default function PokjaLaporanKelompokAdd() {
    const [metodePengadaan, setMetodePengadaan] = useState<any>("");
    const { newTenderInaprocHooks } = useNewTenderInaprocHooks();
    const [tenderDataFilter, setTenderDataFilter] = useState<NewTenderProps[]>([]);
    const [showTender, setShowTender] = useState<any>('');
    const [selectedTender, setSelectedTender] = useState<NewTenderProps | any>(null);
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
            key: "kd_tender",
            label: "Kode Tender"
        },
        {
            key: "kd_rup",
            label: "Kode RUP"
        },
        {
            key: "tahun_anggaran",
            label: "Tahun Anggaran"
        },
        {
            key: "nama_satker",
            label: "Satuan Kerja"
        },
        {
            key: "nama_paket",
            label: "Nama Paket"
        },
        {
            key: "sumber_dana",
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
            const filter = newTenderInaprocHooks?.filter((item: NewTenderProps) => {
                const data = item?.kd_tender?.toString()?.toLowerCase().includes(search.toLowerCase());
                return data;
            });

            setTenderDataFilter(filter);
        }

        fetchTender();
        filteringDataTender();
    }, [selectedTender, showTender, listUser, search, newTenderInaprocHooks]);

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
                                        <ShowTableForm tenderCode={selectedTender ? selectedTender?.kd_tender : "Kode tender / No Tender"} onClick={() => {
                                            setShowTender(true);
                                            setSelectedTender(null);
                                        }} />
                                    </div>

                                    <FormInput title="Kode RUP" name="" value={selectedTender?.kd_rup} placeholder="Otomatis terisi" disabled={true} />
                                    <FormInput title="Tahun Anggaran" name="" value={selectedTender?.tahun_anggaran.toString()} placeholder="Otomatis terisi" disabled={true} />

                                    <div className="md:col-span-2">
                                        <FormInput title="Satuan Kerja" name="" value={selectedTender?.nama_satker} placeholder="Otomatis terisi" disabled={true} />
                                    </div>

                                    <div className="md:col-span-2">
                                        <FormInput title="Nama Paket" name="" value={selectedTender?.nama_paket} placeholder="Otomatis terisi" disabled={true} />
                                    </div>

                                    <div className="md:col-span-2">
                                        <FormInput title="Tanggal Masuk" name="" value={selectedTender?.tgl_buat_paket} placeholder="Otomatis terisi" disabled={true} />
                                    </div>

                                    <FormInput title="Sumber Dana" name="" value={selectedTender?.sumber_dana} placeholder="Otomatis terisi" disabled={true} />
                                    <FormInput title="Jenis Pengadaan" name="" value={selectedTender?.jenis_pengadaan?.toString()} placeholder="Otomatis terisi" disabled={true} />
                                </div>
                            </div>

                            <div>
                                <h2 className="font-poppins-semibold text-lg text-gray-800 mb-4 pb-2 border-b-2 border-primary/20">
                                    2. INFORMASI KEUANGAN
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormInput title="Nilai Pagu (Rp)" name="" value={selectedTender?.pagu?.toString()} placeholder="Otomatis terisi" disabled={true} />
                                    <FormInput title="Nilai HPS (Rp)" name="" value={selectedTender?.hps?.toString()} placeholder="Otomatis terisi" disabled={true} />
                                </div>
                            </div>

                            <div>
                                <h2 className="font-poppins-semibold text-lg text-gray-800 mb-4 pb-2 border-b-2 border-primary/20">
                                    3. DETAIL KONTRAK
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormInput title="Nomor Kontrak" name="" value={selectedTender?.no_kontrak?.toString()} placeholder="Otomatis terisi" disabled={true} />
                                    <FormInput title="Tanggal Kontrak" name="" value={selectedTender?.tgl_kontrak?.toString()} placeholder="Otomatis terisi" disabled={true} />
                                    <FormInput title="Nama PPK" name="" value={selectedTender?.nama_ppk?.toString()} placeholder="Otomatis terisi" disabled={true} />
                                    <FormInput title="Jabatan PPK" name="" value={selectedTender?.jabatan_ppk?.toString()} placeholder="Otomatis terisi" disabled={true} />
                                    <FormInput title="Nama Pimpinan Perusahaan" name="" value={selectedTender?.wakil_sah_penyedia?.toString()} placeholder="Otomatis terisi" disabled={true} />
                                    <FormInput title="Jabatan Pimpinan" name="" value={selectedTender?.jabatan_wakil_penyedia?.toString()} placeholder="Otomatis terisi" disabled={true} />
                                </div>
                            </div>

                            <div>
                                <h2 className="font-poppins-semibold text-lg text-gray-800 mb-4 pb-2 border-b-2 border-primary/20">
                                    4. INFORMASI PEMENANG
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormInput title="Pemenang" name="" value={selectedTender?.nama_penyedia?.toString()} placeholder="Otomatis terisi" disabled={true} />
                                    <FormInput title="Nilai Penawaran" name="" value={selectedTender?.nilai_penawaran?.toString()} placeholder="Otomatis terisi" disabled={true} />
                                    <FormInput title="Nilai Negosiasi/Nilai SPK (Rp)" name="" value={selectedTender?.nilai_negosiasi?.toString()} placeholder="Otomatis terisi" disabled={true} />
                                    <FormInput title="Nomor Telepon/HP" name="" value={selectedTender?.phone?.toString()} placeholder="Otomatis terisi" disabled={true} />
                                    <FormInput title="Email" name="" value={selectedTender?.email?.toString()} placeholder="Otomatis terisi" disabled={true} />
                                    <FormInput title="NPWP" name="" value={selectedTender?.npwp_penyedia?.toString()} placeholder="Otomatis terisi" disabled={true} />
                                </div>
                            </div>

                            <div>
                                <h2 className="font-poppins-semibold text-lg text-gray-800 mb-4 pb-2 border-b-2 border-primary/20">
                                    5. LOKASI & ALAMAT
                                </h2>
                                <div className="grid grid-cols-1 gap-6">
                                    <FormInput title="Alamat Pemenang" name="" value={selectedTender?.winner_address?.toString()} placeholder="Otomatis terisi" disabled={true} />
                                    <FormInput title="Lokasi Pekerjaan" name="" value={selectedTender?.lokasi_pekerjaan?.toString()} placeholder="Otomatis terisi" disabled={true} />
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