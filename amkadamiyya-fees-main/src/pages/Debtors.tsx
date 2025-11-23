import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  UserGroupIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  PhoneIcon,
  DocumentArrowDownIcon,
  FunnelIcon,
} from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { SearchBar } from '@/components/ui/SearchBar';
import { formatCurrency, formatDate, getInitials } from '@/utils/formatters';

interface Debtor {
  id: string;
  name: string;
  admissionNo: string;
  class: string;
  amountOwed: number;
  lastPaymentDate: string;
  daysOverdue: number;
  guardianName: string;
  guardianPhone: string;
}

// Mock data
const mockDebtors: Debtor[] = [
  {
    id: '1',
    name: 'Aisha Muhammad',
    admissionNo: 'AMK001',
    class: 'JSS 1A',
    amountOwed: 45000,
    lastPaymentDate: '2024-01-15',
    daysOverdue: 45,
    guardianName: 'Malam Muhammad',
    guardianPhone: '08012345678',
  },
  {
    id: '2',
    name: 'Ibrahim Suleiman',
    admissionNo: 'AMK002',
    class: 'JSS 2B',
    amountOwed: 32000,
    lastPaymentDate: '2024-02-01',
    daysOverdue: 28,
    guardianName: 'Hajiya Fatima',
    guardianPhone: '08023456789',
  },
  {
    id: '3',
    name: 'Zainab Ali',
    admissionNo: 'AMK003',
    class: 'SS 1A',
    amountOwed: 58000,
    lastPaymentDate: '2023-12-20',
    daysOverdue: 70,
    guardianName: 'Alhaji Ali',
    guardianPhone: '08034567890',
  },
  {
    id: '4',
    name: 'Usman Bello',
    admissionNo: 'AMK004',
    class: 'JSS 3A',
    amountOwed: 15000,
    lastPaymentDate: '2024-02-20',
    daysOverdue: 10,
    guardianName: 'Mallama Hauwa',
    guardianPhone: '08045678901',
  },
];

