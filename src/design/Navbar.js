import { Link } from "react-router-dom";
import logo from "./logo.png";
import React, { useState } from "react";
import { Bars3BottomRightIcon, XMarkIcon } from "@heroicons/react/24/solid";
const Navbar = () => {
  let Links = [
    { name: "Home", link: "/" },
    { name: "Currency Convertor", link: "/conversion" },
    { name: "Charts", link: "/charts" },
  ];
  let [open, setOpen] = useState(false);
  return (
    <div className="shadow-md w-full fixed top-0 left-0">
      <div className="md:flex items-center justify-around bg-[#1d1f20] py-4 md:px-10 px-7">
        <div className="font-serif text-2xl cursor-pointer flex items-center gap-1">
          <Link to="/">
            <span className="text-white">CurrencyXpert</span>
          </Link>
        </div>
        <div
          onClick={() => setOpen(!open)}
          className="absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7 text-white"
        >
          {open ? <XMarkIcon /> : <Bars3BottomRightIcon />}
        </div>
        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-[#1d1f20] md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-12" : "top-[-490px]"
          }`}
        >
          {Links.map((link) => (
            <li className="md:ml-8 md:my-0 my-7 font-bold">
              <Link
                to={link.link}
                className="text-white hover:text-white duration-500"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
