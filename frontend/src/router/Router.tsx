import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "../pages/auth/Login"
import Dashboard from "../pages/guest/Dashboard"
import PPKRab from "../pages/ppk/PPKRab"
import PPKRabAdd from "../pages/ppk/add/PKKRabAdd"

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* All User */}
        <Route path="/" element={<Dashboard />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />

        {/* PPK */}
        <Route path="/ppk/rab" element={<PPKRab/>}/>
        <Route path="/ppk/rab/add" element={<PPKRabAdd/>}/>
      </Routes>
    </BrowserRouter>
  )
}
