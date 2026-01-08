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

export default function LineChart() {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    font: {
                        family: 'poppins-medium',
                        size: 12
                    }
                }
            },
            title: {
                display: false,
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    font: {
                        family: 'poppins-regular'
                    }
                }
            },
            x: {
                ticks: {
                    font: {
                        family: 'poppins-regular'
                    }
                }
            }
        }
    };

    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Data 1',
                data: [65, 59, 80, 81, 56, 55, 70],
                borderColor: '#f60',
                backgroundColor: '#f60',
                tension: 0.4
            },
            {
                label: 'Data 2',
                data: [28, 48, 40, 19, 86, 27, 90],
                borderColor: '#C45200',
                backgroundColor: '#C45200',
                tension: 0.4
            }
        ]
    };

    return (
        <div className="w-full min-h-screen p-4 sm:p-6 lg:p-8" data-aos="fade-up" data-aos-duration="1000">
            <h1 className='text-center font-poppins-semibold text-2xl sm:text-3xl lg:text-[44px] text-primary mb-12'>Grafik Progress</h1>
            <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-4 sm:p-6">
                <div className="h-64 sm:h-80 lg:h-96 mb-8">
                    <Line options={options} data={data} />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 mt-12">
                    <div className="bg-linear-to-br from-primary to-orange-600 rounded-lg p-6 text-white shadow-md">
                        <p className="font-poppins-medium text-sm sm:text-base mb-2 opacity-90">Days Left</p>
                        <p className="font-poppins-bold text-4xl sm:text-5xl">0</p>
                    </div>

                    <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                        <p className="font-poppins-semibold text-sm sm:text-base text-gray-600 mb-3">Durasi</p>
                        <p className="font-poppins-bold text-2xl sm:text-3xl text-gray-800">90 Hari</p>
                    </div>

                    <div className="bg-white border-2 border-gray-200 rounded-lg p-6 lg:row-span-2">
                        <h3 className="font-poppins-bold text-lg sm:text-xl text-primary mb-4">Progres Proyek</h3>

                        <div className="space-y-4">
                            <div>
                                <p className="font-poppins-medium text-sm text-gray-600 mb-1">Progress Perencanaan</p>
                                <div className="flex items-center gap-3">
                                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                                        <div className="bg-primary h-3 rounded-full" style={{ width: '0%' }}></div>
                                    </div>
                                    <span className="font-poppins-semibold text-lg text-primary min-w-11.25">0%</span>
                                </div>
                            </div>

                            <div>
                                <p className="font-poppins-medium text-sm text-gray-600 mb-1">Progres Aktual</p>
                                <div className="flex items-center gap-3">
                                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                                        <div className="bg-green-500 h-3 rounded-full" style={{ width: '0%' }}></div>
                                    </div>
                                    <span className="font-poppins-semibold text-lg text-green-600 min-w-11.25">0%</span>
                                </div>
                            </div>

                            <div>
                                <p className="font-poppins-medium text-sm text-gray-600 mb-1">Deviasi</p>
                                <div className="flex items-center gap-3">
                                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                                        <div className="bg-red-500 h-3 rounded-full" style={{ width: '0%' }}></div>
                                    </div>
                                    <span className="font-poppins-semibold text-lg text-red-600 min-w-11.25">0%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border-2 border-gray-200 rounded-lg p-6 lg:col-span-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <p className="font-poppins-semibold text-sm sm:text-base text-primary mb-2">Tanggal Mulai Pekerjaan</p>
                                <p className="font-poppins-medium text-base sm:text-lg text-gray-800">1 Januari 2025</p>
                            </div>
                            <div>
                                <p className="font-poppins-semibold text-sm sm:text-base text-primary mb-2">Tanggal Selesai Pekerjaan</p>
                                <p className="font-poppins-medium text-base sm:text-lg text-gray-800">31 Maret 2025</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}