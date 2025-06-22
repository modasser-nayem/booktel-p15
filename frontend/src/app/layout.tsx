import type { Metadata } from "next";
import localFont from "next/font/local";
import "../style/globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";
import { Header } from "@/components/layout/header";

const geistSans = localFont({
   src: "../fonts/GeistVF.woff",
   variable: "--font-geist-sans",
   weight: "100 900",
});
const geistMono = localFont({
   src: "../fonts/GeistMonoVF.woff",
   variable: "--font-geist-mono",
   weight: "100 900",
});

export const metadata: Metadata = {
   title: "Booktel",
   description: "Online Hotel Booking Platform",
};

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang="en">
         <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
         >
            <AuthProvider>
               <Header />
               {children}
            </AuthProvider>
            <Toaster position="top-right" />
         </body>
      </html>
   );
}
