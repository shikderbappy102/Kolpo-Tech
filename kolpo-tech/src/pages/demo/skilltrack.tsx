import React from "react";
import { Link } from "wouter";
import { 
  LayoutDashboard, BookOpen, Users, Award, 
  FileText, Settings, GraduationCap, ArrowUpRight 
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", completions: 45 },
  { name: "Feb", completions: 52 },
  { name: "Mar", completions: 38 },
  { name: "Apr", completions: 65 },
  { name: "May", completions: 89 },
  { name: "Jun", completions: 76 },
];

const coursesData = [
  { id: 1, name: "Advanced React Patterns", enrolled: 245, progress: 68 },
  { id: 2, name: "AI Engineering Fundamentals", enrolled: 412, progress: 42 },
  { id: 3, name: "Enterprise System Design", enrolled: 189, progress: 85 },
  { id: 4, name: "Data Structures in Go", enrolled: 358, progress: 21 },
];

export default function SkillTrackDemo() {
  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-card border-r border-border shrink-0 flex flex-col">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-xl">
            <GraduationCap className="w-6 h-6" /> SkillTrack
          </div>
        </div>
        <nav className="p-4 space-y-2 flex-1">
          {[
            { icon: LayoutDashboard, label: "Dashboard", active: true },
            { icon: BookOpen, label: "Courses" },
            { icon: Users, label: "Students" },
            { icon: Award, label: "Certifications" },
            { icon: FileText, label: "Reports" },
            { icon: Settings, label: "Settings" },
          ].map((item, i) => (
            <div key={i} className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${item.active ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-muted-foreground hover:bg-card-foreground/5 hover:text-foreground'}`}>
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
          <h1 className="text-2xl font-bold text-white mb-2">Institute Overview</h1>
          <p className="text-muted-foreground">AI is tracking learner progress in real-time.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Active Courses", value: "34", trend: "+2" },
            { label: "Enrolled Students", value: "1,204", trend: "+124" },
            { label: "Completions This Month", value: "89", trend: "+15%" },
            { label: "Avg Score", value: "87%", trend: "+2.4%" },
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
            <h3 className="text-lg font-bold text-white mb-6">Course Completions</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorCompletions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{backgroundColor: '#111827', borderColor: '#374151', borderRadius: '8px'}} />
                  <Area type="monotone" dataKey="completions" stroke="#22d3ee" strokeWidth={3} fillOpacity={1} fill="url(#colorCompletions)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Table */}
          <div className="lg:col-span-1 bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-6">Active Courses</h3>
            <div className="space-y-6">
              {coursesData.map((course) => (
                <div key={course.id} className="flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <span className="font-semibold text-white text-sm line-clamp-1">{course.name}</span>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{course.enrolled} stds</span>
                  </div>
                  <div className="w-full bg-background rounded-full h-2">
                    <div 
                      className="bg-cyan-400 h-2 rounded-full" 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <div className="text-right text-xs text-cyan-400 font-medium">{course.progress}% avg progress</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
