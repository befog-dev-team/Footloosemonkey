"use client";

import Image from 'next/image';
import Link from 'next/link';
import PricingPlans from '../../components/home/PricingPlans';
import { useEffect, useState } from 'react';
import { getAdminData } from '../services';

export default function AboutUs() {
    const [competition, setCompetition] = useState('');
    const [loading, setLoading] = useState(true);

    const [offerCharge, setOfferCharge] = useState(0);
    const [groupACharge, setGroupACharge] = useState(0);
    const [groupBCharge, setGroupBCharge] = useState(0);
    const [groupCCharge, setGroupCCharge] = useState(0);

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const response = await getAdminData();
                if (response.success && response.data?.[0]) {
                    const data = response.data[0];
                    setCompetition(data.talent?.toLowerCase() || '');
                    setGroupACharge(Number(data.groupACharge) || 0);
                    setGroupBCharge(Number(data.groupBCharge) || 0);
                    setGroupCCharge(Number(data.groupCCharge) || 0);
                    setOfferCharge(Number(data.offerCharge) || 0);
                } else {
                    console.error('Error fetching admin data:', response.message);
                }
            } catch (error) {
                console.error('Error fetching admin data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAdminData();
    }, []);

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
        <div className="bg-[aliceblue] min-h-screen">
            <div className="container mx-auto px-4 md:px-6 py-16">
                <h1 className="md:text-5xl text-[2.4rem] font-bold text-center mb-12 text-sky-700">
                    About Footloosemonkey
                </h1>

                <div className="text-center mb-12">
                    <p className="text-xl leading-8 text-gray-700">
                        Welcome to Footloosemonkey – the ultimate stage for performers of all ages and backgrounds! Whether you&apos;re a child taking your first step, a teen pursuing your passion, an adult exploring your creative side, or part of a group ready to shine together—this is your spotlight.
                    </p>
                    <p className="text-xl leading-8 text-gray-700 mt-6">
                        From singing, dancing, acting, mimicry, and more, Footloosemonkey celebrates every form of talent. We believe that creativity knows no age or limit, and everyone deserves a chance to express themselves, grow, and be celebrated.
                    </p>
                    <p className="text-xl leading-8 text-gray-700 mt-6">
                        Our platform welcomes both solo performers and groups, offering fun-filled competitions, meaningful exposure, and a supportive community that helps you thrive.
                    </p>
                    <p className="text-xl leading-8 text-gray-700 mt-6">
                        At Footloosemonkey, it’s not just about winning—it’s about shining. Together.
                    </p>
                </div>

                {/* Responsive Grid for Vision and Offer */}
                <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2">
                    <div className="bg-white shadow-lg p-6 rounded-lg">
                        <Image src="/v1/about/vision2.png" alt="Performers on stage" width={600} height={350} className="rounded-lg w-full h-auto" />
                        <h2 className="text-3xl font-semibold mt-8 text-sky-700">Our Vision</h2>
                        <p className="text-xl mt-4 text-gray-600">
                            To create a vibrant community where children can grow, gain confidence, and explore their artistic potential.
                        </p>
                    </div>

                    <div className="bg-white shadow-lg p-6 rounded-lg">
                        <Image src="/v1/about/offer.png" alt="Dancers performing" width={600} height={350} className="rounded-lg w-full h-auto" />
                        <h2 className="text-3xl font-semibold mt-8 text-sky-700">What We Offer</h2>
                        <ul className="list-disc list-inside text-xl text-gray-600 mt-4 space-y-3">
                            <li>Professional guidance from expert judges</li>
                            <li>Opportunities to perform on a big stage</li>
                            <li>Exciting prizes and recognition for talent</li>
                            <li>A platform to collaborate with other young performers</li>
                            <li>A fun-filled experience where every child is a winner!</li>
                        </ul>
                    </div>
                </div>

                {/* Responsive Why Choose Us Section */}
                <div className="mt-16">
                    <h2 className="text-4xl text-center font-bold mb-12 text-sky-700">Why Choose Footloosemonkey?</h2>
                    <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        <div className="bg-white flex flex-col justify-end p-8 shadow-md rounded-md text-center">
                            <Image src="/about/singing.png" alt="Singing" width={250} height={180} className="rounded-md mx-auto w-full h-auto" />
                            <h3 className="text-2xl font-semibold mt-6 text-sky-700">Singing</h3>
                            <p className="text-xl mt-4 text-gray-600">
                                From classical to pop, our singing competition allows young vocalists to take the stage and shine in front of the world.
                            </p>
                        </div>

                        <div className="bg-white flex flex-col justify-end p-8 shadow-md rounded-md text-center">
                            <Image src="/about/dancing.png" alt="Dancing" width={300} height={180} className="rounded-md mx-auto w-full h-auto" />
                            <h3 className="text-2xl font-semibold mt-6 text-sky-700">Dancing</h3>
                            <p className="text-xl mt-4 text-gray-600">
                                Our dancing competition invites performers to express themselves through movement and choreography.
                            </p>
                        </div>

                        <div className="bg-white flex flex-col justify-end p-8 shadow-md rounded-md text-center">
                            <Image src="/about/mimicryAndDancing.jpg" alt="Acting" width={500} height={500} className="rounded-md mx-auto w-full h-auto mb-6" />
                            <h3 className="text-2xl font-semibold mt-6 text-sky-700">Acting & Mimicry</h3>
                            <p className="text-xl mt-4 text-gray-600">
                                Young actors and mimics get the chance to bring their favorite characters to life and showcase their creativity.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Pricing Section */}
                <PricingPlans
                    groupACharge={groupACharge}
                    groupBCharge={groupBCharge}
                    groupCCharge={groupCCharge}
                />

                {/* CTA Section */}
                <div className="text-center mt-24">
                    <h3 className="text-4xl font-bold text-sky-700 mb-8">Join the Competition Today!</h3>
                    <p className="text-xl leading-8 text-gray-700 max-w-3xl mx-auto">
                        At Footloosemonkey, every child has the chance to become the next big star. Register now and let your talent shine!
                    </p>
                    <div className="mt-10">
                        <Link href="/register">
                            <Image src="/about/register-btn.png" alt="Register now" width={300} height={100} className="w-[300px] h-[50px] mx-auto cursor-pointer" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
