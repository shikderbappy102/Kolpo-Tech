import React from "react";
import { Link } from "wouter";
import { 
  LayoutDashboard, ShieldAlert, FileKey, AlertTriangle, 
  FileText, Settings, ShieldCheck, ArrowUpRight 
} from "lucide-react";
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "GDPR", score: 98, fill: "#818cf8" },
  { name: "SOC 2", score: 92, fill: "#6366f1" },
  { name: "HIPAA", score: 85, fill: "#4f46e5" },
  { name: "ISO 27001", score: 95, fill: "#4338ca" },
];

const auditData = [
  { id: 1, task: "Database encryption verification", category: "Security", risk: "High" },
  { id: 2, task: "Employee access review Q3", category: "Access Control", risk: "Medium" },
  { id: 3, task: "Vendor contract updates", category: "Legal", risk: "Low" },
  { id: 4, task: "Incident response drill", category: "Operations", risk: "Medium" },
];

export default function CompliAIDemo() {
  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-card border-r border-border shrink-0 flex flex-col">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-xl">
            <ShieldCheck className="w-6 h-6" /> CompliAI
          </div>
        </div>
        <nav className="p-4 space-y-2 flex-1">
          {[
            { icon: LayoutDashboard, label: "Overview", active: true },
            { icon: ShieldAlert, label: "Audits" },
            { icon: FileKey, label: "Policies" },
            { icon: AlertTriangle, label: "Risk Matrix" },
            { icon: FileText, label: "Reports" },
            { icon: Settings, label: "Settings" },
          ].map((item, i) => (
            <div key={i} className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${item.active ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-muted-foreground hover:bg-card-foreground/5 hover:text-foreground'}`}>
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </div>
          ))}
        </nav>
        <div className="p-4 border-t border-border">
          <Link href="/">
            <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
              <ArrowUpRight className="w-4 h-4" /> Back to Kolpo Tech
            </div>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Compliance Posture</h1>
          <p className="text-muted-foreground">AI is continuously monitoring your environment.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Overall Score", value: "94%", trend: "+2%" },
            { label: "Open Audits", value: "3", trend: "-2" },
            { label: "Policies Updated", value: "12", trend: "This month" },
            { label: "Risk Items", value: "7", trend: "Needs review", alert: true },
          ].map((stat, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <p className="text-sm font-medium text-muted-foreground mb-2">{stat.label}</p>
              <div className="flex items-end justify-between">
                <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
                <span className={`text-sm font-medium ${stat.alert ? 'text-red-400' : 'text-indigo-400'}`}>
                  {stat.trend}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart */}
          <div className="lg:col-span-1 bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-6">Framework Coverage</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="100%" barSize={15} data={data}>
                  <RadialBar
                    background={{ fill: '#1f2937' }}
                    dataKey="score"
                    cornerRadius={10}
                  />
                  <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={{ right: 0, color: '#9ca3af' }} />
                  <Tooltip contentStyle={{backgroundColor: '#111827', borderColor: '#374151', borderRadius: '8px'}} />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Table */}
          <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white">Pending Audit Tasks</h3>
              <button className="text-sm text-indigo-400 hover:text-indigo-300">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border text-muted-foreground text-sm">
                    <th className="pb-3 font-medium">Task</th>
                    <th className="pb-3 font-medium">Category</th>
                    <th className="pb-3 font-medium text-right">Risk Level</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {auditData.map((audit) => (
                    <tr key={audit.id} className="border-b border-border/50 hover:bg-white/5 transition-colors">
                      <td className="py-4 font-medium text-white">{audit.task}</td>
                      <td className="py-4 text-muted-foreground">{audit.category}</td>
                      <td className="py-4 text-right">
                        <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                          audit.risk === 'High' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                          audit.risk === 'Medium' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                          'bg-green-500/10 text-green-400 border-green-500/20'
                        }`}>
                          {audit.risk}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
