import React, { useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import useAxios from "../Hooks/useAxios";
import { toast } from "react-toastify";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);

    try {
      const result = await googleSignIn();
      const user = result.user;

      const userInfo = {
        name: user?.displayName,
        email: user?.email,
        photo: user?.photoURL,
        bank_account_no: "635645656541",
        salary: 20000,
        designation: "Web developer",
        role: "employee",
        isVerified: false,
      };

      const userRes = await axiosInstance.post("/peoples", userInfo);
      console.log("User updated info", userRes.data);

      toast.success("Login successful!");

      navigate("/");
    } catch (error) {
      console.error("Error during Google sign-in", error);
      toast.error("Google login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <p className="text-center text-lg my-2">OR</p>
      <button
        onClick={handleGoogleSignIn}
        type="button"
        className={`btn bg-white text-black w-full ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading} // Disable the button while loading
      >
        {loading ? (
          <span>Loading...</span> // Replace with a spinner component if preferred
        ) : (
          <>
            <svg
              aria-label="Google logo"
              width="30"
              height="30"
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
            Register with Google
          </>
        )}
      </button>
    </div>
  );
};

export default SocialLogin;
