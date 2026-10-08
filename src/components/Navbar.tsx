"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "../../assets/logo.png";
import { usePlan } from "@/context/PlanContext";

const Navbar = () => {
  const pathname = usePathname();
  const { todayPlan, saved } = usePlan();

  return (
    <div className="flex justify-between items-center p-10">
      <div className="flex gap-1">
        <Image src={logo} alt="Logo" />
        <h1 className="text-white font-bold">FITLOG</h1>
      </div>

      <div className="flex gap-4">
        <Link
          href="/"
          className={pathname === "/" ? "text-lime-200 drop-shadow-[0_0_10px_rgba(190,242,100,0.8)]" : "text-gray-400 hover:text-white"}
        >
          Workouts
        </Link>

        <Link
          href="/my-plan"
          className={
            pathname === "/my-plan" ? "text-lime-200 drop-shadow-[0_0_10px_rgba(190,242,100,0.8)]" : "text-gray-400 hover:text-white"
          }
        >
          My Plan
        </Link>
      </div>

      <div className="flex items-center gap-3">
        {/* Plan button with yellow badge */}
        <Link href="/my-plan">
          <button className="flex items-center gap-2 text-white cursor-pointer">
            Plan
            {todayPlan.length >= 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ccff00] px-1 text-xs font-bold text-black">
                {todayPlan.length}
              </span>
            )}
          </button>
        </Link>

        {/* Saved button with white-outlined badge */}
        <Link href="/my-plan">
          <button className="flex items-center gap-2 text-white cursor-pointer">
            Saved
            {saved.length >= 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-white bg-transparent px-1 text-xs font-bold text-white">
                {saved.length}
              </span>
            )}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
