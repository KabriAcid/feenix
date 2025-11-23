import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FunnelIcon,
  ArrowDownTrayIcon,
  ChartBarIcon,
  TableCellsIcon,
  AdjustmentsHorizontalIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatDate, getClassColor, getPaymentStatusColor } from '@/lib/formatters';

// Mock data
const mockStudents = [
  { id: 1, name: 'Ahmed Ibrahim', admissionNo: 'AMK/2024/001', class: 'JSS 1', feeCategory: 'Regular', totalFees: 45000, amountPaid: 45000, balance: 0, status: 'Paid', lastPayment: '2024-01-15', guardianPhone: '08012345678' },
  { id: 2, name: 'Fatima Abubakar', admissionNo: 'AMK/2024/002', class: 'SSS 2', feeCategory: 'Regular', totalFees: 50000, amountPaid: 30000, balance: 20000, status: 'Partial', lastPayment: '2024-01-10', guardianPhone: '08023456789' },
  { id: 3, name: 'Musa Mohammed', admissionNo: 'AMK/2024/003', class: 'Primary 5', feeCategory: 'Scholarship', totalFees: 40000, amountPaid: 0, balance: 40000, status: 'Overdue', lastPayment: null, guardianPhone: '08034567890' },
  { id: 4, name: 'Aisha Usman', admissionNo: 'AMK/2024/004', class: 'Nursery 2', feeCategory: 'Regular', totalFees: 35000, amountPaid: 35000, balance: 0, status: 'Paid', lastPayment: '2024-01-20', guardianPhone: '08045678901' },
  { id: 5, name: 'Umar Abdullahi', admissionNo: 'AMK/2024/005', class: 'JSS 3', feeCategory: 'Indigent', totalFees: 30000, amountPaid: 15000, balance: 15000, status: 'Partial', lastPayment: '2024-01-05', guardianPhone: '08056789012' },
];

type FilterState = {
  searchQuery: string;
  classes: string[];
  paymentStatus: string[];
  feeCategories: string[];
  balanceRange: [number, number];
  dateFrom: string;
  dateTo: string;
};

