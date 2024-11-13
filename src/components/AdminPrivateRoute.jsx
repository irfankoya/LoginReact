import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function AdminPrivateRoute() {
  const { adminlogin } = useSelector((state) => state.admin);
  console.log('admin login',adminlogin);
  return adminlogin ? <Outlet /> : <Navigate to="/admin/login" />;
}
