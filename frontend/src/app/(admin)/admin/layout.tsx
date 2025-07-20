import "../../../styles/globals.css";
import vazirFont from "@/constants/localFonts";
import Providers from "@/providers/Providers";
import { Metadata } from "next";
import { ReactNode } from "react";
import AdminSidebar from "./_/components/AdminSidebar";

export const metadata: Metadata = {
  title: "پروفایل ادمین | نکس شاپ",
};

function layout({ children }: { children: ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazirFont.className} font-sans antialiased`}>
        <Providers>
          <div className="grid grid-cols-5 bg-white h-screen">
            <div className="col-span-1 bg-gray-100 overflow-y-auto p-4">
              <AdminSidebar />
            </div>
            <div className="col-span-4 overflow-y-auto p-4">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}

export default layout;
