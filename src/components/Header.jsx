import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthContext";
import { useContext, useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { Typewriter } from "react-simple-typewriter";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const logoutBtn = () => {
    logout()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Logout Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((error) => console.error("Logout Error:", error));
  };

  const handleOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isMenuOpen]);

  const navLinks = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/quires">All Queries</NavLink></li>
      {user && (
        <>
          <li><NavLink to="/recommendationsForMe">Recommendations For Me</NavLink></li>
          <li><NavLink to="/addQueries">Add Query</NavLink></li>
          <li><NavLink to="/myQueries">My Queries</NavLink></li>
          <li><NavLink to="/myRecommendations">My Recommendations</NavLink></li>
        </>
      )}
      {user ? (
        <li className="block md:hidden">
          <button onClick={logoutBtn} className="btn btn-sm w-full">Logout</button>
        </li>
      ) : (
        <ul className="block lg:hidden">
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
      )}
    </>
  );

  return (
    <header className="navbar bg-base-300 shadow-sm fixed top-0 z-50 w-full">
      <div className="navbar-start">
        {/* Mobile menu */}
        <div className="dropdown" ref={dropdownRef}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="btn btn-ghost lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </button>
          {isMenuOpen && (
            <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 shadow z-50 absolute">
              {navLinks}
            </ul>
          )}
        </div>

        {/* Logo & Typewriter */}
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          <img src="/logo.png" alt="Logo" className="w-6 h-6 rounded-md mr-2" />
          <span className="hidden md:block">
            <Typewriter
              words={["E-Bikolpo"]}
              loop
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={20000}
            />
          </span>
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal font-semibold md:gap-1">{navLinks}</ul>
      </div>

      {/* User Section */}
      <div className="navbar-end">
        {user ? (
          <>
            <div
              className="tooltip tooltip-bottom"
              data-tip={user.displayName || "User"}
            >
              <img
                src={
                  user.photoURL ||
                  "https://i.ibb.co/gZptTbDQ/307ce493-b254-4b2d-8ba4-d12c080d6651.jpg"
                }
                alt="profile"
                className="w-10 h-10 rounded-full mx-2"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://i.ibb.co/gZptTbDQ/307ce493-b254-4b2d-8ba4-d12c080d6651.jpg";
                }}
              />
            </div>
            <button onClick={logoutBtn} className="btn hidden md:block">
              Logout
            </button>
          </>
        ) : (
          <div className="hidden md:flex gap-2">
            <Link to="/login" className="btn btn-sm">
              Login
            </Link>
            <Link to="/register" className="btn btn-sm">
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
