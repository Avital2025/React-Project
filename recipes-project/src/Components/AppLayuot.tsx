import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "./Loggin";

export default function Layout() {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Login/> 
    </div>
  );
}


