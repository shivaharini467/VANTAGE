import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";

interface GapItem {
  skill: string;
  level: "high" | "medium" | "low";
}

const gapData: Record<string, GapItem[]> = {
  "ml-engineer": [
    { skill: "Deep Learning Architectures", level: "high" },
    { skill: "MLOps & Deployment", level: "high" },
    { skill: "Feature Engineering", level: "medium" },
    { skill: "Python Proficiency", level: "low" },
    { skill: "Data Preprocessing", level: "low" },
  ],
  "web-developer": [
    { skill: "System Design", level: "high" },
    { skill: "Testing & CI/CD", level: "high" },
    { skill: "TypeScript Advanced", level: "medium" },
    { skill: "React Patterns", level: "low" },
    { skill: "CSS/HTML", level: "low" },
  ],
  "data-scientist": [
    { skill: "Advanced Statistics", level: "high" },
    { skill: "Big Data Tools", level: "high" },
    { skill: "Machine Learning", level: "medium" },
    { skill: "SQL Queries", level: "low" },
    { skill: "Data Visualization", level: "low" },
  ],
};

const levelConfig = {
  high: { color: "text-destructive", bg: "bg-destructive/10 border-destructive/30", icon: TrendingDown, label: "High Gap" },
  medium: { color: "text-warning", bg: "bg-warning/10 border-warning/30", icon: AlertTriangle, label: "Medium Gap" },
  low: { color: "text-success", bg: "bg-success/10 border-success/30", icon: TrendingUp, label: "Low Gap" },
};

const CompetencyGap = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  if (!user) { navigate("/login"); return null; }

  const gaps = gapData[user.role] || gapData["ml-engineer"];

  return (
    <div className="min-h-screen bg-background">
      <header className="glass border-b border-border sticky top-0 z-30">
        <div className="flex items-center justify-center h-16">
          <h1 className="text-xl font-heading font-bold text-gradient">vantage</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-12 space-y-10">
        <section className="space-y-4">
          <h2 className="text-2xl font-heading font-bold text-foreground text-center">Competency Gap</h2>
          <p className="text-muted-foreground text-center">Areas that need improvement for your role</p>

          <div className="space-y-3">
            {gaps.map((gap) => {
              const config = levelConfig[gap.level];
              const Icon = config.icon;
              return (
                <div key={gap.skill} className={`glass rounded-xl p-4 flex items-center gap-4 border ${config.bg}`}>
                  <Icon className={`h-5 w-5 ${config.color} shrink-0`} />
                  <div className="flex-1">
                    <p className="font-medium text-foreground text-sm">{gap.skill}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${config.bg} ${config.color}`}>
                    {config.label}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => navigate("/skill-cluster")}
            className="flex-1 h-12 border-border text-foreground hover:bg-secondary rounded-xl"
          >
            <ArrowLeft className="mr-2 h-5 w-5" /> Back
          </Button>
          <Button
            onClick={() => navigate("/road-map")}
            className="flex-1 gradient-primary text-primary-foreground h-12 font-semibold rounded-xl glow-primary hover:opacity-90"
          >
            Next
          </Button>
        </div>
      </main>
    </div>
  );
};

export default CompetencyGap;
