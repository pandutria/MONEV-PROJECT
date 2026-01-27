/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { RemainingWeeks } from '../utils/RemainingWeek';
import { TotalWeek } from '../utils/TotalWeek';
import { FormatDate } from '../utils/FormatDate';
import { ScheduleWeekAggregate } from '../utils/ScheduleWeekAggregate';
import { RemainingProgress } from '../utils/RemainingProgress';
import { ConvertToPercent } from '../utils/CovertToPercent';
import { buildKurvaData } from '../utils/BuildKurvaData';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

interface LineChartProps {
    selectedRealization: RealizationProps[]
}

export default function LineChart({ selectedRealization }: LineChartProps) {
    const latestRealization = selectedRealization?.[selectedRealization.length - 1];
    const scheduleAggreateWeeks = ScheduleWeekAggregate(latestRealization?.schedule.items ?? []);
    const scheduleProgress = ConvertToPercent(RemainingProgress(scheduleAggreateWeeks), RemainingProgress(scheduleAggreateWeeks)) ?? 0;
    const actualProgress = ConvertToPercent(RemainingProgress(latestRealization?.detail), RemainingProgress(scheduleAggreateWeeks)) ?? 0;
    const kurvaData = buildKurvaData(latestRealization?.schedule, latestRealization as any);

    return (
        <div className="w-full min-h-screen p-4 sm:p-6 lg:p-8" data-aos="fade-up" data-aos-duration="1000">
            <h1 className="text-center font-poppins-semibold text-2xl sm:text-3xl lg:text-4xl text-primary mb-12">
                Grafik Progress
            </h1>

            <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8">
                <div className="h-100 sm:h-112.5 lg:h-125 mb-8">
                    <Line
                        data={{
                            labels: kurvaData.map(d => d.minggu),
                            datasets: [
                                {
                                    label: 'Rencana',
                                    data: kurvaData.map(d => d.rencana),
                                    borderColor: '#f60',
                                    backgroundColor: 'rgba(255,102,0,0.05)',
                                    borderWidth: 3,
                                    pointRadius: 5,
                                    pointBackgroundColor: '#f60',
                                    pointBorderColor: '#fff',
                                    pointBorderWidth: 2,
                                    pointHoverRadius: 7,
                                    tension: 0.4,
                                    fill: false
                                },
                                {
                                    label: 'Aktual',
                                    data: kurvaData.map(d => d.aktual),
                                    borderColor: '#3b82f6',
                                    backgroundColor: 'rgba(59,130,246,0.05)',
                                    borderWidth: 3,
                                    pointRadius: 5,
                                    pointBackgroundColor: '#3b82f6',
                                    pointBorderColor: '#fff',
                                    pointBorderWidth: 2,
                                    pointHoverRadius: 7,
                                    tension: 0.4,
                                    fill: false
                                }
                            ]
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    display: true,
                                    labels: {
                                        font: { family: 'poppins-regular', size: 13 },
                                        padding: 20,
                                        usePointStyle: true,
                                        pointStyle: 'circle'
                                    }
                                },
                                tooltip: {
                                    backgroundColor: '#fff',
                                    borderColor: '#f60',
                                    borderWidth: 2,
                                    titleFont: { family: 'poppins-semibold', size: 13 },
                                    bodyFont: { family: 'poppins-regular', size: 12 },
                                    padding: 12,
                                    displayColors: true,
                                    cornerRadius: 10,
                                    titleColor: '#111827',
                                    bodyColor: '#111827'
                                }
                            },
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    ticks: {
                                        font: { family: 'poppins-regular', size: 12 },
                                        color: '#9ca3af'
                                    },
                                    grid: { color: '#e5e7eb' }
                                },
                                x: {
                                    ticks: {
                                        font: { family: 'poppins-regular', size: 12 },
                                        color: '#9ca3af'
                                    },
                                    grid: { display: false }
                                }
                            }
                        }}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 mt-12">
                    <div className="bg-linear-to-br from-primary to-orange-600 rounded-lg p-6 text-white shadow-md">
                        <p className="font-poppins-medium text-sm sm:text-base mb-2 opacity-90">Sisa Minggu</p>
                        <p className="font-poppins-bold text-4xl sm:text-5xl">
                            {latestRealization ? RemainingWeeks(
                                String(latestRealization?.schedule?.rab?.tanggal_mulai),
                                String(latestRealization?.schedule?.rab?.tanggal_akhir)
                            ) : 0}
                        </p>
                    </div>

                    <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                        <p className="font-poppins-semibold text-sm sm:text-base text-gray-600 mb-3">Durasi</p>
                        <p className="font-poppins-bold text-2xl sm:text-3xl text-gray-800">
                            {latestRealization ? TotalWeek(
                                String(latestRealization?.schedule?.rab?.tanggal_mulai),
                                String(latestRealization?.schedule?.rab?.tanggal_akhir)
                            ) : 0} Minggu
                        </p>
                    </div>

                    <div className="bg-white border-2 border-gray-200 rounded-lg p-6 lg:row-span-2">
                        <h3 className="font-poppins-bold text-lg sm:text-xl text-primary mb-4">Progres Proyek</h3>
                        <div className="space-y-4">
                            <div>
                                <p className="font-poppins-medium text-sm text-gray-600 mb-1">Progress Perencanaan</p>
                                <div className="flex items-center gap-3">
                                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                                        <div className="bg-primary h-3 rounded-full" style={{ width: `${scheduleProgress}%` }}></div>
                                    </div>
                                    <span className="font-poppins-semibold text-lg text-primary min-w-11.25">{scheduleProgress}%</span>
                                </div>
                            </div>
                            <div>
                                <p className="font-poppins-medium text-sm text-gray-600 mb-1">Progres Aktual</p>
                                <div className="flex items-center gap-3">
                                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                                        <div className="bg-blue-500 h-3 rounded-full" style={{ width: `${actualProgress}%` }}></div>
                                    </div>
                                    <span className="font-poppins-semibold text-lg text-blue-600 min-w-11.25">{actualProgress}%</span>
                                </div>
                            </div>
                            <div>
                                <p className="font-poppins-medium text-sm text-gray-600 mb-1">Deviasi</p>
                                <div className="flex items-center gap-3">
                                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                                        <div className={`${scheduleProgress < actualProgress ? "bg-green-500" : "bg-red-500"} h-3 rounded-full`} style={{ width: `${scheduleProgress - actualProgress}%` }}></div>
                                    </div>
                                    <span className={`font-poppins-semibold text-lg ${scheduleProgress < actualProgress ? "text-blue-600" : "text-red-600"} min-w-11.25`}>{scheduleProgress < actualProgress ? "+" : "-"} {(scheduleProgress - actualProgress).toFixed(2)}%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border-2 border-gray-200 rounded-lg p-6 lg:col-span-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <p className="font-poppins-semibold text-sm sm:text-base text-primary mb-2">Tanggal Mulai Pekerjaan</p>
                                <p className="font-poppins-medium text-base sm:text-lg text-gray-800">
                                    {latestRealization ? FormatDate(String(latestRealization?.schedule?.rab?.tanggal_mulai)) : "Belum Ada Data"}
                                </p>
                            </div>
                            <div>
                                <p className="font-poppins-semibold text-sm sm:text-base text-primary mb-2">Tanggal Selesai Pekerjaan</p>
                                <p className="font-poppins-medium text-base sm:text-lg text-gray-800">
                                    {latestRealization ? FormatDate(String(latestRealization?.schedule?.rab?.tanggal_akhir)) : "Belum Ada Data"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
