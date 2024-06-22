import PropTypes from 'prop-types';
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import PrimaryButton from "../../components/PrimaryButton";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import ScholarshipForm from "../ScholarshipForm/ScholarshipForm";

const CheckOutForm = ({ totalAmount, universityName, scholarshipCategory, subjectCategory }) => {
    const [error, setError] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: "var(--accent-100)",
        iconColor: "var(--primary-500)",
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

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
        });

        if (confirmError) {
            setError(confirmError.message);
            Toast.fire({
                icon: "error",
                title: confirmError.message,
            });
        }
        else {
            if (paymentIntent.status === "succeeded") {
                setTransactionId(paymentIntent.id);
                setPaymentSuccess(true);

                Toast.fire({
                    icon: "success",
                    title: "Payment successful"
                });
            }
        }
    };

    return (
        <>
            { !paymentSuccess ? (
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
                    <PrimaryButton type="submit" disabled={ !stripe || !clientSecret } className="w-20 mt-4">Pay</PrimaryButton>

                    <p className="mt-1 text-sm text-red-500 italic">{ error }</p>

                    { transactionId && <p className="mt-2 text-green-400 italic">Payment Succeeded</p> }
                </form>
            ) : (
                <ScholarshipForm
                    universityName={ universityName }
                    scholarshipCategory={ scholarshipCategory }
                    subjectCategory={ subjectCategory }
                />
            ) }
        </>
    );
};

CheckOutForm.propTypes = {
    totalAmount: PropTypes.number,
    universityName: PropTypes.string,
    scholarshipCategory: PropTypes.string,
    subjectCategory: PropTypes.string,
};

export default CheckOutForm;