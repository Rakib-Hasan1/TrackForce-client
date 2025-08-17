import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import LoadingEffect from "../../Components/LoadingEffect";
import Swal from "sweetalert2";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { isPending, data: paymentInfo = {} } = useQuery({
    queryKey: ["payment", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment/${id}`);
      return res.data;
    },
  });

  if (isPending) {
    return <LoadingEffect />;
  }

  const amount = paymentInfo.salary;
  const amountInCents = amount * 100;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setLoading(true);

    try {
      const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

      if (stripeError) {
        setError(stripeError.message);
        setLoading(false);
        return;
      }

      setError("");
      const res = await axiosSecure.post("/create-payment-intent", {
        amountInCents,
        id,
      });
      const clientSecret = res.data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: "Rakib Hasan",
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        const paymentData = {
          transactionId: result.paymentIntent.id,
        };
        await axiosSecure.patch(`/payment-requests/${id}/pay`, paymentData);

        await Swal.fire({
          title: "Payment Successful!",
          text: `Transaction ID: ${result.paymentIntent.id}`,
          icon: "success",
          confirmButtonText: "Okay",
        });

        navigate("/dashboard/payroll");
      }
    } catch (err) {
      console.error("Payment error:", err);
      setError("Something went wrong or employee may already have received this month's salary!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <form
        onSubmit={handleSubmit}
        className="bg-base-100 dark:bg-base-200 p-6 rounded-xl shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-semibold text-center mb-2 text-base-content dark:text-base-100">
          Pay Employee
        </h2>
        <CardElement className="p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800" />
        <button
          type="submit"
          disabled={!stripe || loading}
          className="btn btn-success btn-outline w-full"
        >
          {loading ? "Processing..." : `Pay $${amount}`}
        </button>
        {error && (
          <p className="text-red-500 text-center font-medium">{error}</p>
        )}
      </form>
    </div>
  );
};

export default PaymentForm;
