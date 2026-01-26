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

export default function PokjaLaporanKelompokUpdateView() {
    const { id } = useParams();

    const { user, loading } = useAuth();
    const { listUser } = useUserHooks();
    const [isDisabled, setIsDisabled] = useState(false);
    const [showSelectedPPK, setShowSelectedPPK] = useState(false);
    const [userPPK, setUserPPK] = useState<UserProps[]>([]);
    const location = useLocation();
    const {
        note,
        handleEntryPenjabatPengadaanPut,
        handleChangeEntryPenjabatPengadaan,
        handleChangeFileEntryPenjabatPengadaan,
        setSelectedId,
        selectedPPK,
        dataEntryPengadaanById
    } = useDataEntryHooks();

    useEffect(() => {
        const fetchtenderId = () => {
            if (id) {
                setSelectedId(id);
            }

            if (location.pathname.startsWith("/pokja/data-entry-kelompok-kerja/lihat/")) {
                setIsDisabled(true);
            }
        }

        const filteringUserPPK = () => {
            const filteringData = listUser?.filter((item: UserProps) => {
                const filter = item.role_id === 2;
                return filter;
            });

            setUserPPK(filteringData);
        }

        const fetchShowPPK = () => {
            if (dataEntryPengadaanById?.jenis_pengadaan) {
                if (dataEntryPengadaanById?.jenis_pengadaan.toLowerCase() === ("Pekerjaan Konstruksi").toLowerCase()) {
                    setShowSelectedPPK(true);
                }
            }
        }

        fetchtenderId();
        filteringUserPPK();
        fetchShowPPK();
    }, [listUser, id, setSelectedId, location, dataEntryPengadaanById]);

    if (loading || !dataEntryPengadaanById) {
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
                            {isDisabled ? "Lihat" : "Ubah"} Laporan kelompok Kerja
                        </h1>

                        <div className="space-y-8">
                            <div>
                                <h2 className="font-poppins-semibold text-lg text-gray-800 mb-4 pb-2 border-b-2 border-primary/20">
                                    1. TRANSAKSI INFORMASI
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <FormSelect disabled={true} title="Metode Pengadaan" name="" value={dataEntryPengadaanById?.metode_pengadaan?.toString()}>
                                            <option value={dataEntryPengadaanById?.metode_pengadaan?.toString()}>{dataEntryPengadaanById?.metode_pengadaan?.toString()}</option>
                                        </FormSelect>
                                    </div>

                                    <div className="md:col-span-2">
                                        <ShowTableForm disabled={true} tenderCode={dataEntryPengadaanById?.kode_paket?.toString()} />
                                    </div>

                                    <FormInput disabled={true} title="Kode RUP" name="" value={dataEntryPengadaanById?.kode_rup?.toString()} placeholder="Otomatis terisi" />
                                    <FormInput disabled={true} title="Tahun Anggaran" name="" value={dataEntryPengadaanById?.tahun_anggaran?.toString()} placeholder="Otomatis terisi" />

                                    <div className="md:col-span-2">
                                        <FormInput disabled={true} title="Satuan Kerja" name="" value={dataEntryPengadaanById?.satuan_kerja?.toString()} placeholder="Otomatis terisi" />
                                    </div>

                                    <div className="md:col-span-2">
                                        <FormInput disabled={true} title="Nama Paket" name="" value={dataEntryPengadaanById?.nama_paket?.toString()} placeholder="Otomatis terisi" />
                                    </div>

                                    <div className="md:col-span-2">
                                        <FormInput disabled={true} title="Tanggal Masuk" name="" value={dataEntryPengadaanById?.tanggal_masuk?.toString()} placeholder="Otomatis terisi" />
                                    </div>

                                    <FormInput disabled={true} title="Sumber Dana" name="" value={dataEntryPengadaanById?.sumber_dana?.toString()} placeholder="Otomatis terisi" />

                                    <FormInput disabled={true} title="Jenis Pengadaan" name="" value={dataEntryPengadaanById?.jenis_pengadaan?.toString()} placeholder="Otomatis terisi" />
                                </div>
                            </div>

                            <div>
                                <h2 className="font-poppins-semibold text-lg text-gray-800 mb-4 pb-2 border-b-2 border-primary/20">
                                    2. INFORMASI KEUANGAN
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormInput disabled={true} title="Nilai Pagu (Rp)" name="" value={dataEntryPengadaanById?.nilai_pagu?.toString()} placeholder="Otomatis terisi" />
                                    <FormInput disabled={true} title="Nilai HPS (Rp)" name="" value={dataEntryPengadaanById?.nilai_hps?.toString()} placeholder="Otomatis terisi" />
                                </div>
                            </div>

                            <div>
                                <h2 className="font-poppins-semibold text-lg text-gray-800 mb-4 pb-2 border-b-2 border-primary/20">
                                    3. DETAIL KONTRAK
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormInput disabled={true} title="Nomor Kontrak" name="" value={dataEntryPengadaanById?.nomor_kontrak?.toString()} placeholder="Otomatis terisi" />
                                    <FormInput disabled={true} title="Tanggal Kontrak" name="" value={dataEntryPengadaanById?.tanggal_kontrak?.toString()} placeholder="Otomatis terisi" />
                                    <FormInput disabled={true} title="Nama PPK" name="" value={dataEntryPengadaanById?.nama_ppk?.toString()} placeholder="Otomatis terisi" />
                                    <FormInput disabled={true} title="Jabatan PPK" name="" value={dataEntryPengadaanById?.jabatan_ppk?.toString()} placeholder="Otomatis terisi" />
                                    <FormInput disabled={true} title="Nama Pimpinan Perusahaan" name="" value={dataEntryPengadaanById?.nama_pimpinan_perusahaan?.toString()} placeholder="Otomatis terisi" />
                                    <FormInput disabled={true} title="Jabatan Pimpinan" name="" value={dataEntryPengadaanById?.jabatan_pimpinan?.toString()} placeholder="Otomatis terisi" />
                                </div>
                            </div>

                            <div>
                                <h2 className="font-poppins-semibold text-lg text-gray-800 mb-4 pb-2 border-b-2 border-primary/20">
                                    4. INFORMASI PEMENANG
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormInput disabled={true} title="Pemenang" name="" value={dataEntryPengadaanById?.pemenang?.toString()} placeholder="Otomatis terisi" />
                                    <FormInput disabled={true} title="Nilai Penawaran" name="" value={dataEntryPengadaanById?.nilai_penawaran?.toString()} placeholder="Otomatis terisi" />
                                    <FormInput disabled={true} title="Nilai Negosiasi/Nilai SPK (Rp)" name="" value={dataEntryPengadaanById?.nilai_negosiasi?.toString()} placeholder="Otomatis terisi" />
                                    <FormInput disabled={true} title="Nomor Telepon/HP" name="" value={dataEntryPengadaanById?.nomor_telp?.toString()} placeholder="Otomatis terisi" />
                                    <FormInput disabled={true} title="Email" name="" value={dataEntryPengadaanById?.email?.toString()} placeholder="Otomatis terisi" />
                                    <FormInput disabled={true} title="NPWP" name="" value={dataEntryPengadaanById?.npwp?.toString()} placeholder="Otomatis terisi" />
                                </div>
                            </div>

                            <div>
                                <h2 className="font-poppins-semibold text-lg text-gray-800 mb-4 pb-2 border-b-2 border-primary/20">
                                    5. LOKASI & ALAMAT
                                </h2>
                                <div className="grid grid-cols-1 gap-6">
                                    <FormInput disabled={true} title="Alamat Pemenang" name="" value={dataEntryPengadaanById?.alamat_pemenang?.toString()} placeholder="Otomatis terisi" />
                                    <FormInput disabled={true} title="Lokasi Pekerjaan" name="" value={dataEntryPengadaanById?.lokasi_pekerjaan?.toString()} placeholder="Otomatis terisi" />
                                </div>
                            </div>

                            <div>
                                <h2 className="font-poppins-semibold text-lg text-gray-800 mb-4 pb-2 border-b-2 border-primary/20">
                                    6. LAMPIRAN DAN CATATAN
                                </h2>
                                <div className="grid grid-cols-1 gap-6">
                                    <FormUploadFile disabled={isDisabled} value={dataEntryPengadaanById ? dataEntryPengadaanById.bukti_file : ''} title="Evidence/Bukti Laporan Hasil Pemilihan PP" name="file" onChange={handleChangeFileEntryPenjabatPengadaan} />
                                    <FormInput disabled={isDisabled} title="Catatan" type='textarea' name="note" value={note ? note as any : dataEntryPengadaanById?.catatan} onChange={handleChangeEntryPenjabatPengadaan} placeholder="Catatan" />

                                    {showSelectedPPK && (
                                        <FormSelect disabled={isDisabled} title="Ditujukan ke PPK" name="ppk" value={selectedPPK} onChange={handleChangeEntryPenjabatPengadaan}>
                                            {userPPK.map((item, index) => (
                                                <option key={index} value={item.id}>PPK - {item.fullname}</option>
                                            ))}
                                        </FormSelect>
                                    )}
                                </div>
                            </div>

                            {!isDisabled && (
                                <div className="flex justify-end gap-4 pt-4">
                                    <SubmitButton text='Simpan' onClick={() => handleEntryPenjabatPengadaanPut(dataEntryPengadaanById?.metode_pengadaan?.toString() as any)} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}