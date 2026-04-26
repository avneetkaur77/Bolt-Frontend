import "./globals.css";
import BackgroundStars from "@/components/BackgroundStars";

export const metadata = {
  title: "Bolt-Dev | International Crypto Payments",
  description: "Seamless global crypto payments using MetaMask",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black overflow-x-hidden">
        <BackgroundStars />
        <main className="flex-grow flex flex-col relative w-full max-w-md mx-auto min-h-screen shadow-2xl overflow-hidden glass-panel">
          {children}
        </main>
      </body>
    </html>
  );
}
