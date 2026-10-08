import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PlanProvider } from "@/context/PlanContext";
import ToastProvider from "@/components/ToastProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col" suppressHydrationWarning>
        <PlanProvider>
          <Navbar />
          <ToastProvider/>

          <main className="flex-1">
            {children}
          </main>

          <Footer />
        </PlanProvider>
      </body>
    </html>
  );
}