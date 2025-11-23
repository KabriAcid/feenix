import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SearchBar } from '@/components/ui/SearchBar';
import { PlusIcon, ArrowUpTrayIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { formatCurrency, getInitials } from '@/utils/formatters';

// Mock data
const students = [
  { id: 1, name: 'Fatima Ahmad', admissionNo: 'AMK/2023/001', class: 'SS 2', balance: 45000, status: 'partial' },
  { id: 2, name: 'Ibrahim Musa', admissionNo: 'AMK/2023/002', class: 'JSS 3', balance: 0, status: 'paid' },
  { id: 3, name: 'Aisha Bello', admissionNo: 'AMK/2023/003', class: 'SS 1', balance: 38000, status: 'partial' },
  { id: 4, name: 'Yusuf Hassan', admissionNo: 'AMK/2023/004', class: 'JSS 1', balance: 42000, status: 'unpaid' },
  { id: 5, name: 'Zainab Ali', admissionNo: 'AMK/2023/005', class: 'SS 3', balance: 0, status: 'paid' },
  { id: 6, name: 'Muhammad Bala', admissionNo: 'AMK/2023/006', class: 'JSS 2', balance: 35000, status: 'partial' },
  { id: 7, name: 'Hauwa Usman', admissionNo: 'AMK/2023/007', class: 'SS 1', balance: 48000, status: 'unpaid' },
  { id: 8, name: 'Abdullahi Sani', admissionNo: 'AMK/2023/008', class: 'JSS 3', balance: 0, status: 'paid' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

const Students = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredStudents, setFilteredStudents] = useState(students);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      const filtered = students.filter(
        (s) =>
          s.name.toLowerCase().includes(query.toLowerCase()) ||
          s.admissionNo.toLowerCase().includes(query.toLowerCase()) ||
          s.class.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredStudents(filtered);
    } else {
      setFilteredStudents(students);
    }
  };
  
  const getStatusBadge = (status: string, balance: number) => {
    if (status === 'paid') return <Badge variant="success">Paid</Badge>;
    if (status === 'partial') return <Badge variant="warning">Partial</Badge>;
    return <Badge variant="danger">Unpaid</Badge>;
  };
  
  const getBalanceColor = (balance: number) => {
    if (balance === 0) return 'text-primary';
    if (balance < 40000) return 'text-accent-amber';
    return 'text-accent-red';
  };
  
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-navy">Students</h1>
          <p className="text-gray mt-1">{students.length} total students</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" size="small" icon={<ArrowUpTrayIcon className="w-5 h-5" />}>
            Bulk Upload
          </Button>
          <Button size="small" icon={<PlusIcon className="w-5 h-5" />}>
            Add Student
          </Button>
        </div>
      </div>
      
      {/* Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              placeholder="Search students by name, admission no, or class..."
              onSearch={handleSearch}
            />
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" icon={<FunnelIcon className="w-5 h-5" />}>
              Filters
            </Button>
          </div>
        </div>
      </Card>
      
      {/* Students Grid */}
      {filteredStudents.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredStudents.map((student) => (
            <motion.div key={student.id} variants={itemVariants}>
              <Card variant="hoverable" onClick={() => navigate(`/students/${student.id}`)}>
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="w-14 h-14 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold text-lg">{getInitials(student.name)}</span>
                  </div>
                  
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-navy truncate">{student.name}</h3>
                    <p className="text-sm text-gray">{student.admissionNo}</p>
                    <p className="text-sm text-gray mt-1">{student.class}</p>
                    
                    {/* Balance */}
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray">Outstanding:</span>
                        <span className={`font-bold currency-text ${getBalanceColor(student.balance)}`}>
                          {formatCurrency(student.balance)}
                        </span>
                      </div>
                      {getStatusBadge(student.status, student.balance)}
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="mt-4 pt-4 border-t border-border-gray flex gap-2">
                  <Button
                    size="small"
                    fullWidth
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/students/${student.id}`);
                    }}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="secondary"
                    size="small"
                    fullWidth
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/payments/record', { state: { student } });
                    }}
                  >
                    Pay
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <Card>
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-navy mb-2">No students found</h3>
            <p className="text-gray">Try adjusting your search or filters</p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Students;
