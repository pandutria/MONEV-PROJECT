import { useEffect, useState } from "react";
import API from "../server/API";

export default function useNewTenderInaprocHooks() {
    const [newTenderInaprocHooks, setNewTenderInaprocHooks] = useState<NewTenderProps[]>([]);
    const [isPurchasing, setIsPurchasing] = useState(false);
    const [kdPaket, setKdPaket] = useState();

    useEffect(() => {
        const fetchTender = async () => {
            try {
                const responseData1 = await API.get("/tender_isbs");
                const responseData2 = await API.get("/tender_kontrak_isbs");
                const responseData3 = await API.get("/tender_tahap_isbs");
                const responseData4 = await API.get("/tender_selesai_isbs");
                const purchasing = await API.get(`/paket_purchasing`);

                const data1 = responseData1.data.data;
                const data2 = responseData2.data.data;
                const data3 = responseData3.data.data;
                const data4 = responseData4.data.data;
                const purchasingData = purchasing.data.data;
                console.log(purchasingData[0].jabatan_ppk);

                // let allData;
                // if (isPurchasing) {
                //     allData = [...data4];
                // } else {
                // }
                const allData = [...data1, ...data2, ...data3, ...data4];

                const tenderMap = new Map<number, NewTenderProps>();

                for (const item of allData) {
                    if (!item.kd_tender) continue;
                    const existing = tenderMap.get(item.kd_tender);

                    if (existing) {
                        tenderMap.set(item.kd_tender, { ...existing, ...item });
                    } else {
                        tenderMap.set(item.kd_tender, { ...item });
                    }
                }

                const uniqueTenders: NewTenderProps[] = Array.from(tenderMap.values());
                setNewTenderInaprocHooks(uniqueTenders);
            } catch (error) {
                console.error(error);
            }
        }

        fetchTender();
    }, []);

    return {
        newTenderInaprocHooks,
        setKdPaket,
        setIsPurchasing,
        
    }
}
