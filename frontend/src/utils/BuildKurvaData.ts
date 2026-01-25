export function buildKurvaData(
  schedule?: ScheduleProps | null,
  realization?: {
    detail?: { week_number: string | number; value: string | number | null }[]
  } | null
): { minggu: number; rencana: number; aktual: number }[] {
  if (!schedule?.items?.length) return [];

  const rencanaMap = new Map<number, number>();
  const aktualMap = new Map<number, number>();

  // === RENCANA ===
  for (const item of schedule.items) {
    for (const w of item.schedule_weeks ?? []) {
      const week = Number(w.week_number);
      const value = Number(w.value ?? 0);

      if (!Number.isFinite(week) || !Number.isFinite(value)) continue;

      rencanaMap.set(week, (rencanaMap.get(week) ?? 0) + value);
    }
  }

  // === AKTUAL ===
  for (const d of realization?.detail ?? []) {
    const week = Number(d.week_number);
    const value = Number(d.value ?? 0);

    if (!Number.isFinite(week) || !Number.isFinite(value)) continue;

    aktualMap.set(week, (aktualMap.get(week) ?? 0) + value);
  }

  const weeks = [...rencanaMap.keys()].sort((a, b) => a - b);

  let rencanaCum = 0;
  let aktualCum = 0;

  return weeks.map(week => {
    rencanaCum += rencanaMap.get(week) ?? 0;
    aktualCum += aktualMap.get(week) ?? 0;

    return {
      minggu: week,
      rencana: Math.round(rencanaCum),
      aktual: Math.round(aktualCum)
    };
  });
}
