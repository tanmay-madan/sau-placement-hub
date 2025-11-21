import Hero from "@/components/Hero";
import About from "@/components/About";
import Statistics from "@/components/Statistics";
import Placements from "@/components/Placements";
import Recruiters from "@/components/Recruiters";
import ForStudents from "@/components/ForStudents";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
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
