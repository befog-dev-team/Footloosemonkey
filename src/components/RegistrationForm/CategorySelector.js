"use client";
import React from "react";

const CategorySelector = ({ value, onChange, error }) => {
    const categories = [
        { value: "Kid", label: "Kid (5-12 years)" },
        { value: "Teenage", label: "Teenage (13-19 years)" },
        { value: "Group", label: "Group (2-5 members, any age)" }
    ];

    return (
        <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Category:</label>
            <select
                name="Category"
                value={value}
                onChange={onChange}
                className={`w-full p-2 border rounded ${error ? "border-red-500" : "border-gray-300"}`}
            >
                <option value="">Select Category</option>
                {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                        {category.label}
                    </option>
                ))}
            </select>
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
};

export default CategorySelector;