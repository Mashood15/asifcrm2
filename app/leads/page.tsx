'use client';

import { useState } from 'react';
import AddLeadModal, { NewLead } from './AddLeadModal';
import FollowUpModal from './FollowUpModal';

interface Lead {
  id: number;
  name: string;
  email: string;
  company: string;
  phone: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Proposal' | 'Won' | 'Lost';
  value: string;
  source: string;
  createdAt: string;
}

interface FollowUp {
  id: number;
  date: string;
  type: 'Call' | 'Email' | 'Meeting' | 'Note';
  description: string;
  outcome: string;
}

export default function LeadsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFollowUpModalOpen, setIsFollowUpModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const [leads, setLeads] = useState<Lead[]>([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@techcorp.com',
      company: 'Tech Corp',
      phone: '+1 (555) 123-4567',
      status: 'New',
      value: '$5,000',
      source: 'Website',
      createdAt: '2024-12-08',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@innovate.com',
      company: 'Innovate LLC',
      phone: '+1 (555) 234-5678',
      status: 'Contacted',
      value: '$8,500',
      source: 'Referral',
      createdAt: '2024-12-07',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@global.com',
      company: 'Global Systems',
      phone: '+1 (555) 345-6789',
      status: 'Qualified',
      value: '$12,000',
      source: 'LinkedIn',
      createdAt: '2024-12-06',
    },
    {
      id: 4,
      name: 'Sarah Williams',
      email: 'sarah@digital.com',
      company: 'Digital Solutions',
      phone: '+1 (555) 456-7890',
      status: 'New',
      value: '$6,200',
      source: 'Website',
      createdAt: '2024-12-05',
    },
    {
      id: 5,
      name: 'Robert Brown',
      email: 'robert@enterprise.com',
      company: 'Enterprise Inc',
      phone: '+1 (555) 567-8901',
      status: 'Proposal',
      value: '$25,000',
      source: 'Cold Call',
      createdAt: '2024-12-04',
    },
    {
      id: 6,
      name: 'Emily Davis',
      email: 'emily@startup.com',
      company: 'Startup Hub',
      phone: '+1 (555) 678-9012',
      status: 'Won',
      value: '$15,000',
      source: 'Email Campaign',
      createdAt: '2024-12-03',
    },
    {
      id: 7,
      name: 'David Martinez',
      email: 'david@solutions.com',
      company: 'Solutions Group',
      phone: '+1 (555) 789-0123',
      status: 'Contacted',
      value: '$9,500',
      source: 'Trade Show',
      createdAt: '2024-12-02',
    },
    {
      id: 8,
      name: 'Lisa Anderson',
      email: 'lisa@consulting.com',
      company: 'Consulting Pro',
      phone: '+1 (555) 890-1234',
      status: 'Lost',
      value: '$7,800',
      source: 'Website',
      createdAt: '2024-12-01',
    },
  ]);

  const handleAddLead = (newLead: NewLead) => {
    const lead: Lead = {
      id: leads.length + 1,
      ...newLead,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setLeads([lead, ...leads]);
  };

  // Sample follow-up data (in real app, this would come from backend)
  const getFollowUpsForLead = (leadId: number): FollowUp[] => {
    const followUpData: Record<number, FollowUp[]> = {
      1: [
        { id: 1, date: '2024-12-08', type: 'Email', description: 'Sent initial introduction email with product information', outcome: 'Lead opened email and expressed interest' },
        { id: 2, date: '2024-12-07', type: 'Call', description: 'Follow-up call to discuss pricing', outcome: 'Scheduled demo for next week' },
      ],
      2: [
        { id: 3, date: '2024-12-07', type: 'Call', description: 'Initial discovery call', outcome: 'Identified key pain points and needs' },
        { id: 4, date: '2024-12-05', type: 'Meeting', description: 'Product demo meeting', outcome: 'Very positive response, discussing next steps' },
        { id: 5, date: '2024-12-03', type: 'Email', description: 'Sent proposal document', outcome: 'Awaiting feedback' },
      ],
      3: [
        { id: 6, date: '2024-12-06', type: 'Meeting', description: 'Qualification meeting with decision makers', outcome: 'Budget confirmed, moving to proposal stage' },
        { id: 7, date: '2024-12-04', type: 'Note', description: 'Research on company background and competitors', outcome: 'Identified unique value proposition' },
      ],
    };
    return followUpData[leadId] || [];
  };

  const handleShowFollowUp = (lead: Lead) => {
    setSelectedLead(lead);
    setIsFollowUpModalOpen(true);
  };

  const statuses = ['All', 'New', 'Contacted', 'Qualified', 'Proposal', 'Won', 'Lost'];

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || lead.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New':
        return 'bg-blue-100 text-blue-800';
      case 'Contacted':
        return 'bg-yellow-100 text-yellow-800';
      case 'Qualified':
        return 'bg-purple-100 text-purple-800';
      case 'Proposal':
        return 'bg-orange-100 text-orange-800';
      case 'Won':
        return 'bg-green-100 text-green-800';
      case 'Lost':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Leads</h1>
          <p className="text-gray-600 mt-2">Manage and track your sales leads</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M12 4v16m8-8H4"></path>
          </svg>
          Add Lead
        </button>
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
          Showing {filteredLeads.length} of {leads.length} leads
        </div>
      </div>

      {/* Leads Table */}
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
                  Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Source
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{lead.company}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{lead.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{lead.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        lead.status
                      )}`}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{lead.value}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{lead.source}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{lead.createdAt}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleShowFollowUp(lead)}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
                    >
                      <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                      </svg>
                      Follow-up
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredLeads.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No leads found matching your criteria</p>
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

      {/* Add Lead Modal */}
      <AddLeadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddLead={handleAddLead}
      />

      {/* Follow-up Modal */}
      {selectedLead && (
        <FollowUpModal
          isOpen={isFollowUpModalOpen}
          onClose={() => setIsFollowUpModalOpen(false)}
          leadName={selectedLead.name}
          followUps={getFollowUpsForLead(selectedLead.id)}
        />
      )}
    </div>
  );
}
