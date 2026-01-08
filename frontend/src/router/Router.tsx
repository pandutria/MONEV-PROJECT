import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "../pages/auth/Login"
import Dashboard from "../pages/guest/Dashboard"
import PPKRencanaAnggaran from "../pages/ppk/PPKRencanaAnggaran"
import PPKRencanaAnggaranAdd from "../pages/ppk/add/PPKRencanaAnggaranAdd"
import PPKRencanaAnggaranShow from "../pages/ppk/show/PPKRencanaAnggaranShow"

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
      </Routes>
    </BrowserRouter>
  )
}
