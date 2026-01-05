import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
const Contact = () => {
  return <section id="contact" className="py-32 bg-sky-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className="mb-24">
          <div className="text-orange-600 text-sm font-light tracking-widest uppercase mb-8">
            Get In Touch
          </div>
          <h2 className="text-5xl lg:text-6xl font-light leading-tight text-slate-900 max-w-4xl">Thinking about growth? Let's talk!</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-20">
          <div className="space-y-12">
            <Card className="border-0 shadow-xl bg-white rounded-3xl">
              <CardHeader className="pb-8 p-10">
                <CardTitle className="text-3xl font-light text-slate-900">Send us a message</CardTitle>
                <CardDescription className="text-slate-600 text-lg font-light">
                  We'd love to hear about your challenges and discuss how we can help.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 px-10 pb-10">
                <div className="grid sm:grid-cols-2 gap-6">
                  <Input placeholder="First Name" className="border-slate-200 rounded-2xl h-14 px-6 font-light" />
                  <Input placeholder="Last Name" className="border-slate-200 rounded-2xl h-14 px-6 font-light" />
                </div>
                <Input placeholder="Email Address" type="email" className="border-slate-200 rounded-2xl h-14 px-6 font-light" />
                <Input placeholder="Company" className="border-slate-200 rounded-2xl h-14 px-6 font-light" />
                <Textarea placeholder="Tell us about your project or challenge..." className="border-slate-200 rounded-2xl min-h-32 p-6 font-light" />
                <Button size="lg" className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-2xl font-light">
                  Send Message
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-12 pt-8">
            <div className="space-y-8">
              <h3 className="text-3xl font-light text-slate-900">Connect with us</h3>
              <p className="text-slate-600 leading-relaxed text-lg font-light">Based in the DC Metro Area, serving clients globally. </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-6 p-8 bg-white rounded-3xl border-0 shadow-sm">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center">
                  <Mail className="h-8 w-8 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-900 text-lg">Email</h4>
                  <p className="text-slate-600 font-light">rasheq@tygrventures.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-6 p-8 bg-white rounded-3xl border-0 shadow-sm">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center">
                  <Phone className="h-8 w-8 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-900 text-lg">Phone</h4>
                  <p className="text-slate-600 font-light">+1 (646) 275-7645</p>
                </div>
              </div>

              <div className="flex items-center space-x-6 p-8 bg-white rounded-3xl border-0 shadow-sm">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-900 text-lg">Location</h4>
                  <p className="text-slate-600 font-light">McLean, Virginia, USA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Contact;