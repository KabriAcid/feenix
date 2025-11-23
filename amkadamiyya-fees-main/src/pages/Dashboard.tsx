import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  UsersIcon, 
  CurrencyDollarIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  PlusIcon,
  ClipboardDocumentCheckIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

// Mock data
const metrics = [
  { title: 'Total Students', value: '1,247', icon: UsersIcon, trend: '+12%', color: 'text-primary' },
  { title: 'Expected Fees', value: formatCurrency(24850000), icon: ClipboardDocumentCheckIcon, trend: 'This Term', color: 'text-accent-blue' },
  { title: 'Amount Paid', value: formatCurrency(18640000), icon: CheckCircleIcon, trend: '+8.2%', color: 'text-primary' },
  { title: 'Outstanding', value: formatCurrency(6210000), icon: ExclamationCircleIcon, trend: '25%', color: 'text-accent-red' },
];

const classData = [
  { name: 'JSS 1', collected: 2450000 },
  { name: 'JSS 2', collected: 2680000 },
  { name: 'JSS 3', collected: 2120000 },
  { name: 'SS 1', collected: 3450000 },
  { name: 'SS 2', collected: 4230000 },
  { name: 'SS 3', collected: 3710000 },
];

const trendData = [
  { day: 'Day 1', amount: 450000 },
  { day: 'Day 5', amount: 680000 },
  { day: 'Day 10', amount: 920000 },
  { day: 'Day 15', amount: 1240000 },
  { day: 'Day 20', amount: 1680000 },
  { day: 'Day 25', amount: 2150000 },
  { day: 'Day 30', amount: 2840000 },
];

const recentPayments = [
  { id: 1, student: 'Fatima Ahmad', class: 'SS 2', amount: 45000, method: 'Bank Transfer', time: '5 mins ago' },
  { id: 2, student: 'Ibrahim Musa', class: 'JSS 3', amount: 38000, method: 'Cash', time: '12 mins ago' },
  { id: 3, student: 'Aisha Bello', class: 'SS 1', amount: 42000, method: 'POS', time: '25 mins ago' },
  { id: 4, student: 'Yusuf Hassan', class: 'JSS 1', amount: 35000, method: 'Bank Transfer', time: '1 hour ago' },
  { id: 5, student: 'Zainab Ali', class: 'SS 3', amount: 48000, method: 'Online', time: '2 hours ago' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Dashboard = () => {
  const collectionPercentage = (18640000 / 24850000) * 100;
  
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-navy">Dashboard</h1>
          <p className="text-gray mt-1">Monitor school fee collections and performance</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" size="small" icon={<EyeIcon className="w-5 h-5" />}>
            View Debtors
          </Button>
        </div>
      </div>
      
      {/* Metrics Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {metrics.map((metric, index) => (
          <motion.div key={metric.title} variants={itemVariants}>
            <Card variant="hoverable">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray font-medium">{metric.title}</p>
                  <h3 className="text-2xl font-bold text-navy mt-2 currency-text">{metric.value}</h3>
                  <Badge variant="neutral" size="small" className="mt-3">
                    {metric.trend}
                  </Badge>
                </div>
                <div className={`p-3 rounded-xl bg-primary-light ${metric.color}`}>
                  <metric.icon className="w-6 h-6" />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-navy">Collection Progress</h3>
              <span className="text-2xl font-bold text-primary">{collectionPercentage.toFixed(1)}%</span>
            </div>
            <div className="h-4 bg-light-gray rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${collectionPercentage}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-primary to-primary-dark rounded-full"
              />
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray">Collected: {formatCurrency(18640000)}</span>
              <span className="text-gray">Target: {formatCurrency(24850000)}</span>
            </div>
          </div>
        </Card>
      </motion.div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Collections by Class */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card title="Collections by Class" icon={<UsersIcon className="w-5 h-5" />}>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={classData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="name" stroke="#475569" />
                  <YAxis stroke="#475569" tickFormatter={(value) => `₦${(value / 1000000).toFixed(1)}M`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #E2E8F0', borderRadius: '0.5rem' }}
                    formatter={(value: number) => formatCurrency(value)}
                  />
                  <Bar dataKey="collected" fill="#059669" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>
        
        {/* Payment Trend */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card title="30-Day Payment Trend" icon={<CurrencyDollarIcon className="w-5 h-5" />}>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="day" stroke="#475569" />
                  <YAxis stroke="#475569" tickFormatter={(value) => `₦${(value / 1000000).toFixed(1)}M`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #E2E8F0', borderRadius: '0.5rem' }}
                    formatter={(value: number) => formatCurrency(value)}
                  />
                  <Line type="monotone" dataKey="amount" stroke="#059669" strokeWidth={3} dot={{ fill: '#059669', r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>
      </div>
      
      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card title="Recent Payments" icon={<CheckCircleIcon className="w-5 h-5" />}>
          <div className="space-y-3">
            {recentPayments.map((payment, index) => (
              <motion.div
                key={payment.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.05 }}
                className="flex items-center justify-between p-4 rounded-xl hover:bg-light-gray transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center">
                    <span className="text-primary font-semibold text-sm">{payment.student.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-navy">{payment.student}</p>
                    <p className="text-sm text-gray">{payment.class} • {payment.method}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary currency-text">{formatCurrency(payment.amount)}</p>
                  <p className="text-sm text-gray">{payment.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
      
      {/* Floating Action Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        className="fixed bottom-8 right-8 z-50"
      >
        <Button
          size="large"
          icon={<PlusIcon className="w-6 h-6" />}
          iconPosition="only"
          className="!rounded-full !w-16 !h-16 shadow-2xl"
        />
      </motion.div>
    </div>
  );
};

export default Dashboard;
