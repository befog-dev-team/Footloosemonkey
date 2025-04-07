"use client";
import React from "react";
import { IoMdLocate } from "react-icons/io";

const AddressInput = ({ value, onChange, onLocateClick, error }) => (
    <div className="mb-4 relative">
        <label className="block text-sm font-medium mb-2">Address:</label>
        <textarea
            name="Address"
            value={value}
            onChange={onChange}
            className={`w-full p-2 pr-10 border rounded ${error ? "border-red-500" : "border-gray-300"}`}
        />
        <IoMdLocate
            className="absolute top-12 right-2 cursor-pointer text-2xl text-gray-500 hover:text-gray-700"
            onClick={onLocateClick}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
);

export default AddressInput;