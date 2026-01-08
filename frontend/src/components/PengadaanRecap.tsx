import {
    Chart as ChartJS,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
);

const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

export default function PengadaanRecap() {
    return (
        <div className="w-full min-h-screen  p-4 sm:p-6 lg:p-8 mt-8" data-aos="fade-up" data-aos-duration="1000">
            <div className="max-w-350 mx-auto">
                <div className="mb-8">
                    <h1 className='font-poppins-bold text-2xl sm:text-4xl lg:text-3xl text-primary mb-2'>Rekap Berdasarkan Metode Pengadaan</h1>
                    <div className="flex flex-row gap-4 items-center">
                        <p className="font-poppins-medium text-[16px]">Tahun Anggaran: </p>
                        <select className="border-2 border-gray-600 px-6 rounded-md font-poppins-regular text-[14px] py-2">
                            <option disabled selected>Pilih RAB</option>
                            <option>2025</option>
                        </select>
                    </div>
                    <p className="text-black text-[16px] mt-6 font-poppins-medium">Data RUP dan Hasil Pemilihan Kabupaten Konawe 2026</p>
                </div>
                <div className="grid md:grid-cols-2 grid-cols-1">
                    <div className="w-full bg-white rounded-lg p-4">
                        <h1 className="font-poppins-medium lg:text-[18px] text-[14px] text-center">Rekap Berdasarkan Metode Pengadaan (<span className="text-primary">RUP</span>)</h1>
                        <div className="h-64 sm:h-80 lg:h-96 mb-8 mt-6 flex items-center justify-center">
                            <Pie data={data} />
                        </div>
                    </div>
                    <div className="w-full bg-white rounded-lg p-4">
                        <h1 className="font-poppins-medium lg:text-[18px] text-[14px] text-center">Rekap Berdasarkan Metode Pengadaan (<span className="text-primary">Hasil Pemilihan</span>)</h1>
                        <div className="h-64 sm:h-80 lg:h-96 mb-8 mt-6 flex items-center justify-center">
                            <Pie data={data} />
                        </div>
                    </div>
                    <div className="w-full bg-white rounded-lg p-4">
                        <h1 className="font-poppins-medium lg:text-[18px] text-[14px] text-center">Rekap Berdasarkan Metode Pengadaan (<span className="text-primary">RUP</span>)</h1>
                        <div className="h-64 sm:h-80 lg:h-96 mb-8 mt-6 flex items-center justify-center">
                            <Pie data={data} />
                        </div>
                    </div>
                    <div className="w-full bg-white rounded-lg p-4">
                        <h1 className="font-poppins-medium lg:text-[18px] text-[14px] text-center">Rekap Berdasarkan Metode Pengadaan (<span className="text-primary">Hasil Pemilihan</span>)</h1>
                        <div className="h-64 sm:h-80 lg:h-96 mb-8 mt-6 flex items-center justify-center">
                            <Pie data={data} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
