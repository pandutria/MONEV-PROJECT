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
            if (typeof item.funding_source === "string") {
                uniqueMap.set(item.funding_source, item.funding_source);
            }

            if (typeof item.funding_source === "object" && item.funding_source) {
                uniqueMap.set(
                    String(item.funding_source.id),
                    item.funding_source.name
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
            if (typeof item.procurement_method === "string") {
                uniqueMap.set(item.procurement_method, item.procurement_method);
            }

            if (
                typeof item.procurement_method === "object" &&
                item.procurement_method
            ) {
                uniqueMap.set(
                    String(item.procurement_method.id),
                    item.procurement_method.name
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
            if (typeof item.fiscal_year === "string") {
                uniqueMap.set(item.fiscal_year, item.fiscal_year);
            }

            if (
                typeof item.fiscal_year === "object" &&
                item.fiscal_year
            ) {
                uniqueMap.set(
                    String(item.fiscal_year.id),
                    item.fiscal_year.name
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

                const mappingData = data.map((item: any) => ({
                    ...item,
                    opd: "Tidak Ada",
                    bid_value: FormatRupiah(Number(item.bid_value)),
                    negotiation_value: FormatRupiah(Number(item.negotiation_value)),
                    package_name: item.package_name ?? "Tidak Ada",
                    contract_date: FormatDate(item.contract_date),
                    efisience: FormatRupiah(Number(item.budget_value) - Number(item.contract_initial)),
                    presentation: Number(item.budget_value) > 0 ? (((Number(item.budget_value) - Number(item.contract_initial)) / Number(item.budget_value)) * 100).toFixed(2) + "%" : "0%"
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

    const handleEntryPenjabatPengadaanPost = async (data: any, type: string) => {
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
                formData.append("jenis_pengadaan", data.jenis_pengadaan);
                formData.append("tipe", "Penjabat");
            }

            if (type == "E-Purchasing V5" || type == "E-Purchasing V6") {
                formData.append("status_paket", data.status_paket);
                formData.append("status_pengiriman", data.status_pengiriman);
                formData.append("tipe", "Penjabat");
            }

            formData.append("metode_pengadaan", type);
            formData.append("kode_paket", data.kd_nontender);
            formData.append("kode_rup", data.kd_rup);
            formData.append("tahun_anggaran", data.tahun_anggaran);
            formData.append("satuan_kerja", data.nama_satker);
            formData.append("nama_paket", data.nama_paket);
            formData.append("sumber_dana", data.sumber_dana);

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

            if (data.nama_penyedia) {
                formData.append("pemenang", data.nama_penyedia);
            }
            if (data.nilai_penawaran) {
                formData.append("nilai_penawaran", data.nilai_penawaran);
            }
            if (data.nilai_penawaran) {
                formData.append("nilai_penawaran", data.nilai_penawaran);
            }
            if (data.nilai_negosiasi) {
                formData.append("nilai_negosiasi", data.nilai_negosiasi);
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

            if (data.alamat_pemenang) {
                formData.append("alamat_pemenang", data.alamat_pemenang);
            }
            if (data.lokasi_pekerjaan) {
                formData.append("lokasi_pekerjaan", data.lokasi_pekerjaan);
            }

            if (data.catatan) {
                formData.append("catatan", data.catatan);
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
            if (!type) {
                SwalMessage({
                    title: "Gagal!",
                    text: "Kode Tender wajib diisi!",
                    type: "error"
                });
                return;
            }

            const formData = new FormData();
            formData.append("_method", "PUT");
            formData.append("procurement_method", type);
            if (note) {
                formData.append("note", note);
            }
            if (selectedPPK) {
                formData.append("selected_ppk_id", String(selectedPPK));
            }
            if (evidenceFile) {
                formData.append("evidence_file", evidenceFile);
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
        } catch (error) {
            if (error) {
                SwalMessage({
                    title: "Gagal!",
                    text: "Harap pilih minimal 1 data yang dihapus!",
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
