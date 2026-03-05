import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const skillData: Record<string, { score: number; skills: string[] }> = {
  'ml-engineer': { score: 72, skills: ['Python', 'Machine Learning', 'TensorFlow', 'PyTorch', 'Data Pipelines', 'MLOps'] },
  'web-developer': { score: 65, skills: ['React', 'TypeScript', 'Node.js', 'CSS', 'REST APIs', 'Git'] },
  'data-scientist': { score: 58, skills: ['Python', 'Statistics', 'SQL', 'Pandas', 'Visualization', 'R'] },
};

const ReadinessScore = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  if (!user) { navigate('/login'); return null; }

  const data = skillData[user.role] || skillData['ml-engineer'];
  const circumference = 2 * Math.PI * 80;
  const offset = circumference - (data.score / 100) * circumference;

  const skillColors = [
    'bg-primary/20 text-primary border-primary/30',
    'bg-accent/20 text-accent border-accent/30',
    'bg-warning/20 text-warning border-warning/30',
    'bg-success/20 text-success border-success/30',
    'bg-info/20 text-info border-info/30',
    'bg-destructive/20 text-destructive border-destructive/30',
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="glass border-b border-border sticky top-0 z-30">
        <div className="flex items-center justify-center h-16">
          <h1 className="text-xl font-heading font-bold text-gradient">vantage</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-12 space-y-10">
        {/* Role Readiness Score */}
        <div className="space-y-4 text-center">
          <h2 className="text-2xl font-heading font-bold text-foreground">Role Readiness Score</h2>
          <p className="text-muted-foreground">Your readiness for the selected role</p>

          <div className="flex justify-center py-6">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="80" fill="none" stroke="hsl(var(--secondary))" strokeWidth="12" />
                <circle
                  cx="100" cy="100" r="80" fill="none"
                  stroke="url(#scoreGradient)" strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  className="transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(217, 91%, 60%)" />
                    <stop offset="100%" stopColor="hsl(170, 80%, 50%)" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-heading font-bold text-foreground">{data.score}%</span>
                <span className="text-xs text-muted-foreground">Ready</span>
              </div>
            </div>
          </div>
        </div>

        {/* Skill Cluster */}
        <div className="space-y-4">
          <h2 className="text-2xl font-heading font-bold text-foreground text-center">Skill Cluster</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {data.skills.map((skill, i) => (
              <span
                key={skill}
                className={`px-4 py-2 rounded-full text-sm font-medium border ${skillColors[i % skillColors.length]}`}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <Button
          onClick={() => navigate('/competency-gap')}
          className="w-full gradient-primary text-primary-foreground h-12 text-base font-semibold rounded-xl glow-primary hover:opacity-90"
        >
          Next <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </main>
    </div>
  );
};

export default ReadinessScore;
