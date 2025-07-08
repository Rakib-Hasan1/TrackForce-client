import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const { signInUser } = useAuth();
  const [firebaseError, setFirebaseError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      setFirebaseError("");
      await signInUser(email, password)
        .then((result) => {
          console.log(result.user);
          Swal.fire({
            title: "Login Successful!",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });

          navigate("/");
        })
        .catch((error) => {
          setFirebaseError(error.message);
          console.log(error.message);
        });
    } catch (error) {
      console.error("Login error:", error.message);
      if (error.code === "auth/wrong-password") {
        setFirebaseError("Wrong password. Please try again.");
      } else if (error.code === "auth/user-not-found") {
        setFirebaseError("User not found with this email.");
      } else {
        setFirebaseError("Something went wrong. Try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-xl p-8 rounded-xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
          TrackForce Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-blue-500"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-blue-500"
              placeholder="•••••••"
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Firebase Auth Error */}
          {firebaseError && (
            <p className="text-red-600 text-sm mt-2">{firebaseError}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
