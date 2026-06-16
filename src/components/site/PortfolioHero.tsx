'use client';

import { useState, useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import { 
  Sparkles, 
  Terminal, 
  Cpu, 
  Zap, 
  BarChart3, 
  ShieldCheck, 
  Activity, 
  Globe, 
  CheckCircle2, 
  Server,
  ArrowRight
} from "lucide-react";

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Portfolio", href: "/portfolio" }
];

interface LogLine {
  id: string;
  time: string;
  type: 'info' | 'success' | 'warning';
  text: string;
}

const INITIAL_LOGS: LogLine[] = [
  { id: '1', time: '12:04:10', type: 'info', text: 'Initializing production build pipelines...' },
  { id: '2', time: '12:04:12', type: 'success', text: 'DNS resolve: silverwolftechnologies.in → Edge Nodes' },
  { id: '3', time: '12:04:15', type: 'success', text: 'Build Plagzap: Webpack bundling complete (4.2MB)' },
  { id: '4', time: '12:04:16', type: 'info', text: 'Optimizing media assets for Sakhi Fragrance D2C...' },
  { id: '5', time: '12:04:18', type: 'success', text: 'Serverless deployment successful [Region: BOM-1]' }
];

const LOG_TEMPLATES = [
  { type: 'info' as const, text: 'Running automated security scan: 0 threats detected.' },
  { type: 'success' as const, text: 'Dream Destination: Holiday portal cache warmed.' },
  { type: 'info' as const, text: 'Pinging database replication nodes: Latency 8ms.' },
  { type: 'success' as const, text: 'SalesForge CRM API load balancer active: 100% capacity.' },
  { type: 'warning' as const, text: 'Auto-scaling: Spawning node instances in region SFO-1.' },
  { type: 'success' as const, text: 'HR Portal: Payroll workflows compiled & signed.' },
  { type: 'info' as const, text: 'Sanitizing dynamic route caches...' }
];

