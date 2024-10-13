import React, { useState } from "react";
import Navbar from "../../Component/Navbar/Navbar";
import PasswordInput from "../../Component/Input/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../util/helper";
import axiosInstance from "../../util/axiosinstance";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!username) {
      setError("please enter your username");
      return;
    }
    if (!validateEmail(email)) {
      setError("please enter a valid email address");
      return;
    }
    if (!password) {
      setError("please enter the password");
      return;
    }
    setError("");

    try {
      const response = await axiosInstance.post("/create-account", {
        username: username,
        email: email,
        password: password,
      });

      if (response.data && response.data.error) {
        setError(response.data.message);
        return
      }

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard")
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again");
      }
    }
  };
  return (
    <>
      <div className="flex items-center justify-center mt-10 md:mt-28 px-4 sm:px-0">
        <div className="w-full max-w-sm border rounded bg-white px-7 py-10 sm:w-96">
          <form onSubmit={handleSignup}>
            <h4 className="text-xl text-center mb-7">SignUp </h4>

            <input
              type="text"
              placeholder="username"
              className="input-box"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            <button type="submit" className="btn-primary">
              Create Account
            </button>

            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <Link to="/" className="font-medium text-gray-500 underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
