import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <main className="flex w-full h-screen bg-[#E4E4E4]">
      <Sidebar />

      <Outlet />
    </main>
  );
}
