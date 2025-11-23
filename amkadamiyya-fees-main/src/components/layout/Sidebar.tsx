import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HomeIcon,
  UsersIcon,
  CurrencyDollarIcon,
  DocumentChartBarIcon,
  ExclamationTriangleIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

interface NavItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { name: 'Dashboard', path: '/', icon: HomeIcon },
  { name: 'Students', path: '/students', icon: UsersIcon },
  { name: 'Record Payment', path: '/payments/record', icon: CurrencyDollarIcon },
  { name: 'Fee Structure', path: '/fee-structure', icon: ClipboardDocumentListIcon },
  { name: 'Debtors', path: '/debtors', icon: ExclamationTriangleIcon },
  { name: 'Reports', path: '/reports', icon: DocumentChartBarIcon },
  { name: 'Settings', path: '/settings', icon: Cog6ToothIcon },
];

export const Sidebar = () => {
  return (
    <motion.aside
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="hidden md:flex md:flex-col w-64 bg-card border-r border-border-gray h-screen sticky top-0"
    >
      {/* Logo */}
      <div className="p-6 border-b border-border-gray">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-xl">A</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-navy">Amkadamiyya</h1>
            <p className="text-xs text-gray">Fee Management</p>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item, index) => (
          <motion.div
            key={item.path}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-primary text-white shadow-md'
                    : 'text-gray hover:bg-primary-light hover:text-primary'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </NavLink>
          </motion.div>
        ))}
      </nav>
      
      {/* User Info */}
      <div className="p-4 border-t border-border-gray">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-light-gray">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white font-semibold">SA</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm text-navy truncate">Super Admin</p>
            <p className="text-xs text-gray truncate">admin@amkadamiyya.edu</p>
          </div>
        </div>
      </div>
    </motion.aside>
  );
};
