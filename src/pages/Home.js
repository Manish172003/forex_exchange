import React, { useState } from "react";
import { Link } from "react-router-dom";
import img from "../images/man.png";

const Home = () => {

  return (
    <div className="bg-[#1d1f20] lg:grid lg:grid-cols-2 h-[calc(100vh)] items-center justify-between home flex flex-col-reverse mt-5 lg:mt-0 gap-4 lg:gap-0 md:justify-between">
      <div className="flex lg:justify-end items-center justify-center">
        <img src={img} className="lg:w-[85%] w-[90%]" />
      </div>

      <div className="flex flex-col gap-4 md:gap-8 items-center lg:items-start ">
        <p className="text-white text-4xl md:text-7xl font-serif lg:text-left sm:text-center p-20 m-auto">
          Trade the World's Currencies, Seamlessly
        </p>
        <div className="lg:pl-14 lg:ml-6 mr-12 sm:mr-32">
          <Link to="/conversion">
            <button className="hover:bg-black hover:text-white p-4 bg-white rounded w-[fit-content] text-black text-sm md:text-base font-serif ">
              Convert Now{" "}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
