/* eslint-disable @typescript-eslint/no-explicit-any */

export const FormatPackage = (
  data: any[],
  mode: 'top' | 'bottom' = 'top'
) => {
  const formatted = data.map((item) => {
    const schedule = item.schedule;
    const dataEntry = schedule?.rab?.data_entry;

    const perencanaan =
      schedule?.items?.reduce((acc: number, i: any) => {
        const sum =
          i.schedule_weeks?.reduce(
            (s: number, w: any) => s + Number(w.value),
            0
          ) || 0;
        return acc + sum;
      }, 0) || 0;

    const aktual =
      item.detail?.reduce(
        (acc: number, d: any) => acc + Number(d.value),
        0
      ) || 0;

    const deviasi_abs = Math.abs(perencanaan - aktual);
    const deviasi_persen =
      perencanaan === 0 ? 0 : (deviasi_abs / perencanaan) * 100;

    return {
      id: item.id,
      tahun_anggaran: dataEntry?.tahun_anggaran || "",
      satuan_kerja: dataEntry?.satuan_kerja || "",
      kode_paket: dataEntry?.kode_paket || "",
      nama_paket: dataEntry?.nama_paket || "",
      tanggal_mulai: schedule?.rab?.tanggal_mulai || "",
      tanggal_akhir: schedule?.rab?.tanggal_akhir || "",
      perencanaan,
      aktual,
      deviasi: deviasi_abs,
      deviasi_persen,
    };
  });

  return [...formatted].sort((a, b) =>
    mode === 'top'
      ? a.deviasi_persen - b.deviasi_persen 
      : b.deviasi_persen - a.deviasi_persen  
  );
};
