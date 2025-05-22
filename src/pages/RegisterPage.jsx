
// RegisterPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Heading from "../components/Heading";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../context/AuthContext";

function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const initialValues = {
    name: "",
    phone: "",
    email: "",
    password: "",
    companyName: "",
    isAgency: false,
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .matches(/^[A-Za-z\s]+$/, "Name must contain only letters and spaces")
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be less than 50 characters"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^[0-9]+$/, "Phone number must be digits only")
      .min(10, "Phone number must be at least 10 digits")
      .max(10, "Phone number must be less than 10 digits"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long"),
    companyName: Yup.string()
      .required("Company name is required")
      .min(2, "Company name must be at least 2 characters"),
    isAgency: Yup.boolean(),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const success = await register(values);
      if (success) {
        resetForm();
        navigate('/login');
      }
    } catch (error) {
      console.error("Error during form submission:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <section
        id="register-main"
        className="w-full min-h-screen flex items-center justify-center py-4"
      >
        <div className="container w-full max-w-md mx-4">
          <div className="bg-[#F7F8F9] border border-gray-200 rounded-lg p-6 shadow-sm">
            <Heading title="Create your PopX account" />
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, values, setFieldValue }) => (
                <Form className="space-y-4 mt-6">
                  <div className="coolinput">
                    <label htmlFor="name" className="text">
                      Full Name<span className="text-red-500 ml-1">*</span>
                    </label>
                    <Field
                      type="text"
                      placeholder="Enter your full name"
                      name="name"
                      className="input"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="coolinput">
                    <label htmlFor="phone" className="text">
                      Phone Number<span className="text-red-500 ml-1">*</span>
                    </label>
                    <Field
                      type="tel"
                      placeholder="Enter your phone number"
                      name="phone"
                      className="input"
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="coolinput">
                    <label htmlFor="email" className="text">
                      Email address<span className="text-red-500 ml-1">*</span>
                    </label>
                    <Field
                      type="email"
                      placeholder="Enter your email"
                      name="email"
                      className="input"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="coolinput">
                    <label htmlFor="password" className="text">
                      Password<span className="text-red-500 ml-1">*</span>
                    </label>
                    <Field
                      type="password"
                      placeholder="Create a strong password"
                      name="password"
                      className="input"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="coolinput">
                    <label htmlFor="companyName" className="text">
                      Company Name<span className="text-red-500 ml-1">*</span>
                    </label>
                    <Field
                      type="text"
                      placeholder="Enter your company name"
                      name="companyName"
                      className="input"
                    />
                    <ErrorMessage
                      name="companyName"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <span className="text-[13px] leading-[17px] text-[#1D2226] font-medium">
                      Are you an Agency?
                      <span className="text-red-500 ml-1">*</span>
                    </span>
                    <div className="flex gap-6 mt-2">
                      <label className="flex items-center gap-2 text-sm cursor-pointer">
                        <input
                          type="radio"
                          name="isAgency"
                          value="true"
                          checked={values.isAgency === true}
                          onChange={() => setFieldValue('isAgency', true)}
                          className="accent-[#6C25FF] size-4 cursor-pointer"
                        />
                        Yes
                      </label>
                      <label className="flex items-center gap-2 text-sm cursor-pointer">
                        <input
                          type="radio"
                          name="isAgency"
                          value="false"
                          checked={values.isAgency === false}
                          onChange={() => setFieldValue('isAgency', false)}
                          className="accent-[#6C25FF] cursor-pointer size-4"
                        />
                        No
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="bg-[#6C25FF] rounded-md text-white text-base leading-[17px] font-medium w-full h-[46px] cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#5A1EDB] mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating Account..." : "Create Account"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RegisterPage;