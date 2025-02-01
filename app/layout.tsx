import Providers from "@/components/Providers";
import "../app/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Crud App",
  description: "This is my awesome CRUD App!",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <main className="p-4">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
