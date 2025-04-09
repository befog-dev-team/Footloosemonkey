/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Loader, Upload, User, Video, Image, FileText } from 'lucide-react';

const UploadForm = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [error, setError] = useState('');
    const [videoFile, setVideoFile] = useState(null);
    const [profilePicFile, setProfilePicFile] = useState(null);
    const [participantData, setParticipantData] = useState(null);
    const [videoPreview, setVideoPreview] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const [formData, setFormData] = useState({
        participantId: '',
        name: '',
        participantEmail: '',
        age: '',
        ageCriteria: '',
        participantTalent: '',
        postTitle: '',
        description: '',
        originalSize: '',
        participantAddress: '',
        participantNumber: '',
        participantCharge: '',
        participantPaymentID: '',
        participantPaymentStatus: ''
    });

    // Fetch email from query params
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const emailParam = params.get('email');
        if (emailParam) setEmail(emailParam);
    }, []);

    // Fetch participant data when email changes
    useEffect(() => {
        const fetchParticipantData = async () => {
            if (!email) return;

            setError('');

            setIsDataLoaded(true);

            try {
                const checkResponse = await axios.get(`/api/checksubmission?email=${encodeURIComponent(email)}`);
                if (checkResponse.data.success) {
                    toast.error("You've already submitted your talent!");
                    setError("You've already submitted your talent!");
                    return;
                }

                const response = await axios.get(`/api/payment/getDataByEmail?email=${encodeURIComponent(email)}`);
                if (response.data.success && response.data.data) {
                    const data = response.data.data;
                    setParticipantData(data);
                    setFormData({
                        ...formData,
                        participantId: data.id || '',
                        name: data.name || '',
                        participantEmail: data.email || '',
                        age: data.age || '',
                        participantTalent: data.talent || '',
                        participantAddress: data.address || '',
                        participantNumber: data.number || '',
                        participantPaymentID: data.paymentId || ''
                    });
                } else {
                    setError('No participant data found');
                    toast.error('No participant data found');
                }
            } catch (error) {
                console.error('Error:', error);
                setError('Error loading data. Please try again.');
                toast.error('Error loading data');
            } finally {
                setIsDataLoaded(false);
            }
        };

        fetchParticipantData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [email]);

    if (isDataLoaded) {
        return (
            <div className="flex items-center justify-center h-screen bg-white">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-blue-500 font-medium text-lg">Loading, please wait...</p>
                </div>
            </div>
        );
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        const file = files[0];

        if (name === 'file') {
            setVideoFile(file);
            if (file) {
                const previewURL = URL.createObjectURL(file);
                setVideoPreview(previewURL);
            }
        } else if (name === 'profilepic') {
            setProfilePicFile(file);
            if (file) {
                const previewURL = URL.createObjectURL(file);
                setImagePreview(previewURL);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!videoFile || !profilePicFile) {
            toast.error('Please upload both files');
            return;
        }

        const MAX_FILE_SIZE = 100 * 1024 * 1024;
        if (videoFile.size > MAX_FILE_SIZE) {
            toast.error('Video must be under 100MB');
            return;
        }

        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }
        formDataToSend.append('file', videoFile);
        formDataToSend.append('profilepic', profilePicFile);

        try {
            setLoading(true);
            const response = await axios.post('/api/submission', formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.data.success) {
                toast.success('Submitted successfully!');
                router.push('/spotlight');
            } else {
                throw new Error(response.data.message || 'Submission failed');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error(error.response?.data?.message || 'Submission failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
                        Showcase Your Talent
                    </h1>
                    <p className="text-lg text-gray-600">
                        Share your performance with the world
                    </p>
                </div>

                {participantData && (
                    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8 p-6 border border-blue-100">
                        <div className="flex items-center">
                            <div className="p-3 bg-blue-100 rounded-full mr-4">
                                <User className="text-blue-600" size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800">
                                    {participantData.name}
                                </h2>
                                <p className="text-gray-600">{participantData.email}</p>
                                <span className="inline-block mt-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                    {participantData.talent}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-6 sm:p-8">
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Performance Title
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="postTitle"
                                            value={formData.postTitle}
                                            onChange={handleChange}
                                            required
                                            className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                            placeholder="Give your performance a title"
                                        />
                                        <FileText className="absolute right-3 top-3.5 text-gray-400" size={18} />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
                                        rows={4}
                                        className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                        placeholder="Tell us about your performance"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Profile Picture Upload */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Profile Picture
                                        </label>
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition cursor-pointer relative">
                                            <input
                                                type="file"
                                                name="profilepic"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                                required
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            />
                                            {imagePreview ? (
                                                <div className="flex flex-col items-center">
                                                    <img
                                                        src={imagePreview}
                                                        alt="Preview"
                                                        className="h-32 w-32 rounded-full object-cover mb-3"
                                                    />
                                                    <p className="text-sm text-gray-600">Click to change</p>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center">
                                                    <Image className="text-gray-400 mb-2" size={40} alt="Upload icon" />
                                                    <p className="text-sm text-gray-600">
                                                        <span className="font-medium text-blue-600">Upload</span> or drag and drop
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 5MB</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Talent Video
                                        </label>
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition cursor-pointer relative">
                                            <input
                                                type="file"
                                                name="file"
                                                accept="video/*"
                                                onChange={handleFileChange}
                                                required
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            />
                                            {videoPreview ? (
                                                <div className="flex flex-col items-center">
                                                    <video
                                                        src={videoPreview}
                                                        className="h-32 w-full object-contain mb-3 rounded"
                                                        controls
                                                    />
                                                    <p className="text-sm text-gray-600">Click to change</p>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center">
                                                    <Video className="text-gray-400 mb-2" size={40} />
                                                    <p className="text-sm text-gray-600">
                                                        <span className="font-medium text-blue-600">Upload</span> or drag and drop
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">MP4, MOV up to 100MB</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {error && (
                                    <div className="bg-red-50 border-l-4 border-red-500 p-4">
                                        <div className="flex">
                                            <div className="flex-shrink-0">
                                                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm text-red-700">{error}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className={`w-full flex justify-center items-center px-6 py-3.5 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                    >
                                        {loading ? (
                                            <>
                                                <Loader className="animate-spin mr-2" size={20} />
                                                Submitting...
                                            </>
                                        ) : (
                                            <>
                                                <Upload className="mr-2" size={20} />
                                                Submit Your Talent
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadForm;