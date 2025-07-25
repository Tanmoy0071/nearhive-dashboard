import type { Metadata } from "next";
import "@/app/globals.css";
import { Urbanist } from "next/font/google";
import { AuthProvider } from "@/providers/AuthProvider";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  display: "swap", // Optional: improves performance
});

export const metadata: Metadata = {
  title: "NearHive-Dashboard",
  description: "Generated by create next app",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
