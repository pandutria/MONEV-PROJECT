/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from "react";
import API from "../server/API";

interface AuthContextType {
  user: UserProps | null
  token: string | null
  loading: boolean
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProps[]>([]);
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const fetchToken = async() => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
      }
    }

    const fetchUser = async() => {
      try {
        if (!token) return;
        const response = await API.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const role = response.data.data.role
        console.log(role)
        setUser(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchToken();
    fetchUser();
  }, [token]);

  const handleLogin = (token: string) => {
    localStorage.setItem(token, "token");
    setToken(token);
  }

  return (
    <AuthContext.Provider value={{ user, token, handleLogin }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }
  return context
}