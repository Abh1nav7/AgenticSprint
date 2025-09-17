import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export const LogoutModal: React.FC<LogoutModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-50 w-full max-w-lg rounded-xl border border-white/10 bg-black p-6 shadow-lg">
        <div className="flex items-center justify-center gap-3">
          <div className="rounded-full bg-red-500/10 p-3">
            <LogOut className="h-6 w-6 text-red-500" />
          </div>
        </div>
        <h3 className="mt-4 text-center text-xl font-semibold text-white">
          Confirm Logout
        </h3>
        <p className="mt-2 text-center text-sm text-white/70">
          Are you sure you want to log out? You will need to log in again to access your dashboard.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-red-500 text-white hover:bg-red-600"
          >
            {isLoading ? 'Logging out...' : 'Log Out'}
          </Button>
        </div>
      </div>
    </div>
  );
};