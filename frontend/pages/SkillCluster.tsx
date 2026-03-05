import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';

// each skill now also carries a percentage value (could be based on readiness score or specific assessment)
const skillData: Record<string, { score: number; skills: { name: string; pct: number }[] }> = {
  'ml-engineer': {
    score: 72,
    skills: [
      { name: 'Python', pct: 85 },
      { name: 'Machine Learning', pct: 78 },
      { name: 'TensorFlow', pct: 65 },
      { name: 'PyTorch', pct: 60 },
      { name: 'Data Pipelines', pct: 70 },
      { name: 'MLOps', pct: 55 },
    ],
  },
  'web-developer': {
    score: 65,
    skills: [
      { name: 'React', pct: 80 },
      { name: 'TypeScript', pct: 70 },
      { name: 'Node.js', pct: 68 },
      { name: 'CSS', pct: 60 },
      { name: 'REST APIs', pct: 72 },
      { name: 'Git', pct: 75 },
    ],
  },
  'data-scientist': {
    score: 58,
    skills: [
      { name: 'Python', pct: 78 },
      { name: 'Statistics', pct: 65 },
      { name: 'SQL', pct: 70 },
      { name: 'Pandas', pct: 68 },
      { name: 'Visualization', pct: 62 },
      { name: 'Big Data Tools', pct: 55 },
    ],
  },
};

const SkillCluster = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  if (!user) { navigate('/login'); return null; }

  const data = skillData[user.role] || skillData['ml-engineer'];

  return (
    <div className="min-h-screen bg-background">
      <header className="glass border-b border-border sticky top-0 z-30">
        <div className="flex items-center justify-center h-16">
          <h1 className="text-xl font-heading font-bold text-gradient">vantage</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-12 space-y-10">
        <div className="space-y-4 text-center">
          <h2 className="text-2xl font-heading font-bold text-foreground">Skill Cluster</h2>
          <p className="text-muted-foreground">Key abilities related to your role</p>

          <div className="space-y-6 max-w-xl mx-auto">
            {data.skills.map((skill) => {
              const barColor =
                skill.pct >= 80 ? 'bg-success' :
                skill.pct >= 50 ? 'bg-warning' :
                'bg-destructive';

              return (
                <div key={skill.name} className="flex flex-col">
                  <p className="text-sm font-medium text-foreground mb-1">{skill.name}</p>
                  <div className="w-full bg-secondary/30 rounded-full h-2">
                    <div
                      className={`${barColor} h-2 rounded-full`}
                      style={{ width: `${skill.pct}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 self-end">{skill.pct}%</p>
                </div>
              );
            })}
          </div>
        </div>

        <Button
          onClick={() => navigate('/competency-gap')}
          className="w-full gradient-primary text-primary-foreground h-12 text-base font-semibold rounded-xl glow-primary hover:opacity-90"
        >
          Next
        </Button>
      </main>
    </div>
  );
};

export default SkillCluster;
