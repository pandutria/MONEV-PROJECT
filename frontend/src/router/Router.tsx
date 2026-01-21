import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "../pages/auth/Login"
import Dashboard from "../pages/Dashboard"
import PPKRencanaAnggaran from "../pages/ppk/PPKRencanaAnggaran"
import PPKRencanaAnggaranAdd from "../pages/ppk/add/PPKRencanaAnggaranAdd"
import PPKJadwalPelaksanaan from "../pages/ppk/PPKJadwalPelaksanaan"
import PPKJadwalPelaksanaanAdd from "../pages/ppk/add/PPKJadwalPelaksanaanAdd"
import PPKRealisasiPekerjaan from "../pages/ppk/PPKRealisasiPekerjaan"
import PokjaLaporanPenjabatPengadaan from "../pages/pokja/PokjaLaporanPenjabatPengadaan"
import PokjaLaporanPenjabatPengadaanAdd from "../pages/pokja/add/PokjaLaporanPenjabatPengadaanAdd"  
import KepalaRencanaAnggaran from "../pages/kepala/laporan/KepalaRencanaAnggaran"
import KepalaJadwalPelaksanaan from "../pages/kepala/laporan/KepalaJadwalPelaksanaan"
import PokjaHasilKelompokKerja from "../pages/pokja/PokjaHasilKelompokKerja"
import PokjaHasilPenjabatPengadaan from "../pages/pokja/PokjaHasilPenjabatPengadaan"
import KepalaHasilPenjabatPengadaan from "../pages/kepala/hasil/KepalaHasilPenjabatPengadaan"
import KepalaHasilKelompokKerja from "../pages/kepala/hasil/KepalaHasilKelompokKerja"
import AdminManajemenPengguna from "../pages/admin/AdminManajemenPengguna"
import AdminKelompokKerja from "../pages/admin/AdminKelompokKerja"
import EditProfile from "../pages/EditProfile"
import PokjaLaporanPenjabatPengadaanUpdateView from "../pages/pokja/edit/PokjaLaporanPenjabatPengadaanUpdateView"
import PokjaLaporanKelompok from "../pages/pokja/PokjaLaporankelompok"
import PokjaLaporanKelompokAdd from "../pages/pokja/add/PokjaLaporanKelompokAdd"
import PokjaLaporanKelompokUpdateView from "../pages/pokja/edit/PokjaLaporanKelompokUpdateView"
import PPKRencanaAnggaranUpdateView from "../pages/ppk/edit/PPKRencanaAnggaranUpdateView"
import PPKJadwalPelaksanaanUpdateView from "../pages/ppk/edit/PPKJadwalPelaksanaanUpdateView"

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* All User */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/ubah-profile" element={<EditProfile/>}/>

        {/* Auth */}
        <Route path="/masuk" element={<Login/>} />

        {/* PPK */}
        <Route path="/ppk/rencana-anggaran" element={<PPKRencanaAnggaran/>}/>
        <Route path="/ppk/rencana-anggaran/tambah" element={<PPKRencanaAnggaranAdd/>}/>
        <Route path="/ppk/rencana-anggaran/ubah/:id" element={<PPKRencanaAnggaranUpdateView/>}/>
        <Route path="/ppk/rencana-anggaran/lihat/:id" element={<PPKRencanaAnggaranUpdateView/>}/>

        <Route path="/ppk/jadwal-pelaksanaan" element={<PPKJadwalPelaksanaan/>}/>
        <Route path="/ppk/jadwal-pelaksanaan/tambah" element={<PPKJadwalPelaksanaanAdd/>}/>
        <Route path="/ppk/jadwal-pelaksanaan/lihat/:id" element={<PPKJadwalPelaksanaanUpdateView/>}/>
        <Route path="/ppk/jadwal-pelaksanaan/ubah/:id" element={<PPKJadwalPelaksanaanUpdateView/>}/>

        <Route path="/ppk/realisasi-pekerjaan" element={<PPKRealisasiPekerjaan/>}/>

        {/* Pokja */}
        <Route path="/pokja/data-entry-penjabat-pengadaan" element={<PokjaLaporanPenjabatPengadaan/>}/>
        <Route path="/pokja/data-entry-penjabat-pengadaan/tambah" element={<PokjaLaporanPenjabatPengadaanAdd/>}/>
        <Route path="/pokja/data-entry-penjabat-pengadaan/ubah/:id" element={<PokjaLaporanPenjabatPengadaanUpdateView/>}/>
        <Route path="/pokja/data-entry-penjabat-pengadaan/lihat/:id" element={<PokjaLaporanPenjabatPengadaanUpdateView/>}/>

        <Route path="/pokja/data-entry-kelompok-kerja" element={<PokjaLaporanKelompok/>}/>
        <Route path="/pokja/data-entry-kelompok-kerja/tambah" element={<PokjaLaporanKelompokAdd/>}/>
        <Route path="/pokja/data-entry-kelompok-kerja/ubah/:id" element={<PokjaLaporanKelompokUpdateView/>}/>
        <Route path="/pokja/data-entry-kelompok-kerja/lihat/:id" element={<PokjaLaporanKelompokUpdateView/>}/>

        <Route path="/pokja/penjabat-pengadaan" element={<PokjaHasilPenjabatPengadaan/>}/>
        <Route path="/pokja/kelompok-kerja" element={<PokjaHasilKelompokKerja/>}/>

        {/* Kepala Biro & Kepala Biro */}
        <Route path="/kepala/rencana-anggaran" element={<KepalaRencanaAnggaran/>}/>
        <Route path="/kepala/jadwal-pelaksanaan" element={<KepalaJadwalPelaksanaan/>}/>

        <Route path="/kepala/penjabat-pengadaan" element={<KepalaHasilPenjabatPengadaan/>}/>
        <Route path="/kepala/kelompok-kerja" element={<KepalaHasilKelompokKerja/>}/>

        {/* Admin */}
        <Route path="/admin/manajemen-pengguna" element={<AdminManajemenPengguna/>}/>        
        <Route path="/admin/kelompok-kerja" element={<AdminKelompokKerja/>}/>
      </Routes>
    </BrowserRouter>
  )
}
