"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { toast } from "react-hot-toast";
import Cookies from 'js-cookie';
import CategorySelector from "../../components/RegistrationForm/CategorySelector";
import IndividualDetails from "../../components/RegistrationForm/IndividualDetails";
import GroupMembers from "../../components/RegistrationForm/GroupMembers";
import TalentSelector from "../../components/RegistrationForm/TalentSelector";
import AddressInput from "../../components/RegistrationForm/AddressInput";
import TermsAndConditions from "../../components/RegistrationForm/TermsAndConditions";
import { addRegistrationData, getAdminData } from "../services";
import { getAgeGroup } from "../../lib/utils";
import axios from "axios";

const RegisterForm = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    category: "",
    groupName: "",
    email: "",
    name: "",
    age: "",
    guardianNumber: "",
    address: "",
    talent: "",
    members: [{ name: "", email: "", age: "" }],
    termsAccepted: {
      videoSharing: false,
      offensiveContent: false,
      incident: false,
    },
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [talentOptions, setTalentOptions] = useState([]);
  const [calculatedCharge, setCalculatedCharge] = useState(0);

  const [isLocating, setIsLocating] = useState(false);

  const isGroup = values.category === "Group";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAdminData();
        if (response.success && response.data) {
          setTalentOptions(response.data);
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };
    fetchData();
  }, []);

  // Calculate charge based on category and age
  useEffect(() => {
    if (values.talent && values.category) {
      const talentData = talentOptions.find(t => t.talent === values.talent);
      if (talentData) {
        let charge = 0;

        switch (values.category) {
          case "Kid":
            charge = talentData.groupACharge || 0;
            break;
          case "Teenage":
            charge = talentData.groupBCharge || 0;
            break;
          case "Group":
            charge = talentData.groupCCharge || 0;
            break;
          default:
            charge = 0;
        }

        // Apply offer if available
        if (talentData.isOfferActive && talentData.offerCharge) {
          charge = talentData.offerCharge;
        }

        setCalculatedCharge(charge);
      }
    }
  }, [values.talent, values.category, talentOptions]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    const nameMapping = {
      "Category": "category",
      "Group Name": "groupName",
      "Email": "email",
      "Participant Name": "name",
      "Age": "age",
      "Guardian Number": "guardianNumber",
      "Address": "address",
      "Talent": "talent",
      "Video Sharing": "videoSharing",
      "Offensive Content": "offensiveContent",
      "Incidents": "incident",
    };

    const mappedName = nameMapping[name];

    if (name === "Category") {
      setValues(prev => ({
        ...prev,
        [name.toLowerCase()]: value,
        // Reset age when category changes
        age: "",
        // Reset group-related fields when switching away from Group
        ...(value !== "Group" && {
          groupName: "",
          members: [{ name: "", email: "", age: "" }]
        }),
        // Reset individual fields when switching to Group
        ...(value === "Group" && {
          email: "",
          name: "",
          age: ""
        })
      }));
      return;
    }

    if (type === "checkbox") {
      setValues(prev => ({
        ...prev,
        termsAccepted: {
          ...prev.termsAccepted,
          [mappedName]: checked,
        },
      }));
    } else if (mappedName === "category") {
      // Simplified category change handler
      setValues(prev => ({
        ...prev,
        [mappedName]: value,
        // Reset group-related fields when switching away from Group
        ...(value !== "Group" && {
          groupName: "",
          members: [{ name: "", email: "", age: "" }]
        }),
        // Reset individual fields when switching to Group
        ...(value === "Group" && {
          email: "",
          name: "",
          age: ""
        })
      }));
    } else {
      setValues(prev => ({ ...prev, [mappedName]: value }));
    }
  };

  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...values.members];
    updatedMembers[index][field] = value;
    setValues(prev => ({ ...prev, members: updatedMembers }));
  };

  const addMember = () => {
    if (values.members.length < 5) {
      setValues(prev => ({
        ...prev,
        members: [...prev.members, { name: "", email: "", age: "" }]
      }));
    }
  };

  const removeMember = (index) => {
    if (values.members.length > 1) {
      const updatedMembers = [...values.members];
      updatedMembers.splice(index, 1);
      setValues(prev => ({ ...prev, members: updatedMembers }));
    }
  };

  const fetchAddressFromLocation = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
      );
      const data = await response.json();

      if (response.ok) {
        setValues(prev => ({ ...prev, address: data.display_name }));
      } else {
        toast.error("Failed to retrieve address.");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      toast.error("Unable to retrieve address. Please try again.");
    } finally {
      setIsLocating(false);
    }
  };

  const handleLocationClick = () => {
    setIsLocating(true);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => fetchAddressFromLocation(position.coords.latitude, position.coords.longitude),
        (error) => {
          console.error("Error fetching location:", error);
          toast.error("Unable to retrieve location. Please try again.");
          setIsLocating(false);
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser.");
      setIsLocating(false);
    }
  };

  const validate = (values, isGroup) => {
    const errors = {};

    if (!values.category) errors.category = "Category is required";

    if (!isGroup) {
      if (values.category === "Kid" && (values.age < 5 || values.age > 12)) {
        errors.age = "Kid category requires age 5-12";
      } else if (values.category === "Teenage" && (values.age < 13 || values.age > 19)) {
        errors.age = "Teenage category requires age 13-19";
      }

      if (!values.age) {
        errors.age = "Age is required";
      }
    }

    if (isGroup) {
      if (!values.groupName) errors.groupName = "Group name is required";
      if (values.members.length < 2) errors.members = "At least 2 members required";
      if (values.members.length > 5) errors.members = "Maximum 5 members allowed";

      values.members.forEach((member, index) => {
        if (!member.name) errors[`memberName_${index}`] = "Member name is required";
        if (!member.email) errors[`memberEmail_${index}`] = "Member email is required";
      });
    } else {
      if (!values.email) errors.email = "Email is required";
      if (!values.name) errors.name = "Participant's Name is required";
      if (!values.age) errors.age = "Age is required";
    }

    if (!values.guardianNumber) errors.guardianNumber = "Contact Number is required";
    if (!values.address) errors.address = "Address is required";
    if (!values.talent) errors.talent = "Participant's Talent is required";

    if (!values.termsAccepted.videoSharing) {
      errors.termsAccepted = errors.termsAccepted || {};
      errors.termsAccepted.videoSharing = "You must accept the video sharing terms";
    }

    if (!values.termsAccepted.offensiveContent) {
      errors.termsAccepted = errors.termsAccepted || {};
      errors.termsAccepted.offensiveContent = "You must accept the terms regarding offensive content";
    }

    if (!values.termsAccepted.incident) {
      errors.termsAccepted = errors.termsAccepted || {};
      errors.termsAccepted.incident = "You must accept the terms regarding incident";
    }

    return errors;
  };

  const handleSubmitGoogleForm = async () => {
    const scriptURL = process.env.NEXT_PUBLIC_GOOGLE_SHEET_DATABASE_URL;

    const formData = new FormData();

    // Add all form values to formData
    formData.append('Category', values.category);
    if (isGroup) {
      formData.append('GroupName', values.groupName);
      values.members.forEach((member, index) => {
        formData.append(`Member${index + 1}_Name`, member.name);
        formData.append(`Member${index + 1}_Email`, member.email);
      });
    } else {
      formData.append('Email', values.email);
      formData.append('Name', values.name);
      formData.append('Age', values.age);
    }

    formData.append('GuardianNumber', values.guardianNumber);
    formData.append('Address', values.address);
    formData.append('Talent', values.talent);
    formData.append('Charge', calculatedCharge);

    // Add date and time
    const today = new Date();
    const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
    const formattedTime = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    formData.append('Date', formattedDate);
    formData.append('Time', formattedTime);

    try {
      const response = await axios.post(scriptURL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status !== 200) {
        throw new Error('Failed to submit to Google Sheets');
      }
      return true;
    } catch (error) {
      console.error('Error submitting to Google Sheets:', error.message);
      toast.error("Failed to submit registration data to Google Sheets");
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Values:", values);
    const validationErrors = validate(values, isGroup);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(true);

    try {
      const googleSheetSuccess = await handleSubmitGoogleForm();

      if (!googleSheetSuccess) {
        throw new Error('Google Sheet submission failed');
      }

      const response = await addRegistrationData({
        category: values.category,
        groupName: isGroup ? values.groupName : null,
        email: isGroup ? null : values.email,
        name: isGroup ? null : values.name,
        age: isGroup ? null : values.age,
        guardianNumber: values.guardianNumber,
        address: values.address,
        talent: values.talent,
        members: isGroup ? values.members : null,
        charge: calculatedCharge,
        termsAccepted: values.termsAccepted,
      });

      if (response.success) {
        Cookies.set('isRegistered', 'true', { expires: 1, path: '/' });
        const paymentData = {
          category: values.category,
          talent: values.talent,
          charge: calculatedCharge,
          guardianNumber: values.guardianNumber,
          address: values.address,
          ...(isGroup ? {
            groupName: values.groupName,
            memberCount: values.members.length
          } : {
            email: values.email,
            name: values.name,
            age: values.age
          })
        };
        router.push(`/payment-checkout?data=${encodeURIComponent(JSON.stringify(paymentData))}`);
      } else {
        setServerError(response.message);
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("An error occurred during registration");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[aliceblue] p-6 space-y-4">
      <div className="w-full max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">Registration Form</h1>
        <form onSubmit={handleSubmit}>
          <CategorySelector
            value={values.category}
            onChange={handleChange}
            error={errors.category}
          />

          {isGroup ? (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Group Name:</label>
                <input
                  type="text"
                  name="Group Name"
                  value={values.groupName}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${errors.groupName ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.groupName && <p className="text-red-500 text-sm">{errors.groupName}</p>}
              </div>

              <GroupMembers
                members={values.members}
                onChange={handleMemberChange}
                onAdd={addMember}
                onRemove={removeMember}
                errors={errors}
              />
            </>
          ) : (
            <IndividualDetails
              values={values}
              onChange={handleChange}
              errors={errors}
              category={values.category}
            />
          )}

          <TalentSelector
            value={values.talent}
            onChange={handleChange}
            options={talentOptions}
            error={errors.talent}
          />

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Contact Number:</label>
            <input
              type="text"
              name="Guardian Number"
              value={values.guardianNumber}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.guardianNumber ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.guardianNumber && <p className="text-red-500 text-sm">{errors.guardianNumber}</p>}
          </div>

          <AddressInput
            value={values.address}
            onChange={handleChange}
            onLocateClick={handleLocationClick}
            error={errors.address}
          />

          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium mb-2">Registration Fee</h3>
            <p className="text-lg font-semibold">
              ₹ {calculatedCharge}
              {talentOptions.find(t => t.talent === values.talent)?.isOfferActive && (
                <span className="ml-2 text-sm text-green-600">(Special Offer Applied)</span>
              )}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {isGroup ?
                "Group Category (Group C Pricing)" :
                values.age ? `Individual (${getAgeGroup(values.age)})` : ''}
            </p>
          </div>

          <TermsAndConditions
            termsAccepted={values.termsAccepted}
            onChange={handleChange}
            errors={errors}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 flex justify-center items-center bg-[#004873] text-white font-semibold rounded ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#0076ff]'} transition duration-300`}
          >
            {isSubmitting ? <Loader className="animate-spin" size={20} /> : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;