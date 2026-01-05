
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import EditButton from "@/components/EditButton";
const About = () => {
  return <section id="about" className="py-32 bg-blue-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          {/* <div className="space-y-12">
            <div className="space-y-8">
              <div className="text-orange-600 text-sm font-light tracking-widest uppercase">OUR APPROACH</div>
              <h2 className="text-5xl lg:text-6xl font-light leading-tight text-slate-900">
                Strategic, handcrafted solutions,
                <span className="block font-normal">
                  <span className="text-orange-500">delivered by innovators</span>
                </span>
                <span className="block text-slate-700 mt-8 text-xl font-light leading-relaxed">We develop solutions by starting with a holistic analysis of business opportunities and current challenges.</span>
              </h2>
            </div>
          </div>

          <div className="space-y-20 pt-8">
            <div className="grid grid-cols-2 gap-x-8 gap-y-12">
              <div className="space-y-4">
                <h4 className="font-medium text-slate-900">Fully connected</h4>
                <p className="text-slate-600 leading-relaxed font-light">
                  Strategic insights and practical solutions that bridge the gap between vision and execution.
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="font-medium text-slate-900">Strategy</h4>
                <p className="text-slate-600 leading-relaxed font-light">
                  Comprehensive approach to transformation initiatives.
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="font-medium text-slate-900">Management</h4>
                <p className="text-slate-600 leading-relaxed font-light">
                  Expert guidance in organizational development and operational excellence.
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="font-medium text-slate-900">Financial</h4>
                <p className="text-slate-600 leading-relaxed font-light">
                  Data-driven insights for sustainable growth and performance optimization.
                </p>
              </div>
            </div>
          </div> */}
        </div>

        {/* Stats Section - 3 Columns */}
        <div className="mt-40">
          <div className="text-orange-600 text-sm font-light tracking-widest uppercase mb-8">Notable Outcomes</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24">
            <div className="text-center md:text-left pt-8">
              <div className="h-32 flex items-center justify-center md:justify-start mb-8">
                <div className="text-8xl lg:text-9xl font-light text-slate-900">200%</div>
              </div>
              <p className="text-slate-600 leading-relaxed font-light">Outreach ROI of product and marketing campaigns led by TYGR Ventures principals</p>
            </div>
            
            <div className="text-center md:text-left pt-8 relative">
              
              <div className="h-32 flex items-center justify-center md:justify-start mb-8">
                <div className="text-8xl lg:text-9xl font-light text-slate-900">$2M</div>
              </div>
              <p className="text-slate-600 leading-relaxed font-light">Innovation funding raised from the Department of Energy and State of Virginia</p>
            </div>
            
            <div className="text-center md:text-left pt-8">
              <div className="h-32 flex items-center justify-center md:justify-start mb-8">
                <div className="text-8xl lg:text-9xl font-light text-slate-900">15+</div>
              </div>
              <p className="text-slate-600 leading-relaxed font-light">Years of combined experience delivering strategic solutions across multiple industries</p>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default About;
