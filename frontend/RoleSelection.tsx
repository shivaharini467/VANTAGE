import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Brain, Code, BarChart3, ArrowRight, Check } from 'lucide-react';

const roles = [
  { id: 'ml-engineer', label: 'ML Engineer', icon: Brain, description: 'Machine learning & AI systems' },
  { id: 'web-developer', label: 'Web Developer', icon: Code, description: 'Full-stack web applications' },
  { id: 'data-scientist', label: 'Data Scientist', icon: BarChart3, description: 'Data analysis & insights' },
];

const RoleSelection = () => {
  const navigate = useNavigate();
  const { selectRole } = useUser();
  const [selected, setSelected] = useState('');

  const handleNext = () => {
    if (!selected) {
      toast.error('Please select a role');
      return;
    }
    selectRole(selected);
    toast.success('Role selected!');
    navigate('/home');
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-lg space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold font-heading text-gradient">vantage</h1>
          <h2 className="text-2xl font-heading font-semibold text-foreground">Select Your Role</h2>
          <p className="text-muted-foreground">Choose the role that best describes your career path</p>
        </div>

        <div className="space-y-4">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => setSelected(role.id)}
              className={`w-full glass rounded-xl p-5 flex items-center gap-4 transition-all duration-200 group
                ${selected === role.id
                  ? 'border-primary glow-primary ring-1 ring-primary'
                  : 'hover:border-muted-foreground/30'
                }`}
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                selected === role.id ? 'gradient-primary' : 'bg-secondary'
              }`}>
                <role.icon className={`h-6 w-6 ${selected === role.id ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
              </div>
              <div className="text-left flex-1">
                <p className="font-semibold text-foreground">{role.label}</p>
                <p className="text-sm text-muted-foreground">{role.description}</p>
              </div>
              {selected === role.id && (
                <Check className="h-5 w-5 text-primary" />
              )}
            </button>
          ))}
        </div>

        <Button
          onClick={handleNext}
          className="w-full gradient-primary text-primary-foreground h-12 text-base font-semibold rounded-xl glow-primary hover:opacity-90"
        >
          Next <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default RoleSelection;