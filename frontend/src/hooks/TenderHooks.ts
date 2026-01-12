import { useEffect, useState } from "react";
import API from "../server/API";

export default function useTenderHooks() {
    const [tenderData, setTenderData] = useState<TenderProps[]>([]);

    useEffect(() => {
        const fetchTender = async() => {
            try {
                const response = await API.get("/inaproc/cache");
                setTenderData(response.data.data);
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
