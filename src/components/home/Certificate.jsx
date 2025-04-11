import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8 } }
};

const Certificate = () => {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={fadeIn}
      className="bg-[aliceblue] w-full px-4 md:px-8 lg:px-16 py-8 md:py-12 lg:py-16"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div
          variants={item}
          className="text-center mb-12"
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2c3e50] mb-4"
          >
            Certifications, <span className="text-[#e74c3c]">Prizes</span> & <span className="text-[#3498db]">Gifts</span>
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="w-24 h-1 bg-[#e74c3c] mx-auto mb-6"
          ></motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-[#34495e] max-w-3xl mx-auto"
          >
            Validate your skills, gain recognition, and win exciting prizes and gifts with Footloosemonkey certifications
          </motion.p>
        </motion.div>

        {/* Content Sections - Now 3 columns */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-3 gap-8 mb-12"
        >
          {/* Certification Section */}
          <motion.div
            variants={item}
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#e74c3c]"
          >
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
          </motion.div>

          {/* Prizes Section */}
          <motion.div
            variants={item}
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#3498db]"
          >
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
          </motion.div>

          {/* New Gifts Section */}
          <motion.div
            variants={item}
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#2ecc71]"
          >
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
          </motion.div>
        </motion.div>

        {/* Enhanced Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg shadow-md p-8 mb-12"
        >
          <motion.h2
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-[#2c3e50] mb-8"
          >
            Why Participate?
          </motion.h2>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              {
                icon: '📜',
                title: 'Certification',
                desc: 'Earn verifiable digital certificates for your portfolio'
              },
              {
                icon: '💵',
                title: 'Cash Rewards',
                desc: 'Win exciting Cash Rewards for top performers'
              },
              {
                icon: '🎁',
                title: 'Premium Gifts',
                desc: 'Receive exclusive merchandise and tech gadgets'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 hover:bg-[#f8f9fa] rounded-lg transition"
              >
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1.1, 1]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                  className="text-4xl mb-4"
                >
                  {item.icon}
                </motion.div>
                <h3 className="text-xl font-semibold text-[#2c3e50] mb-2">{item.title}</h3>
                <p className="text-[#7f8c8d]">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Gift Showcase Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-lg shadow-md p-8 mb-12"
        >
          <motion.h2
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -20 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-[#2c3e50] mb-8"
          >
            Featured Gifts
          </motion.h2>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 md:grid-cols-4 gap-6"
          >
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
              <motion.div
                key={index}
                variants={item}
                whileHover={{
                  y: -10,
                  boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
                }}
                className="bg-[#f8f9fa] p-4 rounded-lg text-center border border-[#e0e0e0]"
              >
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                    y: [0, -5, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                  className="bg-[#e74c3c] text-white p-3 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center"
                >
                  <span className="text-2xl">🎁</span>
                </motion.div>
                <h3 className="text-lg font-semibold text-[#2c3e50]">{gift.name}</h3>
                <p className="text-sm text-[#7f8c8d]">{gift.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-r from-[#e74c3c] to-[#3498db] p-8 rounded-lg text-white"
        >
          <motion.h2
            animate={{
              x: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity
            }}
            className="text-2xl md:text-3xl font-bold mb-4"
          >
            Ready to Win Amazing Rewards?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg mb-6 max-w-2xl mx-auto"
          >
            Join our community of achievers and get recognized for your talents
          </motion.p>
          <Link href="/register">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 5px 15px rgba(255,255,255,0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-[#2c3e50] font-bold px-8 py-3 rounded-full hover:bg-opacity-90 transition"
            >
              Register Now
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Certificate;