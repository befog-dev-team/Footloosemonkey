"use client";
import React from "react";

const CategorySelector = ({ value, onChange, error }) => (
    <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Category:</label>
        <select
            name="Category"
            value={value}
            onChange={onChange}
            className={`w-full p-2 border rounded ${error ? "border-red-500" : "border-gray-300"}`}
        >
            <option value="">Select Category</option>
            <option value="Kid">Kid (5-12 years)</option>
            <option value="Teenage">Teenage (13-19 years)</option>
            <option value="Group">Group (2-5 members) any age</option>
        </select>
        {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
);

export default CategorySelector;