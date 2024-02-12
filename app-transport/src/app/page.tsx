import ECommerce from "@/components/Dashboard/E-commerce";
import AuthGuard from "@/components/Auth/AuthGuard";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
// import { useEffect, useState } from "react";
// import { getToken } from "../../utils/auth";
// import { useRouter } from "next/navigation";
export const metadata: Metadata = {
  title: "app-transport",
  // description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function Home() {
  return (
    <AuthGuard redirect={"/auth/signin"}>
      <DefaultLayout>
        <ECommerce />
      </DefaultLayout>
    </AuthGuard>
  );
}
