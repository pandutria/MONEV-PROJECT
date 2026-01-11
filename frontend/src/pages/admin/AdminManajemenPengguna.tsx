/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import TableContent from "../../ui/TableContent";
import TableHeader from "../../ui/TableHeader";
import AdminTambahUserModal from "./modal/AdminTambahUserModal";
import AdminUbahUserModal from "./modal/AdminUbahUserModal";
import AdminLihatUserModal from "./modal/AdminLihatUserModal";
import { useAuth } from "../../context/AuthContext";
import LoadingSpinner from "../../ui/LoadingSpinner";
import { Navigate } from "react-router-dom";
import useUserHooks from "../../hooks/UserHooks";

export default function AdminManajemenPengguna() {
    const [selectPreview, setSelectPreview] = useState<any>(null);
    const [selectedEdit, setSelectedEdit] = useState<any>(null);
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalPreview, setShowModalPreview] = useState(false);
    const [search, setSearch] = useState("");
    const [listUserFilter, setListUserFilter] = useState<UserProps[]>([]);
    const { user, loading } = useAuth();
    const { listUser } = useUserHooks();

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

        const filteringUserData = () => {
            const dataFilter = listUser?.filter((item: UserProps) => {
                const filter = search ? item.fullname.toLowerCase().includes(search.toLowerCase()) : true;
                return filter;
            });

            setListUserFilter(dataFilter);
        }

        fetchEdit();
        fetchPreview();
        filteringUserData();
    }, [selectedEdit, selectPreview, listUser, search]);
    
    if (loading) {
        return <LoadingSpinner/>
    }

    if (user?.role.name != "admin" || !user) {
        return <Navigate to="/" replace/>
    }

    return (
        <div>
            <Navbar/>
            <AdminTambahUserModal isOpen={showModalAdd} onClose={() => setShowModalAdd(false)}/>
            <AdminLihatUserModal isOpen={showModalPreview} onClose={() => setShowModalPreview(false)} data={selectPreview}/>
            <AdminUbahUserModal isOpen={showModalEdit} onClose={() => setShowModalEdit(false)} data={selectedEdit}/>

            <div className="pt-28" data-aos="fade-up" data-aos-duration="1000">
                <TableHeader
                    title="Manajemen Pengguna"
                    showTambah={true}
                    onTambahClick={() => setShowModalAdd(true)}
                    type="pokja"
                    searchValue={search}
                    onSearchChange={(item) => setSearch(item)}
                />
                <div className="p-6">
                    <TableContent
                        columns={columns}
                        data={listUserFilter}
                        isSelect={false}
                        showEdit={true}
                        showPreview={true}
                        onPreview={(item) => setSelectPreview(item)}
                        onEdit={(item) => setSelectedEdit(item)}
                    />
                </div>
            </div>
        </div>
    )
}