export const PortfolioHero = () => {
  const [activeTab, setActiveTab] = useState<'terminal' | 'pagespeed' | 'latency'>('terminal');
  
  // Hydration safety
  const [mounted, setMounted] = useState(false);
  const [utcTime, setUtcTime] = useState("--:--");
  
  // Terminal Logs State
  const [logs, setLogs] = useState<LogLine[]>(INITIAL_LOGS);
  
  // PageSpeed Dials State
  const [speedProgress, setSpeedProgress] = useState({ perf: 0, access: 0, best: 0, seo: 0 });
  
  // Latency States
  const [latencies, setLatencies] = useState({
    mumbai: 12,
    singapore: 34,
    london: 88,
    oregon: 124
  });

  // Setup mounted state & UTC clock
  useEffect(() => {
    setMounted(true);
    setUtcTime(new Date().toISOString().split('T')[1].slice(0, 5));
    
    const clockInterval = setInterval(() => {
      setUtcTime(new Date().toISOString().split('T')[1].slice(0, 5));
    }, 60000);
    
    return () => clearInterval(clockInterval);
  }, []);

  // Log Ticker Effect
  useEffect(() => {
    if (!mounted || activeTab !== 'terminal') return;
    
    const interval = setInterval(() => {
      const date = new Date();
      const timeStr = date.toTimeString().split(' ')[0];
      const template = LOG_TEMPLATES[Math.floor(Math.random() * LOG_TEMPLATES.length)];
      
      const newLog: LogLine = {
        id: Math.random().toString(),
        time: timeStr,
        type: template.type,
        text: template.text
      };
      
      setLogs(prev => [...prev.slice(-6), newLog]);
    }, 2500);

    return () => clearInterval(interval);
  }, [activeTab, mounted]);

  // PageSpeed Animation Effect
  useEffect(() => {
    if (!mounted || activeTab !== 'pagespeed') {
      setSpeedProgress({ perf: 0, access: 0, best: 0, seo: 0 });
      return;
    }

    const timer = setTimeout(() => {
      setSpeedProgress({ perf: 99, access: 100, best: 100, seo: 100 });
    }, 150);

    return () => clearTimeout(timer);
  }, [activeTab, mounted]);

  // Latency Jitter Effect
  useEffect(() => {
    if (!mounted || activeTab !== 'latency') return;

    const interval = setInterval(() => {
      setLatencies(prev => ({
        mumbai: Math.max(10, Math.min(18, prev.mumbai + (Math.random() > 0.5 ? 1 : -1))),
        singapore: Math.max(30, Math.min(38, prev.singapore + (Math.random() > 0.5 ? 1 : -1))),
        london: Math.max(84, Math.min(92, prev.london + (Math.random() > 0.5 ? 1 : -1))),
        oregon: Math.max(120, Math.min(130, prev.oregon + (Math.random() > 0.5 ? 1 : -1)))
      }));
    }, 1200);

    return () => clearInterval(interval);
  }, [activeTab, mounted]);

  return (
    <section className="relative pt-36 pb-20 overflow-hidden">
      {/* Visual background atmospheric lights */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] pointer-events-none animate-pulse" style={{ animationDuration: '10s' }} />
      <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[130px] pointer-events-none animate-pulse" style={{ animationDuration: '15s' }} />

      {/* Grid Mesh Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="container relative z-10 max-w-7xl">
        {/* Breadcrumbs */}
        <div className="flex justify-center lg:justify-start mb-6">
          <Breadcrumb items={breadcrumbs} />
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT SIDE: Heading & Stats */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Live Indicator Tag */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 shadow-lg shadow-black/45 backdrop-blur-md hover:border-primary/45 transition-colors group">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-300">
                Live System Telemetry Active
              </span>
              <Sparkles className="h-3.5 w-3.5 text-primary group-hover:rotate-12 transition-transform" />
            </div>

            {/* Out-of-the-box bold title */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[0.95] text-white">
              Real launches. <br />
              <span className="relative inline-block mt-2">
                <span className="absolute -inset-1 bg-gradient-to-r from-primary to-indigo-500 rounded-lg blur-xl opacity-25 group-hover:opacity-40 transition-opacity"></span>
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-400 to-purple-500 drop-shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                  Real results.
                </span>
              </span>
            </h1>

            {/* Premium Description */}
            <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
              We compile code that scales and run campaigns that convert. Peer into our system dashboards, audits, and real-time delivery logs below.
            </p>

            {/* Quick Stat Blocks Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
              {[
                { label: "SHIPPED", val: "200+", icon: Cpu, color: "text-primary bg-primary/10 border-primary/20" },
                { label: "EXPERIENCE", val: "10+ Yrs", icon: ShieldCheck, color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20" },
                { label: "SLA UPTIME", val: "99.9%", icon: Activity, color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
                { label: "VERTICALS", val: "14", icon: Globe, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" }
              ].map((stat, idx) => (
                <div 
                  key={idx} 
                  className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-white/10 hover:bg-white/[0.02] transition-all duration-300 text-left group"
                >
                  <div className={`p-2 rounded-xl border w-fit mb-3 transition-transform group-hover:scale-110 ${stat.color}`}>
                    <stat.icon className="h-4 w-4" />
                  </div>
                  <div className="text-2xl font-black text-white tracking-tight">{stat.val}</div>
                  <div className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Micro blueprint highlight */}
            <div className="flex items-center justify-center lg:justify-start gap-2 text-xs text-zinc-500 pt-2 font-medium">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>Full case study console logs and systems schematics accessible in cards below</span>
            </div>
          </div>

          {/* RIGHT SIDE: Interactive Console Command Center */}
          <div className="lg:col-span-5 relative">
            
            {/* Soft decorative background glow ring */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/10 to-indigo-500/10 rounded-3xl blur-2xl opacity-60 pointer-events-none" />

            {/* Terminal Widget Container */}
            <div className="relative border border-white/10 bg-zinc-950/80 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl shadow-black/80">
              
              {/* Terminal Window Header Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-white/[0.02] border-b border-white/5">
                {/* Simulated Mac Dots */}
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/40 border border-red-500/20" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/40 border border-yellow-500/20" />
                  <span className="w-3 h-3 rounded-full bg-green-500/40 border border-green-500/20" />
                </div>
                {/* Monospaced Title */}
                <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase font-bold flex items-center gap-1.5">
                  <Terminal className="h-3 w-3 text-primary animate-pulse" />
                  silverwolf_console_v2.4
                </span>
                <span className="w-12" /> {/* Spacer */}
              </div>

              {/* Tab Selector Buttons */}
              <div className="flex border-b border-white/5 bg-white/[0.01]">
                {[
                  { id: 'terminal', label: 'Console Logs', icon: Terminal },
                  { id: 'pagespeed', label: 'PageSpeed', icon: Zap },
                  { id: 'latency', label: 'Network Latency', icon: BarChart3 }
                ].map(tab => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as 'terminal' | 'pagespeed' | 'latency')}
                      className={`flex-1 py-3 px-2 flex items-center justify-center gap-2 text-xs font-semibold border-r border-white/5 transition-all outline-none ${
                        isActive 
                          ? 'bg-zinc-900/90 text-primary border-b-2 border-b-primary' 
                          : 'text-zinc-400 hover:bg-white/[0.02] hover:text-white'
                      }`}
                    >
                      <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-primary' : 'text-zinc-500'}`} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Console Workspace Screens */}
              <div className="p-5 h-[280px] font-mono text-xs overflow-hidden bg-zinc-950 relative">

                {/* screen grid overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.005)_50%,rgba(0,0,0,0.15)_50%)] bg-[size:100%_4px] pointer-events-none" />

                {/* SCREEN 1: BUILD CONSOLE */}
                {activeTab === 'terminal' && (
                  <div className="flex flex-col gap-2 h-full text-zinc-300">
                    <div className="flex items-center gap-2 text-zinc-500 text-[10px] border-b border-white/5 pb-1.5 mb-1.5 font-bold uppercase tracking-wider">
                      <Server className="h-3.5 w-3.5 text-zinc-400" />
                      <span>Active Build & Pipeline Outputs</span>
                    </div>
                    <div className="flex-1 space-y-2 overflow-y-auto pr-1">
                      {logs.map((log) => (
                        <div key={log.id} className="flex items-start gap-2.5 leading-relaxed animate-fade-up">
                          <span className="text-zinc-600 select-none text-[10px] mt-0.5">{log.time}</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-black tracking-wider uppercase select-none ${
                            log.type === 'success' 
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                              : log.type === 'warning'
                              ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                              : 'bg-primary/10 text-primary border border-primary/20'
                          }`}>
                            {log.type}
                          </span>
                          <span className="text-zinc-300 flex-1">{log.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* SCREEN 2: PAGESPEED AUDIT */}
                {activeTab === 'pagespeed' && (
                  <div className="flex flex-col h-full text-zinc-300">
                    <div className="flex items-center gap-2 text-zinc-500 text-[10px] border-b border-white/5 pb-1.5 mb-4 font-bold uppercase tracking-wider">
                      <Zap className="h-3.5 w-3.5 text-primary" />
                      <span>Next.js Vercel Production Performance Audits</span>
                    </div>

                    <div className="grid grid-cols-4 gap-2 flex-1 items-center">
                      {[
                        { label: "Performance", score: speedProgress.perf, color: "stroke-primary" },
                        { label: "Accessibility", score: speedProgress.access, color: "stroke-emerald-400" },
                        { label: "Best Practices", score: speedProgress.best, color: "stroke-purple-400" },
                        { label: "SEO Status", score: speedProgress.seo, color: "stroke-indigo-400" }
                      ].map((item, idx) => {
                        const radius = 28;
                        const circumference = 2 * Math.PI * radius;
                        const strokeDashoffset = circumference - (item.score / 100) * circumference;

                        return (
                          <div key={idx} className="flex flex-col items-center text-center">
                            {/* Radial SVG Dial */}
                            <div className="relative w-16 h-16 flex items-center justify-center">
                              <svg className="w-full h-full transform -rotate-90">
                                <circle 
                                  cx="32" 
                                  cy="32" 
                                  r={radius} 
                                  className="stroke-zinc-800 fill-none" 
                                  strokeWidth="4" 
                                />
                                <circle 
                                  cx="32" 
                                  cy="32" 
                                  r={radius} 
                                  className={`fill-none transition-all duration-1000 ease-out ${item.color}`}
                                  strokeWidth="4.5" 
                                  strokeDasharray={circumference}
                                  strokeDashoffset={strokeDashoffset}
                                  strokeLinecap="round"
                                />
                              </svg>
                              <span className="absolute text-xs font-black text-white font-sans">{item.score}%</span>
                            </div>
                            <span className="text-[9px] font-sans font-bold text-zinc-400 mt-2 uppercase tracking-wide leading-tight">
                              {item.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    
                    <div className="text-[10px] text-zinc-500 mt-3 flex items-center gap-1 bg-white/[0.02] p-1.5 rounded border border-white/5 justify-center">
                      <Sparkles className="h-3 w-3 text-primary" />
                      <span>Optimized via Edge caching, clean components & minimal packages</span>
                    </div>
                  </div>
                )}

                {/* SCREEN 3: LATENCY CHART */}
                {activeTab === 'latency' && (
                  <div className="flex flex-col h-full text-zinc-300">
                    <div className="flex items-center gap-2 text-zinc-500 text-[10px] border-b border-white/5 pb-1.5 mb-3 font-bold uppercase tracking-wider">
                      <Globe className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Server Latency & Routing nodes (Anycast DNS)</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 flex-1 items-center">
                      {/* Left side latencies list */}
                      <div className="space-y-2">
                        {[
                          { node: "BOM-1 (Mumbai)", ping: latencies.mumbai },
                          { node: "SIN-2 (Singapore)", ping: latencies.singapore },
                          { node: "LHR-1 (London)", ping: latencies.london },
                          { node: "PDX-1 (Oregon)", ping: latencies.oregon }
                        ].map((node, i) => (
                          <div key={i} className="flex justify-between items-center text-[10.5px]">
                            <span className="text-zinc-400 flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              {node.node}
                            </span>
                            <span className="font-bold text-emerald-400 text-[10.5px]">{node.ping}ms</span>
                          </div>
                        ))}
                      </div>

                      {/* Right side SVG chart visualization */}
                      <div className="relative border border-white/5 rounded-xl bg-white/[0.01] p-2.5 h-[130px] flex items-center justify-center overflow-hidden">
                        {/* Live waveform */}
                        <svg className="w-full h-full overflow-visible" viewBox="0 0 100 60">
                          {/* Animated grid lines inside mini-chart */}
                          <line x1="0" y1="20" x2="100" y2="20" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
                          <line x1="0" y1="40" x2="100" y2="40" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
                          
                          {/* Actual wave path */}
                          <path 
                            d="M0,35 Q15,10 30,45 T60,20 T80,48 T100,25" 
                            fill="none" 
                            stroke="url(#waveGradient)" 
                            strokeWidth="2" 
                            className="animate-pulse"
                            style={{ animationDuration: '3s' }}
                          />
                          
                          <defs>
                            <linearGradient id="waveGradient" x1="0" y1="0" x2="1" y2="0">
                              <stop offset="0%" stopColor="#4f46e5" />
                              <stop offset="50%" stopColor="#8b5cf6" />
                              <stop offset="100%" stopColor="#10b981" />
                            </linearGradient>
                          </defs>
                        </svg>
                        
                        <div className="absolute bottom-1 right-2 text-[8px] uppercase tracking-widest text-zinc-500 font-bold">
                          Network Waveform
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Terminal Footer Console Status */}
              <div className="bg-zinc-900 px-4 py-2 border-t border-white/5 flex items-center justify-between text-[9px] text-zinc-500 uppercase tracking-widest font-mono">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  secure connection verified
                </span>
                <span>UTC {utcTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
