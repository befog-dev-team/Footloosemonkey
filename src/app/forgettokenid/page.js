"use client";

import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { Loader } from 'lucide-react';

const ForgetTokenId = () => {
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const emailRegex = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/, []);

    useEffect(() => {
        setIsButtonDisabled(!emailRegex.test(email) || !phoneNumber.trim());
    }, [email, emailRegex, phoneNumber]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            setLoading(true);
            const response = await axios.post('/api/participant/retrieve-payment-id', {
                email,
                phoneNumber
            });

            if (response.data.success) {
                setMessage(response.data.paymentId);
                toast.success('Payment ID retrieved successfully!');

                // Copy the Payment ID to clipboard
                await navigator.clipboard.writeText(response.data.paymentId);
                setTimeout(() => {
                    toast.success('Payment ID copied to clipboard!');
                }, 500);
            } else {
                throw new Error(response.data.message || 'Payment ID not found');
            }
        } catch (err) {
            const errorMessage = err.response?.data?.error || err.message;
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[90vh] bg-[aliceblue] p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Recover Payment ID</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Registered Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your registered email"
                        />
                    </div>

                    <div>
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your registered phone number"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isButtonDisabled || loading}
                        className={`w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center ${(isButtonDisabled || loading) ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                    >
                        {loading ? (
                            <>
                                <Loader className="animate-spin mr-2" size={20} />
                                Searching...
                            </>
                        ) : (
                            "Retrieve Payment ID"
                        )}
                    </button>
                </form>

                {message && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-sm text-gray-700 mb-2">Your Payment ID:</p>
                        <p className="font-mono text-blue-600 break-all">{message}</p>
                    </div>
                )}

                {error && (
                    <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <div className="mt-6 text-center">
                    <Link href="/verifyuser">
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            ← Back to Verification Page
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgetTokenId;