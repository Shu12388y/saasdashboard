import React from "react";
import SideBar from "../components/SideBar";

function Layout({ children }: { children: React.ReactElement }) {
  return (
    <div>
      <div className="flex flex-row w-full h-full">
        <div><SideBar user="shubham"/></div>
        {children}
      </div>
    </div>
  );
}

export default Layout;
