import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen gradient-hero flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px]" />

      <div className="relative z-10 text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-7xl md:text-9xl font-bold font-heading tracking-tight text-gradient">
            vantage
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-lg mx-auto">
            Your career readiness platform for the modern tech world
          </p>
        </div>

        <Button
          size="lg"
          className="gradient-primary text-primary-foreground font-semibold text-lg px-8 py-6 rounded-xl glow-primary hover:opacity-90 transition-opacity"
          onClick={() => navigate('/login')}
        >
          Get Started <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default Landing;
