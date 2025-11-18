import { LoadingSpinner } from './LoadingSpinner';

interface LoadingOverlayProps {
  message?: string;
}

export const LoadingOverlay = ({ message = 'Loading...' }: LoadingOverlayProps) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-black/80 rounded-2xl p-8 border border-luxe-purple/30 flex flex-col items-center gap-4">
        <LoadingSpinner size="lg" />
        <p className="text-white font-medium">{message}</p>
      </div>
    </div>
  );
};

