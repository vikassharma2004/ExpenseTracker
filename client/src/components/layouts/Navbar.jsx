import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideBar from "./SideBar";
import { IoMdNotifications } from "react-icons/io";
const Navbar = ({ activemenu }) => {
  const [opensidemenu, setopensidemenu] = useState(false);
  return (
    <div className="flex z-50 justify-between gap-5 bg-white border border-b border-gray-200/50 blackdrop-blur-[12px] py-4 px-7 sticky top-0">
      <button
        className="block lg:hidden text-black"
        onClick={() => setopensidemenu(!opensidemenu)}
      >
        {opensidemenu ? (
          <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
      </button>
      <h2 className="text-lg font-medium text-black">Expense Tracker</h2>
      {opensidemenu && (
        <div className="fixed top-[61px] -ml-4 bg-white ">
          <SideBar activemenu={activemenu} />
        </div>
      )}

      <div className="relative hidden lg:block">
  <button>
    <IoMdNotifications className="text-2xl text-gray-500" />
  </button>

  <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full" ></span>
</div>

    </div>
  );
};

export default Navbar;
