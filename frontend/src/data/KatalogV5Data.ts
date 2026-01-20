import { useEffect, useState } from "react";
import MONEV_API from "../server/MonevAPI";

export default function KatalogV5Data() {
  const [katalogv5, setKatalogV5] = useState<KatalogV5DataProps[]>([]);
  const [tahun, setTahun] = useState<string>("2025");
  
  useEffect(() => {
    const fetchKatalogV5Data = async () => {
      try {
        const response = await MONEV_API.get(`/katalogv5?tahun=${tahun}`);
        setKatalogV5(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchKatalogV5Data();
  }, [tahun]);

  return {
    katalogv5,
    setTahun
  };
}
