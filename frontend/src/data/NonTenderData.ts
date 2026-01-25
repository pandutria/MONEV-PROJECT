import { useEffect, useState } from "react";
// import MONEV_API from "../server/MonevAPI";
import API from "../server/API";

export default function NonTenderData() {
  const [nonTenderData, setNonTenderData] = useState<NonTenderDataProps[]>([]);
  const [nonTenderTahun, setNonTenderTahun] = useState<string>("2025");
  
  useEffect(() => {
    const fetchNonTenderData = async () => {
      try {
        const response = await API.get(`/non-tender-selesai?tahun=${nonTenderTahun}`);
        // const response = await MONEV_API.get(`/nontenderselesai?tahun=${nonTenderTahun}`);
        setNonTenderData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchNonTenderData()
  }, [nonTenderTahun]);

  return {
    nonTenderData,
    nonTenderTahun,
    setNonTenderTahun
  }
}
