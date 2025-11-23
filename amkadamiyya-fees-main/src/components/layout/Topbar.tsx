import { BellIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export const Topbar = () => {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-40 bg-card border-b border-border-gray"
    >
      <div className="flex items-center justify-between px-6 py-4">
        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray hover:text-navy tap-scale">
          <Bars3Icon className="w-6 h-6" />
        </button>
        
        {/* School Name - Mobile */}
        <div className="md:hidden flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-white font-bold">A</span>
          </div>
          <h1 className="font-bold text-navy">Amkadamiyya</h1>
        </div>
        
        {/* Search - Desktop */}
        <div className="hidden md:block flex-1 max-w-xl">
          <div className="text-xl font-semibold text-navy">
            Welcome back! 👋
          </div>
        </div>
        
        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 text-gray hover:text-navy transition-colors"
          >
            <BellIcon className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-accent-red rounded-full"></span>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};
