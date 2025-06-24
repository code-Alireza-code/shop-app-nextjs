import type { Metadata } from "next";
import "../../styles/globals.css";
import vazirFont from "@/constants/localFonts";
import Header from "../Header";
import Providers from "@/providers/Providers";

export const metadata: Metadata = {
  title: "خانه |‌ نکس شاپ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
