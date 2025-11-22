import React, { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Statistics from "@/components/Statistics";
import Placements from "@/components/Placements";
import Recruiters from "@/components/Recruiters";
import ForStudents from "@/components/ForStudents";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AuthGate from "@/components/AuthGate";
import LoadingScreen from "@/components/LoadingScreen";
import StudentDashboard from "@/components/StudentDashboard";
import RecruiterDashboard from "@/components/RecruiterDashboard";
import AdminDashboard from "@/components/AdminDashboard";
import Navigation from "@/components/Navigation";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user was previously authenticated
    const authStatus = sessionStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  const handleAuthentication = (role: string) => {
    setIsAuthenticated(true);
    sessionStorage.setItem('isAuthenticated', 'true');
    sessionStorage.setItem('userRole', role);
  };

  if (isLoading) {
    return (
      <div className="animate-fade-in">
        <LoadingScreen onLoadComplete={handleLoadComplete} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="animate-fade-in">
        <AuthGate onAuthenticated={handleAuthentication} />
      </div>
    );
  }

  const userRole = sessionStorage.getItem('userRole');

  // Render role-based dashboard
  if (userRole === 'student') {
    return (
      <div className="min-h-screen animate-fade-in">
        <Navigation />
        <StudentDashboard />
        <Footer />
      </div>
    );
  }

  if (userRole === 'recruiter') {
    return (
      <div className="min-h-screen animate-fade-in">
        <Navigation />
        <RecruiterDashboard />
        <Footer />
      </div>
    );
  }

  if (userRole === 'admin') {
    return (
      <div className="min-h-screen animate-fade-in">
        <Navigation />
        <AdminDashboard />
        <Footer />
      </div>
    );
  }

  // Default view (if no role or invalid role)
  return (
    <div className="min-h-screen animate-fade-in">
      <Hero />
      <Statistics />
      <About />
      <Placements />
      <Recruiters />
      <ForStudents />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
