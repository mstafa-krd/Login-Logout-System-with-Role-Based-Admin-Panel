import { Outlet } from "react-router-dom";
import SideBar from "../../components/SideBar/SideBar";
import "./dashboard.css";
export default function DashBoard() {
  return (
    <div>
      <SideBar />

      <Outlet />
    </div>
  );
}
