import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Footer } from '@/components/Layout/Footer';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';
import { LogIn, UserPlus, Bot, BookOpen, FileText, GraduationCap, Brain, BookMarked, Users, Sparkles, MapPin, Award, FileCheck } from 'lucide-react';
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

const features = [
  { title: 'Syllabus', icon: BookOpen, description: 'Complete G1, G2, G4 Syllabus' },
  { title: 'Previous Year Questions', icon: FileText, description: 'Past papers 2015-2025' },
  { title: 'School Books', icon: GraduationCap, description: '6th to 12th Standard' },
  { title: 'Quiz', icon: Brain, description: 'Tamil & GS Quizzes' },
  { title: 'திருக்குறள்', icon: BookMarked, description: '20 அதிகாரங்கள்' },
  { title: 'Tamil Scholars', icon: Users, description: '20+ அறிஞர்கள்' },
  { title: 'Study Notes', icon: FileText, description: 'Complete Notes' },
];

const examGroups = [
  { code: 'G1', name: 'Group 1 Services', posts: ['Deputy Collector', 'DSP', 'Assistant Commissioner'] },
  { code: 'G2', name: 'Group 2 Services', posts: ['ASO', 'Sub-Registrar', 'Special Deputy Collector'] },
  { code: 'G2A', name: 'Group 2A Services', posts: ['Junior Inspector', 'Revenue Assistant', 'Accountant'] },
  { code: 'G3', name: 'Group 3 Services', posts: ['Junior Superintendent', 'Sergeant', 'Assistant Jailer'] },
  { code: 'G4', name: 'Group 4 Services', posts: ['Junior Assistant', 'Typist', 'VAO'] },
  { code: 'G7', name: 'Group 7 Services', posts: ['Executive Officer', 'Bill Collector'] },
  { code: 'G8', name: 'Group 8 Services', posts: ['Office Assistant', 'Watchman'] },
  { code: 'CESE', name: 'Engineering Services', posts: ['AE Civil', 'AE Electrical', 'AE Mechanical'] },
  { code: 'TNFS', name: 'Forest Service', posts: ['Forest Range Officer', 'Wildlife Warden'] },
  { code: 'AO', name: 'Agricultural Officer', posts: ['Agricultural Officer', 'Horticultural Officer'] },
  { code: 'VAS', name: 'Veterinary Surgeon', posts: ['Veterinary Assistant Surgeon'] },
  { code: 'DI', name: 'Drug Inspector', posts: ['Drug Inspector', 'Assistant Drug Controller'] },
];

const eligibilityCriteria = [
  { group: 'Group 1', age: '21-32 years', education: "Bachelor's Degree", relaxation: 'SC/ST/BC: 5 years' },
  { group: 'Group 2', age: '18-30 years', education: "Bachelor's Degree", relaxation: 'SC/ST/BC: 5 years' },
  { group: 'Group 2A', age: '18-30 years', education: "Bachelor's Degree", relaxation: 'SC/ST/BC: 5 years' },
  { group: 'Group 4', age: '18-30 years', education: 'SSLC / 10th Pass', relaxation: 'SC/ST/BC: 5 years' },
  { group: 'CESE', age: '21-30 years', education: 'B.E/B.Tech', relaxation: 'SC/ST/BC: 5 years' },
  { group: 'Forest Service', age: '21-30 years', education: 'Degree in Forestry/Agriculture', relaxation: 'SC/ST/BC: 5 years' },
];

const selectionProcess = [
  { group: 'Group 1', stages: ['Prelims', 'Mains', 'Interview', 'Counselling'], note: 'Interview mandatory' },
  { group: 'Group 2', stages: ['Prelims', 'Mains', 'Counselling'], note: 'No interview' },
  { group: 'Group 2A', stages: ['Written Exam', 'Counselling'], note: 'Single exam only' },
  { group: 'Group 4', stages: ['Written Exam', 'Counselling'], note: 'No interview' },
  { group: 'CESE', stages: ['Written Exam', 'Interview', 'Counselling'], note: 'Technical exam' },
  { group: 'VAO', stages: ['Written Exam', 'Counselling'], note: 'No interview' },
];

