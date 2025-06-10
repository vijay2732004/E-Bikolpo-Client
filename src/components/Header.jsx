import { Link, NavLink } from "react-router-dom";
//import ThemeToggle from "./ThemeToggle";
//import { AuthContext } from "../Provider/AuthContext";
//import { use } from "react";
import Swal from "sweetalert2";
import "../../src/App";
import { Typewriter } from "react-simple-typewriter";

const Header = () => {
  

  
  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
          </ul>
        </div>
        <Link to='/' className="btn btn-ghost text-xl">
          <img className="w-10 rounded-md" src="/logo.png" alt="" />{" "}
          <span className="hidden md:block">
            {" "}
            <Typewriter
              words={["E-Bikolpo"]}
              loop={true}
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={20000}
            />
          </span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1"></ul>
      </div>
      <div className="navbar-end">
        <div className="mr-2">
          {/* <ThemeToggle /> */}
        </div>
        
      </div>
    </div>
  );
};

export default Header;
