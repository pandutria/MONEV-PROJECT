import { useEffect, useState } from "react";
import MONEV_API from "../server/MonevAPI";

export default function NonTenderData() {
  const [nonTenderData, setNonTenderData] = useState<NonTenderDataProps[]>([]);
  const [tahun, setTahun] = useState<string>("2025");
  
  useEffect(() => {
    const fetchNonTenderData = async () => {
      try {
        const response = await MONEV_API.get(`/nontenderselesai?tahun=${tahun}`);
        setNonTenderData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchNonTenderData()
  }, [tahun]);

  return {
    nonTenderData,
    setTahun
  }
}
