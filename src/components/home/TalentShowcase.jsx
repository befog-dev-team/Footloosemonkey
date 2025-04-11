import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function TalentShowcase({ competition }) {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const imageVariants = {
        hidden: { scale: 0.9, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: "backOut"
            }
        },
        hover: {
            scale: 1.05,
            transition: { duration: 0.3 }
        }
    };

    const mainImageVariants = {
        hidden: { scale: 0.95, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: "backOut"
            }
        },
        hover: {
            y: -10,
            transition: { duration: 0.3 }
        }
    };

    const buttonVariants = {
        hover: {
            scale: 1.05,
            transition: {
                yoyo: Infinity,
                duration: 0.4
            }
        },
        tap: {
            scale: 0.95
        }
    };

    return (
        <div className="min-h-[90vh] bg-[aliceblue] flex justify-center items-center p-4 md:px-8 overflow-hidden">
            <div className="max-w-6xl w-full relative">
                {/* Floating Decorations */}
                <motion.div
                    className="absolute top-20 left-20 w-32 h-32 rounded-full bg-blue-200 opacity-20 blur-xl -z-10"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                />
                <motion.div
                    className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-indigo-200 opacity-20 blur-xl -z-10"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                />

                {/* Header Section */}
                <motion.div
                    className="text-center mb-4"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <motion.h1
                        className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-800 leading-tight mb-4"
                        variants={itemVariants}
                    >
                        Showcase Your Talent
                    </motion.h1>
                    <motion.p
                        className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-6"
                        variants={itemVariants}
                    >
                        Unleash your creativity and let your passion speak! Whether you&apos;re a dancer, singer, poet, or performer—this is your stage to shine. Step into the spotlight, express yourself, and leave the audience in awe.
                    </motion.p>
                    <motion.div
                        className="flex justify-center gap-4"
                        variants={itemVariants}
                    >
                        <Link href="/register" passHref>
                            <motion.div
                                className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-white transition duration-300 ease-out rounded-full shadow-xl group hover:ring-1 hover:ring-blue-500"
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                            >
                                <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-500 to-blue-700"></span>
                                <span className="absolute bottom-0 right-0 block w-12 h-12 mb-8 mr-5 transition-all duration-300 transform translate-x-24 rotate-45 bg-blue-600 opacity-30 group-hover:translate-x-0 ease"></span>
                                <span className="relative flex items-center gap-2">
                                    Register Now
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                                    </svg>
                                </span>
                            </motion.div>
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Main Content Grid */}
                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    {/* Left Section */}
                    <motion.div
                        className="space-y-6"
                        variants={containerVariants}
                    >
                        <motion.div
                            className="bg-white p-6 rounded-2xl shadow-lg border border-blue-100"
                            variants={itemVariants}
                            whileHover={{ y: -5 }}
                        >
                            <p className="text-lg italic text-gray-700 leading-relaxed">
                                <span className="font-bold text-blue-600">Exclusive gifts.</span><br />
                                <span className="text-indigo-600">Insider access.</span><br />
                                <span className="text-purple-600">Special events.</span>
                            </p>
                        </motion.div>
                        <div className="grid grid-cols-2 gap-4">
                            <motion.div
                                className="relative aspect-square overflow-hidden rounded-xl shadow-md"
                                variants={imageVariants}
                                whileHover="hover"
                            >
                                <Image
                                    src="/talentshowcase/img1.png"
                                    alt="Talent 1"
                                    fill
                                    className="object-cover"
                                />
                            </motion.div>
                            <motion.div
                                className="relative aspect-square overflow-hidden rounded-xl shadow-md"
                                variants={imageVariants}
                                whileHover="hover"
                            >
                                <Image
                                    src="/talentshowcase/img2.png"
                                    alt="Talent 2"
                                    fill
                                    className="object-cover"
                                />
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Center Section (Main Image) */}
                    <motion.div
                        variants={mainImageVariants}
                        whileHover="hover"
                    >
                        <div className="relative aspect-square overflow-hidden rounded-2xl shadow-2xl border-4 border-white">
                            <Image
                                src="/talentshowcase/img3.png"
                                alt="Main Talent"
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-6">
                                <div>
                                    {/* <p className="text-white text-sm font-medium">Featured Talent</p> */}
                                    {/* <h3 className="text-white text-xl font-bold">Sarah Johnson</h3> */}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Section */}
                    <motion.div
                        className="space-y-6"
                        variants={containerVariants}
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <motion.div
                                className="relative aspect-square overflow-hidden rounded-xl shadow-md"
                                variants={imageVariants}
                                whileHover="hover"
                            >
                                <Image
                                    src="/talentshowcase/img4.png"
                                    alt="Talent 3"
                                    fill
                                    className="object-cover"
                                />
                            </motion.div>
                            <motion.div
                                className="relative aspect-square overflow-hidden rounded-xl shadow-md"
                                variants={imageVariants}
                                whileHover="hover"
                            >
                                <Image
                                    src="/talentshowcase/img5.png"
                                    alt="Talent 4"
                                    fill
                                    className="object-cover"
                                />
                            </motion.div>
                        </div>
                        <motion.div
                            className="bg-white p-4 rounded-2xl shadow-lg border border-indigo-100 text-right"
                            variants={itemVariants}
                            whileHover={{ y: -5 }}
                        >
                            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-2">
                                Talent Hunt Competition
                            </h2>
                            <p className="text-gray-600 mb-4">
                                Join our annual competition and showcase your unique talents to the world!
                            </p>
                            <Link href={`/${competition}`} passHref>
                                <motion.a
                                    className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-800 transition-colors"
                                    whileHover={{ x: 5 }}
                                >
                                    View Details
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </motion.a>
                            </Link>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}