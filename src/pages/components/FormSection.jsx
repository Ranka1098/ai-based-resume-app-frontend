import React from "react";
import { CiGrid41 } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa6";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const FormSection = () => {
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    jobTitle: Yup.string().required("Job title is required"),
    address: Yup.string().required("Address is required"),
    phone: Yup.string()
      .required("Phone number is required")
      .length(10, "Phone number must be exactly 10 digits"),
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  return (
    <div className="max-w-4xl mx-auto px-4 ">
      {/* Logo and Button */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-2 border border-gray-400 rounded-md p-2 w-[6rem]">
          <CiGrid41 className="text-xl" />
          <p className="font-medium">Theme</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md shadow-md">
          Next <FaArrowRight />
        </button>
      </div>

      {/* Form Card */}
      <div className="border-[3px] border-t-purple-600 p-6 rounded-lg shadow-md bg-white">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          Personal Detail
        </h1>
        <p className="text-gray-600 mb-6">
          Get started with the basic information
        </p>

        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            jobTitle: "",
            address: "",
            phone: "",
            email: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            console.log("Form Values:", values);
            resetForm();
          }}
        >
          <Form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div className="flex flex-col">
              <label htmlFor="firstName" className="mb-1 font-medium">
                First Name
              </label>
              <Field
                name="firstName"
                type="text"
                className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Last Name */}
            <div className="flex flex-col">
              <label htmlFor="lastName" className="mb-1 font-medium">
                Last Name
              </label>
              <Field
                name="lastName"
                type="text"
                className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Job Title */}
            <div className="flex flex-col">
              <label htmlFor="jobTitle" className="mb-1 font-medium">
                Job Title
              </label>
              <Field
                name="jobTitle"
                type="text"
                className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <ErrorMessage
                name="jobTitle"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Address */}
            <div className="flex flex-col">
              <label htmlFor="address" className="mb-1 font-medium">
                Address
              </label>
              <Field
                name="address"
                type="text"
                className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <ErrorMessage
                name="address"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col">
              <label htmlFor="phone" className="mb-1 font-medium">
                Phone Number
              </label>
              <Field
                name="phone"
                type="text"
                className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <ErrorMessage
                name="phone"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-1 font-medium">
                Email
              </label>
              <Field
                name="email"
                type="email"
                className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 mt-4">
              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
              >
                Submit
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default FormSection;
