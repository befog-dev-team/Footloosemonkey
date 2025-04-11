"use client";
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import Link from 'next/link';

const Mission = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const controls = useAnimation();
  const ref = React.useRef(null);
  const inView = useInView(ref, { triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, inView]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === 1 ? 0 : prev + 1));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const sliderVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
    exit: { opacity: 0, x: 50, transition: { duration: 0.8 } }
  };

  const fadeInVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={fadeInVariants}
      className="w-full min-h-[630px] flex flex-col-reverse pt-14 md:pt-0 lg:flex-row items-center bg-gradient-to-b from-blue-50 to-white"
    >
      {/* Image Slider Section */}
      <div className="md:w-full w-[90%] lg:w-1/2 flex justify-center lg:order-1 order-2 mb-2 lg:mb-0 relative">
        <motion.div
          key={currentImage}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={sliderVariants}
          className="w-full max-w-md"
        >
          <Image
            src={currentImage === 0 ? "/mission.png" : "/mission2.jpg"}
            width={654}
            height={401}
            className="mx-auto rounded-xl shadow-xl border-4 border-white"
            alt="Talent showcase"
          />
        </motion.div>
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {[0, 1].map((index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-3 h-3 rounded-full ${currentImage === index ? 'bg-[#2E476A]' : 'bg-gray-300'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full flex flex-col items-center justify-center lg:w-1/2 lg:order-2 order-1 px-4 md:px-6 lg:px-16 py-8">
        <div className="text-center max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#e74c3c] to-[#3498db]">
            Where Talent Knows No Age!
          </h1>

          <div className="space-y-6 text-lg">
            <p className="text-gray-700 leading-relaxed">
              At <span className="font-semibold text-[#e74c3c]">Footloosemonkey</span>, we believe that talent has no limits! Our mission is to provide a fun, safe, and inspiring platform for individuals of all ages to showcase their skills in singing, dancing, acting, mimicry, and more.
            </p>

            <p className="text-gray-700 leading-relaxed">
              Whether you&apos;re a solo performer or part of a group, Footloosemonkey is the place to shine. We celebrate uniqueness and creativity, and we&apos;re here to nurture your passion every step of the way.
            </p>

            <p className="text-gray-700 leading-relaxed font-medium">
              Join us in exciting competitions, connect with like-minded talents, and unlock your full potential. Let the stage be yours—because everyone deserves their moment to shine!
            </p>
          </div>

          <div className="mt-8 flex gap-4 justify-center">
            <Link href="/about">
              <button className="px-8 py-3 bg-gradient-to-r from-[#e74c3c] to-[#3498db] text-white font-bold rounded-full hover:opacity-90 transition duration-300 shadow-lg">
                Know More
              </button>
            </Link>
            <Link href="/register">
              <button className="px-8 py-3 bg-white text-[#2c3e50] font-bold rounded-full border-2 border-[#3498db] hover:bg-[#f8f9fa] transition duration-300 shadow-lg">
                Join Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Mission;