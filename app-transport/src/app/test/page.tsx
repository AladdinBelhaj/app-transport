"use client";
import React from "react";
import { useState } from "react";
import axios from "axios";

const Test = () => {
  const [checkoutUrl, setCheckoutUrl] = useState("");

  const handleCheckout = async () => {
    try {
      // Update the URL here to match your backend endpoint
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/stripe/create-checkout-session`,
        {
          name: "Subscription",
          description: "Product Description",
          amount: 1000, // Amount in cents
          currency: "usd",
        },
      );
      setCheckoutUrl(response.data.url);
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  return (
    <div>
      <button onClick={handleCheckout}>CHECKOUT</button>
      {checkoutUrl && <a href={checkoutUrl}>Proceed to Checkout</a>}
    </div>
  );
};

export default Test;
