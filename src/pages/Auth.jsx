import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

import Button from "../shared/Button";
import useStore from "../store";
import { ToastContainer, toast } from "react-toastify";

const Auth = () => {
  const { user, signIn, signUp } = useStore();
  const [authType, setAuthType] = useState("login");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (user?.id) {
    return <Navigate to="/" />;
  }

  const onAuthHandler = async (data) => {
    try {
      const { email, password } = data;

      if (authType === "login") {
        await signIn(email, password);
      } else {
        await signUp(email, password);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-600 to-purple-800">
      <div className="w-full max-w-md p-8 space-y-3 bg-white bg-opacity-90 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-center">
          {authType === "login" ? "Login" : "Sign Up"}
        </h2>
        <form onSubmit={handleSubmit(onAuthHandler)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
            {errors.password && (
              <p className="mt-2 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
          <Button type="submit">
            {authType === "login" ? "Login" : "Sign Up"}
          </Button>
        </form>
        {authType === "login" ? (
          <p className="text-sm text-center">
            Don`t have an account?{" "}
            <button
              onClick={() => setAuthType("signup")}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign Up
            </button>
          </p>
        ) : (
          <p className="text-sm text-center">
            Already have an account?{" "}
            <button
              onClick={() => setAuthType("login")}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Login
            </button>
          </p>
        )}
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Auth;
