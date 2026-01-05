
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BookingSlots from "@/components/BookingSlots";
import MainNavigation from "@/components/MainNavigation";
import Footer from "@/components/Footer";

const BookingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <MainNavigation />

      <section className="pt-24 pb-8 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="text-orange-500 text-sm font-light tracking-widest uppercase mb-4">
            Schedule a Meeting
          </div>
          <h1 className="text-4xl lg:text-5xl font-light leading-tight text-slate-900 mb-6">
            About TYGR Ventures
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed font-light max-w-3xl mx-auto">
            TYGR Ventures helps small and medium businesses grow through smart technology solutions and strategic planning. Led by Rasheq Rahman, who has over 20 years of experience helping companies improve their operations and reach their goals, we take a hands-on approach to understanding your unique challenges and opportunities. Whether you need to streamline your processes, implement new technology, or develop a growth strategy, we work closely with you to create practical solutions that deliver real results. Our clients have seen significant improvements in efficiency, cost savings, and revenue growth through our tailored approach to business transformation.
          </p>
        </div>
      </section>

      <div className="flex-1">
        <BookingSlots />
      </div>
      <div className="bg-slate-900 mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default BookingPage;
