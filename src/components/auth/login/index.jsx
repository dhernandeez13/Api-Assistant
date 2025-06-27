import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../../../firebase/auth";
import { useAuth } from "../../../contexts/authContext";
import { getAuth, GithubAuthProvider, signInWithPopup } from "firebase/auth";

const Login = () => {
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      setErrorMessage("");
      try {
        await doSignInWithEmailAndPassword(email, password);
      } catch (err) {
        setErrorMessage("Error signing in. Please check your credentials.");
      } finally {
        setIsSigningIn(false);
      }
    }
  };

  const onGoogleSignIn = (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      doSignInWithGoogle().catch((err) => {
        setIsSigningIn(false);
      });
    }
  };

  const onGithubSignIn = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      setErrorMessage("");
      const auth = getAuth();
      const provider = new GithubAuthProvider();
      try {
        await signInWithPopup(auth, provider);
      } catch (err) {
        setErrorMessage("Error signing in with GitHub. Please try again.");
      } finally {
        setIsSigningIn(false);
      }
    }
  };

  return (
    <div>
      {userLoggedIn && <Navigate to={"/"} replace={true} />}

      <main className="w-full h-screen flex items-center justify-center overflow-hidden">
        <div className="w-96 text-gray-700 dark:text-gray-200 space-y-5 p-6 rounded-xl mt-0
          bg-white border border-gray-300 shadow-lg
          dark:bg-gray-900 dark:border-gray-700 dark:shadow-xl
          transition-colors duration-300">
          <div className="text-center">
            <div className="mt-2">
              <h3 className="text-gray-900 dark:text-white text-xl font-semibold sm:text-2xl">
                Log In
              </h3>
            </div>
          </div>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Email</label>
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="w-full mt-2 px-3 py-2 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 outline-none border border-gray-200 dark:border-gray-700 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:focus:border-indigo-500 shadow-sm rounded-lg transition duration-300 placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="w-full mt-2 px-3 py-2 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 outline-none border border-gray-200 dark:border-gray-700 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:focus:border-indigo-500 shadow-sm rounded-lg transition duration-300 placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="Enter your password"
              />
            </div>

            {errorMessage && (
              <span className="block text-center text-red-700 font-bold bg-red-100 border border-red-200 rounded p-2 dark:bg-red-900 dark:border-red-700 dark:text-red-200">
                {errorMessage}
              </span>
            )}

            <button
              type="submit"
              disabled={isSigningIn}
              className={`w-full px-4 py-2 text-white font-medium rounded-lg transition-colors duration-200
                ${isSigningIn
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-gray-950 hover:bg-gray-800 shadow-md hover:shadow-lg'}
                dark:bg-gray-900 dark:hover:bg-gray-800 dark:shadow-xl`}
            >
              {isSigningIn ? "Signing In..." : "Sign In"}
            </button>
          </form>
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link
              to={"/register"}
              className="inline-block font-bold underline-offset-2 transition-colors duration-150
                text-gray-700 hover:text-gray-600 focus:text-gray-500 
                dark:text-indigo-400 dark:hover:text-indigo-300 dark:focus:text-indigo-200"
            >
              Sign up
            </Link>
          </p>
          <div className="flex flex-row text-center w-full">
            <div className="border-b-2 mb-2.5 mr-2 w-full border-gray-200 dark:border-gray-700"></div>
            <div className="text-sm font-bold w-fit text-gray-500 dark:text-gray-400">OR</div>
            <div className="border-b-2 mb-2.5 ml-2 w-full border-gray-200 dark:border-gray-700"></div>
          </div>
          <button
            disabled={isSigningIn}
            onClick={onGoogleSignIn}
            className={`w-full flex items-center justify-center gap-x-3 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 mt-2 transition duration-300
              ${isSigningIn ? 'cursor-not-allowed opacity-70' : 'hover:bg-gray-50 active:bg-gray-100 dark:hover:bg-gray-700'}`}
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_17_40)">
                <path
                  d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z"
                  fill="#4285F4"
                />
                <path
                  d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z"
                  fill="#34A853"
                />
                <path
                  d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z"
                  fill="#FBBC04"
                />
                <path
                  d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z"
                  fill="#EA4335"
                />
              </g>
              <defs>
                <clipPath id="clip0_17_40">
                  <rect width="48" height="48" fill="white" />
                </clipPath>
              </defs>
            </svg>
            {isSigningIn ? "Signing In..." : "Continue with Google"}
          </button>
          <button
            disabled={isSigningIn}
            onClick={onGithubSignIn}
            className={`w-full flex items-center justify-center gap-x-3 py-2.5 border-none rounded-lg text-sm font-medium mt-2 text-white bg-gradient-to-r from-[#6e40c9] via-[#8f5cf7] to-[#a084ee] shadow-lg transition duration-300 hover:brightness-110 active:scale-95
              ${isSigningIn ? 'cursor-not-allowed opacity-70' : ''}`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.31.468-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.984-.399 3.003-.404 1.018.005 2.045.138 3.003.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .321.218.694.825.576C20.565 21.796 24 17.299 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            {isSigningIn ? "Signing In..." : "Continue with GitHub"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
