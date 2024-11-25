"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoMdLocate } from "react-icons/io";
import { getAdminData, addRegistrationData } from '../services/index';  // Import necessary services
import Cookies from 'js-cookie';
import { Loader } from "lucide-react";
import { toast } from "react-toastify";

// Validation function
const validate = (values) => {

  const errors = {};
  if (!values.email) errors.email = "Email is required";
  if (!values.participantName) errors.participantName = "Participant's Name is required";
  if (!values.ageCriteria) errors.ageCriteria = "Age Criteria is required";
  if (!values.participantAge) errors.participantAge = "Participant's Age is required";
  if (!values.guardianNumber) errors.guardianNumber = "Parent's/Guardian's Number is required";
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

const RegisterForm = () => {
  // States for form values, errors, submission status, etc.
  const [values, setValues] = useState({
    email: "",
    participantName: "",
    ageCriteria: "",
    participantAge: "",
    guardianNumber: "",
    address: "",
    talent: "",
    termsAccepted: {
      videoSharing: false,
      offensiveContent: false,
      incident: false,
    },
  });

  const router = useRouter();

  // States
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [options, setOptions] = useState([]);  // Options for dropdown
  const [groupCharge, setGroupCharge] = useState([])
  const [charges, setCharges] = useState('');
  const [ageRange, setAgeRange] = useState({ min: 0, max: 100 }); // Default age range

  // Fetch talents data from Admin
  useEffect(() => {
    const fetchData = async () => {
      const response = await getAdminData();
      if (response.success && response.data) {
        setOptions(response.data);
      }
    };
    fetchData();
  }, []);

  // Handle changes in form fields
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Map names to state
    const nameMapping = {
      "Email": "email",
      "Participant Name": "participantName",
      "Age Criteria": "ageCriteria",
      "Participant Age": "participantAge",
      "Guardian Number": "guardianNumber",
      "Address": "address",
      "Talent": "talent",
      "Video Sharing": "videoSharing",
      "Offensive Content": "offensiveContent",
      "Incidents": "incident",
    };

    const mappedName = nameMapping[name];

    if (type === "checkbox") {
      setValues((prevValues) => ({
        ...prevValues,
        termsAccepted: {
          ...prevValues.termsAccepted,
          [mappedName]: checked,
        },
      }));
    } else {
      // Check for age input and ensure it's within the specified range
      if (mappedName === "participantAge" && (value < ageRange.min || value > ageRange.max)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          participantAge: `Participant's age must be between ${ageRange.min} and ${ageRange.max} years.`,
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, participantAge: "" })); // Clear the age error if valid
      }

      setValues((prevValues) => ({
        ...prevValues,
        [mappedName]: value,
      }));
    }
  };

  useEffect(() => {
    const fetchAdminData = async () => {
      const response = await getAdminData();
      if (response.success && response.data) {
        setOptions(response.data);
        setGroupCharge(response.data)
      }
    };
    fetchAdminData();
  }, []);

  // Use a separate useEffect to log the fees when it changes
  useEffect(() => {
  }, [charges]);

  // Handle age criteria change and set charges + min/max age range
  const handleAgeCriteriaChange = (e) => {
    const ageCriteria = e.target.value;
    setValues((prevValues) => ({ ...prevValues, ageCriteria }));

    let charge, minAge, maxAge;

    switch (ageCriteria) {
      case "3-5":
        charge = groupCharge[0]?.groupACharge;
        minAge = 3;
        maxAge = 5;
        break;
      case "6-8":
        charge = groupCharge[0]?.groupBCharge;
        minAge = 6;
        maxAge = 8;
        break;
      case "9-12":
        charge = groupCharge[0]?.groupCCharge;
        minAge = 9;
        maxAge = 12;
        break;
      default:
        charge = '';
        minAge = 0;
        maxAge = 12;
    }

    setCharges(charge);
    setAgeRange({ min: minAge, max: maxAge });
  };

  // Dropdown Change for Talent
  const handleDropdownChange = (e) => {
    const value = e.target.value;
    setDropdownValue(value);
    setValues((prevValues) => ({
      ...prevValues,
      talent: value, // Update the talent in values state
    }));
  };

  const [dropdownValue, setDropdownValue] = useState('');

  const [isLocating, setIsLocating] = useState(false);

  // Update the function:
  const fetchAddressFromLocation = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
      );
      const data = await response.json();

      if (response.ok) {
        setValues((prevValues) => ({
          ...prevValues,
          address: data.display_name,
        }));
      } else {
        toast.error("Failed to retrieve address.");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      toast.error("Unable to retrieve address. Please try again.");
    } finally {
      setIsLocating(false); // End loading
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
          setIsLocating(false); // End loading
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser.");
      setIsLocating(false); // End loading
    }
  };

  // Define all possible categories
  const allCategories = ["Acting", "Dancing", "Mimicry", "Singing"]; // Add any other categories here

  // Load the dropdown value from getAdminData API
  useEffect(() => {
    const fetchData = async () => {
      const response = await getAdminData();
      if (response.success && response.data) {
        const fetchedCategories = response.data.map(item => item.talent); // Assuming talent field in response
        setOptions(fetchedCategories);
      } else {
        console.error('Error fetching data:', response.message);
      }
    };

    fetchData();
  }, []);

  // Submit Data in MongoDB -->

  // Google Sheet Integration
  const handleSubmitGoogleForm = async () => {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxUfsJR5oWPQtvpchqO3JHz25brnjSOYrQCkpSD0g0GBVmEb0Ng_Z8BDuWw1sNRloSv/exec';
    const form = document.forms['submit-to-google-sheet'];

    const formData = new FormData(form);
    formData.append('VideoSharing', values.termsAccepted.videoSharing ? 'Yes' : 'No');
    formData.append('OffensiveContent', values.termsAccepted.offensiveContent ? 'Yes' : 'No');
    formData.append('Incident', values.termsAccepted.incident ? 'Yes' : 'No');
    formData.append('Charge', charges);
    // Add date to form data
    const today = new Date();
    const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
    formData.append('Date', formattedDate);
    // Add time to form data
    const formattedTime = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    formData.append('Time', formattedTime);

    fetch(scriptURL, { method: 'POST', body: formData })
      .then(response => {
        if (!response.ok) throw new Error('Failed to submit to Google Sheets');
        form.reset();
      })
      .catch(error => {
        console.error('Error!', error.message);
        toast.error("Form Submitted Failed");
      });
  };

  // Registration logic here
  const registrationSuccess = true; // Update based on your registration logic

  // Handle form submission

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);

    // Prevent submission if there are validation errors
    if (Object.keys(validationErrors).length > 0) {
      setIsSubmitting(false);
      return;
    }

    // Proceed with submission if no validation errors
    setIsSubmitting(true);

    // Submit form data
    const response = await addRegistrationData({
      email: values.email,
      participantName: values.participantName,
      ageCriteria: values.ageCriteria,
      participantAge: values.participantAge,
      guardianNumber: values.guardianNumber,
      address: values.address,
      talent: values.talent,
      charges: charges,
      termsAccepted: values.termsAccepted,
    });

    if (response.success) {
      // Google Form submission
      await handleSubmitGoogleForm();

      // Set 'isRegistered' cookie to true if registration is successful
      if (registrationSuccess) {
        Cookies.set('isRegistered', 'true', { expires: 1, path: '/' }); // Set cookie for 1 day
      }

      // Redirect to payment-checkout page
      router.push(`/payment-checkout?email=${encodeURIComponent(values.email)}&participantName=${encodeURIComponent(values.participantName)}&talent=${encodeURIComponent(values.talent)}&charges=${encodeURIComponent(charges)}&ageCriteria=${encodeURIComponent(values.ageCriteria)}&participantAge=${encodeURIComponent(values.participantAge)}&guardianNumber=${encodeURIComponent(values.guardianNumber)}&address=${encodeURIComponent(values.address)}&charge=${encodeURIComponent(charges)}`);
    } else {
      setServerError(response.message);
    }

    setIsSubmitting(false);
  };


  return (
    <div className="bg-[aliceblue] p-6 space-y-4">
      <div className="w-full max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">Registration Form</h1>
        <form name="submit-to-google-sheet" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email:</label>
            <input
              type="email"
              name="Email"
              value={values.email}
              onChange={handleChange}
              placeholder="example@example.com"
              className={`w-full p-2 border rounded ${errors.email ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Participant&apos;s Name:
            </label>
            <input
              type="text"
              name="Participant Name"
              value={values.participantName}
              onChange={handleChange}
              placeholder="John Doe"
              className={`w-full p-2 border rounded ${errors.participantName ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.participantName && (
              <p className="text-red-500 text-sm">{errors.participantName}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Participant&apos;s Talent:
            </label>
            <select
              name="Talent"
              value={dropdownValue}
              onChange={handleDropdownChange}
              className={`w-full p-2 border rounded ${errors.talent ? "border-red-500" : "border-gray-300"}`}
            >
              <option value="">Select Talent</option>
              {allCategories.map((category) => (
                <option
                  key={category}
                  value={category}
                  className={`${options.includes(category) ? "text-blue-800 font-bold" : "disabled:cursor-not-allowed"}`}
                  disabled={!options.includes(category)} // Disable if not in options
                >
                  {category}
                </option>
              ))}
            </select>
            {errors.talent && <p className="text-red-500 text-sm">{errors.talent}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Age Criteria:</label>
            <select
              name="Age Criteria"
              value={values.ageCriteria}
              onChange={handleAgeCriteriaChange}
              className={`w-full p-2 border rounded ${errors.ageCriteria ? "border-red-500" : "border-gray-300"
                }`}
            >
              <option value="">Select Age Criteria</option>
              <option value="3-5">3-5 years (Group A)</option>
              <option value="6-8">6-8 years (Group B)</option>
              <option value="9-12">9-12 years (Group C)</option>
            </select>

            {errors.ageCriteria && (
              <p className="text-red-500 text-sm">{errors.ageCriteria}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Participant&apos;s Age:</label>
            <input
              type="number"
              name="Participant Age"
              value={values.participantAge}
              onChange={handleChange}
              min={ageRange.min}
              max={ageRange.max}
              className={`w-full p-2 border rounded ${errors.participantAge ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.participantAge && <p className="text-red-500 text-sm">{errors.participantAge}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Parent&apos;s/Guardian&apos;s Number:
            </label>
            <input
              type="text"
              name="Guardian Number"
              value={values.guardianNumber}
              onChange={handleChange}
              placeholder="123-456-7890"
              className={`w-full p-2 border rounded ${errors.guardianNumber ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.guardianNumber && (
              <p className="text-red-500 text-sm">{errors.guardianNumber}</p>
            )}
          </div>

          <div className="mb-4 relative">
            <label className="block text-sm font-medium mb-2">Address:</label>
            <textarea
              name="Address"
              value={values.address}
              onChange={handleChange}
              placeholder="123 Main St, Apt 4B, City, State, ZIP"
              className={`w-full p-2 pr-10 border rounded ${errors.address ? "border-red-500" : "border-gray-300"
                }`}
            />
            <IoMdLocate
              data-tip="Point Current Location"
              className="absolute top-12 right-2 cursor-pointer text-2xl text-gray-500 hover:text-gray-700" // Adjust size and alignment here
              onClick={handleLocationClick}
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Terms and Conditions:</label>
            <label className="items-center block mb-2">
              <input
                type="checkbox"
                name="Video Sharing"
                checked={values.termsAccepted.videoSharing}
                onChange={handleChange}
                className="form-checkbox"
              />
              <span className="ml-2 text-sm">
                By submitting the video, I confirm that I, as a parent/legal guardian, have voluntarily chosen to do so and have no objection to sharing the video.
              </span>
            </label>
            {errors.termsAccepted?.videoSharing && (
              <p className="text-red-500 text-sm">{errors.termsAccepted.videoSharing}</p>
            )}

            <label className="items-center block mb-2">
              <input
                type="checkbox"
                name="Offensive Content"
                checked={values.termsAccepted.offensiveContent}
                onChange={handleChange}
                className="form-checkbox"
              />
              <span className="ml-2 text-sm">
                By submitting, I confirm as a parent/guardian that no offensive language or content is being used. Disqualification is at the company&apos;s discretion if found. Registration fees plus GST are non-refundable upon disqualification.
              </span>
            </label>
            {errors.termsAccepted?.offensiveContent && (
              <p className="text-red-500 text-sm">{errors.termsAccepted.offensiveContent}</p>
            )}

            <label className="items-center block mb-4">
              <input
                type="checkbox"
                name="Incidents"
                checked={values.termsAccepted.incident}
                onChange={handleChange}
                className="form-checkbox"
              />
              <span className="ml-2 text-sm">
                By submitting, I acknowledge that the company is not responsible for any incidents that may occur during the shooting and video-making process.
              </span>
            </label>
            {errors.termsAccepted?.incident && (
              <p className="text-red-500 text-sm">{errors.termsAccepted.incident}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting} // Disable if submitting or there are errors
            className={`w-full py-2 flex justify-center items-center bg-[#004873] text-white font-semibold rounded ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#0076ff]'} transition duration-300`}
          >
            {isSubmitting ? ( // Show spinner while submitting
              <Loader className="animate-spin" size={20} />
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
