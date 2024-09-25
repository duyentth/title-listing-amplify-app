import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Auth from "@/components/auth/Auth";
import NavBar from "@/components/NavBar";
import { isAuthenticated } from "../../amplify-utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Post App",
  description: "My First Amplify App",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar isSignedIn={await isAuthenticated()} />
        <Auth>{children}</Auth>
      </body>
    </html>
  );
}

