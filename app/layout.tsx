import Link from "next/link";
import Providers from "@/components/Providers";
import "../app/globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {/* <nav className="bg-gray-800 text-white p-4 flex gap-4">
            <Link href="/" className="hover:text-gray-300">
              Home
            </Link>
            <Link href="/users" className="hover:text-gray-300">
              Users
            </Link>
          </nav> */}
          <main className="p-4">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
