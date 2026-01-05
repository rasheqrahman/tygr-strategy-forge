import { Card } from "@/components/ui/card";
const Clients = () => {
  const clients = [{
    name: "Goldman Sachs",
    logo: "/lovable-uploads/e417e248-5b2f-4c2d-828b-4464bad4e2b7.png"
  }, {
    name: "Yale University",
    logo: "/lovable-uploads/63fac0ed-5752-478a-a402-4461a78294c1.png"
  }, {
    name: "IBM",
    logo: "/lovable-uploads/0a080d1e-b5fe-42ae-a260-9f019ae7517c.png"
  }, {
    name: "Defense Innovation Unit",
    logo: "/lovable-uploads/75885457-9812-4baf-a880-d24a2842a34b.png"
  }, {
    name: "Leidos",
    logo: "/lovable-uploads/4e27bce1-f4a1-4bba-a069-aff10560cb1e.png"
  }];
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    const parent = img.parentElement;
    if (parent) {
      // Hide the broken image and show the company name instead
      img.style.display = 'none';
      const textElement = parent.querySelector('.client-name');
      if (textElement) {
        (textElement as HTMLElement).style.display = 'block';
      }
    }
  };
  return <section className="py-12 bg-slate-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className="text-center mb-8">
          <div className="text-gray-900 tracking-widest mb-4 bg-transparent uppercase">
            Organizations We've Empowered
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {clients.map((client, index) => <div key={index} className="p-8 flex items-center justify-center min-h-[120px]">
              <img src={client.logo} alt={client.name} className="h-12 w-auto object-contain filter grayscale opacity-60 hover:filter-none hover:opacity-100 transition-all duration-300" onError={handleImageError} />
              <span className="client-name text-sm font-medium text-slate-600 text-center hidden">
                {client.name}
              </span>
            </div>)}
        </div>
      </div>
    </section>;
};
export default Clients;