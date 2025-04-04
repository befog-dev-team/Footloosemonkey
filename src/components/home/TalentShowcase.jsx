import Image from 'next/image';
import Link from 'next/link';

export default function TalentShowcase({ competition }) {
    return (
        <div className="min-h-[75vh] bg-gradient-to-br from-blue-50 to-indigo-50 flex justify-center items-center p-4 md:px-8">
            <div className="max-w-6xl w-full">
                {/* Header Section */}
                <div className="text-center mb-4 animate-fade-in">
                    <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-800 leading-tight mb-4">
                        Showcase Your Talent
                    </h1>
                    <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-6">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus in libero risus
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link href="/register" className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-white transition duration-300 ease-out rounded-full shadow-xl group hover:ring-1 hover:ring-blue-500">
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-500 to-blue-700"></span>
                            <span className="absolute bottom-0 right-0 block w-12 h-12 mb-8 mr-5 transition-all duration-300 transform translate-x-24 rotate-45 bg-blue-600 opacity-30 group-hover:translate-x-0 ease"></span>
                            <span className="relative flex items-center gap-2">
                                Register Now
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                                </svg>
                            </span>
                        </Link>
                        <Link href="/about" className="px-6 py-3 font-medium text-blue-600 transition-all duration-200 rounded-full hover:bg-blue-50 hover:shadow-sm">
                            Learn More
                        </Link>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                    {/* Left Section */}
                    <div className="space-y-6 animate-slide-in-left">
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-100">
                            <p className="text-lg italic text-gray-700 leading-relaxed">
                                <span className="font-bold text-blue-600">Exclusive gifts.</span><br />
                                <span className="text-indigo-600">Insider access.</span><br />
                                <span className="text-purple-600">Special events.</span>
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="relative aspect-square overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                                <Image
                                    src="/talentshowcase/img1.png"
                                    alt="Talent 1"
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="relative aspect-square overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                                <Image
                                    src="/talentshowcase/img2.png"
                                    alt="Talent 2"
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Center Section (Main Image) */}
                    <div className="animate-pop-in">
                        <div className="relative aspect-square overflow-hidden rounded-2xl shadow-2xl border-4 border-white transform hover:-translate-y-2 transition-transform duration-300">
                            <Image
                                src="/talentshowcase/img3.png"
                                alt="Main Talent"
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-6">
                                <div>
                                    <p className="text-white text-sm font-medium">Featured Talent</p>
                                    <h3 className="text-white text-xl font-bold">Sarah Johnson</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="space-y-6 animate-slide-in-right">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="relative aspect-square overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                                <Image
                                    src="/talentshowcase/img4.png"
                                    alt="Talent 3"
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="relative aspect-square overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                                <Image
                                    src="/talentshowcase/img5.png"
                                    alt="Talent 4"
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-2xl shadow-lg border border-indigo-100 text-right">
                            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-2">
                                Talent Hunt Competition
                            </h2>
                            <p className="text-gray-600 mb-4">
                                Join our annual competition and showcase your unique talents to the world!
                            </p>
                            <Link href={`/${competition}`} className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-800 transition-colors">
                                View Details
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Floating Decorations */}
                <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-blue-200 opacity-20 blur-xl -z-10"></div>
                <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-indigo-200 opacity-20 blur-xl -z-10"></div>
            </div>
        </div>
    );
}