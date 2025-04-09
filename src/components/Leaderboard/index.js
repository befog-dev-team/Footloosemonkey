"use client";

import React, { useEffect, useState } from 'react';
import { Loader, Trophy, Star, Award } from "lucide-react";
import { fetchLeaderboard } from '../../lib/submission';
import Image from 'next/image';

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetchLeaderboard();
                setLeaderboard(response);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, []);

    if (loading) return (
        <div className='h-[50vh] flex flex-col justify-center items-center gap-4'>
            <Loader className="animate-spin text-blue-500" size={32} />
            <p className="text-gray-600">Loading leaderboard...</p>
        </div>
    );

    const getMedalColor = (index) => {
        switch (index) {
            case 0: return 'bg-gradient-to-br from-yellow-400 to-yellow-600';
            case 1: return 'bg-gradient-to-br from-gray-300 to-gray-400';
            case 2: return 'bg-gradient-to-br from-amber-600 to-amber-800';
            default: return 'bg-blue-100';
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-2 sm:px-4 py-6">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Header Row */}
                <div className="grid grid-cols-12 bg-gradient-to-r from-blue-600 to-blue-800 text-white p-3 font-semibold text-sm sm:text-base">
                    <div className="col-span-1 text-center">Rank</div>
                    <div className="col-span-2 sm:col-span-1 text-center">Profile</div>
                    <div className="col-span-4 sm:col-span-3 truncate px-1">Participant</div>
                    <div className="hidden md:col-span-3 md:block truncate px-1">ID</div>
                    <div className="col-span-3 sm:col-span-2 truncate px-1">Talent</div>
                    <div className="col-span-2 flex items-center justify-center gap-1">
                        <Star className="text-yellow-300" size={16} />
                        <span className="hidden sm:inline">Votes</span>
                    </div>
                </div>

                {/* Data Rows */}
                <div className="divide-y divide-gray-100">
                    {leaderboard.map((item, index) => (
                        <div
                            key={item.id}
                            className="grid grid-cols-12 items-center p-2 sm:p-3 hover:bg-blue-50 transition-colors"
                        >
                            {/* Rank */}
                            <div className="col-span-1 flex justify-center">
                                <div className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full ${getMedalColor(index)} text-white text-sm sm:text-base font-bold`}>
                                    {index + 1}
                                </div>
                            </div>

                            {/* Profile Picture */}
                            <div className="col-span-2 sm:col-span-1 flex justify-center">
                                <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-blue-200">
                                    <Image
                                        src={item.profilepic}
                                        alt={`${item.name}'s profile`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>

                            {/* Participant Name */}
                            <div className="col-span-4 sm:col-span-3 px-1">
                                <p className="font-medium text-gray-800 text-sm sm:text-base truncate" title={item.name}>
                                    {item.name}
                                </p>
                                <p className="text-xs text-gray-500 sm:hidden truncate" title={item.participantId}>
                                    {item.participantId}
                                </p>
                            </div>

                            {/* Participant ID (hidden on mobile) */}
                            <div className="hidden md:col-span-3 md:block px-1">
                                <p className="text-xs text-gray-600 font-mono truncate" title={item.participantId}>
                                    {item.participantId}
                                </p>
                            </div>

                            {/* Talent */}
                            <div className="col-span-3 sm:col-span-2 px-1">
                                <span 
                                    className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm font-medium truncate inline-block max-w-full"
                                    title={item.participantTalent}
                                >
                                    {item.participantTalent}
                                </span>
                            </div>

                            {/* Votes */}
                            <div className="col-span-2 flex items-center justify-center gap-1">
                                <span className="font-bold text-gray-700 text-sm sm:text-base">
                                    {item.voteCount}
                                </span>
                                {index < 3 && (
                                    <Award 
                                        className={index === 0 ? 'text-yellow-500' : index === 1 ? 'text-gray-400' : 'text-amber-600'} 
                                        size={16} 
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {leaderboard.length === 0 && (
                    <div className="p-6 text-center text-gray-500">
                        No submissions found. Be the first to participate!
                    </div>
                )}
            </div>

            <div className="mt-4 text-center text-xs sm:text-sm text-gray-500">
                <p>Last updated: {new Date().toLocaleDateString()}</p>
            </div>
        </div>
    );
};

export default Leaderboard;