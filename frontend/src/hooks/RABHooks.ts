import { SwalMessage } from "../utils/SwalMessage";
import API from "../server/API";
import SwalLoading from "../utils/SwalLoading";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

export default function useRABHooks() {
    const token = localStorage.getItem("token");
    const [program, setProgram] = useState("");
    const [activity, setActivity] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const navigate = useNavigate();

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
        endDate
    }
}
