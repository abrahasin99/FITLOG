"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="flex justify-between items-center px-6 py-2">
      <div className="flex gap-1">
        <Image src={logo} alt="Logo" />
        <h1 className="text-white">FITLOG</h1>
      </div>

      <div className="flex gap-2">
        <Link
          href="/"
          className={
            pathname === "/" ? "text-yellow-400" : "text-gray-400"
          }
        >
          Workouts
        </Link>

        <Link
          href="/my-plan"
          className={
            pathname === "/my-plan" ? "text-yellow-400" : "text-gray-400"
          }
        >
          My Plan
        </Link>
      </div>

      <div className="flex gap-2">
        <button>Plan</button>
        <button>Saved</button>
      </div>
    </div>
  );
};

export default Navbar;