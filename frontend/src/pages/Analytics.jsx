import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobStats, fetchJobs, jobSelector } from "../redux/jobReducer";
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, Target, Clock } from "lucide-react";

const Analytics = () => {
  const dispatch = useDispatch();
  const { stats, jobs, loading } = useSelector(jobSelector);

  useEffect(() => {
    dispatch(fetchJobStats());
    dispatch(fetchJobs());
  }, [dispatch]);

  // Prepare data for charts
  const statusData = stats
    ? [
        { name: "Saved", value: stats.saved || 0, fill: "#6B7280" },
        { name: "Applied", value: stats.applied || 0, fill: "#3B82F6" },
        { name: "Interview", value: stats.interview || 0, fill: "#FBBF24" },
        { name: "Offer", value: stats.offer || 0, fill: "#10B981" },
        { name: "Rejected", value: stats.rejected || 0, fill: "#EF4444" },
      ]
    : [];

  // Application timeline
  const timelineData = jobs
    ?.reduce((acc, job) => {
      if (job.appliedDate) {
        const date = new Date(job.appliedDate).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
        const existing = acc.find((d) => d.date === date);
        if (existing) {
          existing.applications += 1;
        } else {
          acc.push({ date, applications: 1 });
        }
      }
      return acc;
    }, [])
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(-7) || [];

  // Calculate metrics
  const totalJobs = stats?.total || 0;
  const appliedJobs = stats?.applied || 0;
  const successRate = totalJobs > 0 ? ((stats?.offer || 0) / appliedJobs * 100).toFixed(1) : 0;
  const avgDaysToInterview = jobs
    .filter((j) => j.status === "interview" && j.appliedDate)
    .reduce((sum, j) => sum + Math.floor((Date.now() - new Date(j.appliedDate)) / (1000 * 60 * 60 * 24)), 0) / (jobs.filter((j) => j.status === "interview").length || 1) || 0;

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Analytics</h1>
          <p className="text-gray-400">Track your job search progress and insights</p>
        </div>

        {loading ? (
          <div className="text-center py-10">
            <p className="text-gray-400">Loading analytics...</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-400">Total Applications</h3>
                  <Target className="text-blue-400" size={20} />
                </div>
                <div className="text-3xl font-bold">{totalJobs}</div>
                <p className="text-xs text-gray-500 mt-1">{appliedJobs} applied</p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-400">Success Rate</h3>
                  <TrendingUp className="text-green-400" size={20} />
                </div>
                <div className="text-3xl font-bold">{successRate}%</div>
                <p className="text-xs text-gray-500 mt-1">{stats?.offer || 0} offers received</p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-400">Avg Days to Interview</h3>
                  <Clock className="text-yellow-400" size={20} />
                </div>
                <div className="text-3xl font-bold">{Math.round(avgDaysToInterview)}</div>
                <p className="text-xs text-gray-500 mt-1">from application</p>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Status Distribution */}
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Status Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Application Trend */}
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Application Timeline (Last 7 Days)</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={timelineData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="date" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "0.5rem",
                      }}
                    />
                    <Bar dataKey="applications" fill="#3B82F6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Status Breakdown Table */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Status Breakdown</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 font-medium text-gray-300">Status</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-300">Count</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-300">Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {statusData.map((item) => (
                      <tr key={item.name} className="border-b border-gray-800 hover:bg-gray-800/50">
                        <td className="py-3 px-4 text-gray-300 flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: item.fill }}
                          />
                          {item.name}
                        </td>
                        <td className="py-3 px-4 text-center text-gray-300">{item.value}</td>
                        <td className="py-3 px-4 text-center text-gray-400">
                          {totalJobs > 0 ? ((item.value / totalJobs) * 100).toFixed(1) : 0}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;
