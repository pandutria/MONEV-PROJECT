/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import TableContent from "../../ui/TableContent";
import TableHeader from "../../ui/TableHeader";
import AdminTambahKelompokKerjaModal from "./modal/AdminTambahKelompokKerjaModal";
import AdminUbahKelompokKerjaModal from "./modal/AdminUbahKelompokKerjaModal";

export default function AdminKelompokKerja() {
    const [selectedIds, setSelectedIds] = useState<any>([]);
    const [selectedEdit, setSelectedEdit] = useState<any>(null);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalAdd, setShowModalAdd] = useState(false);
    const columns = [
        {
            key: 'no',
            label: 'No'
        },
        {
            key: 'kelompok',
            label: "Kelompok Kerja"
        },        
    ];

    const data = [
        {
            no: 1,
            kelompok: 'Kelompok Kerja 1',
        },
        {
            no: 2,
            kelompok: 'Kelompok Kerja 2',
        },
        {
            no: 3,
            kelompok: 'Kelompok Kerja 3',
        },
    ];

    useEffect(() => {
        const fetchEdit = () => {
            if (selectedEdit) {
                setShowModalEdit(true)
            }
        }

        fetchEdit();
    }, [selectedEdit]);
    return (
        <div>
            <Navbar type="admin" />
            <AdminTambahKelompokKerjaModal isOpen={showModalAdd} onClose={() => setShowModalAdd(false)}/>
            <AdminUbahKelompokKerjaModal isOpen={showModalEdit} onClose={() => setShowModalEdit(false)} data={selectedEdit}/>

            <div className="pt-28" data-aos="fade-up" data-aos-duration="1000">
                <TableHeader
                    title="Manajemen Kelompok Kerja"
                    showTambah={true}
                    showHapus={true}
                    type="pokja"
                    onTambahClick={() => setShowModalAdd(true)}
                />
                <div className="p-6">
                    <TableContent
                        columns={columns}
                        data={data}
                        isSelect={true}
                        showEdit={true}
                        showPreview={false}
                        showSelect={false}
                        idKey="no"
                        onEdit={(item) => setSelectedEdit(item)}
                        onSelectedIdsChange={(ids) => setSelectedIds(ids)}
                    />
                </div>
            </div>
        </div>
    )
}
