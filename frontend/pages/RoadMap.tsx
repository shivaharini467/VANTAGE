import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';

interface RoadmapStep {
  step: number;
  title: string;
  description: string;
}

const roadmapData: Record<string, RoadmapStep[]> = {
  'ml-engineer': [
    { step: 1, title: 'Master Python & Math Foundations', description: 'Linear algebra, calculus, probability & statistics' },
    { step: 2, title: 'Learn ML Algorithms', description: 'Supervised & unsupervised learning techniques' },
    { step: 3, title: 'Deep Learning & Neural Networks', description: 'CNNs, RNNs, Transformers with PyTorch/TensorFlow' },
    { step: 4, title: 'MLOps & Production', description: 'Model deployment, monitoring, and CI/CD pipelines' },
  ],
  'web-developer': [
    { step: 1, title: 'Core Web Technologies', description: 'HTML, CSS, JavaScript fundamentals' },
    { step: 2, title: 'Frontend Frameworks', description: 'React, TypeScript, state management' },
    { step: 3, title: 'Backend & APIs', description: 'Node.js, REST APIs, databases' },
    { step: 4, title: 'DevOps & System Design', description: 'CI/CD, cloud services, architecture patterns' },
  ],
  'data-scientist': [
    { step: 1, title: 'Statistics & Mathematics', description: 'Probability, hypothesis testing, regression' },
    { step: 2, title: 'Data Wrangling', description: 'Pandas, SQL, data cleaning techniques' },
    { step: 3, title: 'Machine Learning', description: 'Scikit-learn, model evaluation, feature engineering' },
    { step: 4, title: 'Advanced Analytics', description: 'Deep learning, NLP, big data tools' },
  ],
};

const RoadMap = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  if (!user) { navigate('/login'); return null; }

  const roadmap = roadmapData[user.role] || roadmapData['ml-engineer'];

  return (
    <div className="min-h-screen bg-background">
      <header className="glass border-b border-border sticky top-0 z-30">
        <div className="flex items-center justify-center h-16">
          <h1 className="text-xl font-heading font-bold text-gradient">vantage</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-12 space-y-10">
        <h2 className="text-2xl font-heading font-bold text-foreground text-center">Road Map</h2>
        <p className="text-muted-foreground text-center">Your learning path to role readiness</p>

        <div className="relative">
          <div className="absolute left-6 top-8 bottom-8 w-px bg-border" />

          <div className="space-y-6">
            {roadmap.map((step, i) => (
              <div key={step.step} className="flex gap-4 items-start relative">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 z-10 ${
                  i === 0 ? 'gradient-primary glow-primary' : 'bg-secondary border border-border'
                }`}>
                  <span className={`font-bold text-sm ${i === 0 ? 'text-primary-foreground' : 'text-muted-foreground'}`}>
                    {step.step}
                  </span>
                </div>
                <div className="glass rounded-xl p-4 flex-1">
                  <p className="font-semibold text-foreground">{step.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => navigate('/competency-gap')}
            className="flex-1 h-12 border-border text-foreground hover:bg-secondary rounded-xl"
          >
            Back
          </Button>
          <Button
            onClick={() => navigate('/home')}
            className="flex-1 gradient-primary text-primary-foreground h-12 font-semibold rounded-xl glow-primary hover:opacity-90"
          >
            Home
          </Button>
        </div>
      </main>
    </div>
  );
};

export default RoadMap;
