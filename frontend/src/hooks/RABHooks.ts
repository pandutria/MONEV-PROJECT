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

    useEffect(() => {
        const fetchRab = async () => {
            try {
                const response = await API.get("/rab");
                const mappingData = response.data.data.map((item: RABProps) => ({
                    id: item.id,
                    fiscal_year: item.tender?.fiscal_year,
                    satker_name: item.tender?.satker_name,
                    rup_code: item.tender?.rup_code,
                    tender_code: item.tender?.tender_code,
                    package_name: item.tender?.package_name ? item.tender?.package_name : "Tidak Ada",
                    revisi: item.revision_count,
                    program: item.program,
                    activity: item.activity,
                    start_date: item.start_date,
                    end_date: item.end_date,
                    revision_text: item.revision_text,
                    revision_count: item.revision_count
                }));

                const tahunUnique = Array.from(
                    new Set(
                        mappingData
                            .map((item: { fiscal_year: any; }) => item.fiscal_year)
                            .filter(Boolean)
                    )
                ).sort((a, b) => Number(b) - Number(a));

                const tahunOptions = tahunUnique.map((tahun, index) => ({
                    id: index + 1,
                    tahun: tahun?.toString()
                }));


                const satkerUnique = Array.from(
                    new Set(
                        mappingData
                            .map((item: { satker_name: any; }) => item.satker_name)
                            .filter(Boolean)
                    )
                );

                const satkerOptions = [
                    ...satkerUnique.map((satker, index) => ({
                        id: index + 2,
                        text: satker
                    }))
                ];

                setRabData(SortDescById(mappingData));
                setTahunData(tahunOptions);
                setSatkerData(satkerOptions);
            } catch (error) {
                console.error(error);
            }
        }

        const fetchRabById = async () => {
            try {
                if (!selectedId) return;
                const response = await API.get(`/rab/${selectedId}`);
                setRabDataById(response?.data?.data);
            } catch (error) {
                console.error(error);
            }
        }        

        fetchRab();
        fetchRabById();
    }, [selectedId]);

    const handleRABPost = async (dataRabHead: TenderProps, dataRabDetail: RABDetailProps[]) => {
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
                tender_id: dataRabHead.id,
                program: program,
                activity: activity,
                start_date: startDate,
                end_date: endDate

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
        }
    }

    const handleRABPut = async (dataRabHead: TenderProps, reason: string) => {
        try {
            if (!dataRabHead) {
                SwalMessage({
                    type: "error",
                    title: "Gagal!",
                    text: "Harap isi field yang telah disediakan!"
                });

                return;
            }

            SwalLoading();
            const response = await API.put(`/rab/update/${dataRabHead.id}`, {
                tender_id: dataRabHead.id,
                program: program,
                activity: activity,
                start_date: startDate,
                end_date: endDate,
                revision_text: reason,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });            

            const message = response?.data.message;
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
        handleRABPut
    }
}
