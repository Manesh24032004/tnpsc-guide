import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show on home/dashboard pages
  const hideOnPaths = ['/', '/home', '/auth', '/admin-login'];
  if (hideOnPaths.includes(location.pathname)) {
    return null;
  }

  return (
    <Button
      onClick={() => navigate(-1)}
      variant="outline"
      size="sm"
      className="fixed top-20 md:top-24 left-2 md:left-4 z-40 bg-card/95 backdrop-blur-sm shadow-soft hover:shadow-elegant transition-all duration-300 flex items-center gap-1 md:gap-2 text-xs md:text-sm"
    >
      <ArrowLeft className="h-3 w-3 md:h-4 md:w-4" />
      <span className="hidden sm:inline">Back</span>
    </Button>
  );
};
