import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Library, Search, BookOpen, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

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
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-baseline space-x-4">
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

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-indigo-100 hover:text-white p-2 rounded-md focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-indigo-700 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium ${isActive('/')}`}
              >
                <Library className="w-4 h-4" />
                My Books
              </Link>
              <Link
                to="/search"
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium ${isActive('/search')}`}
              >
                <Search className="w-4 h-4" />
                Search & Add
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
