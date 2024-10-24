import { useState } from "react";
import Sidebar from "./Sidebar.tsx";
import Header from "./header/Header.tsx";
import { Outlet } from "react-router-dom";
import Player from "./player/index.tsx";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="flex flex-col flex-1 ml-[10px]">
          <Header/>
          <main className="w-full mt-[10px] overflow-hidden">
            <Outlet />
          </main>
        </div>
        <Player/>
    </div>
  )
}

export default Layout;