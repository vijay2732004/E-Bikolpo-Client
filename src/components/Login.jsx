import React, { use, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthContext";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { singIn, googleLogin } = use(AuthContext);
  const [password, setPassword] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const emailRef = useRef();

  const handleLogin = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    // login
    singIn(email, password)
      .then(() => {
        if (location.state) {
          navigate(location.state);
        } else {
          navigate("/");
        }
        Swal.fire({
          title: "Login successfully",
          icon: "success",
          draggable: true,
        });
        // if (!data.user.emailVerified) {
        //   alert("Please verify your email before logging in.");
        //   logout();
        //   return;
        // } else {
        //   if (location.state) {
        //     navigate(location.state);
        //   } else {
        //     navigate("/");
        //   }
        //           Swal.fire({
        //   title: "Login successfully",
        //   icon: "success",
        //   draggable: true,
        // });
        // }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
          footer: '<a href="#">Why do I have this issue?</a>',
        });
      });
  };

  //google login
  const handleGoogleSubmit = () => {
    googleLogin()
      .then(() => {
        if (location.state) {
          navigate(location.state);
        } else {
          navigate("/");
        }
        Swal.fire({
          title: "Login successfully",
          icon: "success",
          draggable: true,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
          footer: '<a href="#">Why do I have this issue?</a>',
        });
      });
  };

  //Forget
  //   const handleForget = () => {
  //     const email = emailRef.current.value;
  //     resetEmail(email)
  //     .then(()=>{
  //       alert('Sent Reset Password Link in Your Email');

  //     }).catch((error) => {
  //             const errorMessage = error.message;
  //                     Swal.fire({
  //   icon: "error",
  //   title: "Oops...",
  //   text: error.message,
  //   footer: '<a href="#">Why do I have this issue?</a>',
  // });

  //           });
  //   };

  return (
    <div className="flex justify-center items-center py-3 w-11/12 mx-auto">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Login</legend>

        <form onSubmit={handleLogin}>
          <label className="label">Email</label>
          <input
            type="email"
            className="input"
            placeholder="Email"
            ref={emailRef}
            name="email"
            required
          />

          <label className="label">Password</label>
          <span className="relative w-full">
            <input
            type={password ? 'password' : 'text'}
            className="input"
            placeholder="Password"
            name="password"
            required
          />
          <span onClick={()=>setPassword(!password)} className="absolute right-2 cursor-pointer top-1 z-10">{password ? <FaEye /> : <FaEyeSlash />}</span>
          </span>

          <div className="text-right py-1 underline cursor-pointer">
            Forget Password
          </div>

          <button className="btn btn-neutral mt-4">Login</button>
        </form>
        {/* Google */}
        <button
          className="btn bg-white text-black border-[#e5e5e5] my-3"
          onClick={handleGoogleSubmit}
        >
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Login with Google
        </button>

        <div>
          Already have an account?{" "}
          <Link to="/register" className="underline link-secondary">
            Registration
          </Link>
        </div>
      </fieldset>
    </div>
  );
};

export default Login;
