import { useState } from "react";
import Sidebar from "./Sidebar.tsx";
import Header from "./Header.tsx";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden custom-scrollbar">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <Header/>
          <main className="w-full mt-[8px] ml-[10px] overflow-y-scroll no-scrollbar">
            <Outlet />
          </main>
        </div>
    </div>
  )
}

export default Layout;