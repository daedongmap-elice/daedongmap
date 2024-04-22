import { Outlet } from "react-router-dom";
import BottomNavbar from "./BottomNavbar";

export default function Layout() {
  return (
    <>
      <Outlet />
      <BottomNavbar />
    </>
  );
}
