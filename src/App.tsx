import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import FatLossCampaign from "./pages/FatLossCampaign";
import FatLossCampaignInt from "./pages/FatLossCampaignInt";
import FourteenDayCampaign from "./pages/FourteenDayCampaign";
import YogaWithSumit from "./pages/YogaWithSumit";
import TransformationProgram from "./pages/TransformationProgram";
import RegistrationConfirm14WLYC from "./pages/RegistrationConfirm14WLYC";
import RegistrationConfirm14WLYCInt from "./pages/RegistrationConfirm14WLYCInt";
import RegistrationConfirm21WLYC from "./pages/RegistrationConfirm21WLYC";
import Ultimate21DayChallenge from "./pages/Ultimate21DayChallenge";
import TwentyOneDayTotalBodyTransformationProgram from "./pages/TwentyOneDayTotalBodyTransformationProgram";
import Loseweightwithvaishnavi from "./pages/Loseweightwithvaishnavi";
import NotFound from "./pages/NotFound";
import { CounterTest } from "./components/test/CounterTest";

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
          <Route path="/14-Day-Yoga-Fat-Loss-Camp-int" element={<FatLossCampaignInt />} />
          <Route path="/healthy-life-by-sumit" element={<FourteenDayCampaign />} />

          <Route path="/reg-confirm-14wlyc" element={<RegistrationConfirm14WLYC />} />
          <Route path="/registration-confirm-14-day-yoga-fat-loss-camp" element={<RegistrationConfirm14WLYC />} />
          <Route path="/reg-confirm-14wlyc-int" element={<RegistrationConfirm14WLYCInt />} />
          <Route path="/registration-confirm-14-day-yoga-fat-loss-camp-int" element={<RegistrationConfirm14WLYCInt />} />
          <Route path="/reg-confirm-21wlyc" element={<RegistrationConfirm21WLYC />} />
          <Route path="/12-week-Total-Body-Transformation-Program" element={<TransformationProgram />} />
          <Route path="/Ultimate-21-day-weight-loss-challenge" element={<Ultimate21DayChallenge />} />
          <Route path="/21-day-total-body-transformation-program" element={<TwentyOneDayTotalBodyTransformationProgram />} />
          <Route path="/yoga-with-sumit" element={<YogaWithSumit />} />
          <Route path="/Lose-weight-with-vaishnavi" element={<Loseweightwithvaishnavi />} />
          <Route path="/test-counter" element={<CounterTest />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
