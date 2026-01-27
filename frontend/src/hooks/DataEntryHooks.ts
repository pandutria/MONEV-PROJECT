/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { SwalMessage } from "../utils/SwalMessage";
import SwalLoading from "../utils/SwalLoading";
import API from "../server/API";
import { useNavigate } from "react-router-dom";
import { SortDescById } from "../utils/SortDescById";
import { FormatDate } from "../utils/FormatDate";
import FormatRupiah from "../utils/FormatRupiah";

export default function useDataEntryHooks() {
    const [dataEntryPengadaan, setDataEntryPengadaan] = useState<DataEntryProps[]>([]);
    const [dataEntryPengadaanById, setDataEntryPengadaanById] = useState<DataEntryProps | null>(null);
    const [evidenceFile, setEvidenceFile] = useState<File | null>(null);
    const [note, setNote] = useState("");
    const [selectedPPK, setSelectedPPK] = useState("");
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [selectedId, setSelectedId] = useState<any>(null);
    const [sumberDanaOptions, setSumberDanaOptions] = useState<any[]>([]);
    const [metodePengadaanOptions, setMetodePengadaanOptions] = useState<any[]>([]);
    const [tahunOptions, setTahunOptions] = useState<any[]>([]);

    const buildSumberDanaOptions = (data: any[]) => {
        const uniqueMap = new Map<string, string>();

        data.forEach(item => {
            if (typeof item.sumber_dana === "string") {
                uniqueMap.set(item.sumber_dana, item.sumber_dana);
            }

            if (typeof item.sumber_dana === "object" && item.sumber_dana) {
                uniqueMap.set(
                    String(item.sumber_dana.id),
                    item.sumber_dana.name
                );
            }
        });

        return Array.from(uniqueMap.entries()).map(([key, value]) => ({
            id: String(key),
            text: value
        }));
    };

    const buildMetodePengadaanOptions = (data: any[]) => {
        const uniqueMap = new Map<string, string>();

        data.forEach(item => {
            if (typeof item.metode_pengadaan === "string") {
                uniqueMap.set(item.metode_pengadaan, item.metode_pengadaan);
            }

            if (
                typeof item.metode_pengadaan === "object" &&
                item.metode_pengadaan
            ) {
                uniqueMap.set(
                    String(item.metode_pengadaan.id),
                    item.metode_pengadaan.name
                );
            }
        });

        return Array.from(uniqueMap.entries()).map(([key, value]) => ({
            id: key,
            text: value
        }));
    };

    const buildtahunOptions = (data: any[]) => {
        const uniqueMap = new Map<string, string>();

        data.forEach(item => {
            if (typeof item.tahun_anggaran === "string") {
                uniqueMap.set(item.tahun_anggaran, item.tahun_anggaran);
            }

            if (
                typeof item.tahun_anggaran === "object" &&
                item.tahun_anggaran
            ) {
                uniqueMap.set(
                    String(item.tahun_anggaran.id),
                    item.tahun_anggaran.name
                );
            }
        });

        return Array.from(uniqueMap.entries()).map(([key, value]) => ({
            id: key,
            text: value
        }));
    };

    useEffect(() => {
        const fetchDataEntryPengadaan = async () => {
            try {
                const response = await API.get("/dataentry");
                const data = response.data.data;

                const sumberDanaOpts = buildSumberDanaOptions(data);
                setSumberDanaOptions(sumberDanaOpts);

                const metodeOpts = buildMetodePengadaanOptions(data);
                setMetodePengadaanOptions(metodeOpts);

                const tahunOpts = buildtahunOptions(data);
                setTahunOptions(tahunOpts);

                const mappingData = data.map((item: DataEntryProps) => ({
                    ...item,
                    opd: item.user?.opd_organization ?? "Tidak Ada",
                    nomor_kontrak: item.nomor_kontrak ?? "-",
                    nama_pimpinan_perusahaan: item.nama_pimpinan_perusahaan ?? "-",
                    nomor_telp: item.nomor_telp ?? "-",
                    nilai_pagu: item.nilai_pagu ?? "Tidak Ada",
                    nilai_hps: item.nilai_hps ?? "Tidak Ada",
                    nilai_penawaran: FormatRupiah(Number(item.nilai_penawaran)) ?? "-",
                    nilai_negosiasi: FormatRupiah(Number(item.nilai_negosiasi)) ?? "-",
                    tanggal_masuk: FormatDate(item.updated_at),
                    jumlah_pendaftar: "-",
                    jumlah_pemasukan: "-",
                    efisiensi: "-",
                    presentase: "-",
                    // efisiensi: FormatRupiah(Number(item.budget_value) - Number(item.contract_initial)),
                    // presentase: Number(item.budget_value) > 0 ? (((Number(item.budget_value) - Number(item.contract_initial)) / Number(item.budget_value)) * 100).toFixed(2) + "%" : "0%"
                }));

                setDataEntryPengadaan(SortDescById(mappingData));
            } catch (error) {
                console.error(error);
            }
        }

        const fetchDataEntryPengadaanById = async () => {
            try {
                if (!selectedId) return;
                const response = await API.get(`/dataentry/${selectedId}`);
                setDataEntryPengadaanById(response.data.data)

                setSelectedPPK(response.data.data.selected_ppk_id);
            } catch (error) {
                console.error(error);
            }
        }

        fetchDataEntryPengadaan();
        fetchDataEntryPengadaanById();
    }, [selectedId]);

    const handleEntryPenjabatPengadaanPost = async (data: any, dataPenyedia: any, type: string) => {
        try {
            if (!data.kd_rup || !type) {
                SwalMessage({
                    title: "Gagal!",
                    text: "Kode Tender wajib diisi!",
                    type: "error"
                });
                return;
            }

            const formData = new FormData();
            if (type == "Pengadaan Langsung") {
                formData.append("tipe", "Penjabat");
                formData.append("kode_paket", data.kd_nontender);
                formData.append("nama_paket", data.nama_paket);
                formData.append("sumber_dana", data.sumber_dana);
                formData.append("jenis_pengadaan", data.jenis_pengadaan);

                if (data.nama_penyedia) {
                    formData.append("pemenang", data.nama_penyedia);
                }
                if (data.nomor_telp) {
                    formData.append("nomor_telp", data.nomor_telp);
                }
                if (data.email) {
                    formData.append("email", data.email);
                }
                if (data.npwp_penyedia) {
                    formData.append("npwp", data.npwp_penyedia);
                }

                if (data.alamat) {
                    formData.append("alamat_pemenang", data.alamat);
                }
            }

            if (type == "E-Purchasing V5") {
                formData.append("tipe", "Penjabat");
                formData.append("kode_paket", data.kd_paket);
                formData.append("nama_paket", data.nama_paket);
                formData.append("sumber_dana", data.nama_sumber_dana);
                formData.append("status_paket", data.status_paket);
                formData.append("status_pengiriman", data.paket_status_str);                

                // if (dataPenyedia[0].nama_penyedia) {
                //     formData.append("pemenang", dataPenyedia[0].nama_penyedia);
                // }
                // if (dataPenyedia[0].no_telp_penyedia) {
                //     formData.append("nomor_telp", dataPenyedia[0].no_telp_penyedia);
                // }
                // if (dataPenyedia[0].email_penyedia) {
                //     formData.append("email", dataPenyedia[0].email_penyedia);
                // }
                // if (dataPenyedia[0].npwp_penyedia) {
                //     formData.append("npwp", dataPenyedia[0].npwp_penyedia);
                // }

                // if (dataPenyedia[0].alamat_penyedia) {
                //     formData.append("alamat_pemenang", dataPenyedia[0].alamat_penyedia);
                // }
            }

            // if (type == "E-Purchasing V6") {
            //     formData.append("tipe", "Penjabat");
            //     formData.append("kode_paket", data.kd_paket);
            //     formData.append("nama_paket", data.rup_nama_pkt);
            //     formData.append("sumber_dana", data.sumber_dana);
            //     formData.append("status_paket", data.status_pkt);
            //     formData.append("status_pengiriman", data.status_pengiriman);

            //     if (dataPenyedia[0].nama_penyedia) {
            //         formData.append("pemenang", dataPenyedia[0].nama_penyedia);
            //     }
            //     if (dataPenyedia[0].telepon) {
            //         formData.append("nomor_telp", dataPenyedia[0].telepon);
            //     }
            //     if (dataPenyedia[0].email) {
            //         formData.append("email", dataPenyedia[0].email);
            //     }
            //     if (dataPenyedia[0].npwp_penyedia) {
            //         formData.append("npwp", dataPenyedia[0].npwp_penyedia);
            //     }

            //     if (dataPenyedia[0].alamat_penyedia) {
            //         formData.append("alamat_pemenang", dataPenyedia[0].alamat_penyedia);
            //     }
            // }

            if (!(type == "Pengadaan Langsung" || type == "E-Purchasing V5" || type == "E-Purchasing V6")) {
                formData.append("tipe", "Kelompok");
                formData.append("kode_paket", data.kd_tender);
                formData.append("nama_paket", data.nama_paket);
                formData.append("sumber_dana", data.sumber_dana);
                formData.append("jenis_pengadaan", data.jenis_pengadaan);

                if (data.nama_penyedia) {
                    formData.append("pemenang", data.nama_penyedia);
                }
                if (data.nomor_telp) {
                    formData.append("nomor_telp", data.nomor_telp);
                }
                if (data.email) {
                    formData.append("email", data.email);
                }
                if (data.npwp_penyedia) {
                    formData.append("npwp", data.npwp_penyedia);
                }

                if (data.alamat) {
                    formData.append("alamat_pemenang", data.alamat);
                }
            }

            formData.append("metode_pengadaan", type);            
            formData.append("kode_rup", data.kd_rup);
            formData.append("tahun_anggaran", data.tahun_anggaran);
            if (data.nama_satker) {
                formData.append("satuan_kerja", data.nama_satker);
            }

            if (data.pagu) {
                formData.append("nilai_pagu", data.pagu);
            }
            if (data.hps) {
                formData.append("nilai_hps", data.hps);
            }

            if (data.no_kontrak) {
                formData.append("nomor_kontrak", data.no_kontrak);
            }
            if (data.tgl_kontrak) {
                formData.append("tanggal_kontrak", data.tgl_kontrak);
            }
            if (data.nama_ppk) {
                formData.append("nama_ppk", data.nama_ppk);
            }
            if (data.jabatan_ppk) {
                formData.append("jabatan_ppk", data.jabatan_ppk);
            }

            if (data.nama_pimpinan) {
                formData.append("nama_pimpinan_perusahaan", data.nama_pimpinan);
            }
            if (data.jabatan_pimpinan) {
                formData.append("jabatan_pimpinan", data.jabatan_pimpinan);
            }

            if (data.nilai_penawaran) {
                formData.append("nilai_penawaran", data.nilai_penawaran);
            }
            if (data.nilai_negosiasi) {
                formData.append("nilai_negosiasi", data.nilai_negosiasi);
            }

            if (data.lokasi_pekerjaan) {
                formData.append("lokasi_pekerjaan", data.lokasi_pekerjaan);
            }

            if (note) {
                formData.append("catatan", note);
            }
            if (evidenceFile) {
                formData.append("bukti_file", evidenceFile);
            }
            if (selectedPPK) {
                formData.append("selected_ppk_id", selectedPPK);
            }

            SwalLoading();
            const response = await API.post("/dataentry/create", formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const message = response.data.message;
            SwalMessage({
                title: "Berhasil!",
                text: message,
                type: "success"
            });

            setTimeout(() => {
                if (type == "Pengadaan Langsung" || type == "E-Purchasing V5" || type == "E-Purchasing V6") {
                    navigate("/pokja/data-entry-penjabat-pengadaan/");
                } else {
                    navigate("/pokja/data-entry-kelompok-kerja/");
                }
            }, 2000);
        } catch (error) {
            if (error) {
                SwalMessage({
                    title: "Gagal!",
                    text: "Terjadi Kesalahan!",
                    type: "error"
                })
            }
            console.error(error)
        }
    }

    const handleEntryPenjabatPengadaanPut = async (type: string) => {
        try {
            const formData = new FormData();
            formData.append("_method", "PUT");
            if (note) {
                formData.append("catatan", note);
            }
            if (selectedPPK) {
                formData.append("selected_ppk_id", String(selectedPPK));
            }
            if (evidenceFile) {
                formData.append("bukti_file", evidenceFile);
            }

            SwalLoading();
            const response = await API.put(`/dataentry/update/${selectedId}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const message = response.data.message;
            SwalMessage({
                title: "Berhasil!",
                text: message,
                type: "success"
            });

            setTimeout(() => {
                if (type == "Pengadaan Langsung" || type == "E-Purchasing V5" || type == "E-Purchasing V6") {
                    navigate("/pokja/data-entry-penjabat-pengadaan/");
                } else {
                    navigate("/pokja/data-entry-kelompok-kerja/");
                }
            }, 2000);
        } catch (error) {
            if (error) {
                SwalMessage({
                    title: "Gagal!",
                    text: "Terjadi Kesalahan!",
                    type: "error"
                })
            }
            console.error(error)
        }
    }

    const handleChangeEntryPenjabatPengadaan = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === "note") return setNote(value);
        if (name === "ppk") return setSelectedPPK(value);
    };

    const handleChangeFileEntryPenjabatPengadaan = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setEvidenceFile(e.target.files[0]);
        } else {
            setEvidenceFile(null);
        }
    };

    const handleDataEntryPengadaanDelete = async (ids: number[]) => {
        try {
            if (ids.length === 0) {
                SwalMessage({
                    title: "Gagal!",
                    text: "Harap pilih minimal 1 data yang dihapus!",
                    type: "error"
                });
                return;
            }

            const result = await SwalMessage({
                title: "Peringatan!",
                text: "Apakah anda yakin untuk menghapus data ini?",
                type: 'warning',
                confirmText: "Iya",
                cancelText: "Tidak",
                showCancelButton: true,
            });

            let response;
            if (result.isConfirmed) {
                for (let index = 0; index < ids.length; index++) {
                    const id = ids[index];
                    SwalLoading();
                    response = await API.delete(`/dataentry/delete/${id}`);
                }

                const message = response?.data.message;
                SwalMessage({
                    title: "Berhasil!",
                    text: message,
                    type: "success"
                });

                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
        } catch (error: any) {
            if (error) {
                SwalMessage({
                    title: "Gagal!",
                    text: error.response.data.message,
                    type: "error"
                });
            }
        }
    }

    return {
        note,
        selectedPPK,
        handleEntryPenjabatPengadaanPost,
        handleChangeEntryPenjabatPengadaan,
        handleChangeFileEntryPenjabatPengadaan,
        dataEntryPengadaan,
        setSelectedId,
        dataEntryPengadaanById,
        handleEntryPenjabatPengadaanPut,
        handleDataEntryPengadaanDelete,
        sumberDanaOptions,
        metodePengadaanOptions,
        tahunOptions
    }
}
