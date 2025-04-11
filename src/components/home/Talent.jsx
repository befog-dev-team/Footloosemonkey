"use client";
import { useRouter } from 'next/navigation';
import React from 'react';
import { motion } from 'framer-motion';
import { FaMicrophone, FaChild, FaTrophy, FaMusic, FaTheaterMasks } from 'react-icons/fa';
import { GiLoveSong } from "react-icons/gi";

const Talent = () => {
  const router = useRouter();

  const talentCategories = [
    {
      name: "Singing",
      icon: <FaMusic className="text-3xl" />,
      desc: "Showcase your vocal range and musicality",
      color: "from-purple-500 to-pink-500"
    },
    {
      name: "Dancing",
      icon: <GiLoveSong className="text-3xl" />,
      desc: "Express yourself through movement and rhythm",
      color: "from-blue-500 to-teal-400"
    },
    {
      name: "Mimicry",
      icon: <FaMicrophone className="text-3xl" />,
      desc: "Impress with your voice imitation skills",
      color: "from-amber-500 to-orange-500"
    },
    {
      name: "Acting",
      icon: <FaTheaterMasks className="text-3xl" />,
      desc: "Bring characters to life with your performance",
      color: "from-red-500 to-rose-500"
    },
    // {
    //   name: "Comedy",
    //   icon: <FaChild className="text-3xl" />,
    //   desc: "Make the world laugh with your humor",
    //   color: "from-green-500 to-emerald-400"
    // },
    // {
    //   name: "Prizes",
    //   icon: <FaTrophy className="text-3xl" />,
    //   desc: "Win exciting rewards and recognition",
    //   color: "from-yellow-500 to-amber-400"
    // }
  ];

  const handleNavigate = (category) => {
    router.push(`/${category.toLowerCase()}`);
  };

  return (
    <div className='w-full flex flex-col items-center justify-center py-16 px-4 bg-gradient-to-b from-blue-50 to-white'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center max-w-4xl"
      >
        <h1 className='text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500'>
          Discover Your Talent
        </h1>
        <p className='text-xl text-gray-600 mb-12'>
          Where stars are born and dreams take center stage
        </p>
      </motion.div>

      <div className="w-full max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {talentCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              onClick={() => handleNavigate(category.name)}
              className={`bg-gradient-to-r ${category.color} rounded-2xl p-0.5 shadow-lg cursor-pointer group`}
            >
              <div className="bg-white rounded-2xl p-6 h-full transition-all duration-300 group-hover:bg-opacity-90">
                <div className={`mb-4 inline-flex p-4 rounded-full bg-gradient-to-r ${category.color} text-white`}>
                  {category.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{category.name}</h3>
                <p className="text-gray-600 mb-4">{category.desc}</p>
                <div className="flex items-center text-blue-600 font-medium">
                  Explore category
                  <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-16 text-center max-w-2xl"
      >
        <p className='text-xl text-gray-700 mb-8'>
          Join our community of talented performers and take your skills to the next level!
        </p>
        <motion.button
          onClick={() => router.push('/register')}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-full hover:shadow-lg transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Register Now
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Talent;