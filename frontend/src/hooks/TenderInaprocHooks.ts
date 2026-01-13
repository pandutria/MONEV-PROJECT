import { useEffect, useState } from "react";
import API from "../server/API";

export default function useTenderInaprocHooks() {
    const [tenderData, setTenderData] = useState<TenderProps[]>([]);    

    useEffect(() => {
        const fetchTender = async() => {
            try {
                const response = await API.get("/inaproc/cache");
                const mappingData = response.data.data.map((item: TenderProps) => ({
                    ...item,
                    tender_code: item.tender_code == "" ?  "Tidak Ada" : item.tender_code,
                    rup_code: item.rup_code == "" ? "Tidak Ada" : item.rup_code,
                    satker_name: item.satker_name == "" ? "Tidak Ada" : item.satker_name,
                    rup_name: item.rup_name == "" ? "Tidak Ada" : item.rup_name,
                    funding_source: item.funding_source == "" ? "Tidak Ada" : item.funding_source,
                    fiscal_year: item.fiscal_year == 0 ? "-" : item.fiscal_year,

                }));

                setTenderData(mappingData);
            } catch (error) {
                console.error(error);
            }
        }

        fetchTender();
    }, []);

    return {
        tenderData
    }
}
