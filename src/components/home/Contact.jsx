"use client"
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const Contact = () => {
  const contactMethods = [
    {
      icon: "/contact/call.png",
      action: () => window.location.href = 'tel:+917985322738',
      text: "+91 7985322738",
      bgColor: "bg-blue-50",
      iconSize: { width: 57, height: 52.11 },
      delay: 0.1
    },
    {
      icon: "/contact/email.png",
      action: () => window.location.href = 'mailto:contact@footloosemonkey.club',
      text: "contact@footloosemonkey.club",
      bgColor: "bg-blue-50",
      iconSize: { width: 81, height: 52.11 },
      delay: 0.2
    },
    {
      icon: "/contact/instagram.png",
      action: "https://www.instagram.com/footloosemonkey",
      text: "@footloosemonkey",
      bgColor: "bg-blue-50",
      iconSize: { width: 57, height: 52.11 },
      delay: 0.3
    }
  ]

  return (
    <div className='bg-gradient-to-b from-blue-50 to-white w-full py-16 px-4 sm:px-6 lg:px-8'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center"
      >
        <h1 className='text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500'>
          Contact Us
        </h1>
        <p className='text-lg md:text-xl mt-4 text-gray-600 max-w-2xl mx-auto'>
          For more information or any queries, feel free to reach out to us
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto"
      >
        {contactMethods.map((method, index) => (
          method.action === "https://www.instagram.com/footloosemonkey" ? (
            <Link href={method.action} target="_blank" key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: method.delay }}
                viewport={{ once: true }}
                className={`${method.bgColor} p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center cursor-pointer group`}
                whileHover={{ y: -5 }}
              >
                <div className="p-3 bg-white rounded-full shadow-sm group-hover:shadow-md transition-all">
                  <Image
                    src={method.icon}
                    width={method.iconSize.width}
                    height={method.iconSize.height}
                    alt={method.text}
                  />
                </div>
                <p className='mt-5 text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors'>
                  {method.text}
                </p>
              </motion.div>
            </Link>
          ) : (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: method.delay }}
              viewport={{ once: true }}
              onClick={method.action}
              className={`${method.bgColor} p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center cursor-pointer group`}
              whileHover={{ y: -5 }}
            >
              <div className="p-3 bg-white rounded-full shadow-sm group-hover:shadow-md transition-all">
                <Image
                  src={method.icon}
                  width={method.iconSize.width}
                  height={method.iconSize.height}
                  alt={method.text}
                />
              </div>
              <p className='mt-5 text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors'>
                {method.text}
              </p>
            </motion.div>
          )
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-16 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl p-6 max-w-2xl mx-auto text-center"
      >
        <h3 className="text-xl font-semibold text-blue-700 mb-3">We&apos;d love to hear from you!</h3>
        <p className="text-gray-700">
          Whether you have questions about our events, partnerships, or anything else,
          our team is ready to answer all your questions.
        </p>
      </motion.div>
    </div>
  )
}

export default Contact