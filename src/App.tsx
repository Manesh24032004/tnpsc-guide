import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import { AuthProvider } from "@/hooks/useAuth";
import Dashboard from "./pages/Dashboard";
import Syllabus from "./pages/Syllabus";
import SyllabusG1 from "./pages/SyllabusG1";
import SyllabusG2 from "./pages/SyllabusG2";
import SyllabusG4 from "./pages/SyllabusG4";
import PreviousPapers from "./pages/PreviousPapers";
import PapersByYear from "./pages/PapersByYear";
import PapersByGroup from "./pages/PapersByGroup";
import BooksStandards from "./pages/BooksStandards";
import StandardBooks from "./pages/StandardBooks";
import Tirukural from "./pages/Tirukural";
import Notes from "./pages/Notes";
import Poets from "./pages/Poets";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import AdminLogin from "./pages/AdminLogin";
import NotFound from "./pages/NotFound";
import AboutTNPSC from "./pages/AboutTNPSC";
import Quiz from "./pages/Quiz";
import TNPSCWizardAI from "./pages/TNPSCWizardAI";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="tnpsc-ui-theme">
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/syllabus" element={<Syllabus />} />
                <Route path="/syllabus/g1" element={<SyllabusG1 />} />
                <Route path="/syllabus/g2" element={<SyllabusG2 />} />
                <Route path="/syllabus/g4" element={<SyllabusG4 />} />
                <Route path="/previous-papers" element={<PreviousPapers />} />
                <Route path="/previous-papers/:year" element={<PapersByYear />} />
                <Route path="/previous-papers/:year/:group" element={<PapersByGroup />} />
                <Route path="/books/standards" element={<BooksStandards />} />
                <Route path="/books/:grade" element={<StandardBooks />} />
                <Route path="/tirukural" element={<Tirukural />} />
                <Route path="/notes" element={<Notes />} />
                <Route path="/poets" element={<Poets />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/about-tnpsc" element={<AboutTNPSC />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/ai-chat" element={<TNPSCWizardAI />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
