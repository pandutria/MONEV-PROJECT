/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import API from "../server/API";
import { SwalMessage } from "../utils/SwalMessage";
import { useNavigate } from "react-router-dom";
import SwalLoading from "../utils/SwalLoading";
import { SortDescById } from "../utils/SortDescById";

export default function useRealisasiHooks() {
    const [realisasiData, setRealisasiData] = useState<RealizationProps[]>([]);
    const [realisasiDataById, setRealisasiDataById] = useState<RealizationProps | null>(null);
    const [week, setWeek] = useState<string | number>();
    const [target, setTarget] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);
    const [tahunData, setTahunData] = useState<any>([]);
    const [satkerData, setSatkerData] = useState<any>([]);
    const [selectedId, setSelectedId] = useState<any>(null);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRealization = async () => {
            try {
                const response = await API.get("/realisasi", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const data = response.data.data;
                const mappingData = data.map((item: RealizationProps) => ({
                    ...item,
                    tahun_anggaran: item?.schedule.rab?.data_entry.tahun_anggaran,
                    satuan_kerja: item.schedule.rab?.data_entry.satuan_kerja,
                    kode_rup: item.schedule.rab?.data_entry.kode_rup,
                    kode_paket: item.schedule.rab?.data_entry.kode_paket,
                    nama_paket: item.schedule.rab?.data_entry.nama_paket,
                }))

                const tahunUnique = Array.from(
                    new Set(
                        mappingData
                            .map((item: { tahun_anggaran: any; }) => item.tahun_anggaran)
                            .filter(Boolean)
                    )
                ).sort((a, b) => Number(b) - Number(a));

                const tahunOptions = tahunUnique.map((tahun, index) => ({
                    id: index + 1,
                    text: tahun?.toString()
                }));

                const satkerUnique = Array.from(
                    new Set(
                        mappingData
                            .map((item: { satuan_kerja: any; }) => item.satuan_kerja)
                            .filter(Boolean)
                    )
                );

                const satkerOptions = [
                    ...satkerUnique.map((satker, index) => ({
                        id: index + 2,
                        text: satker
                    }))
                ];

                setRealisasiData(SortDescById(mappingData));
                setSatkerData(satkerOptions);
                setTahunData(tahunOptions);
            } catch (error) {
                console.error(error);
            }
        }

        const fetchRealizationById = async () => {
            try {
                if (!selectedId) return;
                const response = await API.get(`/realisasi/${selectedId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const data = response.data.data; 
                setRealisasiDataById(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchRealization();
        fetchRealizationById();
    }, [token, selectedId]);

    const handleRealizationPost = async (selectedSchedule: ScheduleProps) => {
        try {
            if (!week || !target || !file) {
                SwalMessage({
                    type: "error",
                    title: "Gagal!",
                    text: "Harap isi seluruh field!"
                });

                return;
            }

            SwalLoading();
            const responseHeader = await API.post("/realisasi/create", {
                schedule_header_id: selectedSchedule?.id
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const formData = new FormData();
            formData.append("realisasi_header_id", responseHeader?.data?.data?.id);
            formData.append("week_number", week.toString());
            formData.append("value", target.toString());
            formData.append("bukti_file", file);
            const responseChild = await API.post("/realisasi/detail/create", formData);

            SwalMessage({
                type: "success",
                title: "Berhasil!",
                text: responseChild.data.message
            });

            setTimeout(() => {
                navigate("/ppk/realisasi-pekerjaan/");
            }, 2000);
        } catch (error: any) {
            if (error) {
                SwalMessage({
                    type: "error",
                    title: "Gagal!",
                    text: error.response.data.message
                })
            }
        }
    }

    const handleRealizationPut = async (selectedRealization: RealizationProps) => {
        try {
            if (!week || !target || !file) {
                SwalMessage({
                    type: "error",
                    title: "Gagal!",
                    text: "Harap isi seluruh field!"
                });

                return;
            }

            SwalLoading();
            const formData = new FormData();
            formData.append("realisasi_header_id", selectedRealization.id.toString());
            formData.append("week_number", week.toString());
            formData.append("value", target.toString());
            formData.append("bukti_file", file);
            const responseChild = await API.post("/realisasi/detail/create", formData);

            SwalMessage({
                type: "success",
                title: "Berhasil!",
                text: responseChild.data.message
            });

            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error: any) {
            if (error) {
                SwalMessage({
                    type: "error",
                    title: "Gagal!",
                    text: error.response.data.message
                })
            }
        }
    }

    const handleChangeRealization = (e: React.ChangeEvent<any>) => {
        const { name, value, files } = e.target;
        if (name == "week") return setWeek(value);
        if (name == "target") return setTarget(value);
        if (name == "file") return setFile(files?.[0] || null)
    }

    return {
        realisasiData,
        handleRealizationPost,
        handleChangeRealization,
        week,
        target,
        file,
        tahunData,
        satkerData,
        setSelectedId,
        realisasiDataById,
        handleRealizationPut
    }
}