export const Landing = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Simple Header - Increased height by 20% */}
      <header className="bg-gradient-primary text-primary-foreground py-5 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GraduationCap className="h-8 w-8" />
            <h1 className="text-xl md:text-2xl font-bold whitespace-nowrap">TNPSC Wizard</h1>
          </div>
          <div className="flex gap-3">
            <Button 
              asChild
              variant="secondary"
              size="sm"
              className="font-semibold"
            >
              <Link to="/auth" className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                <span className="hidden sm:inline">Login</span>
              </Link>
            </Button>
            <Button 
              asChild
              size="sm"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold"
            >
              <Link to="/auth?register=true" className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                <span className="hidden sm:inline">Register</span>
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Gap between header and marquee - reduced 20% padding */}
      <div className="h-[16vh] bg-background"></div>
      
      {/* Text Marquee Slider - Reduced height */}
      <div className="bg-gradient-primary overflow-hidden py-1.5">
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

      <main className="flex-1">
        {/* Main Content Section - TNPSC Building + Carousel */}
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

        {/* What You Can Get Section */}
        <section className="bg-card py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-8">
              What You Can Get with TNPSC Wizard
            </h2>
            
            {/* Wizard AI - Highlighted */}
            <div className="mb-8">
              <Card className="p-6 bg-gradient-primary text-primary-foreground border-4 border-secondary shadow-glow max-w-2xl mx-auto">
                <div className="flex items-center justify-center gap-4">
                  <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center animate-pulse">
                    <Bot className="h-12 w-12 text-secondary-foreground" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-6 w-6" />
                      <h3 className="text-2xl font-bold">TNPSC Wizard AI</h3>
                      <Sparkles className="h-6 w-6" />
                    </div>
                    <p className="text-primary-foreground/90 mt-1">
                      Your 24/7 AI Study Assistant for TNPSC Preparation
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Other Features Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div 
                    key={index}
                    className="bg-background p-4 rounded-xl shadow-soft text-center hover:shadow-elegant transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground text-sm mb-1">{feature.title}</h3>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* About TNPSC Section */}
        <section className="py-12">
          <div className="container mx-auto px-4 space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-primary mb-2">About TNPSC</h2>
              <p className="text-muted-foreground">Tamil Nadu Public Service Commission</p>
            </div>

            {/* TNPSC History */}
            <Card className="p-6">
              <h3 className="text-2xl font-bold text-primary mb-4">TNPSC History</h3>
              <p className="text-muted-foreground mb-4">
                The Tamil Nadu Public Service Commission (TNPSC) is a constitutional body established under Article 315 of the 
                Constitution of India. It was established in 1929 and is responsible for conducting examinations 
                and recruiting candidates for various civil service positions in the state of Tamil Nadu.
              </p>
              <p className="text-muted-foreground">
                TNPSC plays a crucial role in selecting qualified candidates for government jobs, ensuring merit-based 
                selection and providing equal opportunities to all citizens of Tamil Nadu. The Commission has been 
                instrumental in building a robust civil services structure in the state.
              </p>
            </Card>

            {/* Location & Map */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="h-6 w-6 text-primary" />
                <h3 className="text-2xl font-bold text-primary">TNPSC Office Location</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Head Office Address</h4>
                    <p className="text-muted-foreground">
                      Tamil Nadu Public Service Commission<br />
                      TNPSC Road, Broadway<br />
                      Chennai - 600 003<br />
                      Tamil Nadu, India
                    </p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Contact</h4>
                    <p className="text-muted-foreground">
                      Phone: 044-2536 0524<br />
                      Website: www.tnpsc.gov.in<br />
                      Email: tnpsc@tn.gov.in
                    </p>
                  </div>
                </div>
                <div className="rounded-lg overflow-hidden shadow-soft border-2 border-accent/30">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.546476456456!2d80.27863731482196!3d13.093398390779093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265ea4f7d3362%3A0x6e61a24eb6a2757!2sTamil%20Nadu%20Public%20Service%20Commission!5e0!3m2!1sen!2sin!4v1650000000000!5m2!1sen!2sin"
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="TNPSC Office Location"
                  ></iframe>
                </div>
              </div>
            </Card>

            {/* Exam Types / Groups - Hover to show details */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <GraduationCap className="h-6 w-6 text-primary" />
                <h3 className="text-2xl font-bold text-primary">Types of Exams</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                {examGroups.map((group, index) => (
                  <div
                    key={index}
                    className="p-4 bg-muted rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-pointer group relative"
                  >
                    <span className="px-2 py-1 bg-primary text-primary-foreground group-hover:bg-primary-foreground group-hover:text-primary text-sm font-bold rounded block text-center">
                      {group.code}
                    </span>
                    <p className="text-xs mt-2 text-center font-medium">{group.name}</p>
                    
                    {/* Hover Popup */}
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 bg-card border border-border rounded-lg shadow-elegant z-50 p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="flex items-center gap-2 mb-3 border-b pb-2">
                        <span className="px-2 py-1 bg-primary text-primary-foreground font-bold text-xs rounded">
                          {group.code}
                        </span>
                        <span className="text-sm font-semibold text-foreground">{group.name}</span>
                      </div>
                      <h4 className="font-semibold text-foreground text-xs mb-2">Types of Posts:</h4>
                      <ul className="space-y-1">
                        {group.posts.map((post, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="w-4 h-4 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-[10px] font-bold">
                              {idx + 1}
                            </span>
                            {post}
                          </li>
                        ))}
                      </ul>
                      <div className="absolute left-1/2 -translate-x-1/2 top-full w-3 h-3 bg-card border-r border-b border-border rotate-45 -mt-1.5"></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Eligibility Criteria - Hover to show details */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-6 w-6 text-primary" />
                <h3 className="text-2xl font-bold text-primary">Eligibility Criteria</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {eligibilityCriteria.map((criteria, index) => (
                  <div
                    key={index}
                    className="p-4 bg-muted rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-pointer group relative"
                  >
                    <span className="font-bold text-lg">{criteria.group}</span>
                    
                    {/* Hover Popup */}
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-56 bg-card border border-border rounded-lg shadow-elegant z-50 p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <h4 className="font-semibold text-foreground text-sm mb-3 border-b pb-2">{criteria.group} - Eligibility</h4>
                      <div className="space-y-2 text-xs">
                        <div className="p-2 bg-muted rounded">
                          <span className="font-semibold text-primary">Age:</span>
                          <p className="text-foreground">{criteria.age}</p>
                        </div>
                        <div className="p-2 bg-muted rounded">
                          <span className="font-semibold text-primary">Education:</span>
                          <p className="text-foreground">{criteria.education}</p>
                        </div>
                        <div className="p-2 bg-muted rounded">
                          <span className="font-semibold text-primary">Relaxation:</span>
                          <p className="text-foreground">{criteria.relaxation}</p>
                        </div>
                      </div>
                      <div className="absolute left-1/2 -translate-x-1/2 top-full w-3 h-3 bg-card border-r border-b border-border rotate-45 -mt-1.5"></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-primary/10 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Common Requirements:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Must be an Indian citizen</li>
                  <li>• Must be a native of Tamil Nadu / have studied in Tamil Nadu</li>
                  <li>• Must know Tamil language (Read and Write)</li>
                </ul>
              </div>
            </Card>

            {/* Selection Process - Hover to show details */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <FileCheck className="h-6 w-6 text-primary" />
                <h3 className="text-2xl font-bold text-primary">Selection Process</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {selectionProcess.map((process, index) => (
                  <div
                    key={index}
                    className="p-4 bg-muted rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-pointer group relative"
                  >
                    <Award className="h-5 w-5 mx-auto mb-2" />
                    <span className="font-bold block text-center">{process.group}</span>
                    
                    {/* Hover Popup */}
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-56 bg-card border border-border rounded-lg shadow-elegant z-50 p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="flex items-center gap-2 mb-3 border-b pb-2">
                        <Award className="h-4 w-4 text-primary" />
                        <span className="text-sm font-semibold text-foreground">{process.group} - Selection</span>
                      </div>
                      <h4 className="font-semibold text-foreground text-xs mb-2">Stages:</h4>
                      <div className="space-y-1">
                        {process.stages.map((stage, idx) => (
                          <div key={idx} className="flex items-center gap-2 p-1.5 bg-muted rounded text-xs">
                            <span className="w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-[10px] font-bold">
                              {idx + 1}
                            </span>
                            <span className="font-medium text-foreground">{stage}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-2 p-2 bg-primary/10 rounded text-[10px] text-primary">
                        ⓘ {process.note}
                      </div>
                      <div className="absolute left-1/2 -translate-x-1/2 top-full w-3 h-3 bg-card border-r border-b border-border rotate-45 -mt-1.5"></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
