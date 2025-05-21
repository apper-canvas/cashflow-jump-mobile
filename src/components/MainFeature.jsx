import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { getIcon } from '../utils/iconUtils';

// Generate some mock data
const generateMockInvoices = () => {
  const clients = ['Acme Corp', 'TechStart Inc', 'Global Solutions', 'Innovate Ltd', 'Creative Media'];
  const statuses = ['paid', 'pending', 'overdue'];
  
  return Array.from({ length: 8 }, (_, i) => ({
    id: `INV-${2023}${i.toString().padStart(3, '0')}`,
    clientName: clients[Math.floor(Math.random() * clients.length)],
    invoiceNumber: `INV-${Math.floor(Math.random() * 10000)}`,
    amount: (Math.random() * 5000 + 500).toFixed(2),
    issueDate: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
    paymentStatus: statuses[Math.floor(Math.random() * statuses.length)],
  }));
};

const generateMockExpenses = () => {
  const categories = ['Office Supplies', 'Marketing', 'Software', 'Travel', 'Utilities', 'Rent'];
  const paymentMethods = ['Credit Card', 'Bank Transfer', 'Cash', 'PayPal'];
  
  return Array.from({ length: 10 }, (_, i) => ({
    id: `EXP-${2023}${i.toString().padStart(3, '0')}`,
    category: categories[Math.floor(Math.random() * categories.length)],
    amount: (Math.random() * 1000 + 50).toFixed(2),
    date: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
    paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
    description: `Expense for ${categories[Math.floor(Math.random() * categories.length)].toLowerCase()}`,
  }));
};

