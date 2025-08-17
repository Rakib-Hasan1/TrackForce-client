import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useMutation } from "@tanstack/react-query";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import useAuth from "../../hooks/useAuth";
import SocialLogin from "../../Components/SocialLogin";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const imageHostKey = import.meta.env.VITE_IMGBB_API_KEY;

const Registration = () => {
  const { createUser, updateUserProfile } = useAuth();
  const [firebaseError, setFirebaseError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { mutate: saveUserToDB } = useMutation({
    mutationFn: async (userInfo) => {
      const res = await axiosSecure.post("/peoples", userInfo);
      return res.data;
    },
    onError: (err) => {
      console.error("DB save error:", err);
      toast.error("Failed to save user data.");
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setFirebaseError("");

    if (!data.photo[0]) {
      toast.error("Please upload a profile image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", data.photo[0]);

    const imageUploadURL = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;

    try {
      const res = await fetch(imageUploadURL, { method: "POST", body: formData });
      const imageData = await res.json();
      const photoURL = imageData.data.display_url;

      const result = await createUser(data.email, data.password);
      await updateUserProfile({ displayName: data.name, photoURL });

      const userInfo = {
        name: data.name,
        email: data.email,
        photo: photoURL,
        role: data.role,
        bank_account_no: data.bank_account_no,
        salary: parseFloat(data.salary),
        designation: data.designation,
        isVerified: false,
      };

      saveUserToDB(userInfo);

      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        showConfirmButton: false,
        timer: 1500,
      });

      reset();
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      setFirebaseError(error.message || "Something went wrong.");
    }
  };

  // unified input classes for light & dark
  const inputClasses =
    "w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 " +
    "bg-white text-gray-900 placeholder-gray-400 border-gray-300 " +
    "dark:bg-gray-700 dark:text-white dark:placeholder-gray-300 dark:border-gray-600";

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-md bg-base-100 shadow-xl p-8 rounded-xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700 dark:text-blue-400 mozilla">
          TrackForce Registration
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium dark:text-white">Full Name</label>
            <input {...register("name", { required: "Name is required" })} className={inputClasses} placeholder="John Doe" />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium dark:text-white">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" } })}
              className={inputClasses}
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium dark:text-white">Password</label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "At least 6 characters" },
                  pattern: { value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/, message: "1 capital letter & 1 special character required" },
                })}
                className={inputClasses}
                placeholder="•••••••"
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute right-4 top-3 text-gray-500 dark:text-gray-300"
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium dark:text-white">Role</label>
            <select {...register("role", { required: "Select a role" })} className={inputClasses} defaultValue="">
              <option value="" disabled>Select a role</option>
              <option value="employee">Employee</option>
              <option value="hr">HR</option>
            </select>
            {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
          </div>

          {/* Bank Account */}
          <div>
            <label className="block text-sm font-medium dark:text-white">Bank Account No.</label>
            <input {...register("bank_account_no", { required: "Bank account no. is required" })} className={inputClasses} placeholder="1234567890" />
            {errors.bank_account_no && <p className="text-red-500 text-sm">{errors.bank_account_no.message}</p>}
          </div>

          {/* Salary */}
          <div>
            <label className="block text-sm font-medium dark:text-white">Salary</label>
            <input type="number" step="any" {...register("salary", { required: "Salary is required" })} className={inputClasses} placeholder="30000" />
            {errors.salary && <p className="text-red-500 text-sm">{errors.salary.message}</p>}
          </div>

          {/* Designation */}
          <div>
            <label className="block text-sm font-medium dark:text-white">Designation</label>
            <input {...register("designation", { required: "Designation is required" })} className={inputClasses} placeholder="Software Engineer" />
            {errors.designation && <p className="text-red-500 text-sm">{errors.designation.message}</p>}
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-medium dark:text-white">Select Photo</label>
            <input type="file" accept="image/*" {...register("photo", { required: "Photo is required" })} className={inputClasses} />
            {errors.photo && <p className="text-red-500 text-sm">{errors.photo.message}</p>}
          </div>

          {firebaseError && <p className="text-red-500 text-sm mt-1">{firebaseError}</p>}

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition col-span-2">
            Register
          </button>
        </form>

        <div className="w-full mt-2">
          <SocialLogin />
        </div>

        <p className="mt-4 text-sm text-center dark:text-white">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Registration;
