
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { LocalAuthProvider } from "@/contexts/LocalAuthContext";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import BlogNew from "./pages/BlogNew";
import BlogEdit from "./pages/BlogEdit";
import Services from "./pages/Services";
import ServicePage from "./pages/ServicePage";
import ServiceNew from "./pages/ServiceNew";
import ServiceEdit from "./pages/ServiceEdit";
import Industries from "./pages/Industries";
import IndustryPage from "./pages/IndustryPage";
import IndustryNew from "./pages/IndustryNew";
import IndustryEdit from "./pages/IndustryEdit";
import MediaPage from "./pages/MediaPage";
import MediaNew from "./pages/MediaNew";
import MediaEdit from "./pages/MediaEdit";
import ContactPage from "./pages/ContactPage";
import BookingPage from "./pages/BookingPage";
import AdminLogin from "./pages/AdminLogin";
import NotFound from "./pages/NotFound";
import BusinessCardPage from "./pages/BusinessCardPage";
import LinkedInHeaderPage from "./pages/LinkedInHeaderPage";
import PlatformLogosPage from "./pages/PlatformLogosPage";
import SquareLogoPage from "./pages/SquareLogoPage";
import ResetPassword from "./pages/ResetPassword";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LocalAuthProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/new" element={<BlogNew />} />
              <Route path="/blog/edit/:slug" element={<BlogEdit />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/new" element={<ServiceNew />} />
              <Route path="/services/edit/:slug" element={<ServiceEdit />} />
              <Route path="/services/:slug" element={<ServicePage />} />
              <Route path="/industries" element={<Industries />} />
              <Route path="/industries/new" element={<IndustryNew />} />
              <Route path="/industries/edit/:slug" element={<IndustryEdit />} />
              <Route path="/industries/:slug" element={<IndustryPage />} />
              <Route path="/media/new" element={<MediaNew />} />
              <Route path="/media/edit/:slug" element={<MediaEdit />} />
              <Route path="/media/:slug" element={<MediaPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/book" element={<BookingPage />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/business-card" element={<BusinessCardPage />} />
              <Route path="/linkedin-header" element={<LinkedInHeaderPage />} />
              <Route path="/platform-logos" element={<PlatformLogosPage />} />
              <Route path="/square-logo" element={<SquareLogoPage />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </LocalAuthProvider>
  </QueryClientProvider>
);

export default App;