const Debtors = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [minDebt, setMinDebt] = useState(0);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'highest' | 'lowest' | 'name' | 'class'>('highest');

  // Filter and sort debtors
  const filteredDebtors = useMemo(() => {
    let filtered = mockDebtors.filter((debtor) => {
      const matchesSearch =
        debtor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        debtor.admissionNo.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesMinDebt = debtor.amountOwed >= minDebt;
      const matchesClass =
        selectedClasses.length === 0 || selectedClasses.includes(debtor.class);
      return matchesSearch && matchesMinDebt && matchesClass;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'highest':
          return b.amountOwed - a.amountOwed;
        case 'lowest':
          return a.amountOwed - b.amountOwed;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'class':
          return a.class.localeCompare(b.class);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, minDebt, selectedClasses, sortBy]);

  // Calculate summary stats
  const totalDebtors = filteredDebtors.length;
  const totalDebt = filteredDebtors.reduce((sum, d) => sum + d.amountOwed, 0);
  const averageDebt = totalDebtors > 0 ? totalDebt / totalDebtors : 0;

  const getDebtSeverity = (amount: number) => {
    if (amount >= 50000) return 'danger';
    if (amount >= 30000) return 'warning';
    return 'info';
  };

  const handleCallGuardian = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleExport = (format: 'pdf' | 'excel' | 'email') => {
    console.log(`Exporting as ${format}`);
    // Export logic here
  };

  // Empty state
  if (mockDebtors.length === 0) {
    return (
      <div className="p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto text-center py-20"
        >
          <div className="w-32 h-32 mx-auto mb-6 bg-primary-light rounded-full flex items-center justify-center">
            <CheckCircleIcon className="w-20 h-20 text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-navy mb-4">
            No Outstanding Debts! 🎉
          </h2>
          <p className="text-gray text-lg">
            All students have cleared their fees. Excellent work!
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-navy mb-2">Debtors Tracking</h1>
          <p className="text-gray">Monitor and manage outstanding fee payments</p>
        </div>
        <Button
          variant="secondary"
          icon={<DocumentArrowDownIcon className="w-5 h-5" />}
          onClick={() => handleExport('pdf')}
        >
          Export Report
        </Button>
      </div>

      {/* Summary Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <Card className="bg-gradient-to-br from-accent-red/10 to-accent-red/5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray mb-1">Total Debtors</p>
                <p className="text-4xl font-bold text-navy">{totalDebtors}</p>
                <p className="text-sm text-accent-red mt-2 flex items-center gap-1">
                  <span>↑ 3 from last month</span>
                </p>
              </div>
              <div className="w-16 h-16 bg-accent-red/20 rounded-xl flex items-center justify-center">
                <UserGroupIcon className="w-8 h-8 text-accent-red" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <Card className="bg-gradient-to-br from-accent-amber/10 to-accent-amber/5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray mb-1">Total Outstanding</p>
                <p className="text-4xl font-bold text-navy">{formatCurrency(totalDebt)}</p>
                <p className="text-sm text-accent-amber mt-2 flex items-center gap-1">
                  <span>↑ {formatCurrency(12000)} from last month</span>
                </p>
              </div>
              <div className="w-16 h-16 bg-accent-amber/20 rounded-xl flex items-center justify-center">
                <CurrencyDollarIcon className="w-8 h-8 text-accent-amber" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <Card className="bg-gradient-to-br from-accent-blue/10 to-accent-blue/5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray mb-1">Average Debt</p>
                <p className="text-4xl font-bold text-navy">{formatCurrency(averageDebt)}</p>
                <p className="text-sm text-accent-blue mt-2 flex items-center gap-1">
                  <span>Per student</span>
                </p>
              </div>
              <div className="w-16 h-16 bg-accent-blue/20 rounded-xl flex items-center justify-center">
                <ChartBarIcon className="w-8 h-8 text-accent-blue" />
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>

      {/* Filters */}
      <Card>
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <FunnelIcon className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-navy">Filters</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <SearchBar
                placeholder="Search by name or admission no..."
                onSearch={setSearchQuery}
                fullWidth
              />
            </div>

            <div>
              <label className="block text-sm text-gray mb-2">
                Minimum Debt: {formatCurrency(minDebt)}
              </label>
              <input
                type="range"
                min="0"
                max="100000"
                step="5000"
                value={minDebt}
                onChange={(e) => setMinDebt(Number(e.target.value))}
                className="w-full h-2 bg-border-gray rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            <div>
              <label className="block text-sm text-gray mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full h-11 px-4 rounded-lg border-2 border-border-gray focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 outline-none font-medium bg-white"
              >
                <option value="highest">Highest Debt First</option>
                <option value="lowest">Lowest Debt First</option>
                <option value="name">Name (A-Z)</option>
                <option value="class">Class</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Debtors Grid */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.05,
            },
          },
        }}
      >
        {filteredDebtors.map((debtor) => (
          <motion.div
            key={debtor.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <Card variant="hoverable" className="relative">
              {/* Alert badge */}
              <div className="absolute top-4 right-4">
                <Badge variant={getDebtSeverity(debtor.amountOwed)} size="small">
                  {debtor.daysOverdue} days overdue
                </Badge>
              </div>

              <div className="flex gap-4">
                {/* Avatar */}
                <div className="w-16 h-16 bg-primary-light rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-primary">
                    {getInitials(debtor.name)}
                  </span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-navy text-lg mb-1">{debtor.name}</h3>
                  <div className="flex items-center gap-3 text-sm text-gray mb-3">
                    <span>{debtor.admissionNo}</span>
                    <span>•</span>
                    <span>{debtor.class}</span>
                  </div>

                  {/* Amount Owed */}
                  <div className="mb-4">
                    <p className="text-sm text-gray mb-1">Amount Owed</p>
                    <p
                      className={`text-3xl font-bold ${
                        debtor.amountOwed >= 50000
                          ? 'text-accent-red'
                          : debtor.amountOwed >= 30000
                          ? 'text-accent-amber'
                          : 'text-accent-blue'
                      }`}
                    >
                      {formatCurrency(debtor.amountOwed)}
                    </p>
                  </div>

                  {/* Last Payment */}
                  <p className="text-sm text-gray mb-4">
                    Last payment: {formatDate(new Date(debtor.lastPaymentDate))}
                  </p>

                  {/* Guardian Info */}
                  <div className="bg-light-gray rounded-lg p-3 mb-4">
                    <p className="text-sm font-medium text-navy mb-1">
                      {debtor.guardianName}
                    </p>
                    <a
                      href={`tel:${debtor.guardianPhone}`}
                      className="text-sm text-primary hover:underline"
                    >
                      {debtor.guardianPhone}
                    </a>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      size="small"
                      icon={<PhoneIcon className="w-4 h-4" />}
                      onClick={() => handleCallGuardian(debtor.guardianPhone)}
                    >
                      Call Guardian
                    </Button>
                    <Button variant="primary" size="small">
                      Record Payment
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* No results */}
      {filteredDebtors.length === 0 && mockDebtors.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-gray text-lg">No debtors match your filters</p>
        </motion.div>
      )}
    </div>
  );
};

export default Debtors;
