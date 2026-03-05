import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen gradient-hero flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-9xl font-bold font-heading text-gradient mb-4">404</h1>
      <h2 className="text-3xl font-heading font-bold text-foreground mb-2">Page Not Found</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        Sorry, the page you're looking for doesn't exist. Let's get you back on track.
      </p>
      <button
        onClick={() => navigate('/')}
        className="px-6 py-2 gradient-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
      >
        Go Home
      </button>
    </div>
  );
};

export default NotFound;
