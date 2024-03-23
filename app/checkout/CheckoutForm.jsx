import React, { useEffect, useState, useContext } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";

export default function CheckoutForm({ clientSecret }) {
  const navigation = useRouter();
  const stripe = useStripe();
  const elements = useElements();

//   const [email, setEmail] = useState(localStorage.getItem("email"));
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    if (!stripe) {
      return;
    }
    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage(" ");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe, clientSecret]);

  const handleUpdateEnroled = () => {
    fetch(`/api/plans`, {
      method: 'POST',
      body: JSON.stringify({
          planid : localStorage.getItem('id'),
          plan_size : localStorage.getItem('plan')
      }),
      headers: {
        'Content-Type': 'application/json'
      }
  })
  .then(res => {
    localStorage.removeItem('id')
    localStorage.removeItem('plan')
    console.log(res)
  })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: 'http://localhost:3000/success'
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      console.log(error.message)
      setMessage("payment successful! Redirecting to success page...");
      setTimeout(() => {
        handleUpdateEnroled();
        navigation.push("/success");
      }, 3000);
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs"
  }

  return (
    <form onSubmit={handleSubmit} style={{color: "var(--blue-color-8)"}} className=" w-full max-w-lg mx-auto p-6">
      <div className="flex flex-col items-center pt-4">
          <h1 className="text-2xl font-bold">Checkout</h1>
          <div className="text-lg">
            Amount : {localStorage.getItem('price')}.00 ₹
          </div>
      </div>
      <LinkAuthenticationElement
        id="link-authentication-element"
      />
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button disabled={isLoading || !stripe || !elements} className="w-full max-w-lg mx-auto mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
        <span id="button-text">
          {isLoading ? "Loading..." : "Pay Now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div className="text-red-500 text-center mt-4">{message}</div>}
    </form>
  );
}