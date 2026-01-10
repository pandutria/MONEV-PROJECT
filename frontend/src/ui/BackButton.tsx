import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom"

export default function BackButton() {
    const navigate = useNavigate();
    return (
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 cursor-pointer text-gray-600 hover:text-primary font-poppins-medium mb-6 transition-colors duration-200">
            <ArrowLeft className="h-5 w-5" />
            Kembali
        </button>
    )
}
