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

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user was previously authenticated
    const authStatus = sessionStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleAuthentication = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('isAuthenticated', 'true');
  };

  if (!isAuthenticated) {
    return <AuthGate onAuthenticated={handleAuthentication} />;
  }

  return (
    <div className="min-h-screen">
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
