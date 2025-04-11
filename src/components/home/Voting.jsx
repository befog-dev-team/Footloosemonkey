import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
} from 'react-share';

const Voting = () => {
  const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/spotlight`;
  const title = 'Check out these amazing contestants! Your vote can help them win!';
  const hashtags = ['VoteNow', 'TalentShow'];

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto text-center">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 mb-4">
            Your Vote Can Make Them Shine!
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Support your favorite contestants and help them win amazing prizes!
          </p>
        </motion.div>

        {/* Voting Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 bg-white rounded-2xl shadow-xl overflow-hidden max-w-md mx-auto"
        >
          <div className="relative h-64 w-full">
            <Image
              src="/home/vote.png"
              alt="Vote Now"
              fill
              className="object-bottom"
              priority
            />
          </div>

          <div className="p-8">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-to-r from-yellow-400 to-amber-500 p-2 rounded-full">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 ml-3">Your Vote Matters</h3>
            </div>

            <p className="text-gray-600 mb-6">
              Every vote brings your favorite contestant closer to victory. Don&apos;t miss this chance to support talent!
            </p>

            <Link href="/spotlight">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11l7-7 7 7M5 19l7-7 7 7"></path>
                  </svg>
                  VOTE NOW
                </div>
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Countdown & Info */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-10 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl p-6 max-w-lg mx-auto"
        >
          <div className="flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span className="font-semibold text-blue-600">Voting ends in: 2 days 14 hours</span>
          </div>
          <p className="mt-3 text-gray-700">
            You can vote once per day for each category. Share with friends to multiply your impact!
          </p>
        </motion.div> */}

        {/* Social Sharing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <p className="text-gray-600 mb-4">Spread the word and get more votes!</p>
          <div className="flex justify-center space-x-4">
            <motion.div whileHover={{ y: -3, scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <FacebookShareButton url={shareUrl} quote={title} hashtag={`#${hashtags[0]}`}>
                <FacebookIcon size={40} round />
              </FacebookShareButton>
            </motion.div>

            <motion.div whileHover={{ y: -3, scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <TwitterShareButton url={shareUrl} title={title} hashtags={hashtags}>
                <TwitterIcon size={40} round />
              </TwitterShareButton>
            </motion.div>

            <motion.div whileHover={{ y: -3, scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <WhatsappShareButton url={shareUrl} title={title}>
                <WhatsappIcon size={40} round />
              </WhatsappShareButton>
            </motion.div>

            <motion.div whileHover={{ y: -3, scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <EmailShareButton url={shareUrl} subject={title} body="Check out these contestants and vote for your favorite!">
                <EmailIcon size={40} round />
              </EmailShareButton>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Voting;