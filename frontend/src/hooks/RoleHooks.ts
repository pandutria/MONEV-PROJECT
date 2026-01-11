import { useEffect, useState } from "react";
import API from "../server/API";

export default function useRoleHooks() {
    const [role, setRole] = useState<RoleProps[]>([]);

    useEffect(() => {
        const fetchRole = async() => {
            try {
                const response = await API.get("/role");
                setRole(response.data.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchRole();
    }, []);

    return {
        role
    }
}
