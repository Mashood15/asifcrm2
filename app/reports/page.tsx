'use client';

import { useState } from 'react';

interface SalesPersonReport {
  id: number;
  name: string;
  totalLeads: number;
  newLeads: number;
  contactedLeads: number;
  qualifiedLeads: number;
  proposalLeads: number;
  wonLeads: number;
  lostLeads: number;
  totalFollowUps: number;
  avgFollowUpsPerLead: number;
}

interface LeadDetail {
  id: number;
  leadName: string;
  company: string;
  status: string;
  followUpCount: number;
  lastContact: string;
}

export default function ReportsPage() {
  const [selectedSalesPerson, setSelectedSalesPerson] = useState<number | null>(null);

  const salesPeopleReports: SalesPersonReport[] = [
    {
      id: 1,
      name: 'Sarah Johnson',
      totalLeads: 12,
      newLeads: 2,
      contactedLeads: 4,
      qualifiedLeads: 3,
      proposalLeads: 2,
      wonLeads: 1,
      lostLeads: 0,
      totalFollowUps: 48,
      avgFollowUpsPerLead: 4.0,
    },
    {
      id: 2,
      name: 'Michael Chen',
      totalLeads: 8,
      newLeads: 1,
      contactedLeads: 3,
      qualifiedLeads: 2,
      proposalLeads: 1,
      wonLeads: 1,
      lostLeads: 0,
      totalFollowUps: 32,
      avgFollowUpsPerLead: 4.0,
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      totalLeads: 15,
      newLeads: 3,
      contactedLeads: 5,
      qualifiedLeads: 4,
      proposalLeads: 1,
      wonLeads: 2,
      lostLeads: 0,
      totalFollowUps: 67,
      avgFollowUpsPerLead: 4.5,
    },
    {
      id: 4,
      name: 'David Martinez',
      totalLeads: 10,
      newLeads: 2,
      contactedLeads: 3,
      qualifiedLeads: 2,
      proposalLeads: 2,
      wonLeads: 0,
      lostLeads: 1,
      totalFollowUps: 38,
      avgFollowUpsPerLead: 3.8,
    },
    {
      id: 5,
      name: 'Jessica Brown',
      totalLeads: 6,
      newLeads: 1,
      contactedLeads: 2,
      qualifiedLeads: 1,
      proposalLeads: 1,
      wonLeads: 1,
      lostLeads: 0,
      totalFollowUps: 24,
      avgFollowUpsPerLead: 4.0,
    },
  ];

  const leadDetailsBySalesPerson: Record<number, LeadDetail[]> = {
    1: [
      { id: 1, leadName: 'John Doe', company: 'Tech Corp', status: 'New', followUpCount: 2, lastContact: '2024-12-08' },
      { id: 2, leadName: 'Jane Smith', company: 'Innovate LLC', status: 'Contacted', followUpCount: 5, lastContact: '2024-12-07' },
      { id: 3, leadName: 'Mike Johnson', company: 'Global Systems', status: 'Qualified', followUpCount: 6, lastContact: '2024-12-06' },
    ],
    2: [
      { id: 4, leadName: 'Sarah Williams', company: 'Digital Solutions', status: 'New', followUpCount: 3, lastContact: '2024-12-05' },
      { id: 5, leadName: 'Robert Brown', company: 'Enterprise Inc', status: 'Proposal', followUpCount: 7, lastContact: '2024-12-04' },
    ],
    3: [
      { id: 6, leadName: 'Emily Davis', company: 'Startup Hub', status: 'Won', followUpCount: 8, lastContact: '2024-12-03' },
      { id: 7, leadName: 'David Martinez', company: 'Solutions Group', status: 'Contacted', followUpCount: 4, lastContact: '2024-12-02' },
      { id: 8, leadName: 'Lisa Anderson', company: 'Consulting Pro', status: 'Qualified', followUpCount: 5, lastContact: '2024-12-01' },
    ],
  };

  const totalLeads = salesPeopleReports.reduce((sum, sp) => sum + sp.totalLeads, 0);
  const totalFollowUps = salesPeopleReports.reduce((sum, sp) => sum + sp.totalFollowUps, 0);
  const totalWon = salesPeopleReports.reduce((sum, sp) => sum + sp.wonLeads, 0);

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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Sales Reports</h1>
        <p className="text-gray-600 mt-2">Lead activity and follow-up tracking by sales person</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Leads</p>
              <p className="text-4xl font-bold mt-2">{totalLeads}</p>
            </div>
            <div className="text-5xl opacity-20">👥</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Total Follow-ups</p>
              <p className="text-4xl font-bold mt-2">{totalFollowUps}</p>
            </div>
            <div className="text-5xl opacity-20">📞</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Deals Won</p>
              <p className="text-4xl font-bold mt-2">{totalWon}</p>
            </div>
            <div className="text-5xl opacity-20">🎯</div>
          </div>
        </div>
      </div>

      {/* Sales Person Performance Table */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden mb-8">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Performance by Sales Person</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sales Person
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Leads
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  New
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contacted
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Qualified
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Proposal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Won
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Follow-ups
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg Follow-ups
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {salesPeopleReports.map((person) => (
                <tr key={person.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                        {person.name.charAt(0)}
                      </div>
                      <div className="text-sm font-medium text-gray-900">{person.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900">{person.totalLeads}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{person.newLeads}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{person.contactedLeads}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{person.qualifiedLeads}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{person.proposalLeads}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-green-600">{person.wonLeads}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-purple-600">{person.totalFollowUps}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{person.avgFollowUpsPerLead.toFixed(1)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => setSelectedSalesPerson(selectedSalesPerson === person.id ? null : person.id)}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
                    >
                      {selectedSalesPerson === person.id ? 'Hide' : 'View'} Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Details Section */}
      {selectedSalesPerson && leadDetailsBySalesPerson[selectedSalesPerson] && (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden animate-fadeIn">
          <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">
              Lead Details - {salesPeopleReports.find(sp => sp.id === selectedSalesPerson)?.name}
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lead Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Follow-up Count
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Contact
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leadDetailsBySalesPerson[selectedSalesPerson].map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{lead.leadName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{lead.company}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(lead.status)}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-purple-600">{lead.followUpCount}</span>
                        <span className="text-xs text-gray-500">follow-ups</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{lead.lastContact}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
