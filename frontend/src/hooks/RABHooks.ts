import { SwalMessage } from "../utils/SwalMessage";
import API from "../server/API";
import SwalLoading from "../utils/SwalLoading";

export default function useRABHooks() {
    const token = localStorage.getItem("token");

    const handleRABPost = async (data: RABProps) => {
        try {
            SwalLoading();
            const response = await API.post("/rab/create", data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const message = response.data.message;
            SwalMessage({
                title: "Berhasil!",
                text: message,
                type: "success"
            })
        } catch (error) {
            if (error) {
                SwalMessage({
                    title: "Gagal!",
                    text: "Terjadi Kesalahan!",
                    type: "error"
                })
            }
        }
    }

    return {
        handleRABPost,
    }
}
