import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import PrimaryButton from "../../components/PrimaryButton";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";

const CheckOutForm = ({ totalAmount }) => {
    const [error, setError] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const stripe = useStripe();
    const elements = useElements();
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();

    useEffect(() => {
        axiosPublic.post("/create-payment-intent", { fees: totalAmount })
            .then(res => {
                console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
            })
    }, [axiosPublic, totalAmount]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });

        if (error) {
            setError(error.message);
        }
        else {
            setError("");
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || "anonymous",
                    name: user?.displayName || "anonymous",
                },
            },
        })

        if (confirmError) {
            setError(confirmError.message);
        }
        else {
            if (paymentIntent.status === "succeeded") {
                setTransactionId(paymentIntent.id);

                const payment = {
                    email: user.email,
                    fees: totalAmount,
                    date: new Date(),
                }
            }
        }
    };

    return (
        <form onSubmit={ handleSubmit }>
            <CardElement
                options={ {
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
                } }
            />
            <PrimaryButton type="submit" disabled={ !stripe || !clientSecret } className="w-32 mt-4">Pay</PrimaryButton>

            <p className="mt-1 text-sm text-red-500 italic">{ error }</p>

            { transactionId && <p className="mt-2 text-green-400 italic">Payment Succeeded</p> }
        </form>
    );
};

export default CheckOutForm;