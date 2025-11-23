import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  ArrowLeftIcon,
  PhoneIcon,
  EnvelopeIcon,
  CalendarIcon,
  AcademicCapIcon,
  UserIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/24/outline';
import { formatCurrency, formatDate, getInitials } from '@/utils/formatters';

// Mock student data
const studentData = {
  id: 1,
  name: 'Fatima Ahmad',
  admissionNo: 'AMK/2023/001',
  class: 'SS 2',
  age: 16,
  dateOfBirth: '2008-03-15',
  joinDate: '2020-09-01',
  gender: 'Female',
  balance: 45000,
  totalFees: 120000,
  paid: 75000,
  status: 'partial',
  guardian: {
    name: 'Alhaji Ahmad Ibrahim',
    phone: '+234 803 456 7890',
    email: 'ahmad.ibrahim@email.com',
    relationship: 'Father',
    address: 'No. 45 Hammaruwa Way, Jalingo',
  },
  payments: [
    { id: 1, date: '2024-01-15', amount: 40000, method: 'Bank Transfer', reference: 'TRX123456' },
    { id: 2, date: '2024-01-05', amount: 35000, method: 'Cash', reference: '-' },
  ],
};

const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'payments' | 'invoices'>('overview');
  
  const student = studentData;
  
  const tabs = [
    { id: 'overview' as const, label: 'Overview' },
    { id: 'payments' as const, label: 'Payment History' },
    { id: 'invoices' as const, label: 'Invoices' },
  ];
  
  return (
    <div className="p-6 space-y-6">
      {/* Back Button */}
      <Button
        variant="ghost"
        size="small"
        icon={<ArrowLeftIcon className="w-5 h-5" />}
        onClick={() => navigate('/students')}
      >
        Back to Students
      </Button>
      
      {/* Hero Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card variant="highlighted">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar Section */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-24 h-24 rounded-2xl bg-primary-light flex items-center justify-center">
                <span className="text-primary font-bold text-3xl">{getInitials(student.name)}</span>
              </div>
              {student.status === 'paid' && <Badge variant="success">Fully Paid</Badge>}
              {student.status === 'partial' && <Badge variant="warning">Partial Payment</Badge>}
              {student.status === 'unpaid' && <Badge variant="danger">Unpaid</Badge>}
            </div>
            
            {/* Info Section */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-navy">{student.name}</h1>
                  <p className="text-gray mt-1">{student.admissionNo} • {student.class}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray">Outstanding Balance</p>
                  <h2 className={`text-3xl font-bold currency-text ${
                    student.balance === 0 ? 'text-primary' : student.balance < 40000 ? 'text-accent-amber' : 'text-accent-red'
                  }`}>
                    {formatCurrency(student.balance)}
                  </h2>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button icon={<CurrencyDollarIcon className="w-5 h-5" />}>
                  Record Payment
                </Button>
                <Button variant="secondary" icon={<DocumentTextIcon className="w-5 h-5" />}>
                  Print Summary
                </Button>
                <Button variant="ghost" iconPosition="only" icon={<EllipsisVerticalIcon className="w-5 h-5" />} />
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
      
      {/* Quick Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-start gap-3">
            <div className="p-3 rounded-xl bg-primary-light text-primary">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-gray">Join Date</p>
              <p className="font-semibold text-navy mt-1">{formatDate(student.joinDate)}</p>
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-start gap-3">
            <div className="p-3 rounded-xl bg-primary-light text-primary">
              <AcademicCapIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-gray">Current Class</p>
              <p className="font-semibold text-navy mt-1">{student.class}</p>
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-start gap-3">
            <div className="p-3 rounded-xl bg-primary-light text-primary">
              <UserIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-gray">Guardian</p>
              <p className="font-semibold text-navy mt-1">{student.guardian.name}</p>
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-start gap-3">
            <div className="p-3 rounded-xl bg-primary-light text-primary">
              <PhoneIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-gray">Contact</p>
              <p className="font-semibold text-navy mt-1">{student.guardian.phone}</p>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-border-gray">
        <div className="flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 px-1 font-medium transition-colors relative ${
                activeTab === tab.id ? 'text-primary' : 'text-gray hover:text-navy'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
      
      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Personal Info */}
            <Card title="Personal Information" icon={<UserIcon className="w-5 h-5" />}>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray">Full Name</p>
                    <p className="font-semibold text-navy mt-1">{student.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray">Admission No</p>
                    <p className="font-semibold text-navy mt-1">{student.admissionNo}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray">Date of Birth</p>
                    <p className="font-semibold text-navy mt-1">{formatDate(student.dateOfBirth)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray">Age</p>
                    <p className="font-semibold text-navy mt-1">{student.age} years</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray">Gender</p>
                    <p className="font-semibold text-navy mt-1">{student.gender}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray">Current Class</p>
                    <p className="font-semibold text-navy mt-1">{student.class}</p>
                  </div>
                </div>
              </div>
            </Card>
            
            {/* Guardian Info */}
            <Card title="Guardian Information" icon={<UserIcon className="w-5 h-5" />}>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray">Guardian Name</p>
                  <p className="font-semibold text-navy mt-1">{student.guardian.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray">Relationship</p>
                  <p className="font-semibold text-navy mt-1">{student.guardian.relationship}</p>
                </div>
                <div>
                  <p className="text-sm text-gray">Phone Number</p>
                  <p className="font-semibold text-navy mt-1 flex items-center gap-2">
                    <PhoneIcon className="w-4 h-4 text-primary" />
                    {student.guardian.phone}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray">Email</p>
                  <p className="font-semibold text-navy mt-1 flex items-center gap-2">
                    <EnvelopeIcon className="w-4 h-4 text-primary" />
                    {student.guardian.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray">Address</p>
                  <p className="font-semibold text-navy mt-1">{student.guardian.address}</p>
                </div>
              </div>
            </Card>
          </div>
        )}
        
        {activeTab === 'payments' && (
          <Card title="Payment History" icon={<CurrencyDollarIcon className="w-5 h-5" />}>
            <div className="space-y-4">
              {student.payments.map((payment, index) => (
                <motion.div
                  key={payment.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-light-gray transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0">
                    <CurrencyDollarIcon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold text-navy">{formatDate(payment.date)}</p>
                      <p className="font-bold text-primary currency-text">{formatCurrency(payment.amount)}</p>
                    </div>
                    <p className="text-sm text-gray">{payment.method} {payment.reference !== '-' && `• ${payment.reference}`}</p>
                  </div>
                  <Button variant="secondary" size="small">
                    Download
                  </Button>
                </motion.div>
              ))}
            </div>
          </Card>
        )}
        
        {activeTab === 'invoices' && (
          <Card title="Term Invoices" icon={<DocumentTextIcon className="w-5 h-5" />}>
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📄</div>
              <h3 className="text-xl font-semibold text-navy mb-2">No invoices available</h3>
              <p className="text-gray">Invoices will appear here once generated</p>
            </div>
          </Card>
        )}
      </motion.div>
    </div>
  );
};

export default StudentDetails;
