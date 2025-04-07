"use client";
import React from "react";

const TermsAndConditions = ({ termsAccepted, onChange, errors }) => (
    <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Terms and Conditions:</label>

        <label className="items-center block mb-2">
            <input
                type="checkbox"
                name="Video Sharing"
                checked={termsAccepted.videoSharing}
                onChange={onChange}
                className="form-checkbox"
            />
            <span className="ml-2 text-sm">
                By submitting the video, I confirm that I have voluntarily chosen to do so and have no objection to sharing the video.
            </span>
        </label>
        {errors.termsAccepted?.videoSharing && (
            <p className="text-red-500 text-sm">{errors.termsAccepted.videoSharing}</p>
        )}

        <label className="items-center block mb-2">
            <input
                type="checkbox"
                name="Offensive Content"
                checked={termsAccepted.offensiveContent}
                onChange={onChange}
                className="form-checkbox"
            />
            <span className="ml-2 text-sm">
                By submitting, I confirm that no offensive language or content is being used. Disqualification is at the company&apos;s discretion if found. Registration fees plus GST are non-refundable upon disqualification.
            </span>
        </label>
        {errors.termsAccepted?.offensiveContent && (
            <p className="text-red-500 text-sm">{errors.termsAccepted.offensiveContent}</p>
        )}

        <label className="items-center block mb-4">
            <input
                type="checkbox"
                name="Incidents"
                checked={termsAccepted.incident}
                onChange={onChange}
                className="form-checkbox"
            />
            <span className="ml-2 text-sm">
                By submitting, I acknowledge that the company is not responsible for any incidents that may occur during the shooting and video-making process.
            </span>
        </label>
        {errors.termsAccepted?.incident && (
            <p className="text-red-500 text-sm">{errors.termsAccepted.incident}</p>
        )}
    </div>
);

export default TermsAndConditions;