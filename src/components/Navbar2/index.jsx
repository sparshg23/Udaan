import React from "react";
import "./style.css";
import { useState } from "react";
import { HashLink as NavLink } from "react-router-hash-link"

const Navbar2 = () => {
  const [isOpen, setIsopen] = useState(false);
  const toggle = () => setIsopen(!isOpen);

  return (
    <>
      <div className="Nav-components fixed z-10 flex items-center  text-lg text-white justify-between px-20 w-full m-4">
        <div className="nav-logo">
          <a href="https://udghosh.org.in/" className="">
            <img
              src="../../logo.png"
              alt="Logo"
              className="hover:scale-125 duration-500 w-[2.5em] "
            />
          </a>
        </div>
        <div className="Nav-in flex items-center justify-center gap-5 px-10 rounded-full h-14 w-[55%] bg-[rgba(0,0,0,0.7)]">
          <NavLink to="#" smooth duration={500} className="no-underline navlink md:cursor-pointer text-white md:hover:text-blue-400 md:duration-500">
            <p>Home</p>
          </NavLink>
          <NavLink to="#gallery" smooth duration={500} className="no-underline navlink md:cursor-pointer text-white md:hover:text-blue-400 md:duration-500">
            <p>
              Gallery
            </p>
          </NavLink>
          <NavLink to="#sponsors" smooth duration={500} className="no-underline navlink md:cursor-pointer text-white md:hover:text-blue-400 md:duration-500">
            <p>
              Sponsors
            </p>
          </NavLink>
          <NavLink to="#Contacts" smooth duration={500} className="no-underline navlink md:cursor-pointer text-white md:hover:text-blue-400 md:duration-500">
            <p>
              Contact Us
            </p>
          </NavLink>
        </div>
        <div className="buttonGetStarted">
        <button type="button" class="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-full text-md px-4 py-2.5 text-center me-2 mb-2">Get Started</button>
        </div>
      </div>
      {/* code for small screens */}
      <div className="menu md:hidden top-6 right-5 absolute text-right z-30 h-[2rem] w-[36px] flex items-center justify-center" itemType="button" onClick={toggle}>
        {isOpen ? (<svg className="w-6 h-6 bg-[#f5f0ec] rounded fixed" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>) : (<svg className="h-8 w-8 fixed rounded" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" /></svg>)}
      </div>
      <div>
        <div className={`${isOpen ? "flex" : "hidden"} md:hidden text-[#f5f0ec] bg-black fixed top-0 pt-40 text-center flex flex-col justify-start min-h-screen z-10 overflow-hidden w-2/3 right-0 rounded-l-[20px]`}>
          <div className="flex justify-center p-2 text-2xl" onClick={toggle}><NavLink smooth to="#" className=" font">Home</NavLink></div>
          <div className="flex justify-center p-2 text-2xl" onClick={toggle}><NavLink smooth to="#featured" className=" font">Featured</NavLink></div>
          <div className="flex justify-center p-2 text-2xl" onClick={toggle}><NavLink smooth to="#gallery" className=" font">Gallery</NavLink></div>
          <div className="flex justify-center p-2 text-2xl" onClick={toggle}><NavLink smooth to="#sponsors" className=" font">Sponsors</NavLink></div>
          <div className="flex justify-center p-2 text-2xl" onClick={toggle}><NavLink smooth to="#cards" className=" font">Contact</NavLink></div>
          <div className="flex justify-center p-2 text-2xl" onClick={toggle}></div>
        </div>
      </div>
    </>
  );
};

export default Navbar2;
