'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface Advertisement {
  id: number;
  campaignId: number;
  campaignName: string;
  adName: string;
  status: 'Draft' | 'In Review' | 'Approved' | 'Running' | 'Paused' | 'Completed';
  platform: string;
  adType: string;
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  startDate: string;
  endDate: string;
  createdDate: string;
}

function AdvertisementsContent() {
  const searchParams = useSearchParams();
  const campaignFilter = searchParams.get('campaign');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPlatform, setFilterPlatform] = useState('All');

  const [advertisements] = useState<Advertisement[]>([
    {
      id: 1,
      campaignId: 1,
      campaignName: 'Summer Product Launch 2024',
      adName: 'Summer Sale Banner - Homepage',
      status: 'Running',
      platform: 'Google Ads',
      adType: 'Display',
      budget: 5000,
      spent: 3250,
      impressions: 125000,
      clicks: 3750,
      conversions: 245,
      startDate: '2024-06-01',
      endDate: '2024-08-31',
      createdDate: '2024-05-15',
    },
    {
      id: 2,
      campaignId: 1,
      campaignName: 'Summer Product Launch 2024',
      adName: 'Video Ad - Product Demo',
      status: 'Running',
      platform: 'YouTube',
      adType: 'Video',
      budget: 8000,
      spent: 5500,
      impressions: 250000,
      clicks: 8200,
      conversions: 412,
      startDate: '2024-06-15',
      endDate: '2024-08-31',
      createdDate: '2024-05-20',
    },
    {
      id: 3,
      campaignId: 2,
      campaignName: 'Email Marketing Q4',
      adName: 'Newsletter Promotion - Q4 Special',
      status: 'Approved',
      platform: 'Email',
      adType: 'Email Campaign',
      budget: 2500,
      spent: 875,
      impressions: 45000,
      clicks: 2340,
      conversions: 128,
      startDate: '2024-10-01',
      endDate: '2024-12-31',
      createdDate: '2024-09-15',
    },
    {
      id: 4,
      campaignId: 3,
      campaignName: 'Social Media Brand Awareness',
      adName: 'Instagram Story - Brand Showcase',
      status: 'Running',
      platform: 'Instagram',
      adType: 'Story',
      budget: 4000,
      spent: 2100,
      impressions: 180000,
      clicks: 5400,
      conversions: 189,
      startDate: '2024-11-01',
      endDate: '2025-01-31',
      createdDate: '2024-10-20',
    },
    {
      id: 5,
      campaignId: 3,
      campaignName: 'Social Media Brand Awareness',
      adName: 'Facebook Carousel - Product Features',
      status: 'Running',
      platform: 'Facebook',
      adType: 'Carousel',
      budget: 3500,
      spent: 1850,
      impressions: 95000,
      clicks: 3200,
      conversions: 156,
      startDate: '2024-11-05',
      endDate: '2025-01-31',
      createdDate: '2024-10-25',
    },
    {
      id: 6,
      campaignId: 4,
      campaignName: 'Google Ads - Product Demo',
      adName: 'Search Ad - Demo Request',
      status: 'In Review',
      platform: 'Google Ads',
      adType: 'Search',
      budget: 6000,
      spent: 0,
      impressions: 0,
      clicks: 0,
      conversions: 0,
      startDate: '2025-01-15',
      endDate: '2025-03-15',
      createdDate: '2024-12-01',
    },
    {
      id: 7,
      campaignId: 4,
      campaignName: 'Google Ads - Product Demo',
      adName: 'Display Ad - Feature Highlights',
      status: 'Draft',
      platform: 'Google Ads',
      adType: 'Display',
      budget: 4500,
      spent: 0,
      impressions: 0,
      clicks: 0,
      conversions: 0,
      startDate: '2025-01-20',
      endDate: '2025-03-15',
      createdDate: '2024-12-05',
    },
    {
      id: 8,
      campaignId: 5,
      campaignName: 'Content Marketing Initiative',
      adName: 'LinkedIn Sponsored Content',
      status: 'Running',
      platform: 'LinkedIn',
      adType: 'Sponsored',
      budget: 5500,
      spent: 4200,
      impressions: 78000,
      clicks: 2850,
      conversions: 312,
      startDate: '2024-09-01',
      endDate: '2024-12-31',
      createdDate: '2024-08-20',
    },
    {
      id: 9,
      campaignId: 2,
      campaignName: 'Email Marketing Q4',
      adName: 'Promotional Email - Holiday Sale',
      status: 'Approved',
      platform: 'Email',
      adType: 'Email Campaign',
      budget: 1800,
      spent: 650,
      impressions: 32000,
      clicks: 1560,
      conversions: 98,
      startDate: '2024-11-15',
      endDate: '2024-12-25',
      createdDate: '2024-11-01',
    },
    {
      id: 10,
      campaignId: 3,
      campaignName: 'Social Media Brand Awareness',
      adName: 'Twitter Campaign - Thought Leadership',
      status: 'Paused',
      platform: 'Twitter',
      adType: 'Promoted Tweet',
      budget: 2200,
      spent: 1100,
      impressions: 65000,
      clicks: 1950,
      conversions: 87,
      startDate: '2024-11-10',
      endDate: '2025-01-31',
      createdDate: '2024-11-01',
    },
  ]);

  const statuses = ['All', 'Draft', 'In Review', 'Approved', 'Running', 'Paused', 'Completed'];
  const platforms = ['All', 'Google Ads', 'Facebook', 'Instagram', 'LinkedIn', 'YouTube', 'Twitter', 'Email'];

  const filteredAds = advertisements.filter((ad) => {
    const matchesSearch =
      ad.adName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ad.campaignName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || ad.status === filterStatus;
    const matchesPlatform = filterPlatform === 'All' || ad.platform === filterPlatform;
    const matchesCampaign = !campaignFilter || ad.campaignId.toString() === campaignFilter;
    return matchesSearch && matchesStatus && matchesPlatform && matchesCampaign;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Draft':
        return 'bg-gray-100 text-gray-800';
      case 'In Review':
        return 'bg-yellow-100 text-yellow-800';
      case 'Approved':
        return 'bg-blue-100 text-blue-800';
      case 'Running':
        return 'bg-green-100 text-green-800';
      case 'Paused':
        return 'bg-orange-100 text-orange-800';
      case 'Completed':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const calculateCTR = (clicks: number, impressions: number) => {
    if (impressions === 0) return 0;
    return ((clicks / impressions) * 100).toFixed(2);
  };

  const calculateConversionRate = (conversions: number, clicks: number) => {
    if (clicks === 0) return 0;
    return ((conversions / clicks) * 100).toFixed(2);
  };

  const totalBudget = filteredAds.reduce((sum, ad) => sum + ad.budget, 0);
  const totalSpent = filteredAds.reduce((sum, ad) => sum + ad.spent, 0);
  const totalImpressions = filteredAds.reduce((sum, ad) => sum + ad.impressions, 0);
  const totalClicks = filteredAds.reduce((sum, ad) => sum + ad.clicks, 0);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Advertisement Pipeline</h1>
          <p className="text-gray-600 mt-2">Manage and track advertisements across all campaigns</p>
        </div>
        <Link
          href="/campaigns"
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
        >
          ← Back to Campaigns
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Budget</p>
              <p className="text-2xl font-bold mt-2">{formatCurrency(totalBudget)}</p>
            </div>
            <div className="text-4xl opacity-20">💰</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Total Spent</p>
              <p className="text-2xl font-bold mt-2">{formatCurrency(totalSpent)}</p>
            </div>
            <div className="text-4xl opacity-20">📊</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Impressions</p>
              <p className="text-2xl font-bold mt-2">{formatNumber(totalImpressions)}</p>
            </div>
            <div className="text-4xl opacity-20">👁️</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Total Clicks</p>
              <p className="text-2xl font-bold mt-2">{formatNumber(totalClicks)}</p>
            </div>
            <div className="text-4xl opacity-20">🖱️</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
        <div className="flex flex-col gap-4">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by ad name or campaign..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status Filter */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Status</label>
            <div className="flex gap-2 flex-wrap">
              {statuses.map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors text-sm ${
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

          {/* Platform Filter */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Platform</label>
            <div className="flex gap-2 flex-wrap">
              {platforms.map((platform) => (
                <button
                  key={platform}
                  onClick={() => setFilterPlatform(platform)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors text-sm ${
                    filterPlatform === platform
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredAds.length} of {advertisements.length} advertisements
        </div>
      </div>

      {/* Advertisements Table */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Advertisement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Campaign
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Platform
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Budget / Spent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dates
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAds.map((ad) => (
                <tr key={ad.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{ad.adName}</div>
                    <div className="text-xs text-gray-500 mt-1">{ad.adType}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">{ad.campaignName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{ad.platform}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        ad.status
                      )}`}
                    >
                      {ad.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <div className="font-semibold text-gray-900">{formatCurrency(ad.budget)}</div>
                      <div className="text-xs text-purple-600">{formatCurrency(ad.spent)} spent</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Impressions:</span>
                        <span className="font-medium text-gray-900">{formatNumber(ad.impressions)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Clicks:</span>
                        <span className="font-medium text-gray-900">{formatNumber(ad.clicks)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">CTR:</span>
                        <span className="font-medium text-blue-600">{calculateCTR(ad.clicks, ad.impressions)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Conversions:</span>
                        <span className="font-medium text-green-600">{ad.conversions}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-xs text-gray-600">
                      <div><span className="font-medium">Start:</span> {ad.startDate}</div>
                      <div><span className="font-medium">End:</span> {ad.endDate}</div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredAds.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No advertisements found matching your criteria</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterStatus('All');
                setFilterPlatform('All');
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

export default function AdvertisementsPage() {
  return (
    <Suspense fallback={
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-gray-600">Loading advertisements...</p>
        </div>
      </div>
    }>
      <AdvertisementsContent />
    </Suspense>
  );
}
