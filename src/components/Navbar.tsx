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
    <div className="flex justify-between items-center px-6 py-2">
      <div className="flex gap-1">
        <Image src={logo} alt="Logo" />
        <h1 className="text-white">FITLOG</h1>
      </div>

      <div className="flex gap-2">
        <Link
          href="/"
          className={pathname === "/" ? "text-yellow-400" : "text-gray-400"}
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

      <div className="flex items-center gap-3">
        {/* Plan button with yellow badge */}
        <button className="flex items-center gap-2 text-white">
          Plan
          {todayPlan.length > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-yellow-400 px-1 text-xs font-bold text-black">
              {todayPlan.length}
            </span>
          )}
        </button>

        {/* Saved button with white-outlined badge */}
        <button className="flex items-center gap-2 text-white">
          Saved
          {saved.length > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-white bg-transparent px-1 text-xs font-bold text-white">
              {saved.length}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;