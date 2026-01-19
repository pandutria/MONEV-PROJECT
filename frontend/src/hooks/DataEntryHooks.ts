/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { SwalMessage } from "../utils/SwalMessage";
import SwalLoading from "../utils/SwalLoading";
import API from "../server/API";
import { useNavigate } from "react-router-dom";
import { SortDescById } from "../utils/SortDescById";
import { FormatDate } from "../utils/FormatDate";

export default function useDataEntryHooks() {
    const [dataEntryPengadaan, setDataEntryPengadaan] = useState<DataEntryProps[]>([]);
    const [dataEntryPengadaanById, setDataEntryPengadaanById] = useState<DataEntryProps | null>(null);
    const [evidenceFile, setEvidenceFile] = useState<File | null>(null);
    const [note, setNote] = useState("");
    const [selectedPPK, setSelectedPPK] = useState("");
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [selectedId, setSelectedId] = useState<any>(null);

    useEffect(() => {
        const fetchDataEntryPengadaan = async () => {
            try {
                const response = await API.get("/dataentry");
                const mappingData = response.data.data.map((item: any) => ({
                    ...item,
                    contract_initial: FormatDate(item.contract_initial),
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

    const handleEntryPenjabatPengadaanPost = async (data: NewTenderProps, type: string) => {
        try {
            if (!data.kd_tender || !type) {
                SwalMessage({
                    title: "Gagal!",
                    text: "Kode Tender wajib diisi!",
                    type: "error"
                });
                return;
            }

            const formData = new FormData();
            if (type == "Pengadaan Langsung" || type == "E-Purchasing V5" || type == "E-Purchasing V6") {
                if (type == "Pengadaan Langsung") {
                    formData.append("procurement_type", String(data.jenis_pengadaan));
                    formData.append("selected_ppk_id", selectedPPK);
                } else {
                    formData.append("package_status", null as any);
                    formData.append("delivery_status", null as any);
                }

                formData.append("type", "penjabat");
            } else {
                formData.append("procurement_type", String(data.jenis_pengadaan));
                formData.append("type", "kelompok");
            }

            formData.append("tender_code", data.kd_tender as any);
            formData.append("rup_code", data.kd_rup as any);
            formData.append("fiscal_year", String(data.tahun_anggaran));
            formData.append("satker_name", data.nama_satker as any);
            formData.append("contract_initial", String(data?.tgl_buat_paket) as any);
            formData.append("funding_source", data.sumber_dana as any);

            formData.append("budget_value", data.pagu ? String(data.pagu) : null as any);
            formData.append("hps_value", data.hps ? String(data.hps) : null as any);

            formData.append("contract_number", data.no_kontrak ? data.no_kontrak.toString() : null as any);
            formData.append("contract_date", data.tgl_kontrak ? data.tgl_kontrak.toString() : null as any);
            formData.append("ppk_name", data.nama_ppk ? data.nama_ppk : null as any);
            formData.append("ppk_position", data.jabatan_ppk ? data.jabatan_ppk : null as any);
            formData.append("company_leader", data.wakil_sah_penyedia ? data.wakil_sah_penyedia : null as any);
            formData.append("leader_position", data.jabatan_wakil_penyedia ? data.jabatan_wakil_penyedia : null as any);
            formData.append("winner_name", data.nama_penyedia ? data.nama_penyedia : null as any);
            formData.append("negotiation_value", data.nilai_negosiasi ? data.nilai_negosiasi.toString() : null as any);
            formData.append("phone", null as any);
            formData.append("email", null as any);
            formData.append("npwp", data.npwp_penyedia ? data.npwp_penyedia : null as any);
            formData.append("winner_address", null as any);
            formData.append("work_location", data.lokasi_pekerjaan ? data.lokasi_pekerjaan : null as any);
            formData.append("procurement_method", type);
            formData.append("note", note);

            if (evidenceFile) {
                formData.append("evidence_file", evidenceFile);
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
            formData.append("selected_ppk_id", selectedPPK);
            formData.append("procurement_method", type);
            if (note) {
                formData.append("note", note);
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
    }
}
