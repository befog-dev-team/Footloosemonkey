"use client";
import React from "react";
import toast from "react-hot-toast";

const IndividualDetails = ({ values, onChange, errors, category }) => {
    const handleAgeChange = (e) => {
        const { value } = e.target;

        if (value === "") {
            onChange(e); // allow clearing
            return;
        }

        const numericValue = Number(value);
        if (isNaN(numericValue)) {
            return; // not a valid number
        }

        const minAge = category === "Kid" ? 5 : 13;
        const maxAge = category === "Kid" ? 12 : 19;

        // Only validate when input is within reasonable length (e.g. 2 digits)
        if (value.length >= 2) {
            if (numericValue < minAge || numericValue > maxAge) {
                toast.error(`Age must be between ${minAge} and ${maxAge} for ${category} category`);
                onChange({ ...e, target: { ...e.target, value: "" } });
                return;
            }
        }

        onChange(e); // valid or still typing
    };
    
    return (
        <>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Email:</label>
                <input
                    type="email"
                    name="Email"
                    value={values.email}
                    onChange={onChange}
                    className={`w-full p-2 border rounded ${errors.email ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Participant&apos;s Name:</label>
                <input
                    type="text"
                    name="Participant Name"
                    value={values.name}
                    onChange={onChange}
                    className={`w-full p-2 border rounded ${errors.name ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Age:</label>
                <input
                    type="number"
                    name="Age"
                    value={values.age}
                    onChange={handleAgeChange}
                    min={category === "Kid" ? 5 : 13}
                    max={category === "Kid" ? 12 : 19}
                    className={`w-full p-2 border rounded ${errors.age ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
            </div>
        </>
    );
};

export default IndividualDetails;
