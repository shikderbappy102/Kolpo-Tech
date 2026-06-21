import React from "react";
import { Link } from "wouter";
import { 
  LayoutDashboard, CalendarDays, Users, CreditCard, 
  FileText, Settings, Activity, ArrowUpRight 
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Mon", appointments: 42 },
  { name: "Tue", appointments: 56 },
  { name: "Wed", appointments: 38 },
  { name: "Thu", appointments: 65 },
  { name: "Fri", appointments: 50 },
  { name: "Sat", appointments: 24 },
  { name: "Sun", appointments: 12 },
];

const appointmentsData = [
  { id: 1, patient: "Sarah Jenkins", doctor: "Dr. Smith", time: "09:00 AM", status: "Completed" },
  { id: 2, patient: "Michael Chen", doctor: "Dr. Adams", time: "10:30 AM", status: "In Progress" },
  { id: 3, patient: "Emily Rodriguez", doctor: "Dr. Smith", time: "11:15 AM", status: "Waiting" },
  { id: 4, patient: "James Wilson", doctor: "Dr. Patel", time: "02:00 PM", status: "Scheduled" },
];

export default function ClinicFlowDemo() {
  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-card border-r border-border shrink-0 flex flex-col">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-2 text-primary font-bold text-xl">
            <Activity className="w-6 h-6" /> ClinicFlow
          </div>
        </div>
        <nav className="p-4 space-y-2 flex-1">
          {[
            { icon: LayoutDashboard, label: "Dashboard", active: true },
            { icon: CalendarDays, label: "Appointments" },
            { icon: Users, label: "Patients" },
            { icon: CreditCard, label: "Billing" },
            { icon: FileText, label: "Reports" },
            { icon: Settings, label: "Settings" },
          ].map((item, i) => (
            <div key={i} className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${item.active ? 'bg-primary/10 text-primary border border-primary/20' : 'text-muted-foreground hover:bg-card-foreground/5 hover:text-foreground'}`}>
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
          <h1 className="text-2xl font-bold text-white mb-2">Clinic Overview</h1>
          <p className="text-muted-foreground">AI is actively managing your clinic flow.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Today Appointments", value: "24", trend: "+12%" },
            { label: "Active Patients", value: "847", trend: "+5%" },
            { label: "Revenue This Month", value: "$48,200", trend: "+18%" },
            { label: "Avg Wait Time", value: "12 min", trend: "-4 min" },
          ].map((stat, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <p className="text-sm font-medium text-muted-foreground mb-2">{stat.label}</p>
              <div className="flex items-end justify-between">
                <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
                <span className={`text-sm font-medium ${stat.trend.startsWith('+') ? 'text-green-400' : 'text-primary'}`}>
                  {stat.trend}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart */}
          <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-6">Appointments This Week</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{backgroundColor: '#111827', borderColor: '#374151', borderRadius: '8px'}} />
                  <Bar dataKey="appointments" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Table */}
          <div className="lg:col-span-1 bg-card border border-border rounded-xl p-6 flex flex-col">
            <h3 className="text-lg font-bold text-white mb-6">Live Queue</h3>
            <div className="space-y-4 flex-1">
              {appointmentsData.map((apt) => (
                <div key={apt.id} className="p-4 rounded-lg bg-background border border-border flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <span className="font-semibold text-white">{apt.patient}</span>
                    <span className={`text-xs px-2 py-1 rounded-full border ${
                      apt.status === 'Completed' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                      apt.status === 'In Progress' ? 'bg-primary/10 text-primary border-primary/20' :
                      apt.status === 'Waiting' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                      'bg-muted text-muted-foreground border-border'
                    }`}>
                      {apt.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>{apt.doctor}</span>
                    <span>{apt.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
