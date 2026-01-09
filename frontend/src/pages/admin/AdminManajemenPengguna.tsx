/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import TableContent from "../../ui/TableContent";
import TableHeader from "../../ui/TableHeader";
import AdminTambahUserModal from "./modal/AdminTambahUserModal";
import AdminUbahUserModal from "./modal/AdminUbahUserModal";
import AdminLihatUserModal from "./modal/AdminLihatUserModal";

export default function AdminManajemenPengguna() {
    const [selectPreview, setSelectPreview] = useState<any>(null);
    const [selectedEdit, setSelectedEdit] = useState<any>(null);
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalPreview, setShowModalPreview] = useState(false);

    const columns = [
        {
            key: 'no',
            label: 'No'
        },
        {
            key: 'nama',
            label: "Nama Pengguna"
        },
        {
            key: 'jabatan',
            label: 'Jabatan'
        }
    ];

    const data = [
        {
            no: 1,
            nama: 'Setio Nugraha',
            jabatan: 'Mentor Website'
        },
        {
            no: 2,
            nama: 'Pandu Tria Adyatama',
            jabatan: 'Mentor Software'
        },
        {
            no: 3,
            nama: 'Muhammad Khadafi',
            jabatan: 'Mentor Design'
        },
    ];

    useEffect(() => {
        const fetchEdit = () => {
            if (selectedEdit) {
                setShowModalEdit(true);
            }
        }

        const fetchPreview = () => {
            if (selectPreview) {
                setShowModalPreview(true);
            }
        }

        fetchEdit();
        fetchPreview();
    }, [selectedEdit, selectPreview]);

    return (
        <div>
            <Navbar type="admin" />
            <AdminTambahUserModal isOpen={showModalAdd} onClose={() => setShowModalAdd(false)}/>
            <AdminLihatUserModal isOpen={showModalPreview} onClose={() => setShowModalPreview(false)} data={selectPreview}/>
            <AdminUbahUserModal isOpen={showModalEdit} onClose={() => setShowModalEdit(false)} data={selectedEdit}/>

            <div className="pt-28" data-aos="fade-up" data-aos-duration="1000">
                <TableHeader
                    title="Manajemen Pengguna"
                    showTambah={true}
                    onTambahClick={() => setShowModalAdd(true)}
                    type="pokja"
                />
                <div className="p-6">
                    <TableContent
                        columns={columns}
                        data={data}
                        isSelect={false}
                        showEdit={true}
                        showPreview={true}
                        idKey="no"
                        onPreview={(item) => setSelectPreview(item)}
                        onEdit={(item) => setSelectedEdit(item)}
                    />
                </div>
            </div>
        </div>
    )
}
