import React from "react";
import Heading from "../components/Heading";
import { Link } from "react-router-dom";

function WelcomePage() {
  return (
    <>
      <section
        id="main"
        className="w-full h-screen flex items-center justify-center"
      >
        <div className="container h-full flex items-end p-4 pb-12 max-w-96 border border-gray-200 border-solid bg-[#F7F8F9]">
          <div>
            <Heading
              title="Welcome to PopX"
              des="Lorem ipsum dolor sit amet, consectetur adipiscing elit,"
            />
            <div className="btn-block flex flex-col gap-4 mt-4 text-center">
              <Link
                to="/register"
                className="p-3 font-medium text-base rounded-md cursor-pointer bg-[#6C25FF] text-white"
              >
                Create Account
              </Link>
              <Link
                to="/login"
                className="p-3 font-medium text-base rounded-md cursor-pointer bg-[#6C25FF4B] text-[#1D2226]"
              >
                Already Registered? Login
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default WelcomePage;
