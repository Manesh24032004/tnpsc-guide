import { Navbar } from '@/components/Layout/Navbar';
import { Footer } from '@/components/Layout/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain } from 'lucide-react';

const Quiz = () => {
  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8 animate-fade-in">
          <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-soft">
            <Brain className="h-10 w-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-primary mb-4">TNPSC Quiz</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Test your knowledge with our comprehensive quiz collection
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="p-6 animate-slide-up hover:shadow-elegant transition-all duration-300">
            <h3 className="text-xl font-bold text-foreground mb-2">Tamil Quiz</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Test your Tamil language and literature knowledge
            </p>
            <Button className="w-full">Start Quiz</Button>
          </Card>

          <Card className="p-6 animate-slide-up hover:shadow-elegant transition-all duration-300" style={{ animationDelay: '0.1s' }}>
            <h3 className="text-xl font-bold text-foreground mb-2">History Quiz</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Ancient and modern history questions
            </p>
            <Button className="w-full">Start Quiz</Button>
          </Card>

          <Card className="p-6 animate-slide-up hover:shadow-elegant transition-all duration-300" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-xl font-bold text-foreground mb-2">General Knowledge</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Current affairs and general awareness
            </p>
            <Button className="w-full">Start Quiz</Button>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Quiz;
