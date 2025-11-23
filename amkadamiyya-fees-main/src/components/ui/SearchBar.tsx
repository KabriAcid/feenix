import { useState, useEffect } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export const SearchBar = ({
  placeholder = 'Search...',
  onSearch,
  loading = false,
  fullWidth = true,
  className = '',
}: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  
  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [query]);
  
  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);
  
  const handleClear = () => {
    setQuery('');
    setDebouncedQuery('');
  };
  
  const widthStyle = fullWidth ? 'w-full' : 'w-80';
  
  return (
    <div className={`relative ${widthStyle} ${className}`}>
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray pointer-events-none">
        <MagnifyingGlassIcon className="w-5 h-5" />
      </div>
      
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full h-11 pl-11 pr-20 rounded-lg border-2 border-border-gray focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 outline-none font-medium"
      />
      
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
        {loading && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full"
          />
        )}
        
        <AnimatePresence>
          {query && (
            <motion.button
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              onClick={handleClear}
              className="text-gray hover:text-navy transition-colors tap-scale"
            >
              <XMarkIcon className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
