import Link from "next/link";
import product_logo from "@/components/sumsmart_logo.png";
import Image from "next/image";
import { FaRocket } from "react-icons/fa";

export default function Header() {
  return (
    <header className="fixed top-2 z-30 w-full md:top-6">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative flex h-14 items-center justify-between gap-3 rounded-2xl bg-white/90 px-3 shadow-lg shadow-black/[0.03] backdrop-blur-sm before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(theme(colors.gray.100),theme(colors.gray.200))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]">
          {/* Site branding */}
          <div className={`flex flex-1 items-center`}>
            <Image width={100} height={100} src={product_logo} alt="logo" />
          </div>

          <Link
            href="https://www.producthunt.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#DA552F] px-5 py-2 text-white font-semibold shadow-md transition-all hover:bg-[#bf4526] focus:ring-2 focus:ring-[#DA552F] focus:ring-offset-2"
          >
            <FaRocket className="text-lg" />
            Product Hunt
          </Link>

          {/* Desktop sign in links
          <ul className="flex flex-1 items-center justify-end gap-3">
            <li>
              <Link
                href="/signin"
                className="btn-sm bg-white text-gray-800 shadow hover:bg-gray-50"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                href="/signup"
                className="btn-sm bg-gray-800 text-gray-200 shadow hover:bg-gray-900"
              >
                Register
              </Link>
            </li>
          </ul> */}
        </div>
      </div>
    </header>
  );
}
