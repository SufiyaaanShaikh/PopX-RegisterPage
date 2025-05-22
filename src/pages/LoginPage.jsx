import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Heading from "../components/Heading";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const success = await login(values.email, values.password);
      if (success) {
        navigate('/account');
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <section
        id="login-main"
        className="w-full h-screen flex items-center justify-center"
      >
        <div className="container h-full w-full max-w-md mx-4">
          <div className="bg-[#F7F8F9] h-full border border-gray-200 rounded-lg p-6 shadow-sm">
            <Heading
              title="Sign in to your PopX account"
              des="Lorem ipsum dolor sit amet, consectetur adipiscing elit,"
            />
            
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4 mt-6">
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
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  <div className="coolinput">
                    <label htmlFor="password" className="text">
                      Password<span className="text-red-500 ml-1">*</span>
                    </label>
                    <Field
                      type="password"
                      placeholder="Enter your password"
                      name="password"
                      className="input"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-[#6C25FF] rounded-md text-white text-base leading-[17px] font-medium w-full h-[46px] cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#5A1EDB] !mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Loginin In..." : "Login"}
                  </button>

                  <div className="text-center mt-4">
                    <Link 
                      to="/register" 
                      className="text-[#6C25FF] hover:underline text-sm"
                    >
                      Don't have an account? Create one
                    </Link>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LoginPage;