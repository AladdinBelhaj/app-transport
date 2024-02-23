"use client";
import React, { useState, ReactNode } from "react";
import SidebarTransporter from "@/components/SidebarTransporter";
import Header from "@/components/Header";
import AuthGuard from "@/components/Auth/AuthGuard";
import { useUserData } from "../../../utils/getUserData";
import { useEffect } from "react";
import SidebarFirstLogin from "@/components/SidebarFirstLogin";
import SidebarClient from "../SidebarClient";
export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const storedData = localStorage.getItem("data");
  let userData: any;
  if (storedData) {
    userData = JSON.parse(storedData);
  }

  const [isFirstLogin, setIsFirstLogin] = useState(userData?.isFirstLogin);

  useEffect(() => {
    setIsFirstLogin(userData?.isFirstLogin);
  }, [userData?.isFirstLogin]);

  if (isFirstLogin === null) {
    return <div>Loading...</div>;
  }

  return (
    <AuthGuard redirect={"/auth/signin"}>
      <>
        {/* <!-- ===== Page Wrapper Start ===== --> */}
        <div className="flex h-screen overflow-hidden">
          {/* <!-- ===== Sidebar Start ===== --> */}
          {isFirstLogin === "1" ? (
            <SidebarFirstLogin
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
          ) : (
            <SidebarTransporter
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
          )}
          {/* <!-- ===== Sidebar End ===== --> */}

          {/* <!-- ===== Content Area Start ===== --> */}
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            {/* <!-- ===== Header Start ===== --> */}
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            {/* <!-- ===== Header End ===== --> */}

            {/* <!-- ===== Main Content Start ===== --> */}
            <main>
              <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                {children}
              </div>
            </main>
            {/* <!-- ===== Main Content End ===== --> */}
          </div>
          {/* <!-- ===== Content Area End ===== --> */}
        </div>
        {/* <!-- ===== Page Wrapper End ===== --> */}
      </>
    </AuthGuard>
  );
}
