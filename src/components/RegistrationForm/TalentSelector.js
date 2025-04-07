"use client";
import React from "react";

const TalentSelector = ({ value, onChange, options, error }) => {
    const allTalents = ["Acting", "Singing", "Dancing", "Mimicry"];

    // Normalize options: support array of strings or array of objects with a 'talent' key
    const enabledTalents = Array.isArray(options)
        ? options.map(opt => (typeof opt === 'object' ? opt.talent : opt))
        : [];

    return (
        <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Participant&apos;s Talent:</label>
            <select
                name="Talent"
                value={value}
                onChange={onChange}
                className={`w-full p-2 border rounded ${error ? "border-red-500" : "border-gray-300"}`}
            >
                <option value="">Select Talent</option>
                {allTalents.map((talent) => (
                    <option
                        key={talent}
                        value={talent}
                        disabled={!enabledTalents.includes(talent)}
                        className={`${enabledTalents.includes(talent)
                                ? "font-semibold text-gray-900"
                                : "text-gray-400"
                            }`}
                    >
                        {talent}
                        {!enabledTalents.includes(talent) ? " (Unavailable)" : ""}
                    </option>
                ))}
            </select>
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
};

export default TalentSelector;
