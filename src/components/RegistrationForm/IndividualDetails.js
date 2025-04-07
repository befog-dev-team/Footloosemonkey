"use client";
import React from "react";

const IndividualDetails = ({ values, onChange, errors, category }) => (
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
                value={values.participantName}
                onChange={onChange}
                className={`w-full p-2 border rounded ${errors.participantName ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.participantName && <p className="text-red-500 text-sm">{errors.participantName}</p>}
        </div>

        <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Age:</label>
            <input
                type="number"
                name="Age"
                value={values.age}
                onChange={onChange}
                min={category === "Young" ? 3 : 9}
                max={category === "Young" ? 8 : 16}
                className={`w-full p-2 border rounded ${errors.age ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
        </div>
    </>
);

export default IndividualDetails;