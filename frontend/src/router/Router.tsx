import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "../pages/auth/Login"
import Dashboard from "../pages/guest/Dashboard"
import PPKRencanaAnggaran from "../pages/ppk/PPKRencanaAnggaran"
import PPKRencanaAnggaranAdd from "../pages/ppk/add/PPKRencanaAnggaranAdd"
import PPKRencanaAnggaranShow from "../pages/ppk/show/PPKRencanaAnggaranShow"
import PPKJadwalPelaksanaan from "../pages/ppk/PPKJadwalPelaksanaan"
import PPKJadwalPelaksanaanAdd from "../pages/ppk/add/PPKJadwalPelaksanaanAdd"
import PPKJadwalPelaksanaanShow from "../pages/ppk/show/PPKJadwalPelaksanaanShow"
import PPKRealisasiPekerjaan from "../pages/ppk/PPKRealisasiPekerjaan"

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* All User */}
        <Route path="/" element={<Dashboard />} />

        {/* Auth */}
        <Route path="/masuk" element={<Login />} />

        {/* PPK */}
        <Route path="/ppk/tahun-anggaran" element={<PPKRencanaAnggaran/>}/>
        <Route path="/ppk/tahun-anggaran/tambah" element={<PPKRencanaAnggaranAdd/>}/>
        <Route path="/ppk/tahun-anggaran/:id" element={<PPKRencanaAnggaranShow/>}/>

        <Route path="/ppk/jadwal-pelaksanaan" element={<PPKJadwalPelaksanaan/>}/>
        <Route path="/ppk/jadwal-pelaksanaan/tambah" element={<PPKJadwalPelaksanaanAdd/>}/>
        <Route path="/ppk/jadwal-pelaksanaan/:id" element={<PPKJadwalPelaksanaanShow/>}/>

        <Route path="/ppk/realisasi-pekerjaan" element={<PPKRealisasiPekerjaan/>}/>
      </Routes>
    </BrowserRouter>
  )
}
