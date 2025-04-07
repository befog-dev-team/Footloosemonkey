"use client";
import React from "react";

const IndividualDetails = ({ values, onChange, errors, category }) => (

    console.log("IndividualDetails", values, errors, category),
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
                onChange={onChange}
                min={category === "Kid" ? 5 : 13}
                max={category === "Kid" ? 12 : 19}
                className={`w-full p-2 border rounded ${errors.age ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
        </div>
    </>
);

export default IndividualDetails;