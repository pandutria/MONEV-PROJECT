/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { SwalMessage } from "../utils/SwalMessage";
import API from "../server/API";
import SwalLoading from "../utils/SwalLoading";
import { useNavigate } from "react-router-dom";
import { SortDescById } from "../utils/SortDescById";

export default function useScheduleHooks() {
    const [scheduleData, setScheduleData] = useState<ScheduleProps[]>([]);
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
                const mappingData = response.data.data.map((item: ScheduleProps) => ({
                    ...item,
                    tahun_anggaran: item.rab?.data_entry.tahun_anggaran,
                    satuan_kerja: item.rab?.data_entry.satuan_kerja,
                    kode_rup: item.rab?.data_entry?.satuan_kerja,
                    kode_paket: item.rab?.data_entry?.kode_paket,
                    nama_paket: item.rab?.data_entry?.nama_paket,
                    program: item.rab?.program,
                    tanggal_mulai: item.rab?.tanggal_mulai,
                    tanggal_akhir: item.rab?.tanggal_akhir,
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

                setScheduleData(SortDescById(mappingData));
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
                setScheduleDataById(data);
            } catch (error) {
                console.error(error);
            }
        }  

        fetcSchedule();
        fetcScheduleById();
    }, [selectedId]);

    const handleSchedulePost = async (dataTenderByRab: RABProps, dataItem: ScheduleItemProps[]) => {
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

                for (let index = 0; index < scheduleItem.schedule_weeks.length; index++) {
                    const scheduleWeek = scheduleItem.schedule_weeks[index];

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
                text: "Jadwal Pelaksanaan berhasil ditambahkan!"
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
        }
    }

    const handleSchedulePut = async (dataTenderByRab: RABProps, scheduleGroupId: number, dataItem: ScheduleItemProps[], reason: string) => {
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
            const response = await API.post("/schedule/create", {
                rab_id: dataTenderByRab.id,
                rab_group_id: scheduleGroupId,
                alasan_text: reason,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            SwalMessage({
                type: "success",
                title: "Berhasil!",
                text: response.data.message
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
        }
    }

    return {
        handleSchedulePost,
        scheduleData,
        tahunData,
        satkerData,
        setSelectedId,
        scheduleDataById,
        handleSchedulePut
    }
}
