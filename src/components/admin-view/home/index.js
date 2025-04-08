'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { addAdminData, getAdminData } from '../../../app/services/index';

const chargeOptions = [0, 9, 49, 99, 149, 199, 249, 299, 349, 399];

export default function AdminPage() {
    const [formData, setFormData] = useState({
        talent: '',
        groupACharge: '',
        groupBCharge: '',
        groupCCharge: '',
    });
    const [dataId, setDataId] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        (async () => {
            const res = await getAdminData();
            if (res.success && res.data?.length > 0) {
                setDataId(res.data[0].id);
            } else {
                console.error('Error fetching admin data:', res.message);
            }
        })();
    }, []);

    const handleChange = (key) => (e) => {
        setFormData((prev) => ({
            ...prev,
            [key]: e.target.value,
        }));
    };

    const handleSubmit = async () => {
        const { talent, groupACharge, groupBCharge, groupCCharge } = formData;

        if (!talent || !groupACharge || !groupBCharge || !groupCCharge) {
            toast.error('Please fill in all fields.');
            return;
        }

        if (!dataId) {
            toast.error('Id is not available.');
            return;
        }

        setIsSubmitting(true);

        const response = await addAdminData({
            id: dataId,
            talent,
            groupACharge,
            groupBCharge,
            groupCCharge,
        });

        if (response.success) {
            toast.success('Form Saved');
            setFormData({ talent: '', groupACharge: '', groupBCharge: '', groupCCharge: '' });
        } else {
            toast.error(`Error: ${response.message}`);
        }

        setIsSubmitting(false);
    };

    const renderChargeDropdown = (label, value, onChange) => (
        <select
            value={value}
            onChange={onChange}
            className="border border-gray-300 rounded-lg p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            <option value="">{`Select ${label}`}</option>
            {chargeOptions.map((charge) => (
                <option key={charge} value={charge}>
                    ₹ {charge}
                </option>
            ))}
        </select>
    );

    return (
        <div className="flex flex-col items-center justify-center h-[60vh]">
            <div className="bg-white rounded-lg shadow-lg p-6 w-80">
                <select
                    value={formData.talent}
                    onChange={handleChange('talent')}
                    className="border border-gray-300 rounded-lg p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select a category</option>
                    {['Acting', 'Dancing', 'Mimicry', 'Singing'].map((t) => (
                        <option key={t} value={t}>
                            {t}
                        </option>
                    ))}
                </select>

                {formData.talent && (
                    <>
                        {renderChargeDropdown('Group A Charges', formData.groupACharge, handleChange('groupACharge'))}
                        {renderChargeDropdown('Group B Charges', formData.groupBCharge, handleChange('groupBCharge'))}
                        {renderChargeDropdown('Group C Charges', formData.groupCCharge, handleChange('groupCCharge'))}
                    </>
                )}

                <button
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                    className={`w-full bg-blue-500 text-white font-semibold py-2 rounded-lg shadow transition duration-200 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
                        }`}
                >
                    Submit
                </button>
            </div>
        </div>
    );
}
