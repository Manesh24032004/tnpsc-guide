import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Syllabus from "./pages/Syllabus";
import PreviousPapers from "./pages/PreviousPapers";
import Books from "./pages/Books";
import StandardBooks from "./pages/StandardBooks";
import Tirukural from "./pages/Tirukural";
import Notes from "./pages/Notes";
import Poets from "./pages/Poets";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import AboutTNPSC from "./pages/AboutTNPSC";
import Quiz from "./pages/Quiz";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/syllabus" element={<Syllabus />} />
            <Route path="/previous-papers" element={<PreviousPapers />} />
            <Route path="/books" element={<Books />} />
            <Route path="/books/:grade" element={<StandardBooks />} />
            <Route path="/tirukural" element={<Tirukural />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/poets" element={<Poets />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/about-tnpsc" element={<AboutTNPSC />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
