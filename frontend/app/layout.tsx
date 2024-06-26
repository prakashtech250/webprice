import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";



export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className=''>
          <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
            <Navbar />
            <div className="flex mt-4">
              <Sidebar />
              <main className="container mt-2 ">
              {children}
              </main>
            </div>
            </ThemeProvider> 
        </body>
      </html>
    </>
  );
}
