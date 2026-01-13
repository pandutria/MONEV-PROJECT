/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import TableContent from "../../ui/TableContent";
import TableHeader from "../../ui/TableHeader";
import { useEffect, useState } from 'react';
import PokjaLaporanPenjabatPengadaanShow from "./show/PokjaLaporanPernjabatPengadaanShowModal";
import { useAuth } from "../../context/AuthContext";
import LoadingSpinner from "../../ui/LoadingSpinner";
import useDataEntryHooks from "../../hooks/DataEntryHooks";

export default function PokjaLaporanPenjabatPengadaan() {
    const [search, setSearch] = useState('');
    const [selectEdit, setSelectEdit] = useState<TenderProps | null>(null);
    const [selectPreview, setSelectPreview] = useState<any>(null);
    const [dataTable, setDataTable] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user, loading } = useAuth();
    const { dataEntryPengadaan } = useDataEntryHooks();
    const navigate = useNavigate();

    const columns = [
        {
            key: 'id',
            label: 'No'
        },
        {
            key: 'tender_code',
            label: 'Kode Tender'
        },
        {
            key: 'rup_code',
            label: 'Kode RUP'
        },
        {
            key: 'package_name',
            label: 'Nama Paket'
        },
        {
            key: 'order_date',
            label: 'Tanggal Masuk/Perubahan'
        },
    ];

    useEffect(() => {
        const fetchEdit = () => {
            if (selectEdit) {
                const id = selectEdit?.id;
                navigate(`/pokja/data-entry-penjabat-pengadaan/ubah/${id}`);
            }
        }

        const fetchPreview = () => {
            if (selectPreview) {
                setIsModalOpen(true);
            }
        }

        const filteringDataEntryPengadaan = () => {
            const filter = dataEntryPengadaan?.filter((item: TenderProps) => {
                const dataFilter = search ? item?.tender_code?.toLowerCase().includes(search.toLowerCase()) : true;
                return dataFilter;
            });

            setDataTable(filter);
        }

        fetchEdit();
        fetchPreview();
        filteringDataEntryPengadaan();
    }, [selectEdit, selectPreview, navigate, search, dataEntryPengadaan]);

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
                    onSearchChange={(item) => setSearch(item)}
                />
                <div className="p-6">
                    <TableContent
                        columns={columns}
                        data={dataTable}
                        isSelect={true}
                        showEdit={true}
                        showPreview={true}
                        idKey="no"
                        onEdit={(item) => setSelectEdit(item)}
                        onPreview={(item) => setSelectPreview(item)}
                    />
                </div>
            </div>
        </div>
    )
}

