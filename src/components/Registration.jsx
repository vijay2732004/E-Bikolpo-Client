import React, { use, useState } from "react";
import { AuthContext } from "../Provider/AuthContext";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Registration = () => {
  const { createSingIn, logout, googleLogin, updateUser } = use(AuthContext);

  const [error, setError] = useState("");
  const [password, setPassword] = useState(true);
  const [passwordValid, setPasswordValid] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "password") {
      // Check for at least one lowercase, one uppercase, and one number
      const isValida_z = /[a-z]/.test(value);
      const isValidA_Z = /[A-Z]/.test(value);
      const isValidDig = /\d/.test(value);

      const passwordErrors = [];

      if (!isValida_z) passwordErrors.push("at least one lowercase letter");
      if (!isValidA_Z) passwordErrors.push("at least one uppercase letter");
      if (!isValidDig) passwordErrors.push("at least one number");

      setPasswordValid(passwordErrors.map((e) => `• ${e}`).join("\n"));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const userData = Object.fromEntries(formData.entries());

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const PhotoUrl = formData.get("Photourl");


    if (password.length < 6) {
      setError("Password must be 6 characters long");
      return;
    } else {
      setError("");
    }

    // register/sign up
    createSingIn(email, password)
      .then((userCredential) => {
        Swal.fire({
          title: "Registration successfully",
          icon: "success",
          draggable: true,
        });
        updateUser({ displayName: name, photoURL: PhotoUrl })
          .then(() => {
            logout().then(() => {
              navigate("/login");
            });
          })
          .catch((error) => {
            const errorMessage = error.message;
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: errorMessage,
              footer: '<a href="#">Why do I have this issue?</a>',
            });
          });

        //send data to backend
        const creationTime = userCredential?.user?.metadata?.creationTime;
        const lastSignInTime = userCredential?.user?.metadata?.lastSignInTime;

        const userAllData = { ...userData, creationTime, lastSignInTime };
        fetch("https://roommate-search-server.vercel.app/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(userAllData),
        })
          .then((res) => res.json())
          .then(() => {
          });

        //Send verification email
        //   sendEmailVerification(userCredential.user)
        //     .then(() => {
        //       alert('Verification email sent. Please check your inbox.');
        //       // Logout to prevent auto login before email is verified
        //       logout().then(() => {
        //         navigate('/login');
        //       });
        //     })
        //     .catch(() => {
        //       setError('Failed to send verification email');
        //     });
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

  return (
    <div className="flex justify-center items-center py-3 w-11/12 mx-auto">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Registration</legend>

        <div className="text-warning">{error}</div>

        <form onSubmit={handleSubmit}>
          <label className="label">Name</label>
          <input type="text" className="input" placeholder="Name" name="name" />

          <label className="label">Photo Url</label>
          <input
            type="text"
            className="input"
            placeholder="Photo Url"
            name="Photourl"
          />

          <label className="label">Email</label>
          <input
            type="email"
            className="input"
            placeholder="Email"
            name="email"
          />

          <label className="label">Password</label>
          <span className="relative w-full">
            <input
              type={password ? "password" : "text"}
              className="input"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <span
              onClick={() => setPassword(!password)}
              className="absolute right-2 cursor-pointer top-1 z-10"
            >
              {password ? <FaEye /> : <FaEyeSlash />}
            </span>
          </span>

          <div className="text-warning whitespace-pre-line">
            {passwordValid}
          </div>

          <button type="submit" className="btn btn-neutral mt-4">
            Registration
          </button>
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
          <Link to="/login" className="underline link-secondary">
            Login
          </Link>
        </div>
      </fieldset>
    </div>
  );
};

export default Registration;
