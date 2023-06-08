import React from 'react'

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CheckoutForm } from '../stripe/Checkout';
import { useLocation } from "react-router-dom";
import { CheckoutForm2 } from '../stripe/Checkout2';
const stripePromise = loadStripe('pk_test_51IG0LCCUBa9fLoA5hRaUzVfWF2LJE9MZaWN4PQI2kzN21B3mZ2QfT5wkZ45v83Qt6dgRIjYIqCLK4f13IQgeygXp00gM79GiG1');


function Payment(props) {
    const { state } = useLocation();
    return (
        <>
            <Elements stripe={stripePromise}>
                <CheckoutForm2 data={"20"} amount={state.amount} plan={state.plan} />
            </Elements>
            {/* state.amount */}
        </>
    )
}
export default Payment