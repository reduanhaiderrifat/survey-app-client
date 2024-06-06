import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "../components/CheckOutForm";
import svg from "../../public/svg.svg";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);
const Pricing = () => {
  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{ backgroundImage: `url(${svg})` }}
    >
      <div className="border-2 border-rose-500 p-3 rounded-lg bg-white">
        <h2 className="text-3xl text-center font-semibold  text-black">
          Get our membership for the pro-user ($50)
        </h2>
        <div className="mt-12">
          <Elements stripe={stripePromise}>
            <CheckOutForm />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
