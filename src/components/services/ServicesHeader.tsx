
import { Button } from "@/components/ui/button";
import { Plus, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '@/contexts/AuthContext';

interface ServicesHeaderProps {
  hasUnsavedChanges: boolean;
  onSaveOrder: () => void;
}

export const ServicesHeader = ({ hasUnsavedChanges, onSaveOrder }: ServicesHeaderProps) => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-5xl font-semibold text-slate-900 mb-4">Services</h1>
        <p className="text-slate-600">
          Comprehensive solutions to drive your business forward.
          {isAdmin && " Drag and drop to reorder."}
        </p>
      </div>
      {isAdmin && (
        <div className="flex gap-3">
          {hasUnsavedChanges && (
            <Button 
              onClick={onSaveOrder}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Order
            </Button>
          )}
          <Button 
            onClick={() => navigate('/services/new')}
            className="bg-orange-600 hover:bg-orange-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Service
          </Button>
        </div>
      )}
    </div>
  );
};
