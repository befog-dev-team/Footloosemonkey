import Image from 'next/image';
import Link from 'next/link';
import PricingPlans from '../../components/home/PricingPlans';

export default function AboutUs() {
    return (
        <div className="bg-[aliceblue] min-h-screen">
            <div className="container mx-auto px-4 md:px-6 py-16">
                <h1 className="md:text-5xl text-[2.4rem] font-bold text-center mb-12 text-sky-700">
                    About Footloosemonkey
                </h1>

                <div className="text-center mb-12">
                    <p className="text-xl leading-8 text-gray-700">
                        Welcome to Footloosemonkey, the ultimate platform for young and talented performers! We are passionate about giving children aged 6-12 a stage to express their creativity in singing, dancing, acting, and mimicry.
                    </p>
                    <p className="text-xl leading-8 text-gray-700 mt-6">
                        At Footloosemonkey, we believe that every child has a unique talent waiting to shine. Our competition is the perfect place for kids to showcase their skills.
                    </p>
                </div>

                {/* Responsive Grid for Vision and Offer */}
                <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2">
                    <div className="bg-white shadow-lg p-6 rounded-lg">
                        <Image src="/about/old-children.jpg" alt="Performers on stage" width={600} height={350} className="rounded-lg w-full h-auto" />
                        <h2 className="text-3xl font-semibold mt-8 text-sky-700">Our Vision</h2>
                        <p className="text-xl mt-4 text-gray-600">
                            To create a vibrant community where children can grow, gain confidence, and explore their artistic potential.
                        </p>
                    </div>

                    <div className="bg-white shadow-lg p-6 rounded-lg">
                        <Image src="/about/young-children.jpg" alt="Dancers performing" width={600} height={350} className="rounded-lg w-full h-auto" />
                        <h2 className="text-3xl font-semibold mt-8 text-sky-700">What We Offer</h2>
                        <ul className="list-disc list-inside text-xl text-gray-600 mt-4 space-y-3">
                            <li>Professional guidance from expert judges</li>
                            <li>Opportunities to perform on a big stage</li>
                            <li>Exciting prizes and recognition for talent</li>
                            <li>A platform to collaborate with other young performers</li>
                            <li>A fun-filled experience where every child is a winner!</li>
                        </ul>
                    </div>
                </div>

                {/* Responsive Why Choose Us Section */}
                <div className="mt-16">
                    <h2 className="text-4xl text-center font-bold mb-12 text-sky-700">Why Choose Footloosemonkey?</h2>
                    <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        <div className="bg-white flex flex-col justify-end p-8 shadow-md rounded-md text-center">
                            <Image src="/about/singing.png" alt="Singing" width={250} height={180} className="rounded-md mx-auto w-full h-auto" />
                            <h3 className="text-2xl font-semibold mt-6 text-sky-700">Singing</h3>
                            <p className="text-xl mt-4 text-gray-600">
                                From classical to pop, our singing competition allows young vocalists to take the stage and shine in front of the world.
                            </p>
                        </div>

                        <div className="bg-white flex flex-col justify-end p-8 shadow-md rounded-md text-center">
                            <Image src="/about/dancing.png" alt="Dancing" width={300} height={180} className="rounded-md mx-auto w-full h-auto" />
                            <h3 className="text-2xl font-semibold mt-6 text-sky-700">Dancing</h3>
                            <p className="text-xl mt-4 text-gray-600">
                                Our dancing competition invites performers to express themselves through movement and choreography.
                            </p>
                        </div>

                        <div className="bg-white flex flex-col justify-end p-8 shadow-md rounded-md text-center">
                            <Image src="/about/mimicryAndDancing.jpg" alt="Acting" width={500} height={500} className="rounded-md mx-auto w-full h-auto mb-6" />
                            <h3 className="text-2xl font-semibold mt-6 text-sky-700">Acting & Mimicry</h3>
                            <p className="text-xl mt-4 text-gray-600">
                                Young actors and mimics get the chance to bring their favorite characters to life and showcase their creativity.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Pricing Section */}
                <PricingPlans />

                {/* CTA Section */}
                <div className="text-center mt-24">
                    <h3 className="text-4xl font-bold text-sky-700 mb-8">Join the Competition Today!</h3>
                    <p className="text-xl leading-8 text-gray-700 max-w-3xl mx-auto">
                        At Footloosemonkey, every child has the chance to become the next big star. Register now and let your talent shine!
                    </p>
                    <div className="mt-10">
                        <Link href="/register">
                            <Image src="/about/register-btn.png" alt="Register now" width={300} height={100} className="w-[300px] h-[50px] mx-auto cursor-pointer" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
