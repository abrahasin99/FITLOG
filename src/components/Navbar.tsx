import React from "react";
import Image from "next/image";
import logo from "../../assets/logo.png";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-6 py-2">
      <div className="flex gap-1">
        <Image src={logo} alt="Logo" />
        <h1 className="text-white">FITLOG</h1>
      </div>

      <div className="flex gap-2">
        <button>Workouts</button>
        <button>My Plan</button>
      </div>
      <div className="flex gap-2">
        <button>Plan</button>
        <button>Saved</button>
      </div>
    </div>
  );
};

export default Navbar;
