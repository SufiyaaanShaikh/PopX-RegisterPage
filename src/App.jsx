// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './index.css';

// Pages
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AccountPage from './pages/AccountPage';

// Auth Provider
import { AuthProvider, useAuth } from './context/AuthContext';

// Protected Route Component
function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-600">Loading...</h2>
        </div>
      </div>
    );
  }
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

// Public Route Component (redirect to account if already logged in)
function PublicRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-600">Loading...</h2>
        </div>
      </div>
    );
  }
  
  return !isAuthenticated ? children : <Navigate to="/account" replace />;
}

function AppRoutes() {
  return (
    <div className="min-h-screen bg-white">
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          } 
        />
        <Route 
          path="/register" 
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          } 
        />
        <Route 
          path="/account" 
          element={
            <ProtectedRoute>
              <AccountPage />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;