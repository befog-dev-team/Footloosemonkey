"use client";

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";
import { FaMicrophone, FaChild, FaTrophy, FaUserFriends } from "react-icons/fa";
import { IoMdMusicalNotes } from "react-icons/io";
import { GiLoveSong } from "react-icons/gi";
import { BsEmojiSunglasses } from "react-icons/bs";

const About = () => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const talentCategories = [
    { name: "Singing", icon: <IoMdMusicalNotes className="text-2xl" /> },
    { name: "Dancing", icon: <GiLoveSong className="text-2xl" /> },
    { name: "Acting", icon: <BsEmojiSunglasses className="text-2xl" /> },
    { name: "Mimicry", icon: <FaMicrophone className="text-2xl" /> }
  ];

  const accordionItems = [
    {
      title: "What We Offer",
      content: "Footloosemonkey is the ultimate talent competition platform for performers of all ages. We provide a stage for singing, dancing, acting, mimicry, and other performance arts. Our platform features regular competitions, expert feedback, skill-building resources, and exciting prizes to help you grow as a performer.",
      icon: <FaTrophy className="mr-2" />
    },
    {
      title: "Why Choose Us?",
      content: "Our platform is fun, supportive, and inclusive, designed to empower individuals of all ages. We offer constructive feedback, opportunities for skill enhancement, and exciting rewards—all to help you grow, gain confidence, and shine on your creative journey.",
      icon: <FaChild className="mr-2" />
    },
    {
      title: "How It Works?",
      content: "1. Register\n2. Choose a competition category\n3. Prepare and record your performance\n4. Submit your entry\n5. Receive expert feedback\n6. Win prizes and recognition!\nIt's that simple to start your journey to stardom!",
      icon: <FaUserFriends className="mr-2" />
    }
  ];

  return (
    <div className="py-16 px-4 md:px-8 w-full flex flex-col items-center bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
          About Footloosemonkey
        </h1>
        <p className="text-xl text-gray-700 mt-6">
          Where talent meets opportunity and dreams take center stage!
        </p>
      </motion.div>

      {/* Mission Section */}
      <div className="mt-16 max-w-4xl w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-blue-500"
          >
            <h2 className="text-3xl font-bold text-blue-700 mb-4">Our Vision</h2>
            <p className="text-lg text-gray-700">
              To create a world where every individual has the confidence and platform to showcase their unique talents, regardless of age or experience level.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-red-500"
          >
            <h2 className="text-3xl font-bold text-red-600 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-700">
              To provide a fun, safe, and inspiring platform where performers can grow, compete, and shine. We&apos;re committed to nurturing talent through constructive feedback and exciting opportunities.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Talent Categories */}
      <div className="mt-20 w-full max-w-4xl">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500"
        >
          Talent Categories
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {talentCategories.map((talent, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
              onClick={() => router.push(`/${talent.name.toLowerCase()}`)}
            >
              <div className="bg-blue-100 p-4 rounded-full text-blue-600 mb-4">
                {talent.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800">{talent.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Accordion Section */}
      <div className="mt-20 w-full max-w-4xl">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12 text-gray-800"
        >
          Learn More About Us
        </motion.h2>

        <div className="space-y-4">
          {accordionItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="overflow-hidden"
            >
              <motion.div
                className={`p-6 rounded-lg cursor-pointer flex items-center ${activeIndex === index ? 'bg-blue-600 text-white' : 'bg-white text-gray-800 shadow-md'}`}
                onClick={() => toggleAccordion(index)}
                whileHover={{ scale: 1.02 }}
              >
                <span className="mr-3">{item.icon}</span>
                <h3 className="text-xl font-semibold">{item.title}</h3>
              </motion.div>

              {activeIndex === index && (
                <motion.div
                  className="p-6 bg-white rounded-b-lg shadow-lg"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-gray-700 whitespace-pre-line">{item.content}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        viewport={{ once: true }}
        className="mt-20 text-center bg-gradient-to-r from-blue-600 to-cyan-500 p-12 rounded-2xl w-full max-w-4xl shadow-xl"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Showcase Your Talent?</h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Join our community of talented performers and take your skills to the next level!
        </p>
        <motion.button
          onClick={() => router.push('/register')}
          className="px-8 py-3 bg-white text-blue-600 font-bold rounded-full hover:bg-gray-100 transition duration-300 shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Register Now
        </motion.button>
      </motion.div>
    </div>
  );
};

export default About;