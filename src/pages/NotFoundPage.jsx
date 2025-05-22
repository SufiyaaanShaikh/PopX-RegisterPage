import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function NotFoundPage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#F7F8F9]">
      <div className="container max-w-md mx-4">
        <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm text-center">
          {/* 404 Illustration */}
          <div className="mb-6">
            <div className="text-8xl font-bold text-[#6C25FF] mb-2">404</div>
            <div className="w-20 h-1 bg-[#6C25FF] mx-auto rounded"></div>
          </div>
          
          {/* Error Message */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[#1D2226] mb-3">
              Page Not Found
            </h1>
            <p className="text-gray-600 leading-relaxed">
              Oops! The page you're looking for doesn't exist. It might have been 
              moved, deleted, or you entered the wrong URL.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {isAuthenticated ? (
              <>
                <Link
                  to="/account"
                  className="block w-full bg-[#6C25FF] text-white py-3 px-6 rounded-md font-medium transition-all duration-300 hover:bg-[#5A1EDB]"
                >
                  Go to Account
                </Link>
                <Link
                  to="/"
                  className="block w-full bg-[#6C25FF4B] text-[#1D2226] py-3 px-6 rounded-md font-medium transition-all duration-300 hover:bg-[#6C25FF33]"
                >
                  Back to Home
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  className="block w-full bg-[#6C25FF] text-white py-3 px-6 rounded-md font-medium transition-all duration-300 hover:bg-[#5A1EDB]"
                >
                  Back to Home
                </Link>
                <Link
                  to="/login"
                  className="block w-full bg-[#6C25FF4B] text-[#1D2226] py-3 px-6 rounded-md font-medium transition-all duration-300 hover:bg-[#6C25FF33]"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>

          {/* Additional Help */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Need help? Contact our support team
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;