import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    // Here you can add your backend POST request or email sending logic.
    Swal.fire({
      icon: "success",
      title: "Message Sent",
      text: `Thank you, ${data.email}! We have received your message.`,
      timer: 3000,
      showConfirmButton: false,
    });
    reset();
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
            Contact Us
          </h2>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 font-medium text-gray-700 dark:text-gray-300"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              className={`w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              } dark:bg-gray-700 dark:text-white`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Please enter a valid email",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="message"
              className="block mb-2 font-medium text-gray-700 dark:text-gray-300"
            >
              Message
            </label>
            <textarea
              id="message"
              rows="5"
              placeholder="Your message here..."
              className={`w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.message ? "border-red-500" : "border-gray-300"
              } dark:bg-gray-700 dark:text-white`}
              {...register("message", {
                required: "Message is required",
                minLength: {
                  value: 10,
                  message: "Message must be at least 10 characters",
                },
              })}
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-semibold transition"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>

        {/* Dummy Company Info */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md flex flex-col justify-center">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Our Office
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            123 TrackForce Avenue
            <br />
            Dhaka, Bangladesh
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            Phone: +880 1234 567890
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            Email: support@trackforce.com
          </p>
          <p className="text-gray-600 dark:text-gray-300 mt-4 italic">
            We appreciate your feedback and are here to help you.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
