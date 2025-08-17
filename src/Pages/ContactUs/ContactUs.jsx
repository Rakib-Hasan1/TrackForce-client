import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

import LoadingEffect from "../../Components/LoadingEffect";
import useAxios from "../../Hooks/useAxios";

const ContactUs = () => {
  const axiosInstance = useAxios();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: async (reviews) => {
      const res = await axiosInstance.post("/reviews", reviews);
      return res.data;
    },
    onSuccess: (data, variables) => {
      Swal.fire({
        icon: "success",
        title: "Message Sent",
        text: `Thank you, ${variables.email}! We have received your message.`,
        timer: 3000,
        showConfirmButton: false,
      });
      reset();
    },
    onError: (error) => {
      console.error("Review submission error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong. Please try again later.",
      });
    },
  });

  const onSubmit = (reviews) => {
    mutate(reviews);
  };

  return (
    <section className="min-h-screen bg-base-200 text-base-content py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-base-100 p-8 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-semibold mb-6 text-base-content">
            Contact Us
          </h2>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 font-medium text-base-content/80"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              className={`w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-primary ${errors.email ? "border-error" : "border-base-300"
                } bg-base-100 text-base-content`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Please enter a valid email",
                },
              })}
            />
            {errors.email && (
              <p className="text-error text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="message"
              className="block mb-2 font-medium text-base-content/80"
            >
              Message
            </label>
            <textarea
              id="message"
              rows="5"
              placeholder="Your message here..."
              className={`w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-primary ${errors.message ? "border-error" : "border-base-300"
                } bg-base-100 text-base-content`}
              {...register("message", {
                required: "Message is required",
                minLength: {
                  value: 10,
                  message: "Message must be at least 10 characters",
                },
              })}
            />
            {errors.message && (
              <p className="text-error text-sm mt-1">{errors.message.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn btn-primary"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
          {isPending && <LoadingEffect />}
        </form>

        {/* Dummy Company Info */}
        <div className="bg-base-100 p-8 rounded-lg shadow-md flex flex-col justify-center">
          <h3 className="text-xl font-semibold mb-4 text-base-content">
            Our Office
          </h3>
          <p className="text-base-content/70 mb-2">
            123 TrackForce Avenue
            <br />
            Dhaka, Bangladesh
          </p>
          <p className="text-base-content/70 mb-2">Phone: +880 1234 567890</p>
          <p className="text-base-content/70 mb-2">Email: support@trackforce.com</p>
          <p className="text-base-content/70 mt-4 italic">
            We appreciate your feedback and are here to help you.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
