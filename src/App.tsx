import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Landing from "./pages/Landing";
import AuthPage from "./pages/auth/AuthPage";
import KioskDashboard from "./pages/dashboard/KioskDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import WorkerDashboard from "./pages/dashboard/WorkerDashboard";
import EmployerDashboard from "./pages/dashboard/EmployerDashboard";
import WorkerRegistration from "./pages/worker/WorkerRegistration";
import DocumentUpload from "./pages/worker/DocumentUpload";
import BackgroundCheck from "./pages/worker/BackgroundCheck";
import QRGeneration from "./pages/worker/QRGeneration";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/:role/auth" element={<AuthPage />} />
            <Route path="/kiosk/dashboard" element={<KioskDashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/worker/dashboard" element={<WorkerDashboard />} />
            <Route path="/employer/dashboard" element={<EmployerDashboard />} />
            <Route path="/worker/register" element={<WorkerRegistration />} />
            <Route path="/worker/documents" element={<DocumentUpload />} />
            <Route path="/worker/background-check" element={<BackgroundCheck />} />
            <Route path="/worker/qr-generation" element={<QRGeneration />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
