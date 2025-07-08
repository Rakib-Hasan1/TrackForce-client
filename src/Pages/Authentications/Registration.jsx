import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router";

import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const imageHostKey = import.meta.env.VITE_IMGBB_API_KEY;

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const [firebaseError, setFirebaseError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setFirebaseError("");

    // Validate image
    if (!data.photo[0]) {
      toast.error("Please upload a profile image.");
      return;
    }

    // Upload image to imgbb
    const formData = new FormData();
    formData.append("image", data.photo[0]);

    const imageUploadURL = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;

    try {
      const res = await fetch(imageUploadURL, {
        method: "POST",
        body: formData,
      });

      const imageData = await res.json();
      const photoURL = imageData.data.display_url;

      // Create Firebase User
      await createUser(data.email, data.password)
        .then((userCredential) => {
          // Signed up
          console.log(userCredential.user);
          Swal.fire({
            icon: "success",
            title: "Registration Successful!",
            showConfirmButton: false,
            timer: 1500,
          });

          reset();
          navigate("/");
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
        });

      console.log(data.name, photoURL);
      // Update profile

      const userProfile = {
        displayName: data?.name,
        photoURL: photoURL,
      };

      await updateUserProfile(userProfile)
        .then(() => {
            console.log('Profile Updated');
        })
        .catch((error) => {
            console.log(error);
        });

      // Save user in your DB (optional)
    } catch (error) {
      console.error(error.message);
      if (error.code === "auth/email-already-in-use") {
        setFirebaseError("This email is already registered.");
      } else {
        setFirebaseError("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-xl p-8 rounded-xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
          TrackForce Registration
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-blue-500"
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="text-red-600 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-blue-500"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-600 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                  message:
                    "Must include 1 capital letter & 1 special character",
                },
              })}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-blue-500"
              placeholder="•••••••"
            />
            {errors.password && (
              <p className="text-red-600 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium">Role</label>
            <select
              {...register("role", { required: "Select a role" })}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-blue-500"
              defaultValue=""
            >
              <option value="" disabled>
                Select a role
              </option>
              <option value="employee">Employee</option>
              <option value="hr">HR</option>
              {/* No Admin here */}
            </select>
            {errors.role && (
              <p className="text-red-600 text-sm">{errors.role.message}</p>
            )}
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-medium">Profile Photo</label>
            <input
              type="file"
              accept="image/*"
              {...register("photo", { required: "Photo is required" })}
              className="w-full mt-1"
            />
            {errors.photo && (
              <p className="text-red-600 text-sm">{errors.photo.message}</p>
            )}
          </div>

          {/* Firebase Error */}
          {firebaseError && (
            <p className="text-red-600 text-sm mt-1">{firebaseError}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
