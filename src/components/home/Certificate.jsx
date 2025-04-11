import Link from 'next/link';
import React from 'react';

const Certificate = () => {
  return (
    <div className="bg-[aliceblue] w-full px-4 md:px-8 lg:px-16 py-8 md:py-12 lg:py-16">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2c3e50] mb-4">
            Certifications, <span className="text-[#e74c3c]">Prizes</span> & <span className="text-[#3498db]">Gifts</span>
          </h1>
          <div className="w-24 h-1 bg-[#e74c3c] mx-auto mb-6"></div>
          <p className="text-lg md:text-xl text-[#34495e] max-w-3xl mx-auto">
            Validate your skills, gain recognition, and win exciting prizes and gifts with Footloosemonkey certifications
          </p>
        </div>

        {/* Content Sections - Now 3 columns */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Certification Section */}
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#e74c3c]">
            <div className="flex items-center mb-4">
              <div className="bg-[#e74c3c] p-2 rounded-full mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-[#2c3e50]">Certifications</h2>
            </div>
            <p className="text-[#7f8c8d]">
              Our industry-recognized certifications validate your skills and enhance your professional credibility.
              Each certificate helps you stand out in competitive job markets.
            </p>
          </div>

          {/* Prizes Section */}
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#3498db]">
            <div className="flex items-center mb-4">
              <div className="bg-[#3498db] p-2 rounded-full mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4H5z"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-[#2c3e50]">Cash Prizes</h2>
            </div>
            <p className="text-[#7f8c8d]">
              Win substantial cash rewards for your achievements. Our prize pool rewards top performers
              across all competitions and skill levels.
            </p>
          </div>

          {/* New Gifts Section */}
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#2ecc71]">
            <div className="flex items-center mb-4">
              <div className="bg-[#2ecc71] p-2 rounded-full mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4H5z"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-[#2c3e50]">Exclusive Gifts</h2>
            </div>
            <p className="text-[#7f8c8d]">
              Receive premium merchandise, tech gadgets, and exclusive Footloosemonkey swag. These gifts
              are designed to celebrate your success in style.
            </p>
          </div>
        </div>

        {/* Enhanced Benefits Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-3xl font-bold text-center text-[#2c3e50] mb-8">Why Participate?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '📜',
                title: 'Certification',
                desc: 'Earn verifiable digital certificates for your portfolio'
              },
              {
                icon: '💵',
                title: 'Cash Rewards',
                desc: 'Win up to ₹50,000 in prize money for top performers'
              },
              {
                icon: '🎁',
                title: 'Premium Gifts',
                desc: 'Receive exclusive merchandise and tech gadgets'
              }
            ].map((item, index) => (
              <div key={index} className="text-center p-4 hover:bg-[#f8f9fa] rounded-lg transition">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-[#2c3e50] mb-2">{item.title}</h3>
                <p className="text-[#7f8c8d]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Gift Showcase Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-3xl font-bold text-center text-[#2c3e50] mb-8">Featured Gifts</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                name: 'Premium Tech Kit',
                desc: 'Latest gadgets bundle'
              },
              {
                name: 'Branded Merch',
                desc: 'Exclusive Footloosemonkey swag'
              },
              {
                name: 'Learning Subs',
                desc: 'Premium course access'
              },
              {
                name: 'Surprise Box',
                desc: 'Mystery gift package'
              }
            ].map((gift, index) => (
              <div key={index} className="bg-[#f8f9fa] p-4 rounded-lg text-center border border-[#e0e0e0]">
                <div className="bg-[#e74c3c] text-white p-3 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-2xl">🎁</span>
                </div>
                <h3 className="text-lg font-semibold text-[#2c3e50]">{gift.name}</h3>
                <p className="text-sm text-[#7f8c8d]">{gift.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-[#e74c3c] to-[#3498db] p-8 rounded-lg text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Win Amazing Rewards?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Join our community of achievers and get recognized for your talents
          </p>
          <Link href="/register">
            <button className="bg-white text-[#2c3e50] font-bold px-8 py-3 rounded-full hover:bg-opacity-90 transition">
              Register Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Certificate;