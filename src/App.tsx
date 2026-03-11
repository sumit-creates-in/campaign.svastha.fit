import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import FatLossCampaign from "./pages/FatLossCampaign";
import FourteenDayCampaign from "./pages/FourteenDayCampaign";
import WeightLossConsultation from "./pages/WeightLossConsultation";
import TransformationProgram from "./pages/TransformationProgram";
import RegistrationConfirm14WLYC from "./pages/RegistrationConfirm14WLYC";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/ultimate-21days/yoga-camp" replace />} />
          <Route path="/ultimate-21days/yoga-camp" element={<Index />} />
          <Route path="/14-Day-Yoga-Fat-Loss-Camp" element={<FatLossCampaign />} />
          <Route path="/healthy-life-by-sumit" element={<FourteenDayCampaign />} />
          <Route path="/weight-loss-consultation-with-expert" element={<WeightLossConsultation />} />
          <Route path="/reg-confirm-14wlyc" element={<RegistrationConfirm14WLYC />} />
          <Route path="/12-week-Total-Body-Transformation-Program" element={<TransformationProgram />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
