"use client";

import { useRouter } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';
import { Loader } from 'lucide-react';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const PaymentCheckout = () => {
  const router = useRouter();
  const formRef = useRef(null);

  const [paymentStatus, setPaymentStatus] = useState(true);
  const [userData, setUserData] = useState({
    category: '',
    email: '',
    name: '',
    talent: '',
    age: '',
    guardianNumber: '',
    address: '',
    charge: 0,
    groupName: '',
    memberCount: 0
  });
  const [userPaymentId, setUserPaymentId] = useState('');
  const [isPaid, setIsPaid] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load data 
  useEffect(() => {
    const fetchRegistrationData = async () => {
      try {
        // Get query params from URL
        const params = new URLSearchParams(window.location.search);
        const dataParam = params.get('data');

        if (dataParam) {
          const parsedData = JSON.parse(decodeURIComponent(dataParam));
          setUserData(parsedData);

          // Check if payment is already completed
          const paymentResponse = await axios.get('/api/payment/get');
          const payment = paymentResponse.data.data.find(
            (p) => p.guardianNumber === parsedData.guardianNumber
          );

          if (payment) {
            setIsPaid(true);
            setUserPaymentId(payment.paymentId);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
        toast.error('Something went wrong, Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrationData();
  }, []);

  // Calculate IGST and CGST
  const igstRate = 9, cgstRate = 9;
  const igstAmount = (userData.charge * igstRate) / 100;
  const cgstAmount = (userData.charge * cgstRate) / 100;
  const totalAmount = Number(userData.charge) + igstAmount + cgstAmount;
  const totalIncludingGST = Number(totalAmount.toFixed(2));
  const razorpayCharge = Math.floor(totalIncludingGST);

  // Get age group based on category or age
  const getAgeGroup = () => {
    if (userData.category === 'Kid') return '5-12';
    if (userData.category === 'Teenage') return '13-19';
    if (userData.category === 'Group') return 'Group';

    // Fallback if category not set but age is available
    if (userData.age) {
      const age = parseInt(userData.age);
      if (age >= 5 && age <= 12) return '5-12';
      if (age >= 13 && age <= 19) return '13-19';
    }

    return 'N/A';
  };

  // Handle payment data submission
  const handlePaymentData = async (paymentId, status) => {
    const paymentData = {
      email: userData.email,
      name: userData.name,
      guardianNumber: userData.guardianNumber,
      address: userData.address,
      charge: userData.charge,
      talent: userData.talent,
      age: userData.age,
      category: userData.category,
      paymentId: paymentId,
      status: status,
      taxAmount: igstAmount + cgstAmount,
      totalAmount: totalIncludingGST,
      ...(userData.category === 'Group' && {
        groupName: userData.groupName,
        memberCount: userData.memberCount,
        members: userData.memberNames.map((name, i) => ({
          name,
          email: userData.memberEmails[i] || null
        }))
      })
    };

    try {
      const response = await axios.post('/api/payment/create', paymentData);
      if (response.data.success) {
        toast.success("Payment Successful!");
        return true;
      } else {
        console.error("Payment Failed:", response.data.message);
        toast.error("Payment Failed. Please try again later.");
        return false;
      }
    } catch (error) {
      console.error("Error submitting payment:", error);
      toast.error("Error processing payment. Please try again.");
      return false;
    }
  };

  // Razorpay Payment Gateway Integration or Handle Free Payment
  const initiatePayment = async () => {
    try {
      // Handle free payment case
      if (userData.charge == 0) {
        setPaymentStatus(false);
        setIsPaid(false);

        const dummyPaymentId = `free_${Math.random().toString(36).substring(2, 10)}`;
        setUserPaymentId(dummyPaymentId);

        const paymentSuccess = await handlePaymentData(dummyPaymentId, 'success');

        if (paymentSuccess) {
          toast.success("You availed the free registration successfully!",);

          // Send confirmation email
          await sendMail(dummyPaymentId);

          // Copy the Payment ID to clipboard
          await navigator.clipboard.writeText(dummyPaymentId);

          toast.success(`Registration successful! Your Token ID = ${dummyPaymentId} has been processed.`,);

          toast.success(`Your Token ID has been copied to your clipboard. Please keep it safe!`,);
          router.push('/verifyuser');
        }

        setPaymentStatus(true);
        setIsPaid(true);
        return;
      }

      setPaymentStatus(false); // Disable the button immediately when starting payment
      setIsPaid(false);

      // Make API call to the server for Razorpay order
      const response = await axios.post('/api/payment/orders', {
        amount: razorpayCharge * 100 // Convert to paisa
      });

      const { order } = response.data;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        name: "Footloosemonkey",
        amount: order.amount,
        currency: "INR",
        description: "Payment for Registration",
        order_id: order.id,
        image: '/logo.png',
        handler: async function (response) {
          try {
            const verificationResponse = await axios.post('/api/payment/verify', {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verificationResponse.data.success) {
              toast.success(
                `Payment successful! Your Token ID = ${response.razorpay_payment_id} has been processed.`,);

              // Save payment data
              const paymentSuccess = await handlePaymentData(response.razorpay_payment_id, 'success');

              if (paymentSuccess) {
                // Send confirmation email
                await sendMail(response.razorpay_payment_id);

                // Copy the Payment ID to clipboard
                await navigator.clipboard.writeText(response.razorpay_payment_id);

                toast.success(
                  `Your Token ID has been copied to your clipboard. Please keep it safe!`,
                );

                setTimeout(() => {
                  router.push('/verifyuser');
                }, 3000);
              }
            } else {
              await handlePaymentData(response.razorpay_payment_id, 'failed');
              toast.error('Payment verification failed. Please contact support.');
            }
          } catch (error) {
            console.error('Error verifying payment:', error);
            await handlePaymentData(response.razorpay_payment_id, 'failed');
            toast.error('Payment verification failed. Please contact support.');
          } finally {
            setPaymentStatus(true);
          }
        },
        theme: {
          color: "#004873",
        },
        prefill: {
          name: userData.name || '',
          email: userData.email || '',
          contact: userData.guardianNumber || '',
        },
        notes: {
          address: userData.address,
          talent: userData.talent,
          category: userData.category
        },
        modal: {
          ondismiss: function () {
            setPaymentStatus(true);
            toast.error('Payment window closed. Please try again if you want to proceed.');
          }
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Error initiating payment:', error);
      toast.error('Failed to initiate payment. Please try again later.');
      setPaymentStatus(true);
      setIsPaid(true);
    }
  };

  // Handle send mail of participant credentials
  const sendMail = async (paymentId) => {
    try {
      // If it's a group, fetch members from your API or include them in the initial data
      let members = [];
      if (userData.category === 'Group' && userData.memberEmails) {
        members = userData.memberEmails.map(email => ({ email }));
      }

      const response = await axios.post('/api/payment/send-mail', {
        email: userData.email,
        name: userData.name,
        paymentId: paymentId,
        talent: userData.talent,
        amount: userData.charge,
        category: userData.category,
        ...(userData.category === 'Group' && {
          groupName: userData.groupName,
          memberCount: userData.memberCount,
          memberNames: userData.memberNames,
          memberEmails: userData.memberEmails,
          members: members
        })
      });

      if (response.data.success) {
        toast.success('Confirmation email sent successfully!');
      } else {
        throw new Error(response.data.message || 'Failed to send emails');
      }
    } catch (error) {
      console.error("Error in sending mail:", error);
      toast.error('Failed to send some confirmation emails. Please contact support.',);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isPaid) {
      toast.success('You have already completed the payment. Redirecting...',);
      router.push('/verifyuser');
      return;
    }

    await initiatePayment();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-blue-500 font-medium text-lg">Loading, please wait...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#e5e7eb] w-full min-h-screen flex justify-center items-center py-8">
      <div className="max-w-6xl bg-white w-[95%] h-full md:py-8 md:px-8 py-5 px-4 grid lg:grid-cols-3 grid-cols-1 gap-8 rounded-lg shadow-lg">
        {/* Cart Items */}
        <div className="cart-items col-span-2">
          <div className="cart-header flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Payment Checkout</h1>
            <button
              onClick={() => router.push('/register')}
              className="px-6 py-2 bg-[#004873] text-white font-semibold rounded hover:bg-[#0076ff] transition duration-300"
            >
              Go back
            </button>
          </div>

          {/* Participant Information */}
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Participant Information</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Category</p>
                <p className="font-medium">{userData.category}</p>
              </div>

              {userData.category === 'Group' && (
                <>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Group Name</p>
                    <p className="font-medium">{userData.groupName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Members</p>
                    <p className="font-medium">{userData.memberCount}</p>
                  </div>
                </>
              )}

              {userData.category !== 'Group' && (
                <>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Name</p>
                    <p className="font-medium">{userData.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="font-medium">{userData.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Age</p>
                    <p className="font-medium">{userData.age}</p>
                  </div>
                </>
              )}

              <div>
                <p className="text-sm font-medium text-gray-500">Contact Number</p>
                <p className="font-medium">{userData.guardianNumber}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Talent Category</p>
                <p className="font-medium">{userData.talent}</p>
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Payment Summary</h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Registration Fee:</span>
                <span className="font-medium">₹ {userData.charge}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">IGST (9%):</span>
                <span className="font-medium">₹ {igstAmount.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">CGST (9%):</span>
                <span className="font-medium">₹ {cgstAmount.toFixed(2)}</span>
              </div>

              <div className="border-t border-gray-200 pt-3 mt-3">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total Amount:</span>
                  <span>₹ {totalIncludingGST}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Action Section */}
        <div className="col-span-1">
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-8 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Complete Payment</h3>

              {isPaid ? (
                <div className="bg-green-50 border border-green-200 rounded p-4 mb-4">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <p className="text-green-700 font-medium">Payment Completed</p>
                  </div>
                  <p className="text-sm text-green-600 mt-2">
                    Your payment ID: <span className="font-mono">{userPaymentId}</span>
                  </p>
                  <button
                    type="button"
                    onClick={() => router.push('/verifyuser')}
                    className="w-full mt-4 py-2 bg-green-600 text-white font-medium rounded hover:bg-green-700 transition duration-300"
                  >
                    View Registration
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Total Amount:</span>
                      <span className="text-xl font-bold text-[#004873]">₹ {totalIncludingGST}</span>
                    </div>

                    <p className="text-sm text-gray-500 mb-4">
                      {userData.charge === 0 ?
                        "This is a free registration" :
                        "Includes all taxes and fees"}
                    </p>

                    <div className="flex items-center mb-4">
                      <input
                        type="checkbox"
                        id="termsCheckbox"
                        className="mr-2"
                        required
                      />
                      <label htmlFor="termsCheckbox" className="text-sm text-gray-600">
                        I agree to the <a href="/terms-condition-policy" target='_blank' className="text-[#004873] hover:underline">terms and conditions</a>
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={!paymentStatus}
                    className={`w-full py-3 flex justify-center items-center text-white font-semibold rounded-lg ${paymentStatus
                      ? 'bg-[#004873] hover:bg-[#0076ff]'
                      : 'bg-gray-400 cursor-not-allowed'
                      } transition duration-300`}
                  >
                    {!paymentStatus ? (
                      <>
                        <Loader className="animate-spin mr-2" size={20} />
                        Processing...
                      </>
                    ) : (
                      userData.charge === 0 ? "Complete Registration" : "Pay Now"
                    )}
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentCheckout;