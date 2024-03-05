'use client';
import { WebAppDataProvider } from "@/utils/web-app-provider";
import "./globals.scss";
import AppLayout from "./app-layout";
import Header from "./components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body>
        <WebAppDataProvider>
          <AppLayout>
            <Header />
            <section className="min-h-screen pt-20">
              {children}
            </section>
          </AppLayout>
        </WebAppDataProvider>
      </body>
    </html>
  );
}
