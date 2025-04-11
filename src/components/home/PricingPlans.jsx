"use client"
import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';

const PricingPlans = ({ groupACharge, groupBCharge, groupCCharge }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const hoverEffect = {
        scale: 1.03,
        transition: { duration: 0.3 }
    };

    const tapEffect = {
        scale: 0.98
    };

    return (
        <div className='bg-gradient-to-b from-blue-50 to-white'>
            <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <p className="text-[18px] font-[700] text-blue-600 uppercase mb-2 tracking-wide">Pricing</p>
                    <h1 className="text-[50px] font-[700] text-[#004873] mb-4">Affordable pricing plans</h1>
                    <p className="text-[18px] font-[400] text-[#6F6C90] max-w-[579px] mx-auto">
                        Pick the right category and showcase your talent at FootlooseMonkey – from solo young stars to dazzling group acts!
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-8"
                >
                    {/* Young Category Plan */}
                    <motion.div
                        variants={itemVariants}
                        whileHover={hoverEffect}
                        whileTap={tapEffect}
                        className="w-80 bg-[bisque] rounded-xl p-6 flex flex-col shadow-md hover:shadow-lg transition-shadow"
                    >
                        <div className="text-left mb-4">
                            <p className="font-semibold text-gray-800">Age (5-12 years)</p>
                            <h3 className="text-xl font-bold">Kid Stars</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-6">
                            Perfect for kids and teens eager to showcase their unique talent solo.
                        </p>
                        <div className="text-left mb-6">
                            <p className="text-[54px] font-bold">₹{groupACharge} <span className="text-sm font-normal text-gray-700">+GST</span> <span className="text-sm font-normal text-gray-700"> /user</span></p>
                        </div>
                        <p className="font-bold text-left mb-4">What&apos;s included</p>
                        <ul className="text-left text-sm space-y-2 mb-6">
                            {[
                                "Solo performance slot",
                                "Professional stage setup",
                                "Certificate of participation",
                                "Access to backstage workshops"
                            ].map((item, index) => (
                                <motion.li
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 * index }}
                                    viewport={{ once: true }}
                                    className="flex items-center"
                                >
                                    <svg className="h-[20px] w-[20px] rounded-full bg-[#70523a] text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    {item}
                                </motion.li>
                            ))}
                        </ul>
                        <Link href="/register" className='w-full'>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="mt-auto w-full h-[72px] rounded-[96px] text-[18px] font-[700] bg-[#70523a] hover:bg-[#895931] text-white"
                            >
                                Get started
                            </motion.button>
                        </Link>
                    </motion.div>

                    {/* Group Category Plan */}
                    <motion.div
                        variants={itemVariants}
                        whileHover={hoverEffect}
                        whileTap={tapEffect}
                        className="w-80 bg-blue-900 text-white rounded-xl p-6 flex flex-col shadow-xl relative hover:shadow-2xl"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1, rotate: [0, 10, -10, 0] }}
                            transition={{ delay: 0.4, type: "spring" }}
                            viewport={{ once: true }}
                            className="absolute flex justify-center items-center top-4 w-[98px] h-[40px] right-4 bg-white text-blue-700 text-[14px] rounded-[10px] font-semibold"
                        >
                            Popular
                        </motion.div>
                        <div className="text-left mb-4">
                            <p className="font-semibold text-white/90">Any Age</p>
                            <p className="text-xs text-white/90">2 to 5 performers</p>
                            <h3 className="text-xl font-bold">Group Talent</h3>
                        </div>
                        <p className="text-sm text-white/70 mb-6">
                            Best suited for dance crews, bands, or creative team performances.
                        </p>
                        <div className="text-left mb-6">
                            <p className="text-[54px] font-bold">₹{groupCCharge} <span className="text-sm font-normal text-white/70">+GST</span> <span className="text-sm font-normal text-white/70"> /user</span></p>
                        </div>
                        <p className="font-bold text-left mb-4">What&apos;s included</p>
                        <ul className="text-left text-sm space-y-2 mb-6">
                            {[
                                "Extended performance time",
                                "Group stage coordination",
                                "Feature on official website",
                                "Group participation certificates"
                            ].map((item, index) => (
                                <motion.li
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 * index }}
                                    viewport={{ once: true }}
                                    className="flex items-center"
                                >
                                    <svg className="h-[20px] w-[20px] rounded-full bg-white text-[#6E96CF] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    {item}
                                </motion.li>
                            ))}
                        </ul>
                        <Link href="/register" className='w-full'>
                            <motion.button
                                whileHover={{ scale: 1.02, backgroundColor: "#f0f4ff" }}
                                whileTap={{ scale: 0.98 }}
                                className="mt-auto w-full h-[72px] rounded-[96px] text-[18px] font-[700] bg-white text-blue-900 hover:bg-gray-100"
                            >
                                Get started
                            </motion.button>
                        </Link>
                    </motion.div>

                    {/* Teenager Category Plan */}
                    <motion.div
                        variants={itemVariants}
                        whileHover={hoverEffect}
                        whileTap={tapEffect}
                        className="w-80 bg-[bisque] rounded-xl p-6 flex flex-col shadow-md hover:shadow-lg"
                    >
                        <div className="text-left mb-4">
                            <p className="font-semibold text-gray-800">Age (13-19 years)</p>
                            <h3 className="text-xl font-bold">Teenager Performers</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-6">
                            Individual entries for adults with talents ready to shine.
                        </p>
                        <div className="text-left mb-6">
                            <p className="text-[54px] font-bold">₹{groupBCharge} <span className="text-sm font-normal text-gray-700">+GST</span> <span className="text-sm font-normal text-gray-700"> /user</span></p>
                        </div>
                        <p className="font-bold text-left mb-4">What&apos;s included</p>
                        <ul className="text-left text-sm space-y-2 mb-6">
                            {[
                                "Solo performance slot",
                                "High-quality video footage",
                                "Digital certificate",
                                "Chance to win category prizes"
                            ].map((item, index) => (
                                <motion.li
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 * index }}
                                    viewport={{ once: true }}
                                    className="flex items-center"
                                >
                                    <svg className="h-[20px] w-[20px] rounded-full bg-[#70523a] text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    {item}
                                </motion.li>
                            ))}
                        </ul>
                        <Link href="/register" className='w-full'>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="mt-auto w-full h-[72px] rounded-[96px] text-[18px] font-[700] bg-[#70523a] hover:bg-[#895931] text-white"
                            >
                                Get started
                            </motion.button>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default PricingPlans;