export default function Analysis() {
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'summary'>('table');
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    classes: [],
    paymentStatus: [],
    feeCategories: [],
    balanceRange: [0, 100000],
    dateFrom: '',
    dateTo: '',
  });

  // Calculate summary metrics
  const filteredData = mockStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                         student.admissionNo.toLowerCase().includes(filters.searchQuery.toLowerCase());
    const matchesClass = filters.classes.length === 0 || filters.classes.includes(student.class);
    const matchesStatus = filters.paymentStatus.length === 0 || filters.paymentStatus.includes(student.status);
    const matchesCategory = filters.feeCategories.length === 0 || filters.feeCategories.includes(student.feeCategory);
    const matchesBalance = student.balance >= filters.balanceRange[0] && student.balance <= filters.balanceRange[1];
    
    return matchesSearch && matchesClass && matchesStatus && matchesCategory && matchesBalance;
  });

  const totalExpected = filteredData.reduce((sum, s) => sum + s.totalFees, 0);
  const totalRealized = filteredData.reduce((sum, s) => sum + s.amountPaid, 0);
  const totalOutstanding = filteredData.reduce((sum, s) => sum + s.balance, 0);
  const collectionRate = totalExpected > 0 ? (totalRealized / totalExpected) * 100 : 0;

  const paidCount = filteredData.filter(s => s.status === 'Paid').length;
  const partialCount = filteredData.filter(s => s.status === 'Partial').length;
  const overdueCount = filteredData.filter(s => s.status === 'Overdue').length;

  const clearFilters = () => {
    setFilters({
      searchQuery: '',
      classes: [],
      paymentStatus: [],
      feeCategories: [],
      balanceRange: [0, 100000],
      dateFrom: '',
      dateTo: '',
    });
  };

  const hasActiveFilters = filters.searchQuery || filters.classes.length > 0 || 
                          filters.paymentStatus.length > 0 || filters.feeCategories.length > 0 ||
                          filters.balanceRange[0] > 0 || filters.balanceRange[1] < 100000 ||
                          filters.dateFrom || filters.dateTo;

  return (
    <div className="min-h-screen bg-bg-body p-4 md:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Analysis & Reports</h1>
            <p className="text-muted-foreground mt-1">Powerful tools to analyze and manage fee data</p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => setViewMode(viewMode === 'table' ? 'summary' : 'table')}
              className="gap-2"
            >
              {viewMode === 'table' ? (
                <>
                  <ChartBarIcon className="w-4 h-4" />
                  Summary View
                </>
              ) : (
                <>
                  <TableCellsIcon className="w-4 h-4" />
                  Table View
                </>
              )}
            </Button>

            <Dialog open={filterModalOpen} onOpenChange={setFilterModalOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2 bg-gradient-primary text-white hover:opacity-90">
                  <FunnelIcon className="w-4 h-4" />
                  Filters
                  {hasActiveFilters && (
                    <Badge variant="secondary" className="ml-1 h-5 min-w-5 rounded-full px-1.5">
                      {[filters.classes.length, filters.paymentStatus.length, filters.feeCategories.length].reduce((a, b) => a + b, 0)}
                    </Badge>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <AdjustmentsHorizontalIcon className="w-5 h-5" />
                    Filter & Analysis Options
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 py-4">
                  {/* Search */}
                  <div className="space-y-2">
                    <Label>Search Student</Label>
                    <Input
                      placeholder="Search by name or admission number..."
                      value={filters.searchQuery}
                      onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                    />
                  </div>

                  {/* Class Filter */}
                  <div className="space-y-3">
                    <Label>Class</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {['Nursery 1', 'Nursery 2', 'Primary 1', 'Primary 5', 'JSS 1', 'JSS 3', 'SSS 2'].map(cls => (
                        <div key={cls} className="flex items-center gap-2">
                          <Checkbox
                            id={`class-${cls}`}
                            checked={filters.classes.includes(cls)}
                            onCheckedChange={(checked) => {
                              setFilters({
                                ...filters,
                                classes: checked
                                  ? [...filters.classes, cls]
                                  : filters.classes.filter(c => c !== cls)
                              });
                            }}
                          />
                          <Label htmlFor={`class-${cls}`} className="cursor-pointer font-normal">
                            {cls}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Payment Status */}
                  <div className="space-y-3">
                    <Label>Payment Status</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {['Paid', 'Partial', 'Overdue'].map(status => (
                        <div key={status} className="flex items-center gap-2">
                          <Checkbox
                            id={`status-${status}`}
                            checked={filters.paymentStatus.includes(status)}
                            onCheckedChange={(checked) => {
                              setFilters({
                                ...filters,
                                paymentStatus: checked
                                  ? [...filters.paymentStatus, status]
                                  : filters.paymentStatus.filter(s => s !== status)
                              });
                            }}
                          />
                          <Label htmlFor={`status-${status}`} className="cursor-pointer font-normal">
                            {status}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Fee Category */}
                  <div className="space-y-3">
                    <Label>Fee Category</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {['Regular', 'Scholarship', 'Indigent'].map(category => (
                        <div key={category} className="flex items-center gap-2">
                          <Checkbox
                            id={`category-${category}`}
                            checked={filters.feeCategories.includes(category)}
                            onCheckedChange={(checked) => {
                              setFilters({
                                ...filters,
                                feeCategories: checked
                                  ? [...filters.feeCategories, category]
                                  : filters.feeCategories.filter(c => c !== category)
                              });
                            }}
                          />
                          <Label htmlFor={`category-${category}`} className="cursor-pointer font-normal">
                            {category}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Balance Range */}
                  <div className="space-y-3">
                    <Label>Balance Range: {formatCurrency(filters.balanceRange[0])} - {formatCurrency(filters.balanceRange[1])}</Label>
                    <Slider
                      min={0}
                      max={100000}
                      step={5000}
                      value={filters.balanceRange}
                      onValueChange={(value) => setFilters({ ...filters, balanceRange: value as [number, number] })}
                      className="w-full"
                    />
                  </div>

                  {/* Date Range */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Date From</Label>
                      <Input
                        type="date"
                        value={filters.dateFrom}
                        onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Date To</Label>
                      <Input
                        type="date"
                        value={filters.dateTo}
                        onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-between pt-4 border-t">
                    <Button variant="outline" onClick={clearFilters}>
                      <XMarkIcon className="w-4 h-4 mr-2" />
                      Clear All
                    </Button>
                    <Button onClick={() => setFilterModalOpen(false)} className="bg-gradient-primary text-white">
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Button variant="outline" className="gap-2">
              <ArrowDownTrayIcon className="w-4 h-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <div className="bg-card rounded-xl p-6 shadow-soft border border-border">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Expected</p>
                <p className="text-2xl font-bold text-foreground mt-1">{formatCurrency(totalExpected)}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <ChartBarIcon className="w-5 h-5 text-primary" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3">From {filteredData.length} students</p>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-soft border border-border">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Realized</p>
                <p className="text-2xl font-bold text-emerald-600 mt-1">{formatCurrency(totalRealized)}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <ChartBarIcon className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3">{collectionRate.toFixed(1)}% collection rate</p>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-soft border border-border">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Outstanding</p>
                <p className="text-2xl font-bold text-amber-600 mt-1">{formatCurrency(totalOutstanding)}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <ChartBarIcon className="w-5 h-5 text-amber-600" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3">{partialCount + overdueCount} students with balance</p>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-soft border border-border">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Payment Status</p>
                <div className="flex gap-2 mt-2">
                  <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                    {paidCount} Paid
                  </Badge>
                  <Badge variant="secondary" className="bg-amber-50 text-amber-700 border-amber-200">
                    {partialCount} Partial
                  </Badge>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3">{overdueCount} overdue payments</p>
          </div>
        </motion.div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center gap-2 bg-card rounded-lg p-4 border border-border"
          >
            <span className="text-sm font-medium text-muted-foreground">Active Filters:</span>
            {filters.classes.map(cls => (
              <Badge key={cls} variant="secondary" className="gap-1">
                {cls}
                <XMarkIcon
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => setFilters({ ...filters, classes: filters.classes.filter(c => c !== cls) })}
                />
              </Badge>
            ))}
            {filters.paymentStatus.map(status => (
              <Badge key={status} variant="secondary" className="gap-1">
                {status}
                <XMarkIcon
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => setFilters({ ...filters, paymentStatus: filters.paymentStatus.filter(s => s !== status) })}
                />
              </Badge>
            ))}
            {filters.feeCategories.map(cat => (
              <Badge key={cat} variant="secondary" className="gap-1">
                {cat}
                <XMarkIcon
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => setFilters({ ...filters, feeCategories: filters.feeCategories.filter(c => c !== cat) })}
                />
              </Badge>
            ))}
            <Button variant="ghost" size="sm" onClick={clearFilters} className="h-7 text-xs">
              Clear All
            </Button>
          </motion.div>
        )}

        {/* Data Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-xl shadow-soft border border-border overflow-hidden"
        >
          <div className="p-6 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">Detailed Analysis</h2>
            <p className="text-sm text-muted-foreground mt-1">Showing {filteredData.length} of {mockStudents.length} students</p>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Expected</TableHead>
                  <TableHead className="text-right">Paid</TableHead>
                  <TableHead className="text-right">Balance</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Payment</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-foreground">{student.name}</div>
                        <div className="text-sm text-muted-foreground">{student.admissionNo}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getClassColor(student.class)}>
                        {student.class}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">{student.feeCategory}</span>
                    </TableCell>
                    <TableCell className="text-right font-medium">{formatCurrency(student.totalFees)}</TableCell>
                    <TableCell className="text-right font-medium text-emerald-600">{formatCurrency(student.amountPaid)}</TableCell>
                    <TableCell className="text-right font-medium text-amber-600">{formatCurrency(student.balance)}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getPaymentStatusColor(student.status)}>
                        {student.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {student.lastPayment ? formatDate(new Date(student.lastPayment)) : 'No payment'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
