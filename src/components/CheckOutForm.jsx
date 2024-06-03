import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import usePublic from "../hooks/usePublic";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

const CheckOutForm = () => {
  const stripe = useStripe();
  const [clientSecret, setClientSecret] = useState("");
  const elements = useElements();
  const { user } = useAuth();
  const axiosSecure = usePublic();
  const price = 50;

  const getData = useCallback(async () => {
    const { data } = await axiosSecure.post("/create-payment-intent", {
      price,
    });
    console.log(data.clientSecret);
    setClientSecret(data.clientSecret);
  }, []);
  useEffect(() => {
    getData();
  }, [getData]);
  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      toast.error(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }
    //confirm payment
    const { paymentIntent, error: confirError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "ann0nyous@example.com",
            name: user?.displayName || "annonymous",
          },
        },
      });
    if (confirError) {
      console.log("[error]", error);
      toast.error(error.message);
    } else {
      console.log("[paymentIntent]", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        //change role user to pro
        await axiosSecure.patch(`/updatedRole/${user?.uid}`);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your payment is successful",
          showConfirmButton: false,
          timer: 1500,
        });
        //now save them into data base
        const payment = {
          email: user?.email,
          name: user?.displayName,
          price,
          date: new Date(),
        };
        await axiosSecure.post("/payment", payment);
        // Reset the form
        card.clear();
        setClientSecret("");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        type="submit"
        disabled={!stripe || !clientSecret}
        className="w-full btn bg-rose-500 text-white mt-9 hover:bg-rose-500"
      >
        Pay
      </button>
    </form>
  );
};

export default CheckOutForm;