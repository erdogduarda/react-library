import { Link, useLocation } from 'react-router-dom';
import { Library, Search, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

export function Navbar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path 
      ? 'bg-indigo-700 text-white shadow-md' 
      : 'text-indigo-100 hover:bg-indigo-600 hover:text-white';
  };

  return (
    <nav className="bg-indigo-600 shadow-lg sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-white" />
            <Link to="/" className="text-white font-bold text-xl tracking-tight">
              My Library
            </Link>
          </div>
          <div className="flex items-baseline space-x-4">
            <Link
              to="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${isActive('/')}`}
            >
              <Library className="w-4 h-4" />
              My Books
            </Link>
            <Link
              to="/search"
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${isActive('/search')}`}
            >
              <Search className="w-4 h-4" />
              Search & Add
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
