import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';

const SignUp = () => {
  const navigate = useNavigate();
  const { signup } = useUser();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email');
      return;
    }
    if (phone.length !== 10) {
      toast.error('Phone number must be exactly 10 digits');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    
    setLoading(true);
    const result = await signup(name, email, phone, password);
    setLoading(false);
    
    if (result.success) {
      toast.success('Account created successfully!');
      navigate('/home');
    } else {
      toast.error(result.error || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link to="/">
            <h1 className="text-4xl font-bold font-heading text-gradient">vantage</h1>
          </Link>
          <p className="mt-2 text-muted-foreground">Create your account</p>
        </div>

        <div className="glass rounded-2xl p-8">
          <form onSubmit={handleSignUp} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                className="bg-secondary border-border focus:border-primary h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email (Gmail)</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const value = e.target.value;
                  setEmail(value);
                  if (value && !/\S+@\S+\.\S+/.test(value)) {
                    setEmailError('Please enter a valid email');
                  } else {
                    setEmailError('');
                  }
                }}
                className={`bg-secondary border-border focus:border-primary h-12 ${emailError ? 'border-destructive' : ''}`}
              />
              {emailError && <p className="text-sm text-destructive">{emailError}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-foreground">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                maxLength={10}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const value = e.target.value.replace(/\D/g, '');
                  setPhone(value);
                  if (value && value.length !== 10) {
                    setPhoneError('Phone number must be exactly 10 digits');
                  } else {
                    setPhoneError('');
                  }
                }}
                className={`bg-secondary border-border focus:border-primary h-12 ${phoneError ? 'border-destructive' : ''}`}
              />
              {phoneError && <p className="text-sm text-destructive">{phoneError}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const value = e.target.value;
                    setPassword(value);
                    if (value && value.length < 6) {
                      setPasswordError('Password must be at least 6 characters');
                    } else {
                      setPasswordError('');
                    }
                  }}
                  className={`bg-secondary border-border focus:border-primary h-12 pr-10 ${passwordError ? 'border-destructive' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {passwordError && <p className="text-sm text-destructive">{passwordError}</p>}
            </div>

            <Button 
              type="submit" 
              disabled={!name || !email || !phone || !password || !!phoneError || !!emailError || !!passwordError || phone.length !== 10 || loading}
              className="w-full gradient-primary text-primary-foreground h-12 text-base font-semibold rounded-xl glow-primary hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline font-medium">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
