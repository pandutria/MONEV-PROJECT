/* eslint-disable @typescript-eslint/no-explicit-any */
import { SwalMessage } from "../utils/SwalMessage";
import API from "../server/API";
import SwalLoading from "../utils/SwalLoading";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { SortDescById } from "../utils/SortDescById";

export default function useRABHooks() {
    const token = localStorage.getItem("token");
    const [program, setProgram] = useState("");
    const [activity, setActivity] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [rabData, setRabData] = useState<RABProps[]>([]);
    const [tahunData, setTahunData] = useState<any>([]);
    const [satkerData, setSatkerData] = useState<any>([]);
    const [rabDataByid, setRabDataById] = useState<RABProps | null>(null);
    const [selectedId, setSelectedId] = useState<any>(null);
    const navigate = useNavigate();
    const [revisionCount, setRevisionCount] = useState<any[]>([]);

    const buildTahunOptions = (data: { tahun_anggaran?: number | null }[]) => {
        const uniqueYears = Array.from(
            new Set(
                data
                    .map(item => item.tahun_anggaran)
                    .filter((v): v is number => typeof v === "number")
            )
        ).sort((a, b) => b - a);

        return uniqueYears.map(tahun => ({
            id: tahun.toString(),
            text: tahun.toString()
        }));
    };


    const buildSatkerOptions = (data: any[]) => {
        const uniqueMap = new Map<string, string>();

        data.forEach(item => {
            if (typeof item.satuan_kerja === "string") {
                uniqueMap.set(item.satuan_kerja, item.satuan_kerja);
            }
        });

        return Array.from(uniqueMap.entries()).map(([key, value]) => ({
            id: key,
            text: value
        }));
    };

    useEffect(() => {
        const fetchRab = async () => {
            try {
                const response = await API.get("/rab");
                const data = response.data.data;
                const latestRabMap = new Map<number, RABProps>();

                data.forEach((item: RABProps) => {
                    const existing = latestRabMap.get(item.rab_group_id);

                    if (!existing || item.revision > existing.revision) {
                        latestRabMap.set(item.rab_group_id, item);
                    }
                });

                const latestRabData = Array.from(latestRabMap.values());
                const mappingData = latestRabData.map((item: RABProps) => ({
                    ...item,
                    fiscal_year: item.tahun_anggaran
                        ? item.tahun_anggaran.toString()
                        : "",
                }));

                const revisions = Array.from(
                    new Set(data.map((item: RABProps) => item.revision))
                ).map((rev) => ({ revisi: rev }));

                const tahunOpts = buildTahunOptions(data);
                const satkerOpts = buildSatkerOptions(data);

                setRabData(SortDescById(mappingData));
                setTahunData(tahunOpts);
                setSatkerData(satkerOpts);
                setRevisionCount(revisions)
            } catch (error) {
                console.error(error);
            }
        }

        const fetchRabById = async () => {
            try {
                if (!selectedId) return;
                const response = await API.get(`/rab/${selectedId}`);
                const data = response?.data?.data;

                // const filteredDataByRevision = data?.filter((item))

                setRabDataById(response?.data?.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchRab();
        fetchRabById();
    }, [selectedId]);

    const handleRABPost = async (dataRabHead: NewTenderProps, dataRabDetail: RABDetailProps[]) => {
        try {
            if (!dataRabHead || !dataRabDetail) {
                SwalMessage({
                    type: "error",
                    title: "Gagal!",
                    text: "Harap isi field yang telah disediakan!"
                });

                return;
            }

            SwalLoading();
            const responseRabHeader = await API.post("/rab/create", {
                tahun_anggaran: Number(dataRabHead.tahun_anggaran),
                satuan_kerja: dataRabHead.nama_satker?.toString(),
                kode_rup: dataRabHead.kd_rup?.toString(),
                kode_tender: dataRabHead.kd_tender?.toString(),
                nama_paket: dataRabHead.nama_paket?.toString(),
                lokasi_pekerjaan: dataRabHead.lokasi_pekerjaan?.toString(),
                program: program?.toString(),
                activity: activity?.toString(),
                start_date: startDate?.toString(),
                end_date: endDate?.toString()

            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const rabHeaderId = responseRabHeader.data.data.id;
            let responseRabDetail;

            for (let index = 0; index < dataRabDetail.length; index++) {
                const data = dataRabDetail[index];
                responseRabDetail = await API.post("/rab/detail/create", {
                    rab_header_id: rabHeaderId,
                    description: data.description,
                    volume: data.volume,
                    unit: data.unit,
                    unit_price: data.unit_price,
                    total: data.total
                });
            }

            const message = responseRabDetail?.data.message;
            SwalMessage({
                type: "success",
                title: "Berhasil!",
                text: message
            });

            setTimeout(() => {
                navigate("/ppk/rencana-anggaran/");
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

    const handleRABPut = async (dataRabHead: NewTenderProps, groupRabHeader: RABProps, reason: string) => {
        try {
            if (!dataRabHead) {
                SwalMessage({
                    type: "error",
                    title: "Gagal!",
                    text: "Belum ada data yang diubah!"
                });

                return;
            }

            SwalLoading();
            const responseRabHeader = await API.post("/rab/create", {
                rab_group_id: groupRabHeader.rab_group_id,
                tahun_anggaran: Number(dataRabHead.tahun_anggaran),
                satuan_kerja: dataRabHead.nama_satker?.toString(),
                kode_rup: dataRabHead.kd_rup?.toString(),
                kode_tender: dataRabHead.kd_tender?.toString(),
                nama_paket: dataRabHead.nama_paket?.toString(),
                lokasi_pekerjaan: dataRabHead.lokasi_pekerjaan?.toString(),
                program: program?.toString(),
                activity: activity?.toString(),
                start_date: startDate?.toString(),
                end_date: endDate?.toString(),
                revision_text: reason,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const rabHeaderId = responseRabHeader.data.data.id;
            const dataRabDetail = groupRabHeader.rab_details;
            let responseRabDetail;

            for (let index = 0; index < dataRabDetail.length; index++) {
                const data = dataRabDetail[index];
                responseRabDetail = await API.post("/rab/detail/create", {
                    rab_header_id: rabHeaderId,
                    description: data.description,
                    volume: data.volume,
                    unit: data.unit,
                    unit_price: data.unit_price,
                    total: data.total
                });
            }

            const message = responseRabDetail?.data.message;
            SwalMessage({
                type: "success",
                title: "Berhasil!",
                text: message
            });

            setTimeout(() => {
                navigate("/ppk/rencana-anggaran/");
            }, 2000);
        } catch (error) {
            if (error) {
                SwalMessage({
                    title: "Gagal!",
                    text: "Terjadi Kesalahan!",
                    type: "error"
                })
            }
            console.error(error);
        }
    }

    const handleChangeRAB = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name == "program") return setProgram(value);
        if (name == "activity") return setActivity(value);
        if (name == "start") return setStartDate(value);
        if (name == "end") return setEndDate(value);
    }

    return {
        handleRABPost,
        handleChangeRAB,
        program,
        activity,
        startDate,
        endDate,
        rabData,
        tahunData,
        satkerData,
        setSelectedId,
        rabDataByid,
        handleRABPut,
        revisionCount
    }
}
