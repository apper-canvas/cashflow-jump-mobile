import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { getIcon } from './utils/iconUtils';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check for user's preferred color scheme
  useEffect(() => {
    const darkModePreference = localStorage.getItem('darkMode');
    if (darkModePreference === 'true' || 
       (!darkModePreference && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', newMode.toString());
      if (newMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return newMode;
    });
  };

  // Navigation items
  const navItems = [
    { name: 'Dashboard', icon: 'home', href: '/' },
    { name: 'Invoices', icon: 'file-text', href: '/' },
    { name: 'Expenses', icon: 'receipt', href: '/' },
  ];

  const MenuIcon = getIcon('menu');
  const XIcon = getIcon('x');
  const MoonIcon = getIcon('moon');
  const SunIcon = getIcon('sun');

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="bg-white dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsMenuOpen(true)} 
                className="md:hidden p-2 rounded-md hover:bg-surface-100 dark:hover:bg-surface-700"
              >
                <MenuIcon className="h-6 w-6 text-surface-600 dark:text-surface-300" />
              </button>
              <h1 className="text-xl font-bold text-primary">
                Cash<span className="text-secondary">Flow</span>
              </h1>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-4">
              {navItems.map((item) => {
                const Icon = getIcon(item.icon);
                return (
                  <a 
                    key={item.name}
                    href={item.href}
                    className="px-3 py-2 rounded-lg text-surface-600 hover:text-primary hover:bg-surface-100 flex items-center gap-2
                              dark:text-surface-300 dark:hover:text-primary-light dark:hover:bg-surface-700"
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </a>
                );
              })}
            </nav>
            
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600"
            >
              {isDarkMode ? (
                <SunIcon className="h-5 w-5 text-yellow-400" />
              ) : (
                <MoonIcon className="h-5 w-5 text-surface-600" />
              )}
            </button>
          </div>
        </div>
      </header>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden">
          <div className="bg-white dark:bg-surface-800 h-full w-64 p-4 flex flex-col shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-xl font-bold text-primary">
                Cash<span className="text-secondary">Flow</span>
              </h1>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-md hover:bg-surface-100 dark:hover:bg-surface-700"
              >
                <XIcon className="h-6 w-6 text-surface-600 dark:text-surface-300" />
              </button>
            </div>
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => {
                const Icon = getIcon(item.icon);
                return (
                  <a 
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="px-3 py-2 rounded-lg text-surface-600 hover:text-primary hover:bg-surface-100 flex items-center gap-2
                              dark:text-surface-300 dark:hover:text-primary-light dark:hover:bg-surface-700"
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </a>
                );
              })}
            </nav>
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      
      {/* Footer */}
      <footer className="bg-white dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700 py-4">
        <div className="container mx-auto px-4 text-center text-surface-500 dark:text-surface-400 text-sm">
          © {new Date().getFullYear()} CashFlow - Financial Management System
        </div>
      </footer>
      
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={isDarkMode ? "dark" : "light"}
      />
    </div>
  );
};

export default App;