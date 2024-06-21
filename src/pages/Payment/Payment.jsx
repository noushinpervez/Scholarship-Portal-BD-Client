import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Helmet } from "react-helmet-async";
import CheckOutForm from "./CheckOutForm";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_KEY);

const Payment = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const applicationFees = parseInt(searchParams.get("applicationFees")) || 0;
    const serviceCharge = parseInt(searchParams.get("serviceCharge")) || 0;

    const totalAmount = (applicationFees + serviceCharge);

    return (
        <div>
            <Helmet>
                <title>Scholarship Portal | Payment</title>
            </Helmet>

            <div className="container my-16 mx-auto px-2 md:px-4">
                <h2 className="text-center mb-12 px-6 text-3xl font-bold text-accent-600">Payment</h2>

                <Elements stripe={ stripePromise }>
                    <CheckOutForm totalAmount={ totalAmount } />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;