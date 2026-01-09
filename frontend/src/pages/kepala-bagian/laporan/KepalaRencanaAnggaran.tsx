/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import TableContent from "../../../ui/TableContent";
import TableHeader from "../../../ui/TableHeader";
import { useEffect, useState } from 'react';

export default function KepalaRencanaAnggaran() {
    // const [tahun, setTahun] = useState('');
    // const [satuanKerja, setSatuanKerja] = useState('');
    // const [search, setSearch] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectPreview, setSelectPreview] = useState<any>(null);
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
        const fetchPreview = () => {
            if (selectPreview) {
                const no = selectPreview?.no;
                navigate(`/ppk/rencana-anggaran/${no}`);
            }
        }

        fetchPreview();
    }, [selectPreview, navigate]);

    return (
        <div>
            <Navbar type="kabag" />

            <div className="lg:pt-32 pt-28" data-aos="fade-up" data-aos-duration="1000">
                <TableHeader 
                    title="Daftar Rencana Anggaran Biaya" 
                    tahunOptions={tahunData} 
                    satuanKerjaOptions={satuanKerjaData} 
                    showTambah={false}
                    showHapus={false}
                    onTambahClick={() => navigate("/ppk/rencana-anggaran/tambah")}
                />
                <div className="p-6">
                    <TableContent
                        columns={columns}
                        data={data}
                        isSelect={false}
                        showEdit={false}
                        showPreview={true}
                        idKey="no"
                        onPreview={(item) => setSelectPreview(item)}
                        onSelectedChange={(selected) => setSelectedItems(selected as any)}
                    />
                </div>
            </div>
        </div>
    )
}
