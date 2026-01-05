
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { GripVertical } from "lucide-react";
import { Draggable } from 'react-beautiful-dnd';
import { useAuth } from '@/contexts/AuthContext';

interface Service {
  icon: React.ComponentType<any>;
  title: string;
  slug: string;
  description: string;
  published: boolean;
  order?: number;
}

interface ServiceCardProps {
  service: Service;
  index: number;
  onServiceClick: (slug: string, published: boolean) => void;
}

export const ServiceCard = ({ service, index, onServiceClick }: ServiceCardProps) => {
  const { isAdmin } = useAuth();

  return (
    <Draggable 
      key={service.slug} 
      draggableId={service.slug} 
      index={index}
      isDragDisabled={!isAdmin}
    >
      {(provided, snapshot) => (
        <Card 
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`hover:shadow-lg transition-shadow ${(service.published || isAdmin) ? 'cursor-pointer' : 'cursor-default'} ${!service.published ? 'opacity-60 border-2 border-dashed border-orange-200 bg-orange-50/30' : ''} ${snapshot.isDragging ? 'shadow-2xl' : ''}`}
          onClick={() => !snapshot.isDragging && onServiceClick(service.slug, service.published)}
        >
          <CardHeader className="pb-4">
            <div className="flex items-start gap-6">
              {isAdmin && (
                <div 
                  {...provided.dragHandleProps}
                  className="flex items-center justify-center w-8 h-8 text-slate-400 hover:text-slate-600 cursor-grab active:cursor-grabbing"
                  onClick={(e) => e.stopPropagation()}
                >
                  <GripVertical className="h-5 w-5" />
                </div>
              )}
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                <service.icon className={`h-8 w-8 text-orange-600 ${!service.published ? 'opacity-60' : ''}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <CardTitle className={`text-2xl font-medium mb-3 ${!service.published ? 'text-slate-500' : 'text-slate-900'}`}>
                    {service.title}
                  </CardTitle>
                  {!service.published && isAdmin && (
                    <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full font-medium ml-2">
                      Draft
                    </span>
                  )}
                </div>
                <CardDescription className={`font-light text-base leading-relaxed ${!service.published ? 'text-slate-400' : 'text-slate-600'}`}>
                  {service.description}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
      )}
    </Draggable>
  );
};
