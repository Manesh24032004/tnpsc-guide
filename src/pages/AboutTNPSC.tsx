import { Navbar } from '@/components/Layout/Navbar';
import { Footer } from '@/components/Layout/Footer';
import { Card } from '@/components/ui/card';

const AboutTNPSC = () => {
  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-primary mb-4">About TNPSC</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tamil Nadu Public Service Commission
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="p-6 animate-slide-up">
            <h2 className="text-2xl font-bold text-primary mb-4">What is TNPSC?</h2>
            <p className="text-muted-foreground mb-4">
              The Tamil Nadu Public Service Commission (TNPSC) is a constitutional body established to conduct examinations 
              and recruit candidates for various civil service positions in the state of Tamil Nadu.
            </p>
          </Card>

          <Card className="p-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-2xl font-bold text-primary mb-4">Exam Groups</h2>
            <div className="space-y-3">
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">Group 1 (G1)</h3>
                <p className="text-sm text-muted-foreground">
                  Deputy Collector, Deputy Superintendent of Police, Assistant Commissioner (Commercial Tax), etc.
                </p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">Group 2 & 2A (G2/IIA)</h3>
                <p className="text-sm text-muted-foreground">
                  Assistant Section Officer, Revenue Assistant, Personal Clerk, etc.
                </p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">Group 4 (G4)</h3>
                <p className="text-sm text-muted-foreground">
                  Junior Assistant, Typist, Steno-Typist, Field Surveyor, etc.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-2xl font-bold text-primary mb-4">Eligibility</h2>
            <div className="space-y-2 text-muted-foreground">
              <p>• Must be an Indian citizen</p>
              <p>• Age limit varies by exam (typically 18-30 years with relaxation for reserved categories)</p>
              <p>• Educational qualification varies by position</p>
              <p>• Must know Tamil language</p>
            </div>
          </Card>

          <Card className="p-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <h2 className="text-2xl font-bold text-primary mb-4">Selection Process</h2>
            <div className="space-y-2 text-muted-foreground">
              <p>1. Preliminary Examination (Objective Type)</p>
              <p>2. Main Examination (Descriptive Type)</p>
              <p>3. Oral Test/Interview</p>
              <p>4. Certificate Verification</p>
            </div>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutTNPSC;
