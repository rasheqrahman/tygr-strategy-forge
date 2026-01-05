
import { useNavigate } from "react-router-dom";
import { useAuth } from '@/contexts/AuthContext';
import MainNavigation from "@/components/MainNavigation";
import Footer from "@/components/Footer";
import BlogCallToAction from "@/components/blog/BlogCallToAction";
import { ServicesHeader } from "@/components/services/ServicesHeader";
import { ServicesList } from "@/components/services/ServicesList";
import { useServicesData } from "@/hooks/useServicesData";
import { useServicesDragDrop } from "@/hooks/useServicesDragDrop";

const Services = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const { services, setServices, loading } = useServicesData();
  const { hasUnsavedChanges, handleDragEnd, handleSaveOrder } = useServicesDragDrop(services, setServices);

  const handleServiceClick = (slug: string, published: boolean) => {
    // Only allow navigation if published or user is admin
    if (published || isAdmin) {
      navigate(`/services/${slug}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <MainNavigation />
        <div className="max-w-4xl mx-auto py-12 px-6 flex-1">
          <div className="text-center">
            <p className="text-slate-600">Loading services...</p>
          </div>
        </div>
        <div className="bg-slate-900 mt-auto">
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <MainNavigation />

      <div className="max-w-4xl mx-auto py-12 px-6 flex-1">
        <ServicesHeader
          hasUnsavedChanges={hasUnsavedChanges}
          onSaveOrder={handleSaveOrder}
        />

        <ServicesList
          services={services}
          onDragEnd={handleDragEnd}
          onServiceClick={handleServiceClick}
        />
      </div>

      <div className="bg-slate-900 mt-auto">
        <BlogCallToAction />
        <Footer />
      </div>
    </div>
  );
};

export default Services;
