import "./globals.css";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html>
      <body className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1">
          <Hero />
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}