import React from 'react'

export default function loading() {
    return (
        <div className="flex items-center justify-center h-screen bg-white">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-blue-500 font-medium text-lg">Loading, please wait...</p>
            </div>
        </div>
    );
}
