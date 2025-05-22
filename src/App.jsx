import React, { lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './index.css';

const WelcomePage = lazy(() => import('./pages/WelcomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const AccountPage = lazy(() => import('./pages/AccountPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

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

// Public Route Component
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
              <LoginPage loading="lazy"/>
            </PublicRoute>
          } 
        />
        <Route 
          path="/register" 
          element={
            <PublicRoute>
              <RegisterPage loading="lazy"/>
            </PublicRoute>
          } 
        />
        <Route 
          path="/account" 
          element={
            <ProtectedRoute>
              <AccountPage loading="lazy"/>
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<NotFoundPage loading="lazy"/>} />
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