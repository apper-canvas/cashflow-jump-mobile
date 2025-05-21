import { Link } from 'react-router-dom';
import { getIcon } from '../utils/iconUtils';

const NotFound = () => {
  const AlertCircleIcon = getIcon('alert-circle');
  const HomeIcon = getIcon('home');

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="mb-4 text-primary">
        <AlertCircleIcon className="h-16 w-16 mx-auto" />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-surface-800 dark:text-white mb-2">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-surface-700 dark:text-surface-300 mb-4">Page Not Found</h2>
      <p className="text-surface-600 dark:text-surface-400 max-w-md mx-auto mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link 
        to="/" 
        className="btn btn-primary px-6"
      >
        <HomeIcon className="h-5 w-5" />
        <span>Return Home</span>
      </Link>
    </div>
  );
};

export default NotFound;