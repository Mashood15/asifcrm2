'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Campaign {
  id: number;
  name: string;
  status: 'Active' | 'Planned' | 'Paused' | 'Completed';
  startDate: string;
  endDate: string;
  totalBudget: number;
  spentBudget: number;
  remainingBudget: number;
  channel: string;
  targetAudience: string;
  leadsGenerated: number;
}

export default function CampaignsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const [campaigns] = useState<Campaign[]>([
    {
      id: 1,
      name: 'Summer Product Launch 2024',
      status: 'Active',
      startDate: '2024-06-01',
      endDate: '2024-08-31',
      totalBudget: 50000,
      spentBudget: 32500,
      remainingBudget: 17500,
      channel: 'Multi-channel',
      targetAudience: 'SMB Tech Companies',
      leadsGenerated: 245,
    },
    {
      id: 2,
      name: 'Email Marketing Q4',
      status: 'Active',
      startDate: '2024-10-01',
      endDate: '2024-12-31',
      totalBudget: 25000,
      spentBudget: 8750,
      remainingBudget: 16250,
      channel: 'Email',
      targetAudience: 'Enterprise Clients',
      leadsGenerated: 128,
    },
    {
      id: 3,
      name: 'Social Media Brand Awareness',
      status: 'Active',
      startDate: '2024-11-01',
      endDate: '2025-01-31',
      totalBudget: 35000,
      spentBudget: 12250,
      remainingBudget: 22750,
      channel: 'Social Media',
      targetAudience: 'Millennials',
      leadsGenerated: 189,
    },
    {
      id: 4,
      name: 'Google Ads - Product Demo',
      status: 'Planned',
      startDate: '2025-01-15',
      endDate: '2025-03-15',
      totalBudget: 40000,
      spentBudget: 0,
      remainingBudget: 40000,
      channel: 'Search Ads',
      targetAudience: 'B2B Decision Makers',
      leadsGenerated: 0,
    },
    {
      id: 5,
      name: 'Content Marketing Initiative',
      status: 'Active',
      startDate: '2024-09-01',
      endDate: '2024-12-31',
      totalBudget: 30000,
      spentBudget: 22500,
      remainingBudget: 7500,
      channel: 'Content',
      targetAudience: 'Tech Professionals',
      leadsGenerated: 312,
    },
    {
      id: 6,
      name: 'Trade Show Sponsorship',
      status: 'Paused',
      startDate: '2024-08-01',
      endDate: '2024-09-30',
      totalBudget: 60000,
      spentBudget: 45000,
      remainingBudget: 15000,
      channel: 'Events',
      targetAudience: 'Industry Leaders',
      leadsGenerated: 156,
    },
    {
      id: 7,
      name: 'Holiday Special Promotion',
      status: 'Completed',
      startDate: '2024-11-15',
      endDate: '2024-12-25',
      totalBudget: 45000,
      spentBudget: 45000,
      remainingBudget: 0,
      channel: 'Multi-channel',
      targetAudience: 'All Segments',
      leadsGenerated: 423,
    },
  ]);

  const statuses = ['All', 'Active', 'Planned', 'Paused', 'Completed'];

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch =
      campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.channel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.targetAudience.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || campaign.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Planned':
        return 'bg-blue-100 text-blue-800';
      case 'Paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getBudgetPercentage = (spent: number, total: number) => {
    return (spent / total) * 100;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const totalBudget = campaigns.reduce((sum, c) => sum + c.totalBudget, 0);
  const totalSpent = campaigns.reduce((sum, c) => sum + c.spentBudget, 0);
  const totalRemaining = campaigns.reduce((sum, c) => sum + c.remainingBudget, 0);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Marketing Campaigns</h1>
        <p className="text-gray-600 mt-2">Manage campaigns and track budget allocation</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Budget</p>
              <p className="text-3xl font-bold mt-2">{formatCurrency(totalBudget)}</p>
            </div>
            <div className="text-5xl opacity-20">💰</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Budget Spent</p>
              <p className="text-3xl font-bold mt-2">{formatCurrency(totalSpent)}</p>
            </div>
            <div className="text-5xl opacity-20">📊</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Remaining Budget</p>
              <p className="text-3xl font-bold mt-2">{formatCurrency(totalRemaining)}</p>
            </div>
            <div className="text-5xl opacity-20">💵</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by campaign name, channel, or audience..."
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
          Showing {filteredCampaigns.length} of {campaigns.length} campaigns
        </div>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCampaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Campaign Header */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">{campaign.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {campaign.channel} • {campaign.targetAudience}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                    campaign.status
                  )}`}
                >
                  {campaign.status}
                </span>
              </div>
            </div>

            {/* Campaign Details */}
            <div className="p-6">
              {/* Budget Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Budget Usage</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {getBudgetPercentage(campaign.spentBudget, campaign.totalBudget).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all"
                    style={{
                      width: `${getBudgetPercentage(campaign.spentBudget, campaign.totalBudget)}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Budget Details */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Total Budget</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {formatCurrency(campaign.totalBudget)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Spent</p>
                  <p className="text-sm font-semibold text-purple-600">
                    {formatCurrency(campaign.spentBudget)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Remaining</p>
                  <p className="text-sm font-semibold text-green-600">
                    {formatCurrency(campaign.remainingBudget)}
                  </p>
                </div>
              </div>

              {/* Date Range and Leads */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Duration:</span> {campaign.startDate} to{' '}
                  {campaign.endDate}
                </div>
                <div className="text-sm">
                  <span className="font-semibold text-blue-600">{campaign.leadsGenerated}</span>
                  <span className="text-gray-600"> leads</span>
                </div>
              </div>

              {/* View Ads Button */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Link
                  href={`/advertisements?campaign=${campaign.id}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                  View Advertisements
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCampaigns.length === 0 && (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-12 text-center">
          <p className="text-gray-500 text-lg">No campaigns found matching your criteria</p>
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
  );
}
