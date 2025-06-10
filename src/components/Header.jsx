import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthContext";
import { use } from "react";
import Swal from "sweetalert2";
import "../../src/App";
import { Typewriter } from "react-simple-typewriter";

const Header = () => {
  const { user, logout } = use(AuthContext);
  const navigate = useNavigate();

  const logoutBtn = () => {
    logout()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Logout Seccessfull",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  const links = (
    <ul className="p-2 lg:flex justify-center items-center gap-1 font-bold">
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/quires">Quires</NavLink>
      </li>
      {/* <li>
        <NavLink to="/"></NavLink>
      </li>
      <li>
        <NavLink to="/"></NavLink>
      </li> */}
      {user ? (
        <button onClick={logoutBtn} className="btn md:hidden">
          Logout
        </button>
      ) : (
        <div className="md:hidden">
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/registration">Register</NavLink>
          </li>
        </div>
      )}
    </ul>
  );
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
            {links}
          </ul>
        </div>
        <Link to='/' className="btn btn-ghost text-xl">
          <img className="w-6 rounded-md" src="/logo.png" alt="" />
          <span className="hidden md:block">
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
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        <div className="mr-2">
          {/* <ThemeToggle /> */}
        </div>
        {user ? (
          <>
            <div
              className="tooltip tooltip-bottom z-10"
              data-tip={user?.displayName}
            >
              <img
                src={
                  user?.photoURL ||
                  "https://i.ibb.co/gZptTbDQ/307ce493-b254-4b2d-8ba4-d12c080d6651.jpg"
                }
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://i.ibb.co/gZptTbDQ/307ce493-b254-4b2d-8ba4-d12c080d6651.jpg";
                }}
                alt="profile"
                className="w-10 h-10 rounded-full mx-2 tooltip tooltip-open tooltip-bottom"
              />
            </div>
            <button onClick={logoutBtn} className="btn hidden md:block">
              Logout
            </button>
          </>
        ) : (
          <div className="hidden md:block">
            <Link to="/login" className="btn">
              Login
            </Link>
            <Link to="/registration" className="btn ml-1">
              Register
            </Link>
          </div>
        )} 
      </div>
    </div>
  );
};

export default Header;
