import StatsCard from './components/StatsCard';

export default function Dashboard() {
  const stats = [
    { title: 'Total Leads', value: 248, icon: '👥', trend: '12%', trendUp: true },
    { title: 'Active Deals', value: 42, icon: '💼', trend: '8%', trendUp: true },
    { title: 'Closed Won', value: 18, icon: '✅', trend: '5%', trendUp: true },
    { title: 'Revenue', value: '$125K', icon: '💰', trend: '15%', trendUp: true },
  ];

  const recentLeads = [
    { id: 1, name: 'John Doe', company: 'Tech Corp', status: 'New', value: '$5,000' },
    { id: 2, name: 'Jane Smith', company: 'Innovate LLC', status: 'Contacted', value: '$8,500' },
    { id: 3, name: 'Mike Johnson', company: 'Global Systems', status: 'Qualified', value: '$12,000' },
    { id: 4, name: 'Sarah Williams', company: 'Digital Solutions', status: 'New', value: '$6,200' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's your overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Recent Leads */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Recent Leads</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Value
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {lead.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {lead.company}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        lead.status === 'New'
                          ? 'bg-blue-100 text-blue-800'
                          : lead.status === 'Contacted'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    {lead.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
