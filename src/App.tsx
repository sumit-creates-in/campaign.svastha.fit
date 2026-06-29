import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
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
import Global21DayWeightLossChallenge from "./pages/Global21DayWeightLossChallenge";
import International21DayWeightLossChallenge from "./pages/International21DayWeightLossChallenge";
import TwentyOneDayTotalBodyTransformationProgram from "./pages/TwentyOneDayTotalBodyTransformationProgram";
import Loseweightwithvaishnavi from "./pages/Loseweightwithvaishnavi";
import ThankYouLoseWeightVaishnavi from "./pages/ThankYouLoseWeightVaishnavi";
import U21DWLCPaymentConfirmation from "./pages/U21DWLCPaymentConfirmation";
import JoinSvasthaCommunity from "./pages/JoinSvasthaCommunity";
import NotFound from "./pages/NotFound";
import { CounterTest } from "./components/test/CounterTest";

// Context and Guards

import { CountryProvider } from "./contexts/CountryContext";
import { IndiaRouteGuard, InternationalRouteGuard, UAERouteGuard } from "./components/campaign/Routeguards";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <CountryProvider>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={<Navigate to="/ultimate-21days/yoga-camp" replace />}
              />
              <Route path="/ultimate-21days/yoga-camp" element={<Index />} />
              <Route
                path="/14-Day-Yoga-Fat-Loss-Camp"
                element={<FatLossCampaign />}
              />
              <Route
                path="/14-Day-Yoga-Fat-Loss-Camp-int"
                element={<FatLossCampaignInt />}
              />
              <Route
                path="/healthy-life-by-sumit"
                element={<FourteenDayCampaign />}
              />

              <Route
                path="/reg-confirm-14wlyc"
                element={<RegistrationConfirm14WLYC />}
              />
              <Route
                path="/registration-confirm-14-day-yoga-fat-loss-camp"
                element={<RegistrationConfirm14WLYC />}
              />
              <Route
                path="/reg-confirm-14wlyc-int"
                element={<RegistrationConfirm14WLYCInt />}
              />
              <Route
                path="/registration-confirm-14-day-yoga-fat-loss-camp-int"
                element={<RegistrationConfirm14WLYCInt />}
              />
              <Route
                path="/reg-confirm-group-21wlyc-india"
                element={<RegistrationConfirm21WLYC />}
              />
              <Route
                path="/reg-confirm-21wlyc-global-uae"
                element={<RegistrationConfirm21WLYC isGlobal={true} />}
              />
              <Route
                path="/u21dwlc-group-registration-success-usa"
                element={<RegistrationConfirm21WLYC isGlobal={true} />}
              />
              <Route
                path="/12-week-Total-Body-Transformation-Program"
                element={<TransformationProgram />}
              />

              {/* GEOLOCATION-PROTECTED ROUTES */}
              {/* India Route - Only accessible to India users */}
              <Route
                path="/Ultimate-21-day-weight-loss-challenge"
                element={
                  <IndiaRouteGuard>
                    <Ultimate21DayChallenge />
                  </IndiaRouteGuard>
                }
              />

              {/* UAE Route - Only accessible to UAE users */}
              <Route
                path="/global-21-day-weight-loss-challenge"
                element={
                  <UAERouteGuard>
                    <Global21DayWeightLossChallenge />
                  </UAERouteGuard>
                }
              />

              {/* International Route - Only accessible to USA and other countries */}
              <Route
                path="/international-21-day-weight-loss-challenge"
                element={
                  <InternationalRouteGuard>
                    <International21DayWeightLossChallenge />
                  </InternationalRouteGuard>
                }
              />

              {/* Other Routes */}
              <Route
                path="/21-day-total-body-transformation-program"
                element={<TwentyOneDayTotalBodyTransformationProgram />}
              />
              <Route path="/yoga-with-sumit" element={<YogaWithSumit />} />
              <Route
                path="/Lose-weight-with-vaishnavi"
                element={<Loseweightwithvaishnavi />}
              />
              <Route
                path="/Thank-You-lose-weight-with-vaishnavi"
                element={<ThankYouLoseWeightVaishnavi />}
              />
              <Route
                path="/reg-confirm-personalised-21wlyc-india"
                element={<U21DWLCPaymentConfirmation />}
              />
              <Route
                path="/u21dwlc-paymentconfirmation-global-uae"
                element={<U21DWLCPaymentConfirmation isGlobal={true} />}
              />
              <Route
                path="/u21dwlc-exclusive-registration-success-usa"
                element={<U21DWLCPaymentConfirmation isGlobal={true} />}
              />
              <Route
                path="/join-svastha-community"
                element={<JoinSvasthaCommunity />}
              />
              <Route path="/test-counter" element={<CounterTest />} />

              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CountryProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;