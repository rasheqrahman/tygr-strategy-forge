
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useAuth } from '@/contexts/AuthContext';
import { ServiceCard } from './ServiceCard';

interface Service {
  icon: React.ComponentType<any>;
  title: string;
  slug: string;
  description: string;
  published: boolean;
  order?: number;
}

interface ServicesListProps {
  services: Service[];
  onDragEnd: (result: DropResult) => void;
  onServiceClick: (slug: string, published: boolean) => void;
}

export const ServicesList = ({ services, onDragEnd, onServiceClick }: ServicesListProps) => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  if (services.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600 mb-4">No services yet.</p>
        {isAdmin && (
          <Button 
            onClick={() => navigate('/services/new')}
            className="bg-orange-600 hover:bg-orange-700 text-white"
          >
            Create Your First Service
          </Button>
        )}
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="services">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="grid gap-6"
          >
            {services.map((service, index) => (
              <ServiceCard
                key={service.slug}
                service={service}
                index={index}
                onServiceClick={onServiceClick}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
