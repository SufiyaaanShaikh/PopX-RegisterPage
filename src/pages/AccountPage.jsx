import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import profile from "../assets/profile.png";
import camera from "../assets/camera.png";

function AccountPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-600">Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <section
        id="account-main"
        className="pt-4 pb-4 w-full  flex items-center justify-center"
      >
        <div className="container h-full w-full max-w-md mx-4">
          <div className="bg-[#F7F8F9] h-full border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            {/* Header */}
            <div className="bg-white h-[68px] shadow-sm border-b border-gray-200 flex items-center justify-between px-4">
              <h1 className="text-lg font-semibold text-[#1D2226]">
                Account Settings
              </h1>
              <button
                onClick={handleLogout}
                className="text-[#6C25FF] hover:text-[#5A1EDB] font-medium text-sm transition-colors duration-200"
              >
                Logout
              </button>
            </div>

            {/* Profile Section */}
            <div className="p-6 space-y-6">
              <div className="flex items-start gap-4 text-[#1D2226]">
                <div className="relative">
                  <img 
                  loading="lazy"
                    src={profile} 
                    alt="Profile photo" 
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <img
                  loading="lazy"
                    src={camera}
                    alt="Edit profile"
                    className="absolute -bottom-1 -right-1 w-6 h-6 cursor-pointer hover:opacity-80 transition-opacity"
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <h2 className="text-[15px] font-semibold capitalize">
                    {user.name}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {user.email}
                  </p>
                  <p className="text-xs text-gray-500">
                    {user.companyName}
                  </p>
                </div>
              </div>

              {/* User Details */}
              <div className="space-y-4">
                <p className="text-sm text-gray-600 leading-relaxed">
                  Welcome to PopX! Your account has been successfully created and 
                  you can now access all features of our platform. Thank you for 
                  joining our community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AccountPage;