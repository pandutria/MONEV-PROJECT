import { useEffect, useState } from "react";
import MONEV_API from "../server/MonevAPI";

export default function TenderData() {
  const [tenderData, setTenderData] = useState<NonTenderDataProps[]>([]);
  const [tahun, setTahun] = useState<string>("2025");
  
  useEffect(() => {
    const fetchTenderData = async () => {
      try {
        const response = await MONEV_API.get(`/nontenderselesai?tahun=${tahun}`);
        setTenderData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchTenderData()
  }, [tahun]);

  return {
    tenderData,
    setTahun
  };
}
