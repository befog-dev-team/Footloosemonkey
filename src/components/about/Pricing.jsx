import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Pricing() {
    return (
        <div>
            <div className="mt-32">
                <div className="text-center mb-16">
                    <h2 className="text-6xl font-bold text-sky-700">Choose Your Plan</h2>
                    <p className="text-xl text-gray-600 mt-4 mb-20">Flexible pricing options for every young performer.</p>
                </div>

                <div className="flex flex-col md:flex-row justify-center items-center space-y-12 md:space-y-0 md:space-x-10">

                    {/* Card for 3-5 years */}
                    <div className="bg-white p-8 shadow-2xl rounded-xl w-full md:w-1/3 relative md:mb-0 mb-10">
                        <Image src="/about/toddler-performer.png" alt="Toddler Contestant" width={350} height={250} className="w-[350px] h-[350px] rounded-xl mx-auto" />
                        <div className="absolute -top-8 left-4 bg-sky-600 text-white px-4 py-2 rounded-lg text-lg">Group A</div>
                        <h3 className="text-4xl font-semibold text-sky-700 mt-8">3-5 Years</h3>
                        <p className="text-5xl font-extrabold text-gray-900 mt-4">₹199</p>
                        <p className="text-gray-600 mt-2">Plus GST</p>
                        <p className="text-lg text-gray-500 mt-4">Features a stage performance, support, and plenty of excitement!</p>
                        <Link href="/register">
                            <button className="mt-8 bg-sky-700 hover:bg-sky-800 text-white py-3 px-8 rounded-full transition">Register</button>
                        </Link>
                    </div>

                    {/* Card for 6-8 years */}
                    <div className="bg-white p-8 shadow-2xl rounded-xl w-full md:w-1/3 relative md:mb-0 mb-10">
                        <Image src="/about/young-performer.jpg" alt="Young Contestent" width={160} height={350} className="w-[160px] h-[350px] rounded-xl mx-auto" />
                        <div className="absolute -top-8 left-4 bg-sky-600 text-white px-4 py-2 rounded-lg text-lg">Group B</div>
                        <h3 className="text-4xl font-semibold text-sky-700 mt-8">6-8 Years</h3>
                        <p className="text-5xl font-extrabold text-gray-900 mt-4">₹299</p>
                        <p className="text-gray-600 mt-2">Plus GST</p>
                        <p className="text-lg text-gray-500 mt-4">Includes stage performance, feedback, and exciting activities!</p>
                        <Link href="/register">
                            <button className="mt-8 bg-sky-700 hover:bg-sky-800 text-white py-3 px-8 rounded-full transition">Register</button>
                        </Link>
                    </div>

                    {/* Card for 9-12 years */}
                    <div className="bg-white p-8 shadow-2xl rounded-xl w-full md:w-1/3 relative">
                        <Image src="/about/older-performer.png" alt="Older Contestent" width={185} height={250} className="w-[185px] h-[350px] rounded-xl mx-auto" />
                        <div className="absolute -top-8 left-4 bg-sky-600 text-white px-4 py-2 rounded-lg text-lg">Group C</div>
                        <h3 className="text-4xl font-semibold text-sky-700 mt-8">9-12 Years</h3>
                        <p className="text-5xl font-extrabold text-gray-900 mt-4">₹399</p>
                        <p className="text-gray-600 mt-2">Plus GST</p>
                        <p className="text-lg text-gray-500 mt-4">Perfect for experienced performers aiming to compete for bigger prizes.</p>
                        <Link href="/register">
                            <button className="mt-8 bg-sky-700 hover:bg-sky-800 text-white py-3 px-8 rounded-full transition">Register</button>
                        </Link>
                    </div>

                </div>

            </div>
        </div>
    )
}
