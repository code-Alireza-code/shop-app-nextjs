import "../../../styles/globals.css";
import vazirFont from "@/constants/localFonts";
import Providers from "@/providers/Providers";
import { Metadata } from "next";
import { ReactNode } from "react";
import Sidebar from "./Sidebar";

export const metadata: Metadata = {
  title: "پروفایل کاربر | نکس شاپ",
};

function layout({ children }: { children: ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazirFont.className} font-sans antialiased`}>
        <Providers>
          <div className="grid grid-cols-4 bg-white h-screen">
            <div className="col-span-1 bg-gray-100 overflow-y-auto p-4">
              <Sidebar />
            </div>
            <div className="col-span-3 overflow-y-auto p-4">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}

export default layout;
