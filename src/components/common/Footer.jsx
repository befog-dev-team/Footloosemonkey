"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { getAdminData } from '../../app/services/index';  // Import necessary services
import { BiLogoGmail } from 'react-icons/bi'
import { FaFacebook } from 'react-icons/fa'
import { RiInstagramFill } from 'react-icons/ri'


const Footer = () => {
  const [competition, setCompetition] = useState('')

  // Load data from getAdminData
  useEffect(() => {
    const fetchRegistrationData = async () => {
      const response = await getAdminData();
      if (response.success && response.data) {
        setCompetition(response.data[0].talent.toLowerCase());
      } else {
        console.error('Error fetching data:', response.message);
      }
    };

    fetchRegistrationData();
  }, []); // Empty dependency array ensures this runs only on initial render

  useEffect(() => {
  }, [competition]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <footer className='bg-[bisque] w-full py-8'>
      <div className='max-w-screen-xl mx-auto px-4 lg:px-8'>
        <div className='md:flex md:justify-between'>
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center">
              <Image src="/logo.png" width={90} height={90} alt="Logo" />
              <span className="self-center text-2xl font-bold text-[#70523a] ml-3">Footloosemonkey</span>
            </Link>
          </div>
          <div className='grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-4 items-baseline text-[#70523a]'>
            <div>
              <h2 className="mb-6 text-base font-semibold uppercase">Quick Links</h2>
              <ul className="font-medium">
                <li className="mb-4">
                  <Link href="/" className="hover:underline">Home</Link>
                </li>
                <li className="mb-4">
                  <Link href="/register" className="hover:underline">Registration</Link>
                </li>
                <li className="mb-4">
                  <Link href={`/${competition}`} className="hover:underline">Competition</Link>
                </li>
                <li className="mb-4">
                  <Link href="/about" className="hover:underline">About Us</Link>
                </li>
                <li onClick={scrollToTop} className="hover:underline cursor-pointer">
                  Jump to top
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-base font-semibold uppercase">Our Competition</h2>
              <ul className="font-medium">
                <li className="mb-4">
                  <Link href="/acting" className="hover:underline">Acting</Link>
                </li>
                <li className="mb-4">
                  <Link href="/dancing" className="hover:underline">Dancing</Link>
                </li>
                <li className="mb-4">
                  <Link href="/singing" className="hover:underline">Singing</Link>
                </li>
                <li className="mb-4">
                  <Link href="/mimicry" className="hover:underline">Mimicry</Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-base font-semibold uppercase">Policies</h2>
              <ul className="font-medium">
                <li className="mb-4">
                  <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
                </li>
                <li className="mb-4">
                  <Link href="/refund-policy" className="hover:underline">Refund Policy</Link>
                </li>
                <li className="mb-4">
                  <Link href="/terms-condition-policy" className="hover:underline">Terms and Condition</Link>
                </li>
              </ul>

            </div>
            <div>
              <h2 className="mt-6 text-base font-bold uppercase">Connect with us </h2>
              <div className="flex items-center space-x-5 mt-4">
                <div onClick={() => window.location.href = 'mailto:contact@footloosemonkey.club'} target="_blank" className="text-[#70523a] cursor-pointer hover:text-gray-300">
                  <BiLogoGmail src="/social/gmail.png" className='w-[2.5rem] h-[2.5rem] text-[#70523a]' width={100} height={100} alt="YouTube" />
                </div>
                <Link href="https://www.facebook.com/profile.php?id=61559932162853" target="_blank" className="text-[#70523a] hover:text-gray-300">
                  <FaFacebook src="/social/facebook.png" className='w-[2rem] h-[2rem] text-[#70523a]' width={100} height={100} alt="Facebook" />
                </Link>
                <Link href="https://www.instagram.com/footloosemonkey" target="_blank" className="text-[#70523a] hover:text-gray-300">
                  <RiInstagramFill src="/social/instagram.png" className='w-[2rem] h-[2rem] text-[#70523a]' width={100} height={100} alt="Instagram" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 dark:border-gray-700" />
        <div className="sm:flex sm:items-center text-center sm:justify-between">
          <span className="text-sm text-gray-200 sm:text-center">© {new Date().getFullYear()} <b>Footloosemonkey</b> - A&W Technologies. All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
