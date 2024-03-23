"use client";
import React, { useState, useContext, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import CheckoutForm from "./CheckoutForm";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
// const stripePromise = loadStripe(`${process.env.REACT_APP_PUBLICATION_KEY}`);
const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_PUBLICATION_KEY}`);

export default function Checkout() {

  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    // console.log(process.env.NODE_ENV)
    // console.log(`${process.env.REACT_APP_TITLE}`)

    axios.post("/api/create-payment-intent", {
      withCredentials: true,
      accessControlAllowCredentials: true,
      credientials: "same-origin",
      amount: 1099,
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then((res) => {
        setClientSecret(res.data.clientSecret);

      })
      .catch((err) => {
        console.log(err);

      }
    );
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div id="checkout">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}