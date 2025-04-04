"use client";

import { useState, useEffect } from "react";
import { getAdminData } from "../services/index";
import Ribbon from "../../components/home/Ribbon";
import Collboartion from "../../components/home/Collaboration";
import Mission from "../../components/home/Mission";
import Talent from "../../components/home/Talent";
import Certificate from "../../components/home/Certificate";
import About from "../../components/home/About";
// import OfferPrice from "../../components/home/OfferPrice";
import Pricing from "../../components/home/Pricing";
import PricingPlans from "../../components/home/PricingPlans";
// import Schedule from "../../components/home/Schedule";
import Voting from "../../components/home/Voting";
import Contact from "../../components/home/Contact";
import Showcase from "../../components/home/TalentShowcase";

export default function Home() {
  // eslint-disable-next-line no-unused-vars
  const [competition, setCompetition] = useState('')

  // Load data from getAdminData()
  useEffect(() => {
    const fetchAdminData = async () => {
      const response = await getAdminData();
      if (response.success && response.data) {
        setCompetition(response.data[0].talent.toLowerCase());
      }
      else {
        console.error('Error fetching data:', response.message);
      }
    };
    fetchAdminData();
  }, []);

  useEffect(() => {
  }, [competition]);

  return (
    <>
      <Ribbon />
      {/* <Collboartion competition={competition} /> */}
      {/* <Hero /> */} {/* <-- Old Section */}

      {/* Showcase Section */}
      <Showcase competition={competition} />

      <Mission />
      <Talent />
      <Certificate />
      <About />
      {/* <OfferPrice /> */}
      {/* <Pricing /> */}
      <PricingPlans />
      {/* <Schedule /> */}
      <Voting />
      <Contact />
    </>
  );
}
