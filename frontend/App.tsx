import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { UserProvider } from "@/contexts/UserContext";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp";
import Home from "@/pages/Home";
import RoleReadinessScore from "@/pages/RoleReadinessScore";
import SkillCluster from "@/pages/SkillCluster";
import CompetencyGap from "@/pages/CompetencyGap";
import RoadMap from "@/pages/RoadMap";
import NotFound from "@/pages/NotFound";
import SmokeIntro from "@/smoke/SmokeIntro";

const queryClient = new QueryClient();

const App = () => {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <UserProvider>
          <BrowserRouter>
            {showIntro ? (
              <SmokeIntro onFinish={() => setShowIntro(false)} />
            ) : (
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                    <Route path="/home" element={<Home />} />
                <Route path="/readiness-score" element={<RoleReadinessScore />} />
                <Route path="/skill-cluster" element={<SkillCluster />} />
                <Route path="/competency-gap" element={<CompetencyGap />} />
                <Route path="/road-map" element={<RoadMap />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            )}
          </BrowserRouter>
        </UserProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;