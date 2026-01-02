import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Layout/Navbar';
import { Footer } from '@/components/Layout/Footer';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';
import { LogIn, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import Autoplay from 'embla-carousel-autoplay';

// Import images
import tnpscBuilding from '@/assets/tnpsc-building.jpg';
import study1 from '@/assets/carousel/study-1.jpg';
import success1 from '@/assets/carousel/success-1.jpg';
import office1 from '@/assets/carousel/office-1.jpg';
import books1 from '@/assets/carousel/books-1.jpg';
import exam1 from '@/assets/carousel/exam-1.jpg';
import chennai1 from '@/assets/carousel/chennai-1.jpg';
import library1 from '@/assets/carousel/library-1.jpg';
import digital1 from '@/assets/carousel/digital-1.jpg';
import awards1 from '@/assets/carousel/awards-1.jpg';
import career1 from '@/assets/carousel/career-1.jpg';

const carouselImages = [
  { src: study1, alt: 'Students studying for TNPSC exams' },
  { src: success1, alt: 'Success celebration' },
  { src: office1, alt: 'Government office' },
  { src: books1, alt: 'Study materials' },
  { src: exam1, alt: 'Exam hall' },
  { src: chennai1, alt: 'Chennai Marina Beach' },
  { src: library1, alt: 'Library' },
  { src: digital1, alt: 'Digital learning' },
  { src: awards1, alt: 'Awards and achievements' },
  { src: career1, alt: 'Career success' },
];

const marqueeTexts = [
  'TNPSC Wizard: A Magical Guide to TNPSC Success!',
  'TNPSC | UPSC | RRB',
  'உங்கள் வெற்றிக்கான வழிகாட்டி!',
  'Group 1 | Group 2 | Group 4',
  'Free Study Materials | Previous Year Papers',
];

export const Landing = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Text Marquee Slider */}
        <div className="bg-gradient-primary overflow-hidden py-3">
          <div className="animate-marquee whitespace-nowrap flex items-center">
            {[...marqueeTexts, ...marqueeTexts].map((text, index) => (
              <span 
                key={index} 
                className="mx-8 text-primary-foreground font-bold text-lg md:text-xl"
              >
                {text} <span className="mx-4">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* Main Content Section */}
        <section className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - TNPSC Building Image */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-primary rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative">
                <img 
                  src={tnpscBuilding} 
                  alt="TNPSC Building Chennai" 
                  className="w-full h-[400px] md:h-[500px] object-cover rounded-2xl shadow-elegant"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/80 to-transparent p-6 rounded-b-2xl">
                  <h2 className="text-primary-foreground text-2xl md:text-3xl font-bold">
                    Tamil Nadu Public Service Commission
                  </h2>
                  <p className="text-primary-foreground/90 mt-2">
                    TNPSC Office, Chennai
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Image Carousel */}
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  Welcome to <span className="text-primary">TNPSC Wizard</span>
                </h1>
                <p className="text-muted-foreground text-lg">
                  Your complete guide to government job success
                </p>
              </div>

              <Carousel 
                className="w-full max-w-lg mx-auto"
                plugins={[
                  Autoplay({
                    delay: 3000,
                  }),
                ]}
                opts={{
                  loop: true,
                }}
              >
                <CarouselContent>
                  {carouselImages.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="relative overflow-hidden rounded-xl shadow-soft">
                        <img 
                          src={image.src} 
                          alt={image.alt}
                          className="w-full h-[280px] md:h-[350px] object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent"></div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>

              {/* Login/Register Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Button 
                  asChild
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-elegant"
                >
                  <Link to="/auth" className="flex items-center gap-2">
                    <LogIn className="h-5 w-5" />
                    Login to Continue
                  </Link>
                </Button>
                <Button 
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold"
                >
                  <Link to="/auth?register=true" className="flex items-center gap-2">
                    <UserPlus className="h-5 w-5" />
                    Register Now
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Preview Section */}
        <section className="bg-card py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-8">
              What You Get with TNPSC Wizard
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-background p-6 rounded-xl shadow-soft text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">📚</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Complete Syllabus</h3>
                <p className="text-muted-foreground">G1, G2, G4 syllabus with detailed study materials</p>
              </div>
              <div className="bg-background p-6 rounded-xl shadow-soft text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">📝</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Previous Year Papers</h3>
                <p className="text-muted-foreground">Access past year question papers with solutions</p>
              </div>
              <div className="bg-background p-6 rounded-xl shadow-soft text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🎯</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Quiz & Practice</h3>
                <p className="text-muted-foreground">Test your knowledge with interactive quizzes</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
