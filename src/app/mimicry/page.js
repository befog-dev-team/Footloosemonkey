import Image from 'next/image';
import Link from 'next/link';

const Mimicry = () => {
  return (
    <div className='bg-[aliceblue]'>
      <div className="pt-10 pb-14 container">
        <h2 className="text-5xl text-center font-bold md:mb-20 mb-14 text-sky-700">Mimicry Competition</h2>
        <div className="flex md:ml-14">
          <div>
            <h1 className="text-2xl font-semibold text-[#004873] mb-6">
              Master the Art of Imitation with Our Mimicry Competition!
            </h1>
            <p className="text-xl mb-8">
              Can you sound just like a famous celebrity or a cartoon character? This is your chance to shine by mimicking voices and actions with precision and fun!
            </p>
            <div className="mt-12">
              <h3 className="text-2xl font-bold">Why Join?</h3>
              <ul className="text-left text-xl md:mx-16 list-disc list-inside mt-4 space-y-2">
                <li><span className="font-semibold text-sky-900">Show Your Talent:</span> Entertain everyone with your mimicry skills.</li>
                <li><span className="font-semibold text-sky-900">Build Confidence:</span> Mimicry is all about observation, creativity, and execution.</li>
                <li><span className="font-semibold text-sky-900">Win Prizes:</span> Compete for awards and the opportunity to wow the audience.</li>
              </ul>
            </div>
            <div className="mt-12">
              <h3 className="text-2xl font-bold">Who Can Participate?</h3>
              <p className="text-xl mt-7 md:mx-14">All budding comedians and mimicry enthusiasts between 5 and 15 years old.</p>
            </div>
            <div className="mt-12">
              <h3 className="text-2xl font-bold">How to Join:</h3>
              <ol className="text-left text-xl md:mx-16 list-disc list-inside mt-4 space-y-2">
                <li><span className="font-semibold text-sky-900">Register:</span> Click the button below to join.</li>
                <li><span className="font-semibold text-sky-900">Prepare Your Mimicry:</span> Study your favorite personalities and practice mimicking them.</li>
                <li><span className="font-semibold text-sky-900">Submit:</span> Record your mimicry and upload it for our judges!</li>
              </ol>
            </div>
          </div>
          <Image
            src="/competition/mimicry.png"
            alt="Dancer"
            width={500}
            height={400}
            className="h-[50rem] hidden md:block"
          />
        </div>
        <div className="md:pt-32 pt-16">
          <p className="pt-4 text-xl text-center md:mx-16">
            Step into the world of mimicry and become the next impressionist star! Have fun, impress the audience, and claim your moment in the spotlight.
          </p>
        </div>
        <div className="text-center">
          <Link href="/register">
            <button className="mt-10 font-bold py-2 px-4 rounded">
              <Image src="/competition/registerbtn.png" alt="Register Button" width={300} height={300} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Mimicry;
