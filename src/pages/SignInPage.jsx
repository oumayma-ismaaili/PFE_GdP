import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import aulsh from "../assets/aulsh.jpg";
import { UserAuthContext } from "../App";
import { fetchUser } from "../functions/fetchUser";

export default function SignInPage() {
  const { user, setUser, loading, setLoading } = useContext(UserAuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [inputError, setInputError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const error = await fetchUser(setLoading, setUser, email, password);
    if (error) {
      setError(error);
      if (error.includes("Incorrect email or password")) {
        setInputError(true);
      } else {
        setInputError(false);
      }
    } else {
      setInputError(false);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }

    if (error) {
      console.log(error);
    }
  }, [error, user, navigate]);

  return (
    <>
      <div className="flex h-screen w-screen flex-1">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <img className="h-10 w-auto" src={logo} alt="Your Company" />
              <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to your account
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Not a member?{" "}
                <a
                  href="#"
                  className="font-semibold text-green-600 hover:text-green-500"
                >
                  Contact Support
                </a>
              </p>
            </div>

            <div className="mt-10">
              <div>
                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className={`block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
                          inputError
                            ? "ring-red-500"
                            : "ring-gray-300 focus:ring-green-600"
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                    <div className="mt-2">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className={`block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
                          inputError
                            ? "ring-red-500"
                            : "ring-gray-300 focus:ring-green-600"
                        }`}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600"
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-3 block text-sm leading-6 text-gray-700"
                      >
                        Remember me
                      </label>
                    </div>

                    <div className="text-sm leading-6">
                      <a
                        href="#"
                        className="font-semibold text-green-600 hover:text-green-500"
                      >
                        Forgot password?
                      </a>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                      disabled={loading}
                    >
                      {loading ? (
                        <svg id="svg" className="h-6 w-6" viewBox="25 25 50 50">
                          <circle id="circle" r="20" cy="50" cx="50"></circle>
                        </svg>
                      ) : (
                        "Sign in"
                      )}
                    </button>
                  </div>

                  <div className="relative w-full h-8 mt-8">
                    {error && (
                      <div className="text-sm px-8 text-white font-semibold mt-4 text-center bg-red-600 py-4 rounded-lg">
                        {error}
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src={aulsh}
            alt=""
          />
        </div>
      </div>
    </>
  );
}
