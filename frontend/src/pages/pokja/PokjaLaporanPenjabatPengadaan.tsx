/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import TableContent from "../../ui/TableContent";
import TableHeader from "../../ui/TableHeader";
import { useEffect, useState } from 'react';
import PokjaLaporanPenjabatPengadaanShow from "./show/PokjaLaporanPernjabatPengadaanShowModal";
import { useAuth } from "../../context/AuthContext";
import LoadingSpinner from "../../ui/LoadingSpinner";

export default function PokjaLaporanPenjabatPengadaan() {
    const [search, setSearch] = useState('');
    const [selectRevisi, setSelectRevisi] = useState(null);
    const [selectPreview, setSelectPreview] = useState<any>(null);
    const [dataTable, setDataTable] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user, loading } = useAuth();    
    const navigate = useNavigate();

    const columns = [
        {
            key: 'kodePaket',
            label: 'Kode Paket'
        },
        {
            key: 'rup',
            label: 'Kode RUP'
        },
        {
            key: 'namaPaket',
            label: 'Nama Paket'
        },
        {
            key: 'tanggal',
            label: 'Tanggal Masuk/Perubahan'
        },
    ];

    const data = [
        {
            no: 1,
            kodePaket: 'JHIUgdwb5',
            rup: '60986116',
            namaPaket: "Rekonstruksi/Peningkatan Jalan Wawongole - Teteona (Duriaasi)",
            tanggal: "30 Desember 2024"
        },
        {
            no: 2,
            kodePaket: 'KJSOIDSD',
            rup: '62123792',
            namaPaket: "Perbaikan Jembatan",
            tanggal: "23 Januari 2025"
        },
    ];

    useEffect(() => {
        const fetchEdit = () => {
            if (selectRevisi) {
                const no = selectPreview?.no;
                navigate(`/ppk/rencana-anggaran/${no}`);
            }
        }

        const fetchPreview = () => {
            if (selectPreview) {
                setIsModalOpen(true);
            }
        }

        const filteringData = () => {
            const filter = data.filter((item) => {
                const dataFilter = item.namaPaket.toLowerCase().includes(search.toLowerCase()) || search.toLowerCase().includes(item.namaPaket.toLowerCase());
                return dataFilter;
            });

            setDataTable(filter);
        }

        fetchEdit();
        fetchPreview();
        filteringData();
    }, [selectRevisi, selectPreview, navigate, search]);

    if (loading) {
        return <LoadingSpinner/>
    }

    if (!user || user.role.name != "pokja") {
        return <Navigate to="/" replace/>
    }

    return (
        <div>
            <Navbar/>

            {selectPreview && (
                <PokjaLaporanPenjabatPengadaanShow
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    data={selectPreview}
                />
            )}

            <div className="lg:pt-32 pt-28" data-aos="fade-up" data-aos-duration="1000">
                <TableHeader
                    title="Daftar Laporan Pejabat Pengadaan"
                    showHapus={true}
                    onTambahClick={() => navigate("/pokja/data-entry-penjabat-pengadaan/tambah")}
                    type="pokja"
                    searchValue={search}
                    onSearchChange={setSearch}
                />
                <div className="p-6">
                    <TableContent
                        columns={columns}
                        data={dataTable}
                        isSelect={true}
                        showEdit={true}
                        showPreview={true}
                        idKey="no"
                        onEdit={(item) => setSelectRevisi(item)}
                        onPreview={(item) => setSelectPreview(item)}
                    />
                </div>
            </div>
        </div>
    )
}

