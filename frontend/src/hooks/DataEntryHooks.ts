/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { SwalMessage } from "../utils/SwalMessage";
import SwalLoading from "../utils/SwalLoading";
import API from "../server/API";
import { useNavigate } from "react-router-dom";
import { SortDescById } from "../utils/SortDescById";

export default function useDataEntryHooks() {
    const [dataEntryPengadaan, setDataEntryPengadaan] = useState<TenderProps[]>([]);
    const [dataEntryPengadaanById, setDataEntryPengadaanById] = useState<TenderProps | null>(null);
    const [evidenceFile, setEvidenceFile] = useState<File | null>(null);
    const [note, setNote] = useState("");
    const [selectedPPK, setSelectedPPK] = useState("");
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [selectedId, setSelectedId] = useState<any>(null);

    useEffect(() => {
        const fetchDataEntryPengadaan = async() => {
            try {
                const response = await API.get("/tender");
                const mappingData = response.data.data.map((item: TenderProps) => ({
                    ...item,
                    package_name: item.package_name == "" ? item.package_name : "Tidak Ada",
                    order_date: item.order_date ? item.order_date : "Tidak Ada"
                }));

                setDataEntryPengadaan(SortDescById(mappingData));
            } catch (error) {
                console.error(error);
            }
        }

        const fetchDataEntryPengadaanById = async() => {
            try {
                const response = await API.get(`/tender/${selectedId}`);
                setDataEntryPengadaanById(response.data.data)
            } catch (error) {
                console.error(error);
            }
        }

        fetchDataEntryPengadaan();
        fetchDataEntryPengadaanById();
    }, [selectedId]);

    const handleEntryPenjabatPengadaanPost = async (data: TenderProps, type: string) => {
        try {
            if (!data.tender_code || !type) {
                SwalMessage({
                    title: "Gagal!",
                    text: "Kode Tender wajib diisi!",
                    type: "error"
                });
                return;
            }

            const formData = new FormData();
            if (type) {
                formData.append("package_status", String(data.package_status));
                formData.append("delivery_status", String(data.delivery_status));
            } else {
                formData.append("procurement_type", String(data.procurement_type));
            }

            formData.append("tender_code", data.tender_code);
            formData.append("rup_code", data.rup_code);
            formData.append("fiscal_year", String(data.fiscal_year));
            formData.append("satker_name", data.satker_name);
            formData.append("order_date", data.order_date.toString());
            formData.append("funding_source", data.funding_source);
            formData.append("procurement_method", type?.toString());

            formData.append("budget_value", data.budget_value ? data.budget_value.toString() : "");
            formData.append("hps_value", data.hps_value ? data.hps_value.toString() : "");

            formData.append("contract_number", data.contract_number ? data.contract_number : "");
            formData.append("contract_date", data.contract_date ? data.contract_date : "");
            formData.append("ppk_name", data.ppk_name ? data.ppk_name : "");
            formData.append("ppk_position", data.ppk_position ? data.ppk_position : "");
            formData.append("company_leader", data.company_leader ? data.company_leader : "");
            formData.append("leader_position", data.leader_position ? data.leader_position : "");
            formData.append("winner_name", data.winner_name ? data.winner_name : "");
            formData.append("negotiation_value", data.negotiation_value ? data.negotiation_value.toString() : "");
            formData.append("phone", data.phone ? data.phone : "");
            formData.append("email", data.email ? data.email : "");
            formData.append("npwp", data.npwp ? data.npwp : "");
            formData.append("winner_address", data.winner_address ? data.winner_address : "");
            formData.append("work_location", data.work_location ? data.work_location : "");
            formData.append("note", note);
            formData.append("selected_ppk_id", selectedPPK);

            if (evidenceFile) {
                formData.append("evidence_file", evidenceFile);
            }

            formData.append("rup_name", data.rup_name);
            formData.append("total_value", data.total_value ? data.total_value.toString() : "");

            SwalLoading();
            const response = await API.post("/tender/create", formData, {
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
                navigate("/pokja/data-entry-penjabat-pengadaan/");
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

    const handleEntryPenjabatPengadaanPut = async (data: TenderProps, type: string) => {
        try {
            if (!data.tender_code || !type) {
                SwalMessage({
                    title: "Gagal!",
                    text: "Kode Tender wajib diisi!",
                    type: "error"
                });
                return;
            }

            const formData = new FormData();
            if (type) {
                formData.append("package_status", String(data.package_status));
                formData.append("delivery_status", String(data.delivery_status));
            } else {
                formData.append("procurement_type", String(data.procurement_type));
            }

            formData.append("tender_code", data.tender_code);
            formData.append("rup_code", data.rup_code);
            formData.append("fiscal_year", String(data.fiscal_year));
            formData.append("satker_name", data.satker_name);
            formData.append("order_date", data.order_date.toString());
            formData.append("funding_source", data.funding_source);
            formData.append("procurement_method", type?.toString());

            formData.append("budget_value", data.budget_value ? data.budget_value.toString() : "");
            formData.append("hps_value", data.hps_value ? data.hps_value.toString() : "");

            formData.append("contract_number", data.contract_number ? data.contract_number : "");
            formData.append("contract_date", data.contract_date ? data.contract_date : "");
            formData.append("ppk_name", data.ppk_name ? data.ppk_name : "");
            formData.append("ppk_position", data.ppk_position ? data.ppk_position : "");
            formData.append("company_leader", data.company_leader ? data.company_leader : "");
            formData.append("leader_position", data.leader_position ? data.leader_position : "");
            formData.append("winner_name", data.winner_name ? data.winner_name : "");
            formData.append("negotiation_value", data.negotiation_value ? data.negotiation_value.toString() : "");
            formData.append("phone", data.phone ? data.phone : "");
            formData.append("email", data.email ? data.email : "");
            formData.append("npwp", data.npwp ? data.npwp : "");
            formData.append("winner_address", data.winner_address ? data.winner_address : "");
            formData.append("work_location", data.work_location ? data.work_location : "");
            formData.append("note", note);
            formData.append("selected_ppk_id", selectedPPK);

            if (evidenceFile) {
                formData.append("evidence_file", evidenceFile);
            }

            formData.append("rup_name", data.rup_name);
            formData.append("total_value", data.total_value ? data.total_value.toString() : "");

            SwalLoading();
            const response = await API.post(`/tender/update/${selectedId}`, formData, {
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
                navigate("/pokja/data-entry-penjabat-pengadaan/");
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

    return {
        note,
        selectedPPK,
        handleEntryPenjabatPengadaanPost,
        handleChangeEntryPenjabatPengadaan,
        handleChangeFileEntryPenjabatPengadaan,
        dataEntryPengadaan,
        setSelectedId,
        dataEntryPengadaanById,
        handleEntryPenjabatPengadaanPut
    }
}