const MainFeature = ({ activeTab }) => {
  // State for invoices
  const [invoices, setInvoices] = useState(() => {
    const savedInvoices = localStorage.getItem('invoices');
    return savedInvoices ? JSON.parse(savedInvoices) : generateMockInvoices();
  });
  
  // State for expenses
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem('expenses');
    return savedExpenses ? JSON.parse(savedExpenses) : generateMockExpenses();
  });
  
  // State for forms
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  
  // State for form data
  const [newInvoice, setNewInvoice] = useState({
    clientName: '',
    invoiceNumber: '',
    amount: '',
    issueDate: format(new Date(), 'yyyy-MM-dd'),
    paymentStatus: 'pending'
  });
  
  const [newExpense, setNewExpense] = useState({
    category: '',
    amount: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    paymentMethod: '',
    description: ''
  });
  
  // State for filters
  const [invoiceFilter, setInvoiceFilter] = useState('all');
  const [expenseFilter, setExpenseFilter] = useState('all');
  
  // Save to localStorage when data changes
  useEffect(() => {
    localStorage.setItem('invoices', JSON.stringify(invoices));
  }, [invoices]);
  
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);
  
  // Handle invoice form submission
  const handleInvoiceSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!newInvoice.clientName || !newInvoice.invoiceNumber || !newInvoice.amount || !newInvoice.issueDate) {
      toast.error('Please fill all required fields');
      return;
    }
    
    const invoice = {
      ...newInvoice,
      id: `INV-${Date.now()}`,
      amount: Number(newInvoice.amount).toFixed(2),
      issueDate: new Date(newInvoice.issueDate)
    };
    
    setInvoices(prev => [invoice, ...prev]);
    setNewInvoice({
      clientName: '',
      invoiceNumber: '',
      amount: '',
      issueDate: format(new Date(), 'yyyy-MM-dd'),
      paymentStatus: 'pending'
    });
    setShowInvoiceForm(false);
    toast.success('Invoice created successfully');
  };
  
  // Handle expense form submission
  const handleExpenseSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!newExpense.category || !newExpense.amount || !newExpense.date || !newExpense.paymentMethod) {
      toast.error('Please fill all required fields');
      return;
    }
    
    const expense = {
      ...newExpense,
      id: `EXP-${Date.now()}`,
      amount: Number(newExpense.amount).toFixed(2),
      date: new Date(newExpense.date)
    };
    
    setExpenses(prev => [expense, ...prev]);
    setNewExpense({
      category: '',
      amount: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      paymentMethod: '',
      description: ''
    });
    setShowExpenseForm(false);
    toast.success('Expense added successfully');
  };
  
  // Update invoice status
  const updateInvoiceStatus = (id, status) => {
    setInvoices(prev => 
      prev.map(invoice => 
        invoice.id === id ? { ...invoice, paymentStatus: status } : invoice
      )
    );
    toast.success(`Invoice marked as ${status}`);
  };
  
  // Delete invoice
  const deleteInvoice = (id) => {
    setInvoices(prev => prev.filter(invoice => invoice.id !== id));
    toast.success('Invoice deleted successfully');
  };
  
  // Delete expense
  const deleteExpense = (id) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
    toast.success('Expense deleted successfully');
  };
  
  // Filter invoices
  const filteredInvoices = invoices.filter(invoice => 
    invoiceFilter === 'all' || invoice.paymentStatus === invoiceFilter
  );
  
  // Filter expenses
  const filteredExpenses = expenses.filter(expense => 
    expenseFilter === 'all' || expense.category === expenseFilter
  );
  
  // Get unique expense categories for filter
  const expenseCategories = [...new Set(expenses.map(expense => expense.category))];
  
  // Icons
  const PlusIcon = getIcon('plus');
  const FilterIcon = getIcon('filter');
  const TrashIcon = getIcon('trash-2');
  const CheckIcon = getIcon('check-circle');
  const ClockIcon = getIcon('clock');
  const AlertTriangleIcon = getIcon('alert-triangle');
  const EditIcon = getIcon('edit');
  const XIcon = getIcon('x');
  const DollarSignIcon = getIcon('dollar-sign');
  const ReceiptIcon = getIcon('receipt');
  const CalendarIcon = getIcon('calendar');
  const CreditCardIcon = getIcon('credit-card');
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 300 }
    }
  };
  
  const formVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 300 }
    },
    exit: {
      scale: 0.9,
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };
  
  return (
    <div className="mt-6">
      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Invoices Card */}
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-surface-800 dark:text-white">Recent Invoices</h3>
              <button 
                onClick={() => setActiveTab('invoices')}
                className="text-sm text-primary dark:text-primary-light hover:underline"
              >
                View All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-surface-200 dark:border-surface-700">
                    <th className="text-left py-2 font-medium text-surface-500 dark:text-surface-400">Client</th>
                    <th className="text-right py-2 font-medium text-surface-500 dark:text-surface-400">Amount</th>
                    <th className="text-right py-2 font-medium text-surface-500 dark:text-surface-400">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.slice(0, 5).map((invoice) => (
                    <tr key={invoice.id} className="border-b border-surface-100 dark:border-surface-800">
                      <td className="py-3 text-surface-800 dark:text-surface-200">{invoice.clientName}</td>
                      <td className="py-3 text-right text-surface-800 dark:text-surface-200">${invoice.amount}</td>
                      <td className="py-3 text-right">
                        <span className={`badge ${
                          invoice.paymentStatus === 'paid' ? 'badge-success' :
                          invoice.paymentStatus === 'pending' ? 'badge-warning' :
                          'badge-danger'
                        }`}>
                          {invoice.paymentStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Recent Expenses Card */}
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-surface-800 dark:text-white">Recent Expenses</h3>
              <button 
                onClick={() => setActiveTab('expenses')}
                className="text-sm text-primary dark:text-primary-light hover:underline"
              >
                View All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-surface-200 dark:border-surface-700">
                    <th className="text-left py-2 font-medium text-surface-500 dark:text-surface-400">Category</th>
                    <th className="text-right py-2 font-medium text-surface-500 dark:text-surface-400">Amount</th>
                    <th className="text-right py-2 font-medium text-surface-500 dark:text-surface-400">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.slice(0, 5).map((expense) => (
                    <tr key={expense.id} className="border-b border-surface-100 dark:border-surface-800">
                      <td className="py-3 text-surface-800 dark:text-surface-200">{expense.category}</td>
                      <td className="py-3 text-right text-surface-800 dark:text-surface-200">${expense.amount}</td>
                      <td className="py-3 text-right text-surface-500 dark:text-surface-400">
                        {format(new Date(expense.date), 'MMM dd, yyyy')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Financial Summary */}
          <div className="card col-span-1 lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4 text-surface-800 dark:text-white">Financial Summary</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-surface-50 dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700">
                <h4 className="text-sm font-medium text-surface-500 dark:text-surface-400">Total Income</h4>
                <p className="text-xl font-bold mt-1 text-surface-800 dark:text-white">
                  ${invoices.reduce((sum, i) => sum + parseFloat(i.amount), 0).toFixed(2)}
                </p>
              </div>
              <div className="p-4 bg-surface-50 dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700">
                <h4 className="text-sm font-medium text-surface-500 dark:text-surface-400">Total Expenses</h4>
                <p className="text-xl font-bold mt-1 text-surface-800 dark:text-white">
                  ${expenses.reduce((sum, e) => sum + parseFloat(e.amount), 0).toFixed(2)}
                </p>
              </div>
              <div className="p-4 bg-surface-50 dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700">
                <h4 className="text-sm font-medium text-surface-500 dark:text-surface-400">Pending Invoices</h4>
                <p className="text-xl font-bold mt-1 text-surface-800 dark:text-white">
                  ${invoices.filter(i => i.paymentStatus === 'pending').reduce((sum, i) => sum + parseFloat(i.amount), 0).toFixed(2)}
                </p>
              </div>
              <div className="p-4 bg-surface-50 dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700">
                <h4 className="text-sm font-medium text-surface-500 dark:text-surface-400">Net Balance</h4>
                <p className="text-xl font-bold mt-1 text-surface-800 dark:text-white">
                  ${(invoices.reduce((sum, i) => sum + parseFloat(i.amount), 0) - expenses.reduce((sum, e) => sum + parseFloat(e.amount), 0)).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Invoices Tab */}
      {activeTab === 'invoices' && (
        <div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-xl font-bold text-surface-800 dark:text-white">Invoice Tracker</h2>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <select
                  value={invoiceFilter}
                  onChange={(e) => setInvoiceFilter(e.target.value)}
                  className="select pr-8 appearance-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                  <option value="overdue">Overdue</option>
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-surface-500">
                  <FilterIcon className="h-4 w-4" />
                </div>
              </div>
              <button
                onClick={() => setShowInvoiceForm(true)}
                className="btn btn-primary"
              >
                <PlusIcon className="h-5 w-5" />
                <span>New Invoice</span>
              </button>
            </div>
          </div>
          
          {/* Invoice form */}
          <AnimatePresence>
            {showInvoiceForm && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={formVariants}
                className="mb-6"
              >
                <div className="card">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-surface-800 dark:text-white">Create New Invoice</h3>
                    <button 
                      onClick={() => setShowInvoiceForm(false)}
                      className="text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-200"
                    >
                      <XIcon className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <form onSubmit={handleInvoiceSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="clientName" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                          Client Name *
                        </label>
                        <input
                          type="text"
                          id="clientName"
                          value={newInvoice.clientName}
                          onChange={(e) => setNewInvoice({...newInvoice, clientName: e.target.value})}
                          placeholder="Enter client name"
                          className="input"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="invoiceNumber" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                          Invoice Number *
                        </label>
                        <input
                          type="text"
                          id="invoiceNumber"
                          value={newInvoice.invoiceNumber}
                          onChange={(e) => setNewInvoice({...newInvoice, invoiceNumber: e.target.value})}
                          placeholder="e.g. INV-2023001"
                          className="input"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                          Amount ($) *
                        </label>
                        <input
                          type="number"
                          id="amount"
                          value={newInvoice.amount}
                          onChange={(e) => setNewInvoice({...newInvoice, amount: e.target.value})}
                          placeholder="Enter amount"
                          min="0"
                          step="0.01"
                          className="input"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="issueDate" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                          Issue Date *
                        </label>
                        <input
                          type="date"
                          id="issueDate"
                          value={newInvoice.issueDate}
                          onChange={(e) => setNewInvoice({...newInvoice, issueDate: e.target.value})}
                          className="input"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="paymentStatus" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                          Payment Status
                        </label>
                        <select
                          id="paymentStatus"
                          value={newInvoice.paymentStatus}
                          onChange={(e) => setNewInvoice({...newInvoice, paymentStatus: e.target.value})}
                          className="select"
                        >
                          <option value="pending">Pending</option>
                          <option value="paid">Paid</option>
                          <option value="overdue">Overdue</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowInvoiceForm(false)}
                        className="btn btn-outline"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="btn btn-primary"
                      >
                        Create Invoice
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Invoices table */}
          {filteredInvoices.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="overflow-x-auto"
            >
              <table className="w-full bg-white dark:bg-surface-800 rounded-lg shadow overflow-hidden">
                <thead className="bg-surface-100 dark:bg-surface-700">
                  <tr>
                    <th className="text-left py-3 px-4 text-surface-700 dark:text-surface-300 font-medium">Client</th>
                    <th className="text-left py-3 px-4 text-surface-700 dark:text-surface-300 font-medium">Invoice #</th>
                    <th className="text-left py-3 px-4 text-surface-700 dark:text-surface-300 font-medium">Amount</th>
                    <th className="text-left py-3 px-4 text-surface-700 dark:text-surface-300 font-medium">Issue Date</th>
                    <th className="text-left py-3 px-4 text-surface-700 dark:text-surface-300 font-medium">Status</th>
                    <th className="text-right py-3 px-4 text-surface-700 dark:text-surface-300 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInvoices.map((invoice) => (
                    <motion.tr 
                      key={invoice.id} 
                      variants={itemVariants}
                      className="border-t border-surface-200 dark:border-surface-700"
                    >
                      <td className="py-3 px-4 text-surface-800 dark:text-surface-200">{invoice.clientName}</td>
                      <td className="py-3 px-4 text-surface-800 dark:text-surface-200">{invoice.invoiceNumber}</td>
                      <td className="py-3 px-4 text-surface-800 dark:text-surface-200">${invoice.amount}</td>
                      <td className="py-3 px-4 text-surface-500 dark:text-surface-400">
                        {format(new Date(invoice.issueDate), 'MMM dd, yyyy')}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`badge ${
                          invoice.paymentStatus === 'paid' ? 'badge-success' :
                          invoice.paymentStatus === 'pending' ? 'badge-warning' :
                          'badge-danger'
                        }`}>
                          {invoice.paymentStatus}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          {invoice.paymentStatus !== 'paid' && (
                            <button
                              onClick={() => updateInvoiceStatus(invoice.id, 'paid')}
                              className="p-1.5 bg-green-100 text-green-700 rounded-md hover:bg-green-200 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800"
                              title="Mark as Paid"
                            >
                              <CheckIcon className="h-4 w-4" />
                            </button>
                          )}
                          {invoice.paymentStatus === 'overdue' && (
                            <button
                              onClick={() => updateInvoiceStatus(invoice.id, 'pending')}
                              className="p-1.5 bg-yellow-100 text-yellow-700 rounded-md hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300 dark:hover:bg-yellow-800"
                              title="Mark as Pending"
                            >
                              <ClockIcon className="h-4 w-4" />
                            </button>
                          )}
                          {invoice.paymentStatus !== 'overdue' && invoice.paymentStatus !== 'paid' && (
                            <button
                              onClick={() => updateInvoiceStatus(invoice.id, 'overdue')}
                              className="p-1.5 bg-red-100 text-red-700 rounded-md hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800"
                              title="Mark as Overdue"
                            >
                              <AlertTriangleIcon className="h-4 w-4" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteInvoice(invoice.id)}
                            className="p-1.5 bg-red-100 text-red-700 rounded-md hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800"
                            title="Delete Invoice"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          ) : (
            <div className="text-center py-8">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-surface-500 dark:text-surface-400">No invoices found. Create your first invoice to get started.</p>
                {!showInvoiceForm && (
                  <button
                    onClick={() => setShowInvoiceForm(true)}
                    className="mt-3 btn btn-primary"
                  >
                    <PlusIcon className="h-5 w-5" />
                    <span>Create Invoice</span>
                  </button>
                )}
              </motion.div>
            </div>
          )}
        </div>
      )}
      
      {/* Expenses Tab */}
      {activeTab === 'expenses' && (
        <div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-xl font-bold text-surface-800 dark:text-white">Expense Tracker</h2>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <select
                  value={expenseFilter}
                  onChange={(e) => setExpenseFilter(e.target.value)}
                  className="select pr-8 appearance-none"
                >
                  <option value="all">All Categories</option>
                  {expenseCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-surface-500">
                  <FilterIcon className="h-4 w-4" />
                </div>
              </div>
              <button
                onClick={() => setShowExpenseForm(true)}
                className="btn btn-secondary"
              >
                <PlusIcon className="h-5 w-5" />
                <span>New Expense</span>
              </button>
            </div>
          </div>
          
          {/* Expense form */}
          <AnimatePresence>
            {showExpenseForm && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={formVariants}
                className="mb-6"
              >
                <div className="card">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-surface-800 dark:text-white">Add New Expense</h3>
                    <button 
                      onClick={() => setShowExpenseForm(false)}
                      className="text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-200"
                    >
                      <XIcon className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <form onSubmit={handleExpenseSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="category" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                          Category *
                        </label>
                        <input
                          type="text"
                          id="category"
                          value={newExpense.category}
                          onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
                          placeholder="e.g. Office Supplies"
                          className="input"
                          list="expenseCategories"
                          required
                        />
                        <datalist id="expenseCategories">
                          {expenseCategories.map(category => (
                            <option key={category} value={category} />
                          ))}
                        </datalist>
                      </div>
                      
                      <div>
                        <label htmlFor="expenseAmount" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                          Amount ($) *
                        </label>
                        <input
                          type="number"
                          id="expenseAmount"
                          value={newExpense.amount}
                          onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                          placeholder="Enter amount"
                          min="0"
                          step="0.01"
                          className="input"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="date" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                          Date *
                        </label>
                        <input
                          type="date"
                          id="date"
                          value={newExpense.date}
                          onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
                          className="input"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="paymentMethod" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                          Payment Method *
                        </label>
                        <select
                          id="paymentMethod"
                          value={newExpense.paymentMethod}
                          onChange={(e) => setNewExpense({...newExpense, paymentMethod: e.target.value})}
                          className="select"
                          required
                        >
                          <option value="">Select payment method</option>
                          <option value="Credit Card">Credit Card</option>
                          <option value="Bank Transfer">Bank Transfer</option>
                          <option value="Cash">Cash</option>
                          <option value="PayPal">PayPal</option>
                        </select>
                      </div>
                      
                      <div className="md:col-span-2">
                        <label htmlFor="description" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                          Description
                        </label>
                        <textarea
                          id="description"
                          value={newExpense.description}
                          onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                          placeholder="Add details about this expense"
                          className="input min-h-[80px]"
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowExpenseForm(false)}
                        className="btn btn-outline"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="btn btn-secondary"
                      >
                        Add Expense
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Expenses table */}
          {filteredExpenses.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="overflow-x-auto"
            >
              <table className="w-full bg-white dark:bg-surface-800 rounded-lg shadow overflow-hidden">
                <thead className="bg-surface-100 dark:bg-surface-700">
                  <tr>
                    <th className="text-left py-3 px-4 text-surface-700 dark:text-surface-300 font-medium">Category</th>
                    <th className="text-left py-3 px-4 text-surface-700 dark:text-surface-300 font-medium">Amount</th>
                    <th className="text-left py-3 px-4 text-surface-700 dark:text-surface-300 font-medium">Date</th>
                    <th className="text-left py-3 px-4 text-surface-700 dark:text-surface-300 font-medium">Payment Method</th>
                    <th className="text-left py-3 px-4 text-surface-700 dark:text-surface-300 font-medium">Description</th>
                    <th className="text-right py-3 px-4 text-surface-700 dark:text-surface-300 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredExpenses.map((expense) => (
                    <motion.tr 
                      key={expense.id} 
                      variants={itemVariants}
                      className="border-t border-surface-200 dark:border-surface-700"
                    >
                      <td className="py-3 px-4 text-surface-800 dark:text-surface-200">{expense.category}</td>
                      <td className="py-3 px-4 text-surface-800 dark:text-surface-200">${expense.amount}</td>
                      <td className="py-3 px-4 text-surface-500 dark:text-surface-400">
                        {format(new Date(expense.date), 'MMM dd, yyyy')}
                      </td>
                      <td className="py-3 px-4 text-surface-800 dark:text-surface-200">{expense.paymentMethod}</td>
                      <td className="py-3 px-4 text-surface-500 dark:text-surface-400">
                        {expense.description || '-'}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => deleteExpense(expense.id)}
                          className="p-1.5 bg-red-100 text-red-700 rounded-md hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800"
                          title="Delete Expense"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          ) : (
            <div className="text-center py-8">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-surface-500 dark:text-surface-400">No expenses found. Add your first expense to get started.</p>
                {!showExpenseForm && (
                  <button
                    onClick={() => setShowExpenseForm(true)}
                    className="mt-3 btn btn-secondary"
                  >
                    <PlusIcon className="h-5 w-5" />
                    <span>Add Expense</span>
                  </button>
                )}
              </motion.div>
            </div>
          )}
          
          {/* Summary cards */}
          {filteredExpenses.length > 0 && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="card flex items-center gap-4">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                  <ReceiptIcon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-surface-500 dark:text-surface-400">Total Expenses</p>
                  <p className="text-xl font-bold text-surface-800 dark:text-white">
                    ${filteredExpenses.reduce((sum, e) => sum + parseFloat(e.amount), 0).toFixed(2)}
                  </p>
                </div>
              </div>
              
              <div className="card flex items-center gap-4">
                <div className="p-3 rounded-full bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300">
                  <DollarSignIcon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-surface-500 dark:text-surface-400">Average</p>
                  <p className="text-xl font-bold text-surface-800 dark:text-white">
                    ${(filteredExpenses.reduce((sum, e) => sum + parseFloat(e.amount), 0) / filteredExpenses.length).toFixed(2)}
                  </p>
                </div>
              </div>
              
              <div className="card flex items-center gap-4">
                <div className="p-3 rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300">
                  <CalendarIcon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-surface-500 dark:text-surface-400">Last Expense</p>
                  <p className="text-xl font-bold text-surface-800 dark:text-white">
                    {format(new Date(Math.max(...filteredExpenses.map(e => new Date(e.date)))), 'MMM dd')}
                  </p>
                </div>
              </div>
              
              <div className="card flex items-center gap-4">
                <div className="p-3 rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-300">
                  <CreditCardIcon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-surface-500 dark:text-surface-400">Top Method</p>
                  <p className="text-xl font-bold text-surface-800 dark:text-white">
                    {Object.entries(
                      filteredExpenses.reduce((acc, e) => {
                        acc[e.paymentMethod] = (acc[e.paymentMethod] || 0) + 1;
                        return acc;
                      }, {})
                    ).sort((a, b) => b[1] - a[1])[0][0]}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MainFeature;