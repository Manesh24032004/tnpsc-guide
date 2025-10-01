import { Navbar } from '@/components/Layout/Navbar';
import { Footer } from '@/components/Layout/Footer';
import { WelcomeCard } from '@/components/Dashboard/WelcomeCard';
import { SyllabusSection } from '@/components/Dashboard/SyllabusSection';
import { BooksSection } from '@/components/Dashboard/BooksSection';
import { ContentGrid } from '@/components/Dashboard/ContentGrid';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        <WelcomeCard />
        <SyllabusSection />
        <BooksSection />
        <ContentGrid />
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;