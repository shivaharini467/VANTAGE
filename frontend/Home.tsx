import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  Menu, X, User, Upload, Camera, ArrowRight,
  Brain, Code, BarChart3, Target, AlertTriangle,
  Map, Layers, Bell, ChevronRight
} from 'lucide-react';

const roleLabels: Record<string, string> = {
  'ml-engineer': 'ML Engineer',
  'web-developer': 'Web Developer',
  'data-scientist': 'Data Scientist',
};

const menuItems = [
  { label: 'Role Readiness Score', icon: Target, path: '/readiness-score' },
  { label: 'Competency Gap', icon: AlertTriangle, path: '/competency-gap' },
  { label: 'Road Map', icon: Map, path: '/competency-gap' },
  { label: 'Skill Cluster', icon: Layers, path: '/readiness-score' },
  { label: 'Job Notifications', icon: Bell, path: '/home' },
];

const roles = [
  { id: 'ml-engineer', label: 'ML Engineer', icon: Brain },
  { id: 'web-developer', label: 'Web Developer', icon: Code },
  { id: 'data-scientist', label: 'Data Scientist', icon: BarChart3 },
];

const Home = () => {
  const navigate = useNavigate();
  const { user, selectRole, logout } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedRole, setExpandedRole] = useState<string | null>(user?.role || null);
  const [showProfile, setShowProfile] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [resumeFile, setResumeFile] = useState<string | null>(null);

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFile(file.name);
      toast.success(`Resume "${file.name}" uploaded successfully!`);
    }
  };

  const handleRoleClick = (roleId: string) => {
    setExpandedRole(expandedRole === roleId ? null : roleId);
    selectRole(roleId);
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-72 bg-card border-r border-border z-50 transform transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-heading font-bold text-gradient">vantage</h2>
            <button onClick={() => setSidebarOpen(false)} className="text-muted-foreground hover:text-foreground">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-2">
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Admin Panel</p>
            <p className="text-sm font-medium text-muted-foreground mb-3">Roles</p>

            {roles.map((role) => (
              <div key={role.id}>
                <button
                  onClick={() => handleRoleClick(role.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    expandedRole === role.id ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  }`}
                >
                  <role.icon className="h-4 w-4" />
                  <span className="flex-1 text-left">{role.label}</span>
                  <ChevronRight className={`h-4 w-4 transition-transform ${expandedRole === role.id ? 'rotate-90' : ''}`} />
                </button>

                {expandedRole === role.id && (
                  <div className="ml-6 mt-1 space-y-1">
                    {menuItems.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => { setSidebarOpen(false); navigate(item.path); }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-xs text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                      >
                        <item.icon className="h-3.5 w-3.5" />
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <button onClick={() => { logout(); navigate('/'); }} className="text-sm text-destructive hover:underline mt-auto">
            Log out
          </button>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-30 glass border-b border-border">
        <div className="flex items-center justify-between px-4 md:px-6 h-16">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="text-muted-foreground hover:text-foreground p-1">
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-heading font-bold text-gradient hidden sm:block">vantage</h1>
          </div>

          <p className="text-lg font-medium text-foreground">
            Hey, <span className="text-primary">{user.name}</span>
          </p>

          <button onClick={() => setShowProfile(!showProfile)} className="relative">
            <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center">
              <User className="h-5 w-5 text-primary-foreground" />
            </div>
          </button>
        </div>

        {showProfile && (
          <div className="absolute right-4 top-16 mt-2 glass rounded-xl p-4 w-64 space-y-3 z-50">
            <div>
              <p className="font-semibold text-foreground">{user.name}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <p className="text-xs text-muted-foreground mt-1">Role: {roleLabels[user.role] || 'Not selected'}</p>
            </div>
            <button onClick={() => { logout(); navigate('/'); }} className="text-sm text-destructive hover:underline">
              Log out
            </button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-12 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-heading font-bold text-foreground">Upload Your Resume</h2>
          <p className="text-muted-foreground">Upload your resume to get personalized career insights</p>
        </div>

        <div className="glass rounded-2xl p-8 space-y-6">
          <input ref={fileRef} type="file" accept=".pdf,image/*" capture="environment" className="hidden" onChange={handleFileUpload} />

          <div
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-border rounded-xl p-10 flex flex-col items-center gap-4 cursor-pointer hover:border-primary/50 transition-colors group"
          >
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
              <Upload className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <div className="text-center">
              <p className="font-medium text-foreground">Drop your resume here or click to upload</p>
              <p className="text-sm text-muted-foreground mt-1">PDF or photo format</p>
            </div>
          </div>

          <div className="flex items-center gap-2 justify-center text-muted-foreground text-sm">
            <span>or</span>
          </div>

          <Button
            variant="outline"
            className="w-full h-12 border-border text-foreground hover:bg-secondary"
            onClick={() => fileRef.current?.click()}
          >
            <Camera className="mr-2 h-5 w-5" /> Take a Photo
          </Button>

          {resumeFile && (
            <div className="flex items-center gap-2 bg-primary/10 rounded-lg px-4 py-3">
              <Upload className="h-4 w-4 text-primary" />
              <span className="text-sm text-foreground flex-1 truncate">{resumeFile}</span>
              <span className="text-xs text-primary">Uploaded</span>
            </div>
          )}
        </div>

        <Button
          onClick={() => navigate('/readiness-score')}
          className="w-full gradient-primary text-primary-foreground h-12 text-base font-semibold rounded-xl glow-primary hover:opacity-90"
        >
          Next <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </main>
    </div>
  );
};

export default Home;