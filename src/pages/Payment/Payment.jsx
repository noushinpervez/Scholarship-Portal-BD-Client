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

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2">
                        <Elements stripe={ stripePromise }>
                        <CheckOutForm totalAmount={ totalAmount } />
                        </Elements>
                    </div>

                    <div className="bg-accent-50 border border-primary-200 p-6 rounded text-gray-600 lg:col-span-1">
                        <p className="text-4xl font-extrabold">$ { totalAmount }</p>

                        <ul className="mt-8 space-y-4">
                            <li className="flex flex-wrap gap-4 text-sm">Application Fees<span className="ml-auto font-bold">$ { applicationFees }</span></li>
                            <li className="flex flex-wrap gap-4 text-sm">Service Charge <span className="ml-auto font-bold">$ { serviceCharge }</span></li>
                            <li className="flex flex-wrap gap-4 text-sm font-bold border-t-2 pt-4">Total <span className="ml-auto">$ { totalAmount}</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;