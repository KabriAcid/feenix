import { Layout } from '@/components/Layout';
import { MetricCard } from '@/components/MetricCard';
import { motion } from 'framer-motion';
import {
  UsersIcon,
  UserPlusIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  PlusIcon,
  ArrowUpTrayIcon,
} from '@heroicons/react/24/outline';
import { formatCurrency, getInitials, getClassColor, getPaymentStatusColor } from '@/lib/formatters';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

// Mock data
const metrics = {
  totalStudents: 1247,
  newThisTerm: 43,
  outstanding: 12500000,
  collectionRate: 72,
};

const students = [
  {
    id: 1,
    name: 'Amina Mohammed',
    admissionNo: 'AMK/2023/001',
    class: 'JSS 2A',
    category: 'Regular',
    balance: -45000,
    status: 'partial',
    lastPayment: '2025-11-15',
    guardianPhone: '+234 803 123 4567',
  },
  {
    id: 2,
    name: 'Ibrahim Yusuf',
    class: 'SSS 3B',
    admissionNo: 'AMK/2021/045',
    category: 'Regular',
    balance: 0,
    status: 'paid',
    lastPayment: '2025-11-20',
    guardianPhone: '+234 805 234 5678',
  },
  {
    id: 3,
    name: 'Fatima Hassan',
    class: 'Primary 4A',
    admissionNo: 'AMK/2022/128',
    category: 'Indigent',
    balance: -15000,
    status: 'partial',
    lastPayment: '2025-10-30',
    guardianPhone: '+234 807 345 6789',
  },
  {
    id: 4,
    name: 'Musa Abdullahi',
    class: 'SSS 2A',
    admissionNo: 'AMK/2022/089',
    category: 'Regular',
    balance: -125000,
    status: 'overdue',
    lastPayment: '2025-09-10',
    guardianPhone: '+234 809 456 7890',
  },
  {
    id: 5,
    name: 'Aisha Ibrahim',
    class: 'JSS 3B',
    admissionNo: 'AMK/2022/156',
    category: 'Scholarship',
    balance: 0,
    status: 'paid',
    lastPayment: '2025-11-18',
    guardianPhone: '+234 802 567 8901',
  },
];

const Students = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold text-foreground">Students</h1>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <ArrowUpTrayIcon className="w-4 h-4 mr-2" />
                Bulk Upload
              </Button>
              <Button size="sm" className="bg-gradient-primary">
                <PlusIcon className="w-4 h-4 mr-2" />
                Add Student
              </Button>
            </div>
          </div>
          <p className="text-muted-foreground">Manage student records and fee information</p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Students"
            value={metrics.totalStudents}
            icon={UsersIcon}
            trend={{ value: 5, isPositive: true }}
            index={0}
          />
          <MetricCard
            title="New This Term"
            value={metrics.newThisTerm}
            icon={UserPlusIcon}
            trend={{ value: 12, isPositive: true }}
            index={1}
          />
          <MetricCard
            title="Outstanding Fees"
            value={formatCurrency(metrics.outstanding)}
            icon={CurrencyDollarIcon}
            trend={{ value: 3, isPositive: false }}
            index={2}
          />
          <MetricCard
            title="Collection Rate"
            value={`${metrics.collectionRate}%`}
            icon={ChartBarIcon}
            trend={{ value: 4, isPositive: true }}
            index={3}
          />
        </div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <Card className="card-shadow">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, admission number, or class..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="sm:w-auto"
                >
                  <FunnelIcon className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Students Table/Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="card-shadow">
            <CardContent className="p-0">
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50 border-b border-border">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold text-sm text-foreground">
                        Student
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-sm text-foreground">
                        Admission No
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-sm text-foreground">
                        Class
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-sm text-foreground">
                        Category
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-sm text-foreground">
                        Balance
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-sm text-foreground">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-sm text-foreground">
                        Guardian
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-sm text-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {students.map((student, index) => (
                      <motion.tr
                        key={student.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + index * 0.05 }}
                        className="hover:bg-muted/30 transition-colors"
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
                              <span className="text-sm font-semibold text-white">
                                {getInitials(student.name)}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{student.name}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">
                          {student.admissionNo}
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={getClassColor(student.class)} variant="outline">
                            {student.class}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">
                          {student.category}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`font-semibold ${
                              student.balance < 0 ? 'text-red-600' : 'text-emerald-600'
                            }`}
                          >
                            {formatCurrency(Math.abs(student.balance))}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <Badge
                            className={getPaymentStatusColor(student.status)}
                            variant="outline"
                          >
                            {student.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <a
                            href={`tel:${student.guardianPhone}`}
                            className="text-sm text-primary hover:underline"
                          >
                            {student.guardianPhone}
                          </a>
                        </td>
                        <td className="py-3 px-4">
                          <Button size="sm" variant="ghost">
                            View
                          </Button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden divide-y divide-border">
                {students.map((student, index) => (
                  <motion.div
                    key={student.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.05 }}
                    className="p-4 hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-semibold text-white">
                          {getInitials(student.name)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground mb-1">{student.name}</h3>
                        <p className="text-xs text-muted-foreground mb-1">
                          {student.admissionNo}
                        </p>
                        <div className="flex gap-2 flex-wrap">
                          <Badge className={getClassColor(student.class)} variant="outline">
                            {student.class}
                          </Badge>
                          <Badge
                            className={getPaymentStatusColor(student.status)}
                            variant="outline"
                          >
                            {student.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Balance</p>
                        <p
                          className={`font-semibold ${
                            student.balance < 0 ? 'text-red-600' : 'text-emerald-600'
                          }`}
                        >
                          {formatCurrency(Math.abs(student.balance))}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" asChild>
                          <a href={`tel:${student.guardianPhone}`}>Call</a>
                        </Button>
                        <Button size="sm" variant="ghost">
                          View
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Students;
