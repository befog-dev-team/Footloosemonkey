"use client";
import React from "react";

const GroupMembers = ({ members, onChange, onAdd, onRemove, errors }) => (
    <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Group Members (2-5):</label>
        {members.map((member, index) => (
            <div key={index} className="mb-3 p-3 border rounded">
                <div className="mb-2">
                    <label className="block text-xs font-medium mb-1">Member {index + 1} Name:</label>
                    <input
                        type="text"
                        value={member.name}
                        onChange={(e) => onChange(index, 'name', e.target.value)}
                        className={`w-full p-2 border rounded ${errors[`memberName_${index}`] ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors[`memberName_${index}`] && <p className="text-red-500 text-xs">{errors[`memberName_${index}`]}</p>}
                </div>
                <div>
                    <label className="block text-xs font-medium mb-1">Member {index + 1} Email:</label>
                    <input
                        type="email"
                        value={member.email}
                        onChange={(e) => onChange(index, 'email', e.target.value)}
                        className={`w-full p-2 border rounded ${errors[`memberEmail_${index}`] ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors[`memberEmail_${index}`] && <p className="text-red-500 text-xs">{errors[`memberEmail_${index}`]}</p>}
                </div>
                {members.length > 1 && (
                    <button
                        type="button"
                        onClick={() => onRemove(index)}
                        className="mt-2 text-xs text-red-500 hover:text-red-700"
                    >
                        Remove Member
                    </button>
                )}
            </div>
        ))}
        {members.length < 5 && (
            <button
                type="button"
                onClick={onAdd}
                className="text-sm text-blue-500 hover:text-blue-700"
            >
                + Add Member
            </button>
        )}
        {errors.members && <p className="text-red-500 text-sm">{errors.members}</p>}
    </div>
);

export default GroupMembers;