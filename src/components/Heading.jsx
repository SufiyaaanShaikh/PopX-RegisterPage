import React from "react";
import { useLocation } from "react-router-dom";

function Heading({ title, des }) {
  
    const location = useLocation();
    const isAuth = location.pathname === "/register" || location.pathname === "/login"
  return (
    <div className={`heading`}>
      <div className={`text-2xl font-medium ${isAuth? "w-1/2": ""}`}>{title}</div>
      <div className={`text-lg opacity-90 mt-2 mb-4 text-gray-500 ${isAuth? "w-3/4": ""}`}>{des}</div>
    </div>
  );
}

export default Heading;
