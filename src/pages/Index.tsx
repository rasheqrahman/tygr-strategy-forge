
import { useEffect } from "react";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Clients from "@/components/Clients";
import About from "@/components/About";
import AboutMe from "@/components/AboutMe";
import Industries from "@/components/Industries";
import BlogSection from "@/components/BlogSection";
import Contact from "@/components/Contact";
import BookingSlots from "@/components/BookingSlots";
import Footer from "@/components/Footer";
import { handleBookingHash } from "@/utils/navigationUtils";

const Index = () => {
  useEffect(() => {
    // Handle booking hash navigation on page load
    handleBookingHash();
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Hero />
      <Clients />
      <Services />
      <About />
      <AboutMe />
      <Industries />
      <BlogSection />
      <BookingSlots />
      <div className="bg-slate-900 mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Index;
