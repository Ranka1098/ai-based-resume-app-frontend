import React, { useContext, useEffect, useState } from "react";
import FormContext from "@/context/FormContext";
import axios from "axios";

const PersonalDetail = ({ id }) => {
  const { formData, updateFormData } = useContext(FormContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:8080/personDetail/${id}`, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        jobTitle: formData.jobTitle,
        address: formData.address,
        phone: formData.phone,
        email: formData.email,
      });

      if (res.status === 200) {
        alert("personal detail added successfully");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div className="max-w-3xl mx-auto my-6">
      <form
        onSubmit={handleSubmit}
        className="border p-6 border-t-[5px] border-t-purple-600 rounded-2xl bg-white shadow-lg"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-1">
          Personal Details
        </h2>
        <h3 className="font-semibold text-md mb-3">
          Add your personal details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* First Name */}
          <div className="flex flex-col">
            <label htmlFor="firstName" className="font-semibold mb-1">
              First Name
            </label>
            <input
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter first name"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col">
            <label htmlFor="lastName" className="font-semibold mb-1">
              Last Name
            </label>
            <input
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter last name"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Job Title */}
          <div className="flex flex-col">
            <label htmlFor="jobTitle" className="font-semibold mb-1">
              Job Title
            </label>
            <input
              name="jobTitle"
              type="text"
              value={formData.jobTitle}
              onChange={handleChange}
              placeholder="Enter job title"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Address */}
          <div className="flex flex-col">
            <label htmlFor="address" className="font-semibold mb-1">
              Address
            </label>
            <input
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter address"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label htmlFor="phone" className="font-semibold mb-1">
              Phone Number
            </label>
            <input
              name="phone"
              type="text"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="font-semibold mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-md transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PersonalDetail;
