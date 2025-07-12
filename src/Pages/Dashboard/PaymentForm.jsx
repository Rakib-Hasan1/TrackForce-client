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
  const [loading, setLoading] = useState(false); // ✅ loading state
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

    setLoading(true); // ✅ disable button

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      setError("");
      console.log(paymentMethod);
      // Step 1: Create payment intent
      const res = await axiosSecure.post("/create-payment-intent", {
        amountInCents,
        id,
      });
      const clientSecret = res.data.clientSecret;

      // Step 2: Confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: "Rakib Hasan", // You can use user.name if logged-in
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        setError("");
        if (result.paymentIntent.status === "succeeded") {
          const paymentData = {
            transactionId: result.paymentIntent.id,
          };

          // Step 3: Update backend status
          await axiosSecure.patch(`/payment-requests/${id}/pay`, paymentData);

          // Step 4: Show success modal
          await Swal.fire({
            title: "Payment Successful!",
            text: `Transaction ID: ${result.paymentIntent.id}`,
            icon: "success",
            confirmButtonText: "Okay",
          });

          // Step 5: Redirect
          navigate("/dashboard/payroll");
        }
      }
    } catch (err) {
      console.error("Payment error:", err);
      setError("Something went wrong! Please try again.");
    } finally {
      setLoading(false); // ✅ enable button again
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto"
      >
        <CardElement className="p-2 border border-blue-300 rounded" />
        <button
          type="submit"
          disabled={!stripe || loading}
          className="btn btn-success btn-outline w-full"
        >
          {loading ? "Processing..." : `Pay $${amount}`}
        </button>
        {error && <p className="text-red-500 text-xl text-center">{error}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
