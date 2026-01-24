/* eslint-disable @typescript-eslint/no-explicit-any */
import { X } from "lucide-react";
import useRealisasiHooks from "../hooks/RealisasiHooks";

interface RealizationModalProps {
    selectedSchedule: any;
    setShowRealisasiModal: any;
    type?: 'post' | 'put'
}

export default function RealizationModal({ selectedSchedule, setShowRealisasiModal, type = 'post' }: RealizationModalProps) {
    const {
        week,
        target,
        file,
        handleRealizationPost,
        handleRealizationPut,
        handleChangeRealization
    } = useRealisasiHooks();

    let maxWeeks;
    if (type === 'post') {
        maxWeeks = selectedSchedule?.items?.map((item: { schedule_weeks: string | any[]; }) => item.schedule_weeks?.length || 0)?.reduce((max: number, len: number) => Math.max(max, len), 0) || 0;
    } else {
        maxWeeks = selectedSchedule?.schedule?.items?.map((item: { schedule_weeks: string | any[]; }) => item.schedule_weeks?.length || 0)?.reduce((max: number, len: number) => Math.max(max, len), 0) || 0;
    }
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black/20 z-30">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md max-h-[90vh] overflow-y-auto relative">
                <div className="flex justify-between items-center mb-6 sticky top-0 bg-white pb-4">
                    <h2 className="font-poppins-bold text-xl text-gray-800">
                        REALISASI PELAKSANAAN
                    </h2>
                    <button
                        onClick={() => setShowRealisasiModal(false)}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="space-y-6 font-poppins-regular">
                    <div>
                        <label className="block font-poppins-medium text-sm text-gray-700 mb-2">
                            Minggu Ke-
                        </label>
                        <select value={week} name="week" onChange={handleChangeRealization} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all duration-200">
                            <option value="" disabled selected>Pilih Minggu</option>
                            {Array.from({ length: maxWeeks }).map((_, i) => (
                                <option key={i + 1} value={i + 1}>
                                    Minggu {i + 1}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block font-poppins-medium text-sm text-gray-700 mb-2">
                            Target Persentase (%)
                        </label>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            name="target"
                            value={target}
                            onChange={handleChangeRealization}
                            placeholder="Masukkan target persentase"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all duration-200"
                        />
                    </div>

                    <div>
                        <label className="block font-poppins-medium text-sm text-gray-700 mb-2">
                            Bukti Dokumen
                        </label>
                        <div className="relative">
                            <input
                                type="file"
                                onChange={handleChangeRealization}
                                name="file"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-poppins-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                            />
                        </div>
                        {file && (
                            <p className="text-sm text-green-600 font-poppins-medium mt-2">
                                ✓ {file.name}
                            </p>
                        )}
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            onClick={() => setShowRealisasiModal(false)}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-poppins-medium text-gray-700 hover:bg-gray-50 transition-all duration-200"
                        >
                            Batal
                        </button>
                        {type === "post" ? (
                            <button onClick={() => handleRealizationPost(selectedSchedule)} className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-poppins-medium hover:bg-primary/90 transition-all duration-200">
                                Simpan
                            </button>
                        ) : (
                            <button onClick={() => handleRealizationPut(selectedSchedule)} className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-poppins-medium hover:bg-primary/90 transition-all duration-200">
                                Simpan
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
