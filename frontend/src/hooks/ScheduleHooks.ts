/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { SwalMessage } from "../utils/SwalMessage";
import API from "../server/API";
import SwalLoading from "../utils/SwalLoading";
import { useNavigate } from "react-router-dom";
import { SortDescById } from "../utils/SortDescById";

export default function useScheduleHooks() {
    const [schedule, setSchedule] = useState<ScheduleProps[]>([]);
    const [tahunData, setTahunData] = useState<any>([]);
    const [satkerData, setSatkerData] = useState<any>([]);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [scheduleDataById, setScheduleDataById] = useState<ScheduleProps | null>(null);
    const [selectedId, setSelectedId] = useState<any>(null);

    useEffect(() => {
        const fetcSchedule = async () => {
            try {
                const response = await API.get("/schedule");
                const mappingData = response.data.data.map((item: ScheduleProps | any) => ({
                    id: item.id,
                    fiscal_year: item.rab?.tender?.fiscal_year,
                    satker_name: item.rab?.tender?.satker_name,
                    rup_code: item.rab?.tender?.rup_code,
                    tender_code: item.rab?.tender?.tender_code,
                    package_name: item.rab?.tender?.package_name ? item.rab?.package_name : "Tidak Ada",
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

                setSchedule(SortDescById(mappingData));
                setTahunData(tahunOptions);
                setSatkerData(satkerOptions);
            } catch (error) {
                console.error(error);
            }
        }

        const fetcScheduleById = async () => {
            try {
                if (!selectedId) return;
                const response = await API.get(`/schedule/${selectedId}`);

                const data = response.data.data;
                const responseResource = {
                    id: data.id,
                    schedule_details: data.items.map((details: ScheduleItemProps) => ({
                        id: details.id,
                        description: details.description,
                        number: details.number,
                        total_price: details.total_price,
                        weight: details.weight,
                        schedule_weeks: details.schedule_weeks?.map((week: ScheduleWeekProps) => (
                            week.value
                        ))
                    })),
                    rab: data.rab,
                    revision_count: data.revision_count,
                    revision_text: data.revision_text
                }
                
                console.log(responseResource);
                setScheduleDataById(responseResource as any);
            } catch (error) {
                console.error(error);
            }
        }  

        fetcSchedule();
        fetcScheduleById();
    }, [selectedId]);

    const handleSchedulePost = async (dataTenderByRab: RABProps, dataItem: any[]) => {
        try {
            if (dataItem.length < 0) {
                SwalMessage({
                    type: "error",
                    title: "Gagal!",
                    text: "Harap isi field yang telah kami sediakan!"
                });

                return;
            }

            SwalLoading();
            const responseScheduleHeader = await API.post("/schedule/create", {
                rab_id: dataTenderByRab.id
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            for (let index = 0; index < dataItem.length; index++) {
                const scheduleItem = dataItem[index];

                const responseScheduleItem = await API.post("/schedule/item/create", {
                    schedule_header_id: responseScheduleHeader.data.data?.id,
                    description: scheduleItem?.description,
                    number: (index + 1).toString(),
                    weight: scheduleItem?.weight,
                    total_price: Number(scheduleItem?.total_price)
                });

                for (let index = 0; index < scheduleItem.minggu.length; index++) {
                    const scheduleWeek = scheduleItem.minggu[index];

                    await API.post('/schedule/week/create', {
                        schedule_item_id: responseScheduleItem.data.data?.id,
                        week_number: index + 1,
                        value: scheduleWeek
                    });
                }
            }

            SwalMessage({
                type: "success",
                title: "Berhasil!",
            });

            setTimeout(() => {
                navigate(-1);
            }, 2000);
        } catch (error) {
            if (error) {
                SwalMessage({
                    type: "error",
                    title: "Gagal!",
                    text: "Terjadi Kesalahan!"
                });
            }

            console.error(error);
        }
    }

    const handleSchedulePut = async (dataTenderByRab: RABProps, reason: string) => {
        try {
            SwalLoading();
            const response = await API.put(`/schedule/update/${selectedId}`, {
                rab_id: dataTenderByRab.id,
                revision_text: reason
            });            
                                    
            SwalMessage({
                type: "success",
                title: "Berhasil!",
                text: response.data.message,
            });

            setTimeout(() => {
                navigate(-1);
            }, 2000);
        } catch (error) {
            if (error) {
                SwalMessage({
                    type: "error",
                    title: "Gagal!",
                    text: "Terjadi Kesalahan!"
                });
            }

            console.error(error);
        }
    }

    return {
        handleSchedulePost,
        schedule,
        tahunData,
        satkerData,
        setSelectedId,
        scheduleDataById,
        handleSchedulePut
    }
}
