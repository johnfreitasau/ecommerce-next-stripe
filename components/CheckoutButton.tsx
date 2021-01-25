import React from 'react';
import ReactDOM from 'react-dom';
import { loadStripe } from '@stripe/stripe-js';


interface CheckoutButtonProps {
  priceId: string;
  productName: string;
  image?: string;
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);



const CheckoutButton: React.FC<CheckoutButtonProps> = ({ priceId, productName, image }) => {

  async function handleCheckout() {
  
    // When the customer clicks on the button, redirect them to Checkout.
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      lineItems: [{
        price: priceId, // Replace with the ID of your price
        quantity: 1,
      }],
      mode: 'payment',
      successUrl: `http://localhost:3000/products/success?itemName=${productName}`,
      cancelUrl: 'http://localhost:3000/cancel',
    });
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    if(error) {
      console.log('ERROR',error);
    }

  };
  return (
    <button role="link" onClick={handleCheckout}>
      Checkout
    </button>
  );
}

export default CheckoutButton;