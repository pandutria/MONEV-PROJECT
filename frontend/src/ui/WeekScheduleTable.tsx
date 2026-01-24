/* eslint-disable @typescript-eslint/no-explicit-any */
import { Trash2, FileText } from "lucide-react";
import FormatRupiah from "../utils/FormatRupiah";
import { BASE_URL_FILE } from "../server/API";

interface WeekScheduleTableProps {
    totalMinggu: number;
    dataFile: ScheduleItemProps[];
    handleDeleteRow: (index: number) => void;
    showDelete?: boolean;
    isRealization?: boolean;
    realizationData?: RealizationDetailProps[];
}

export default function WeekScheduleTable({ totalMinggu, dataFile, handleDeleteRow, showDelete = true, isRealization = false, realizationData }: WeekScheduleTableProps) {
    const getWeeklyCumulativeValue = (weekIdx: number) => {
        return dataFile?.reduce((sum: number, item: ScheduleItemProps) => {
            const cumulativeForItem = item.schedule_weeks
                .slice(0, weekIdx + 1)
                .reduce((acc, val) => {
                    return acc + (Number(showDelete ? val : val.value) || 0);
                }, 0);
            return sum + cumulativeForItem;
        }, 0) || 0;
    };

    const getWeeklyRealizationValue = (weekIdx: number) => {
        return realizationData?.find((item: any) => Number(item.week_number) === weekIdx + 1)?.value || 0;
    };

    const getRealizationCumulativeValue = (weekIdx: number) => {
        let cumulative = 0;
        for (let i = 0; i <= weekIdx; i++) {
            const weekValue = realizationData?.find((item: any) => Number(item.week_number) === i + 1)?.value || 0;
            cumulative += Number(weekValue);
        }
        return cumulative;
    };

    const getWeeklyEvidence = (weekIdx: number) => {
        return realizationData?.filter((item: any) => Number(item.week_number) === weekIdx + 1) || [];
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-linear-to-r from-primary/20 to-primary/10 border-b-2 border-primary/30">
                                <th className="px-6 py-4 text-left font-poppins-semibold text-gray-800 text-sm">
                                    Keterangan
                                </th>
                                <th className="px-6 py-4 text-center font-poppins-semibold text-gray-800 text-sm">
                                    Jumlah
                                </th>
                                <th className="px-6 py-4 text-center font-poppins-semibold text-gray-800 text-sm">
                                    Bobot (%)
                                </th>
                                <th
                                    colSpan={totalMinggu}
                                    className="px-6 py-4 text-center font-poppins-semibold text-gray-800 text-sm bg-primary/5"
                                >
                                    Minggu Pelaksanaan
                                </th>
                                {showDelete && (
                                    <th className="px-6 py-4 text-center font-poppins-semibold text-gray-800 text-sm">
                                        Aksi
                                    </th>
                                )}
                            </tr>
                            <tr className="bg-primary/5 border-b border-gray-200">
                                <th colSpan={3}></th>
                                {Array.from({ length: totalMinggu }).map((_, i) => (
                                    <th
                                        key={i}
                                        className="px-4 py-3 text-center font-poppins-medium text-xs text-gray-700 border-l border-gray-200 hover:bg-primary/10 transition-colors duration-200"
                                    >
                                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary font-poppins-bold text-xs ring-1 ring-primary/20">
                                            {i + 1}
                                        </span>
                                    </th>
                                ))}
                                <th></th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            {dataFile?.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={totalMinggu + 5}
                                        className="px-6 py-12 text-center"
                                    >
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="text-gray-300">
                                                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                            </div>
                                            <p className="font-poppins-medium text-gray-500">Tidak ada data</p>
                                            <p className="font-poppins-regular text-gray-400 text-sm">Upload file Excel untuk menampilkan jadwal pelaksanaan</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                <>
                                    {dataFile?.map((item: ScheduleItemProps, index: any) => (
                                        <tr key={index} className="hover:bg-primary/5 transition-all duration-200 border-b border-gray-100">
                                            <td className="px-6 py-4 font-poppins-medium text-sm text-gray-800 max-w-xs">
                                                <div className="truncate hover:text-clip" title={item.description}>
                                                    {item.description}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="inline-flex items-center justify-center px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-poppins-medium text-xs ring-1 ring-blue-200">
                                                    {FormatRupiah(Number(item.total_price))}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="inline-flex items-center justify-center px-3 py-1 bg-amber-50 text-amber-700 rounded-full font-poppins-medium text-xs ring-1 ring-amber-200">
                                                    {item.weight}%
                                                </span>
                                            </td>
                                            {showDelete ? (
                                                item.schedule_weeks.map((val, i) => (
                                                    <td
                                                        key={i}
                                                        className="px-4 py-4 text-center border-l border-gray-200 bg-primary/2 hover:bg-primary/5 transition-all duration-200"
                                                    >
                                                        <div className={`flex items-center justify-center h-8 rounded font-poppins-bold text-sm transition-all duration-200 ${Number(val) > 0
                                                            ? 'bg-green-100 text-green-700 ring-1 ring-green-200'
                                                            : 'text-gray-400'
                                                            }`}>
                                                            {Number(val) > 0 ? val : "-" as any}
                                                        </div>
                                                    </td>
                                                ))
                                            ) : (
                                                item.schedule_weeks.map((val, i) => (
                                                    <td
                                                        key={i}
                                                        className="px-4 py-4 text-center border-l border-gray-200 bg-primary/2 hover:bg-primary/5 transition-all duration-200"
                                                    >
                                                        <div className={`flex items-center justify-center h-8 rounded font-poppins-bold text-sm transition-all duration-200 ${Number(val.value) > 0
                                                            ? 'bg-green-100 text-green-700 ring-1 ring-green-200'
                                                            : 'text-gray-400'
                                                            }`}>
                                                            {Number(val.value) > 0 ? val.value : "-" as any}
                                                        </div>
                                                    </td>
                                                ))
                                            )}
                                            {showDelete && (
                                                <td className="px-6 py-4 text-center">
                                                    <button
                                                        onClick={() => handleDeleteRow(index)}
                                                        className="inline-flex items-center gap-2 px-3 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-all duration-200 hover:shadow-md active:scale-95 ring-1 ring-red-200"
                                                        title="Hapus baris"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </td>
                                            )}
                                        </tr>
                                    ))}

                                    <tr className="bg-linear-to-r from-primary/10 to-primary/5 border-t-2 border-primary/30">
                                        <td className="px-6 py-4 font-poppins-semibold text-gray-700 text-sm">
                                            Jumlah
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="inline-flex items-center justify-center px-4 py-1.5 bg-blue-100 text-blue-800 rounded-full font-poppins-bold text-sm ring-2 ring-blue-300 shadow-sm">
                                                {FormatRupiah(
                                                    dataFile?.reduce(
                                                        (sum: number, item: ScheduleItemProps) => sum + Number(item.total_price),
                                                        0
                                                    )
                                                )}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="inline-flex items-center justify-center px-4 py-1.5 bg-amber-100 text-amber-800 rounded-full font-poppins-bold text-sm ring-2 ring-amber-300 shadow-sm">
                                                {dataFile?.reduce((sum: number, item: ScheduleItemProps) => sum + item.weight, 0)}%
                                            </span>
                                        </td>
                                        {Array.from({ length: totalMinggu }).map((_, i) => (
                                            <td key={i} className="border-l border-gray-200 bg-primary/3"></td>
                                        ))}
                                        <td></td>
                                    </tr>

                                    <tr className="bg-blue-50/50 hover:bg-blue-50 transition-colors duration-200">
                                        <td
                                            colSpan={3}
                                            className="px-6 py-4 font-poppins-semibold text-gray-700 text-sm"
                                        >
                                            <div className="flex items-center gap-2">
                                                <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                                                Kemajuan Pekerjaan Mingguan
                                            </div>
                                        </td>
                                        {Array.from({ length: totalMinggu }).map((_, weekIdx) => (
                                            <td
                                                key={weekIdx}
                                                className="px-4 py-4 text-center border-l border-gray-200"
                                            >
                                                <div className="inline-flex items-center justify-center min-w-12 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg font-poppins-bold text-sm ring-1 ring-blue-300 shadow-sm hover:shadow-md transition-all duration-200">
                                                    {showDelete ? (
                                                        dataFile?.reduce(
                                                            (sum: number, item: ScheduleItemProps) =>
                                                                sum + (Number(item.schedule_weeks[weekIdx]) || 0),
                                                            0
                                                        )
                                                    ) : (
                                                        dataFile?.reduce(
                                                            (sum: number, item: ScheduleItemProps) =>
                                                                sum + (Number(item.schedule_weeks[weekIdx].value) || 0),
                                                            0
                                                        )
                                                    )}
                                                </div>
                                            </td>
                                        ))}
                                        <td></td>
                                    </tr>

                                    <tr className="bg-emerald-50/50 hover:bg-emerald-50 transition-colors duration-200">
                                        <td
                                            colSpan={3}
                                            className="px-6 py-4 font-poppins-semibold text-gray-700 text-sm"
                                        >
                                            <div className="flex items-center gap-2">
                                                <div className="w-1 h-6 bg-emerald-500 rounded-full"></div>
                                                Kemajuan Kumulatif Mingguan
                                            </div>
                                        </td>
                                        {Array.from({ length: totalMinggu }).map((_, weekIdx) => (
                                            <td
                                                key={weekIdx}
                                                className="px-4 py-4 text-center border-l border-gray-200"
                                            >
                                                <div className="inline-flex items-center justify-center min-w-12 px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-lg font-poppins-bold text-sm ring-1 ring-emerald-300 shadow-sm hover:shadow-md transition-all duration-200">
                                                    {getWeeklyCumulativeValue(weekIdx)}
                                                </div>
                                            </td>
                                        ))}
                                        <td></td>
                                    </tr>

                                    {isRealization && (
                                        <tr className="bg-blue-50/50 hover:bg-blue-50 transition-colors duration-200">
                                            <td
                                                colSpan={3}
                                                className="px-6 py-4 font-poppins-semibold text-gray-700 text-sm"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <div className="w-1 h-6 bg-red-500 rounded-full"></div>
                                                    Realisasi
                                                </div>
                                            </td>
                                            {Array.from({ length: totalMinggu }).map((_, weekIdx) => (
                                                <td
                                                    key={weekIdx}
                                                    className="px-4 py-4 text-center border-l border-gray-200"
                                                >
                                                    <div className="inline-flex items-center justify-center min-w-12 px-3 py-1.5 bg-red-100 text-red-700 rounded-lg font-poppins-bold text-sm ring-1 ring-red-300 shadow-sm hover:shadow-md transition-all duration-200">
                                                        {getWeeklyRealizationValue(weekIdx) || "-"}
                                                    </div>
                                                </td>
                                            ))}
                                            <td></td>
                                        </tr>
                                    )}

                                    {isRealization && (
                                        <tr className="bg-emerald-50/50 hover:bg-emerald-50 transition-colors duration-200">
                                            <td
                                                colSpan={3}
                                                className="px-6 py-4 font-poppins-semibold text-gray-700 text-sm"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <div className="w-1 h-6 bg-yellow-500 rounded-full"></div>
                                                    Kemajuan Realisasi
                                                </div>
                                            </td>
                                            {Array.from({ length: totalMinggu }).map((_, weekIdx) => (
                                                <td
                                                    key={weekIdx}
                                                    className="px-4 py-4 text-center border-l border-gray-200"
                                                >
                                                    <div className="inline-flex items-center justify-center min-w-12 px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-lg font-poppins-bold text-sm ring-1 ring-yellow-300 shadow-sm hover:shadow-md transition-all duration-200">
                                                        {getRealizationCumulativeValue(weekIdx) || "-"}
                                                    </div>
                                                </td>
                                            ))}
                                            <td></td>
                                        </tr>
                                    )}
                                </>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {isRealization && realizationData && realizationData.length > 0 && (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="px-6 py-4 border-b-2 border-primary/30 bg-linear-to-r from-primary/20 to-primary/10">
                        <h2 className="font-poppins-semibold text-lg text-gray-800">
                            Bukti Realisasi Per Minggu
                        </h2>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {Array.from({ length: totalMinggu }).map((_, weekIdx) => {
                                const weekEvidence = getWeeklyEvidence(weekIdx);
                                const firstEvidence = weekEvidence?.[0];
                                return (
                                    <div key={weekIdx} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 flex flex-col items-center justify-center text-center">
                                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-poppins-bold text-sm ring-1 ring-primary/20 mb-3">
                                            {weekIdx + 1}
                                        </span>
                                        <h3 className="font-poppins-semibold text-gray-800 mb-3">
                                            Minggu {weekIdx + 1}
                                        </h3>
                                        {firstEvidence ? (
                                            <button
                                                onClick={() => window.open(`${BASE_URL_FILE}/${firstEvidence.bukti_file}`, '_blank')}
                                                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all duration-200 font-poppins-medium text-sm"
                                            >
                                                <FileText className="w-4 h-4" />
                                                Lihat Bukti
                                            </button>
                                        ) : (
                                            <div className="text-sm text-gray-500 font-poppins-regular">
                                                Belum ada bukti
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}