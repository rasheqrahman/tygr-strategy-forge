
import React from 'react';
import { Shield } from 'lucide-react';

const AdminAccessInfo = () => {
  return (
    <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-md">
      <div className="flex items-start gap-2">
        <Shield className="h-4 w-4 text-blue-600 mt-0.5" />
        <div className="text-sm text-blue-800">
          <p className="font-medium">Admin Access</p>
          <p>Only authorized administrators can access this area.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminAccessInfo;
