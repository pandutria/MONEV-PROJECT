/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import TableContent from "../../ui/TableContent";
import TableHeader from "../../ui/TableHeader";
import { useEffect, useState } from 'react';
import { X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import LoadingSpinner from "../../ui/LoadingSpinner";

export default function PPKRencanaAnggaran() {
    // const [tahun, setTahun] = useState('');
    // const [satuanKerja, setSatuanKerja] = useState('');
    // const [search, setSearch] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [selectRevisi, setSelectRevisi] = useState(null);
    const [showRevisi, setShowRevisi] = useState(false);
    const [selectPreview, setSelectPreview] = useState<any>(null);
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    const columns = [
        {
            key: 'no',
            label: 'No'
        },
        {
            key: 'tahun',
            label: 'Tahun Anggaran'
        },
        {
            key: 'satuan',
            label: 'Satuan Kerja'
        },
        {
            key: 'rup',
            label: 'Kode RUP'
        },
        {
            key: 'tender',
            label: 'kode Tender'
        },
        {
            key: 'paket',
            label: 'Nama Paket'
        },
        {
            key: 'revisi',
            label: 'Revisi'
        },
    ];

    const data = [
        {
            no: 1,
            tahun: '2025',
            satuan: 'DINAS PEKERJAAN UMUM DAN PENATAAN RUANG',
            rup: '60986116',
            tender: '10093144000',
            paket: "Rekonstruksi/Peningkatan Jalan Wawongole - Teteona (Duriaasi)",
            revisi: "3"
        },
        {
            no: 2,
            tahun: '2024',
            satuan: 'DEWAN PERWAKILAN RAKYAT DAERAH (DPRD)',
            rup: '61328060',
            tender: '10094830000',
            paket: "Pemasangan Vaving blok Kantor DPRD Kab. Konawe",
            revisi: "0"
        },
    ];

    const tahunData = [
        {
            id: 1,
            tahun: '2025'
        },
        {
            id: 2,
            tahun: '2028'
        },
    ]

    const satuanKerjaData = [
        {
            id: 1,
            text: "Semua Satuan Kerja"
        },
        {
            id: 2,
            text: "Satuan Kerja 1"
        },
        {
            id: 3,
            text: "Satuan Kerja 2"
        },
    ];

    useEffect(() => {
        const fetchEdit = () => {
            if (selectRevisi) {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                })

                document.body.style.overflow = 'hidden';
                setShowRevisi(true);
            } else {
                document.body.style.overflow = 'auto';
                setShowRevisi(false)
            }
        }

        const fetchPreview = () => {
            if (selectPreview) {
                const no = selectPreview?.no;
                navigate(`/ppk/rencana-anggaran/${no}`);
            }
        }

        fetchEdit();
        fetchPreview();
    }, [selectRevisi, selectPreview, navigate]);

    if (loading) {
        return <LoadingSpinner/>
    }

    if (!user || user.role.name != "ppk") {
        return <Navigate to="/" replace/>
    }
    return (
        <div>
            <Navbar/>

            {showRevisi && (
                <div className="bg-black/20 w-full h-screen absolute flex justify-center items-center z-40">
                    <div className="bg-white rounded-lg p-4 flex flex-col justify-center items-center w-100 gap-10 relative">
                        <div className="absolute top-4 right-4 cursor-pointer" onClick={() => setSelectRevisi(null)}>
                            <X/>
                        </div>
                        <p className="font-poppins-medium text-[20px]">Komfirmasi Perubahan</p>
                        <div className="w-full">
                          <label className="block font-poppins-medium text-sm text-gray-700 mb-2">
                            Alasan Perubahan
                          </label>
                          <input
                            type="text"                            
                            className="w-full text-[12px] px-4 py-2.5 border border-gray-300 rounded-lg font-poppins focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                            placeholder="Revisi..."
                          />
                        </div>
                        <button className="px-6 w-full py-2 bg-primary hover:bg-transparent hover:text-primary border-2 border-primary cursor-pointer text-white font-poppins-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md">Kirim</button>
                    </div>
                </div>
            )}

            <div className="lg:pt-32 pt-28" data-aos="fade-up" data-aos-duration="1000">
                <TableHeader 
                    title="Daftar Rencana Anggaran Biaya" 
                    tahunOptions={tahunData} 
                    satuanKerjaOptions={satuanKerjaData} 
                    showHapus={false}
                    onTambahClick={() => navigate("/ppk/rencana-anggaran/tambah")}
                />
                <div className="p-6">
                    <TableContent
                        columns={columns}
                        data={data}
                        isSelect={false}
                        showEdit={true}
                        showPreview={true}
                        idKey="no"
                        onEdit={(item) => setSelectRevisi(item)}
                        onPreview={(item) => setSelectPreview(item)}
                        onSelectedChange={(selected) => setSelectedItems(selected as any)}
                        onSelectedIdsChange={(ids) => setSelectedIds(ids)}
                    />
                </div>
            </div>
        </div>
    )
}
