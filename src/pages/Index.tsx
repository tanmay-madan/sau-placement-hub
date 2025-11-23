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
    return <LoadingScreen onLoadComplete={handleLoadComplete} />;
  }

  if (!isAuthenticated) {
    return <AuthGate onAuthenticated={handleAuthentication} />;
  }

  const userRole = sessionStorage.getItem('userRole') || 'student';

  return (
    <div className="min-h-screen">
      <Hero />
      <Statistics role={userRole} />
      <About />
      <Placements role={userRole} />
      <Recruiters role={userRole} />
      <ForStudents role={userRole} />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
