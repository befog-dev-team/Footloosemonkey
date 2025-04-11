"use client";

import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Loader } from 'lucide-react';
import { toast } from 'react-hot-toast';

const VerifyPayment = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [paymentId, setPaymentId] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const emailRegex = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/, []);

    useEffect(() => {
        setIsButtonDisabled(!emailRegex.test(email) || !paymentId.trim());
    }, [email, paymentId, emailRegex]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            setLoading(true);

            // Directly check the Participant table
            const response = await axios.get(`/api/payment/verifyuser?email=${encodeURIComponent(email)}&paymentId=${encodeURIComponent(paymentId)}`);

            if (response.data?.participant) {
                setMessage('Verification successful!');
                toast.success('User Verified Successfully!');
                router.push(`/submission?email=${encodeURIComponent(email)}&paymentId=${encodeURIComponent(paymentId)}`);
                return;
            }

            // If not found
            throw new Error('Payment not found. Please check your details and try again.');

        } catch (err) {
            const errorMessage = err.response?.data?.error || err.message;
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-[90vh] bg-[aliceblue]">
            <h2 className="text-3xl font-bold mb-4">Submit Your Talent</h2>
            <form onSubmit={handleSubmit} className="w-[85vw] md:w-[26vw] bg-white p-6 rounded shadow-md">
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="paymentId" className="block text-sm font-medium text-gray-700">
                        Payment ID
                    </label>
                    <p className="text-red-500 text-[0.7rem] mb-2">
                        Note: Payment ID is generated after successful payment
                    </p>
                    <input
                        type="text"
                        id="paymentId"
                        value={paymentId}
                        onChange={(e) => setPaymentId(e.target.value)}
                        required
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    disabled={isButtonDisabled || loading}
                    className={`w-full flex justify-center items-center bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition ${isButtonDisabled ? 'opacity-70 cursor-not-allowed' : ''} ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                    {loading ? (
                        <Loader className="animate-spin" size={20} />
                    ) : (
                        "Verify Payment"
                    )}
                </button>

                {/* Forgot Payment ID Option */}
                <Link href='/forgettokenid' className='text-center'>
                    <button className="mt-4 text-sm w-full text-blue-500 hover:underline">
                        Forgot Payment ID?
                    </button>
                </Link>
            </form>
            {message && <p className="mt-4 text-green-500">{message}</p>}
            {error && <p className="mt-4 text-red-500">{error}</p>}
        </div>
    );
};

export default VerifyPayment;