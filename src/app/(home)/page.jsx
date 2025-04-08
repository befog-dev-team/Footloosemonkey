'use client';

import { useState, useEffect } from 'react';
import { getAdminData } from '../services/index';

import Ribbon from '../../components/home/Ribbon';
import Collboartion from '../../components/home/Collaboration';
import Mission from '../../components/home/Mission';
import Talent from '../../components/home/Talent';
import Certificate from '../../components/home/Certificate';
import About from '../../components/home/About';
// import OfferPrice from '../../components/home/OfferPrice';
import PricingPlans from '../../components/home/PricingPlans';
// import Schedule from '../../components/home/Schedule';
import Voting from '../../components/home/Voting';
import Contact from '../../components/home/Contact';
import Showcase from '../../components/home/TalentShowcase';

export default function Home() {
  const [competition, setCompetition] = useState('');
  const [loading, setLoading] = useState(true);

  const [offerCharge, setOfferCharge] = useState(0);
  const [groupACharge, setGroupACharge] = useState(0);
  const [groupBCharge, setGroupBCharge] = useState(0);
  const [groupCCharge, setGroupCCharge] = useState(0);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await getAdminData();
        if (response.success && response.data?.[0]) {
          const data = response.data[0];
          setCompetition(data.talent?.toLowerCase() || '');
          setGroupACharge(Number(data.groupACharge) || 0);
          setGroupBCharge(Number(data.groupBCharge) || 0);
          setGroupCCharge(Number(data.groupCCharge) || 0);
          setOfferCharge(Number(data.offerCharge) || 0);
        } else {
          console.error('Error fetching admin data:', response.message);
        }
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-blue-500 font-medium text-lg">Loading, please wait...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Ribbon />
      {/* <Collboartion competition={competition} /> */}
      <Showcase competition={competition} />
      <Mission />
      <Talent />
      <Certificate />
      <About />
      {/* <OfferPrice /> */}
      {/* <Pricing /> */}
      <PricingPlans
        groupACharge={groupACharge}
        groupBCharge={groupBCharge}
        groupCCharge={groupCCharge}
      />
      {/* <Schedule /> */}
      <Voting />
      <Contact />
    </>
  );
}
