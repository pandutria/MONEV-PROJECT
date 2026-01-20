import { useEffect, useState } from "react";
import MONEV_API from "../server/MonevAPI";

export default function KatalogV6Data() {
  const [katalogv6, setKatalogV6] = useState<KatalogV6DataProps[]>([]);
  const [tahun, setTahun] = useState<string>("2025");
  
  useEffect(() => {
    const fetchKatalogV6Data = async () => {
      try {
        const response = await MONEV_API.get(`/katalogv6?tahun=${tahun}`);
        setKatalogV6(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchKatalogV6Data();
  }, [tahun]);

  return {
    katalogv6,
    setTahun
  };
}
