/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

interface RoleRouteProps {
  children: any
  allowedRoles: string[]
}

const RoleRoute = ({ children, allowedRoles }: RoleRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return;
  }

  if (!allowedRoles.includes(user ? user.role.name : '')) {
    return <Navigate to="/" replace />
  }

  return children
}

export default RoleRoute
