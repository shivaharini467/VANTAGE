import { useState, useRef } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  Menu, X, User, Upload, Camera, ArrowRight,
  Brain, Code, BarChart3, Target, AlertTriangle,
  Map, Layers, Bell, ChevronRight, Check, ArrowLeft
} from 'lucide-react';

const roleLabels: Record<string, string> = {
  'ml-engineer': 'ML Engineer',
  'web-developer': 'Web Developer',
  'data-scientist': 'Data Scientist',
};

const menuItems = [
  { label: 'Role Readiness Score', icon: Target, path: '/readiness-score' },
  { label: 'Competency Gap', icon: AlertTriangle, path: '/competency-gap' },
  { label: 'Road Map', icon: Map, path: '/road-map' },
  { label: 'Skill Cluster', icon: Layers, path: '/skill-cluster' },
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

  const [selectedRole, setSelectedRole] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedRole, setExpandedRole] = useState<string | null>(user?.role || null);
  const [showProfile, setShowProfile] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [resumeFile, setResumeFile] = useState<string | null>(null);

  // redirect if not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFile(file.name);
      toast.success(`Resume "${file.name}" uploaded successfully!`);
    }
  };

  const handleBack = () => {
    selectRole('');
  };

  const handleRoleClick = (roleId: string) => {
    setExpandedRole(expandedRole === roleId ? null : roleId);
    selectRole(roleId);
  };

  // if role not selected yet, show selection panel at top of home page
  if (!user.role || user.role === '') {
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

        {/* Main Content - Role Selection */}
        <main className="max-w-2xl mx-auto px-4 py-12 space-y-8">
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-heading font-semibold text-foreground">Select Your Role</h2>
              <p className="text-muted-foreground">Choose the role that best describes your career path</p>
            </div>

            <div className="space-y-4">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`w-full glass rounded-xl p-5 flex items-center gap-4 transition-all duration-200 group
                    ${selectedRole === role.id
                      ? 'border-primary glow-primary ring-1 ring-primary'
                      : 'hover:border-muted-foreground/30'
                    }
                  `}
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                    selectedRole === role.id ? 'gradient-primary' : 'bg-secondary'
                  }`}>
                    <role.icon className={`h-6 w-6 ${selectedRole === role.id ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-semibold text-foreground">{role.label}</p>
                  </div>
                  {selectedRole === role.id && (
                    <Check className="h-5 w-5 text-primary" />
                  )}
                </button>
              ))}
            </div>

            <Button
              onClick={() => {
                if (!selectedRole) {
                  toast.error('Please select a role');
                  return;
                }
                selectRole(selectedRole);
                toast.success('Role selected!');
              }}
              className="w-full gradient-primary text-primary-foreground h-12 text-base font-semibold rounded-xl glow-primary hover:opacity-90"
            >
              Continue <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </main>
      </div>
    );
  }

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
        {!resumeFile && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
            <p className="text-destructive font-medium text-center">Please upload your resume to continue</p>
          </div>
        )}

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

        <div className="flex gap-4">
          <Button
            onClick={handleBack}
            variant="outline"
            className="flex-1 h-12 border-border text-foreground hover:bg-secondary"
          >
            <ArrowLeft className="mr-2 h-5 w-5" /> Back
          </Button>
          <Button
            onClick={() => {
              if (!resumeFile) {
                toast.error('Please upload your resume');
                return;
              }
              navigate('/readiness-score');
            }}
            className="flex-1 gradient-primary text-primary-foreground h-12 text-base font-semibold rounded-xl glow-primary hover:opacity-90"
          >
            Next <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Home;
