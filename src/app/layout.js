import "./globals.css";

export const metadata = {
  title: "International Crypto Payments",
  description: "Seamless global crypto payments using MetaMask",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <main className="flex-grow flex flex-col relative w-full max-w-md mx-auto min-h-screen shadow-2xl overflow-hidden glass-panel">
          {children}
        </main>
      </body>
    </html>
  );
}
