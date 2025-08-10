import { GraduationCap, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const WelcomeCard = () => {
  return (
    <Card className="bg-gradient-primary text-primary-foreground p-8 text-center border-4 border-secondary rounded-2xl shadow-elegant animate-fade-in">
      <div className="flex items-center justify-center gap-3 mb-4">
        <GraduationCap className="h-12 w-12" />
        <h1 className="text-4xl font-bold">
          TNPSC wizard
        </h1>
      </div>
      
      <p className="text-xl text-primary-foreground/90 mb-6">
        Your magical guide to TNPSC success
      </p>
      
      <Button 
        variant="secondary" 
        size="lg"
        className="font-bold text-lg px-8 py-4 shadow-elegant hover:shadow-glow transition-all duration-300 hover:scale-105"
      >
        <Play className="h-5 w-5 mr-2" />
        Start Now
      </Button>
    </Card>
  );
};