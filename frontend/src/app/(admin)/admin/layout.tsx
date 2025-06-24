import "../../../styles/globals.css";
import Header from "@/app/Header";
import vazirFont from "@/constants/localFonts";
import Providers from "@/providers/Providers";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "پروفایل ادمین | نکس شاپ",
};

function layout({ children }: { children: ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazirFont.className} font-sans antialiased`}>
        <Providers>
          <Header />
          <div className="container xl:max-w-screen-xl">{children}</div>
        </Providers>
      </body>
    </html>
  );
}

export default layout;
