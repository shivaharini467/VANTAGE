import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from './UserContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useUser();
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrPhone || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    const success = login(emailOrPhone, password);
    if (success) {
      toast.success('Welcome back!');
      const saved = JSON.parse(localStorage.getItem('vantage_user') || '{}');
      navigate(saved.role ? '/home' : '/role-selection');
    } else {
      toast.error('Invalid credentials. Please sign up first.');
    }
  };

  const handleSendOtp = () => {
    if (!emailOrPhone) {
      toast.error('Enter your email or phone number');
      return;
    }
    setOtpSent(true);
    toast.success('OTP sent to ' + emailOrPhone);
  };

  const handleVerifyOtp = () => {
    if (otp.length === 6) {
      toast.success('Password reset successful! Use your new password to login.');
      setShowForgot(false);
      setOtpSent(false);
      setOtp('');
    } else {
      toast.error('Enter a valid 6-digit OTP');
    }
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link to="/">
            <h1 className="text-4xl font-bold font-heading text-gradient">vantage</h1>
          </Link>
          <p className="mt-2 text-muted-foreground">
            {showForgot ? 'Reset your password' : 'Sign in to your account'}
          </p>
        </div>

        <div className="glass rounded-2xl p-8 space-y-6">
          {!showForgot ? (
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="emailOrPhone" className="text-foreground">Email or Phone Number</Label>
                <Input
                  id="emailOrPhone"
                  placeholder="Enter your email or phone"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  className="bg-secondary border-border focus:border-primary h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-secondary border-border focus:border-primary h-12 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowForgot(true)}
                className="text-sm text-primary hover:underline"
              >
                Forgot password?
              </button>

              <Button type="submit" className="w-full gradient-primary text-primary-foreground h-12 text-base font-semibold rounded-xl glow-primary hover:opacity-90">
                Sign In
              </Button>
            </form>
          ) : (
            <div className="space-y-5">
              <div className="space-y-2">
                <Label className="text-foreground">Email or Phone Number</Label>
                <Input
                  placeholder="Enter your email or phone"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  className="bg-secondary border-border focus:border-primary h-12"
                />
              </div>

              {!otpSent ? (
                <Button onClick={handleSendOtp} className="w-full gradient-primary text-primary-foreground h-12 rounded-xl">
                  Send OTP
                </Button>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-foreground">Enter OTP</Label>
                    <Input
                      placeholder="6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      maxLength={6}
                      className="bg-secondary border-border focus:border-primary h-12 text-center tracking-[0.5em] text-lg"
                    />
                  </div>
                  <Button onClick={handleVerifyOtp} className="w-full gradient-primary text-primary-foreground h-12 rounded-xl">
                    Verify OTP
                  </Button>
                </div>
              )}

              <button
                type="button"
                onClick={() => { setShowForgot(false); setOtpSent(false); }}
                className="text-sm text-primary hover:underline w-full text-center block"
              >
                Back to login
              </button>
            </div>
          )}

          <div className="text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary hover:underline font-medium">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;