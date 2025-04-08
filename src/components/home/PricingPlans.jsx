import Link from 'next/link';
import React from 'react';

const PricingPlans = ({ groupACharge, groupBCharge, groupCCharge }) => {
    return (
        <div className='bg-[aliceblue]'>
            <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8 ">
                <div className="text-center mb-12">
                    <p className="text-[18px] font-[700] text-blue-600 uppercase mb-2 tracking-wide">Pricing</p>
                    <h1 className="text-[50px] font-[700] text-[#004873] mb-4">Affordable pricing plans</h1>
                    <p className="text-[18px] font-[400] text-[#6F6C90] max-w-[579px] mx-auto">
                        Pick the right category and showcase your talent at FootlooseMonkey – from solo young stars to dazzling group acts!
                    </p>
                </div>

                {/* <div className="flex items-center justify-center gap-2 mb-12">
                    <p className="text-[18px] font-[400] text-[#170F49]">How many users you have?</p>
                    <div className="w-[117px] h-[52px] bg-white border boder-[1px] border-[#D9DBE9] rounded-[15px] flex items-center justify-center">
                        <p className='text-[#170F49] text-[20px] font-[700]'>10</p>
                    </div>
                    <span className="text-[#170F49] text-[18px] font-[700]">users</span>
                </div> */}

                <div className="flex flex-wrap justify-center gap-8">
                    {/* Young Category Plan */}
                    <div className="w-80 bg-[bisque] rounded-xl p-6 flex flex-col shadow-md">
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
                            <li>
                                <svg className="h-[20px] w-[20px] rounded-full bg-[#70523a] text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Solo performance slot
                            </li>
                            <li>
                                <svg className="h-[20px] w-[20px] rounded-full bg-[#70523a] text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Professional stage setup
                            </li>
                            <li>
                                <svg className="h-[20px] w-[20px] rounded-full bg-[#70523a] text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Certificate of participation
                            </li>
                            <li>
                                <svg className="h-[20px] w-[20px] rounded-full bg-[#70523a] text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Access to backstage workshops
                            </li>
                        </ul>
                        <Link href="/register" className='w-full'>
                            <button className="mt-auto w-full h-[72px] rounded-[96px] text-[18px] font-[700] bg-[#70523a] hover:bg-[#895931] text-white">
                                Get started
                            </button>
                        </Link>
                    </div>

                    {/* Group Category Plan */}
                    <div className="w-80 bg-blue-900 text-white rounded-xl p-6 flex flex-col shadow-xl relative">
                        <div className="absolute flex justify-center items-center top-4 w-[98px] h-[40px] right-4 bg-white text-blue-700 text-[14px] rounded-[10px] font-semibold">Popular</div>
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
                            <li>
                                <svg className="h-[20px] w-[20px] rounded-full bg-white text-[#6E96CF] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Extended performance time
                            </li>
                            <li>
                                <svg className="h-[20px] w-[20px] rounded-full bg-white text-[#6E96CF] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Group stage coordination
                            </li>
                            <li>
                                <svg className="h-[20px] w-[20px] rounded-full bg-white text-[#6E96CF] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Feature on official website
                            </li>
                            <li>
                                <svg className="h-[20px] w-[20px] rounded-full bg-white text-[#6E96CF] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Group participation certificates
                            </li>
                        </ul>
                        <Link href="/register" className='w-full'>
                            <button className="mt-auto w-full h-[72px] rounded-[96px] text-[18px] font-[700] bg-white text-blue-900 hover:bg-gray-100">
                                Get started
                            </button>
                        </Link>
                    </div>

                    {/* Teenager Category Plan */}
                    <div className="w-80 bg-[bisque] rounded-xl p-6 flex flex-col shadow-md">
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
                            <li>
                                <svg className="h-[20px] w-[20px] rounded-full bg-[#70523a] text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Solo performance slot
                            </li>
                            <li>
                                <svg className="h-[20px] w-[20px] rounded-full bg-[#70523a] text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                High-quality video footage
                            </li>
                            <li>
                                <svg className="h-[20px] w-[20px] rounded-full bg-[#70523a] text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Digital certificate
                            </li>
                            <li>
                                <svg className="h-[20px] w-[20px] rounded-full bg-[#70523a] text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Chance to win category prizes
                            </li>
                        </ul>
                        <Link href="/register" className='w-full'>
                            <button className="mt-auto w-full h-[72px] rounded-[96px] text-[18px] font-[700] bg-[#70523a] hover:bg-[#895931] text-white">
                                Get started
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PricingPlans;