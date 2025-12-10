'use client';

import { useState } from 'react';

interface Customer {
  id: number;
  name: string;
  email: string;
  company: string;
  phone: string;
  status: 'Active' | 'Inactive' | 'Pending';
  totalValue: string;
  lastContact: string;
  joinedDate: string;
}

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const [customers] = useState<Customer[]>([
    {
      id: 1,
      name: 'Emily Davis',
      email: 'emily@startup.com',
      company: 'Startup Hub',
      phone: '+1 (555) 678-9012',
      status: 'Active',
      totalValue: '$15,000',
      lastContact: '2024-12-08',
      joinedDate: '2024-12-03',
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael@techsolutions.com',
      company: 'Tech Solutions Inc',
      phone: '+1 (555) 234-8765',
      status: 'Active',
      totalValue: '$32,500',
      lastContact: '2024-12-07',
      joinedDate: '2024-11-15',
    },
    {
      id: 3,
      name: 'Sarah Johnson',
      email: 'sarah@enterprise.com',
      company: 'Enterprise Co',
      phone: '+1 (555) 345-2109',
      status: 'Active',
      totalValue: '$48,000',
      lastContact: '2024-12-09',
      joinedDate: '2024-10-20',
    },
    {
      id: 4,
      name: 'Robert Williams',
      email: 'robert@globalcorp.com',
      company: 'Global Corp',
      phone: '+1 (555) 456-7821',
      status: 'Inactive',
      totalValue: '$12,000',
      lastContact: '2024-11-20',
      joinedDate: '2024-09-05',
    },
    {
      id: 5,
      name: 'Lisa Anderson',
      email: 'lisa@innovate.com',
      company: 'Innovate LLC',
      phone: '+1 (555) 567-3456',
      status: 'Active',
      totalValue: '$25,800',
      lastContact: '2024-12-10',
      joinedDate: '2024-11-01',
    },
    {
      id: 6,
      name: 'James Martinez',
      email: 'james@digital.com',
      company: 'Digital Media',
      phone: '+1 (555) 678-9876',
      status: 'Pending',
      totalValue: '$0',
      lastContact: '2024-12-09',
      joinedDate: '2024-12-09',
    },
  ]);

  const statuses = ['All', 'Active', 'Inactive', 'Pending'];

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || customer.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
        <p className="text-gray-600 mt-2">View and manage your customer base</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by name, email, or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status Filter */}
          <div className="flex gap-2 flex-wrap">
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterStatus === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredCustomers.length} of {customers.length} customers
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{customer.company}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{customer.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{customer.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        customer.status
                      )}`}
                    >
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{customer.totalValue}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{customer.lastContact}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{customer.joinedDate}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredCustomers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No customers found matching your criteria</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterStatus('All');
              }}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
