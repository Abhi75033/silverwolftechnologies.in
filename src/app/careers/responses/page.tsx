"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Lock,
  Download,
  Search,
  LogOut,
  Calendar,
  Building2,
  User,
  Sparkles,
  ArrowLeft,
  Loader2,
  Mail,
  Phone,
  ExternalLink,
  Users,
  RefreshCw,
  Trash2,
  Fingerprint
} from "lucide-react";
import Link from "next/link";
import { startRegistration, startAuthentication } from "@simplewebauthn/browser";
import { toast } from "sonner";

type Submission = {
  id: string;
  name: string;
  email: string;
  phone: string;
  college: string;
  semesterYear: string;
  portfolio: string;
  source: string;
  jobId: number;
  jobTitle: string;
  submittedAt: string;
};

export default function CareersResponsesPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [responses, setResponses] = useState<Submission[]>([]);
  const [filteredResponses, setFilteredResponses] = useState<Submission[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [registeringPasskey, setRegisteringPasskey] = useState(false);
  const [passkeyLoginLoading, setPasskeyLoginLoading] = useState(false);

  // Load submissions from API using the provided password or token
  const loadSubmissions = useCallback(async (options: { pw?: string; token?: string }) => {
    setIsLoading(true);
    setError("");
    try {
      const headers: Record<string, string> = {
        "Cache-Control": "no-cache",
        "Pragma": "no-cache",
      };
      if (options.pw) {
        headers["x-admin-password"] = options.pw;
      } else if (options.token) {
        headers["x-admin-token"] = options.token;
      }

      const res = await fetch("/api/careers/responses", { headers });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to load responses.");
      }
      setResponses(data.data || []);
      setFilteredResponses(data.data || []);
      setIsAuthenticated(true);
      
      if (options.pw) {
        sessionStorage.setItem("admin_password", options.pw);
        sessionStorage.removeItem("admin_token");
      } else if (options.token) {
        sessionStorage.setItem("admin_token", options.token);
        sessionStorage.removeItem("admin_password");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to authenticate.");
      sessionStorage.removeItem("admin_password");
      sessionStorage.removeItem("admin_token");
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Check sessionStorage on mount
  useEffect(() => {
    const savedPw = sessionStorage.getItem("admin_password");
    const savedToken = sessionStorage.getItem("admin_token");
    if (savedPw) {
      loadSubmissions({ pw: savedPw });
    } else if (savedToken) {
      loadSubmissions({ token: savedToken });
    }
  }, [loadSubmissions]);

  // Poll for submissions every 5 seconds when authenticated to sync in real-time
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(() => {
      const savedPw = sessionStorage.getItem("admin_password");
      const savedToken = sessionStorage.getItem("admin_token");
      if (savedPw || savedToken) {
        const headers: Record<string, string> = {
          "Cache-Control": "no-cache",
          "Pragma": "no-cache",
        };
        if (savedPw) headers["x-admin-password"] = savedPw;
        else if (savedToken) headers["x-admin-token"] = savedToken;

        fetch("/api/careers/responses", { headers })
          .then((res) => res.json())
          .then((data) => {
            if (data.success && data.data) {
              setResponses(data.data);
            }
          })
          .catch((err) => console.error("Real-time poll error:", err));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  // Handle search filtering
  useEffect(() => {
    if (!searchQuery) {
      setFilteredResponses(responses);
      return;
    }
    const q = searchQuery.toLowerCase();
    const filtered = responses.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.college.toLowerCase().includes(q) ||
        r.jobTitle.toLowerCase().includes(q) ||
        r.source.toLowerCase().includes(q)
    );
    setFilteredResponses(filtered);
  }, [searchQuery, responses]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    setLoginLoading(true);
    setError("");
    await loadSubmissions({ pw: password });
    setLoginLoading(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_password");
    sessionStorage.removeItem("admin_token");
    setIsAuthenticated(false);
    setResponses([]);
    setFilteredResponses([]);
    setPassword("");
    setError("");
  };

  const handleRegisterPasskey = async () => {
    setRegisteringPasskey(true);
    setError("");
    try {
      const savedPw = sessionStorage.getItem("admin_password");
      const savedToken = sessionStorage.getItem("admin_token");
      const headers: Record<string, string> = {};
      if (savedPw) headers["x-admin-password"] = savedPw;
      else if (savedToken) headers["x-admin-token"] = savedToken;

      const optionsRes = await fetch("/api/careers/passkey/register-options", { headers });
      const options = await optionsRes.json();
      if (!optionsRes.ok) {
        throw new Error(options.error || "Failed to fetch passkey registration options.");
      }

      const credential = await startRegistration(options);

      const verifyRes = await fetch("/api/careers/passkey/register-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credential),
      });
      const verifyData = await verifyRes.json();
      if (!verifyRes.ok || !verifyData.success) {
        throw new Error(verifyData.error || "Failed to verify passkey registration.");
      }

      toast.success("Passkey registered successfully! You can now use biometrics to log in.");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to register passkey.");
    } finally {
      setRegisteringPasskey(false);
    }
  };

  const handlePasskeyLogin = async () => {
    setPasskeyLoginLoading(true);
    setError("");
    try {
      const optionsRes = await fetch("/api/careers/passkey/login-options");
      const options = await optionsRes.json();
      if (!optionsRes.ok) {
        throw new Error(options.error || "Failed to fetch passkey login options.");
      }

      if (!options.allowCredentials || options.allowCredentials.length === 0) {
        throw new Error("No passkeys are registered yet. Please log in using password first, then register a passkey.");
      }

      const assertion = await startAuthentication(options);

      const verifyRes = await fetch("/api/careers/passkey/login-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(assertion),
      });
      const verifyData = await verifyRes.json();
      if (!verifyRes.ok || !verifyData.success) {
        throw new Error(verifyData.error || "Failed to verify passkey.");
      }

      toast.success("Passkey authentication successful!");
      await loadSubmissions({ token: verifyData.token });
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Passkey authentication failed.");
    } finally {
      setPasskeyLoginLoading(false);
    }
  };

  const handleDeleteResponse = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this applicant response?")) return;

    setDeletingId(id);
    const savedPw = sessionStorage.getItem("admin_password");
    const savedToken = sessionStorage.getItem("admin_token");

    const headers: Record<string, string> = {};
    if (savedPw) headers["x-admin-password"] = savedPw;
    else if (savedToken) headers["x-admin-token"] = savedToken;

    try {
      const res = await fetch(`/api/careers/responses?id=${id}`, {
        method: "DELETE",
        headers,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to delete applicant record.");
      }

      // Remove row from frontend state
      setResponses((prev) => prev.filter((r) => r.id !== id));
      setFilteredResponses((prev) => prev.filter((r) => r.id !== id));
    } catch (err: any) {
      console.error(err);
      alert(err.message || "An error occurred while deleting.");
    } finally {
      setDeletingId(null);
    }
  };

  const exportToCSV = () => {
    if (filteredResponses.length === 0) return;

    const headers = [
      "ID",
      "Applied For",
      "Full Name",
      "Email Address",
      "Phone Number",
      "College Name",
      "Semester / Year",
      "Portfolio Link",
      "Referral Source",
      "Applied Date"
    ];

    const rows = filteredResponses.map((r) => [
      r.id,
      r.jobTitle,
      r.name,
      r.email,
      r.phone,
      r.college,
      r.semesterYear,
      r.portfolio || "Not provided",
      r.source,
      new Date(r.submittedAt).toLocaleString("en-IN")
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",")
      )
    ].join("\n");

    // Add UTF-8 BOM so Excel opens non-ASCII characters correctly
    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `careers_applications_${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Compute quick counters
  const totalApps = responses.length;
  const currentWeekApps = responses.filter((r) => {
    const appDate = new Date(r.submittedAt).getTime();
    const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return appDate >= oneWeekAgo;
  }).length;

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white font-sans pb-16">
      {/* Grid Overlay */}
      <div className="absolute inset-0 grid-bg pointer-events-none z-0" />
      <div className="absolute top-24 left-[10%] w-[350px] h-[350px] bg-primary/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-[40%] right-[10%] w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* HEADER BAR */}
      <header className="relative z-10 border-b border-white/5 glass backdrop-blur-md">
        <div className="container max-w-7xl mx-auto px-4 py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/careers"
              className="p-2 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 transition-all text-muted-foreground hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">Admin Control</span>
              <h1 className="text-lg font-bold tracking-tight text-white">Careers Portal</h1>
            </div>
          </div>

          {isAuthenticated && (
            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-start sm:justify-end pl-11 sm:pl-0">
              <Button
                onClick={handleRegisterPasskey}
                disabled={registeringPasskey}
                variant="glass"
                size="sm"
                className="rounded-full border-white/10 text-[11px] sm:text-xs hover:bg-primary/10 hover:text-primary transition-all gap-1.5"
              >
                {registeringPasskey ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Fingerprint className="h-3.5 w-3.5 text-primary" />
                )}
                <span>Register Passkey</span>
              </Button>

              <Button
                onClick={handleLogout}
                variant="glass"
                size="sm"
                className="rounded-full border-white/10 text-[11px] sm:text-xs hover:bg-destructive/15 hover:text-destructive hover:border-destructive/30 transition-all gap-1.5"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Logout</span>
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="relative z-10 container max-w-7xl mx-auto px-4 mt-12">
        {!isAuthenticated ? (
          /* LOGIN PANEL STATE */
          <div className="max-w-md mx-auto mt-16 animate-fade-up">
            <div className="glass rounded-3xl border-2 border-indigo-500/30 p-8 shadow-[0_0_80px_rgba(99,102,241,0.25)] relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="text-center mb-8">
                <div className="h-14 w-14 rounded-full bg-primary/15 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-white">Authorized Access Only</h2>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed max-w-xs mx-auto">
                  Enter the administrative credential key to unlock form submissions and candidate files.
                </p>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-5">
                {error && (
                  <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-3 text-xs text-destructive font-medium text-center">
                    {error}
                  </div>
                )}

                <div className="space-y-1.5">
                  <label htmlFor="adminKey" className="text-xs font-semibold text-white/95">
                    Security Passkey Code
                  </label>
                  <Input
                    id="adminKey"
                    type="password"
                    placeholder="Enter admin password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-[#090a0d] border border-white/15 rounded-xl text-sm text-white placeholder:text-muted-foreground/30 focus:border-primary/60 focus:ring-1 focus:ring-primary/60 focus-visible:ring-0 focus-visible:ring-offset-0 transition-all duration-200"
                  />
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  className="w-full py-2.5 rounded-xl text-sm"
                  disabled={loginLoading || passkeyLoginLoading}
                >
                  {loginLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Verifying Passkey...</span>
                    </div>
                  ) : (
                    "Access Submissions Database"
                  )}
                </Button>
              </form>

              <div className="relative my-5 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
                <span className="relative bg-[#0d0e12] px-3 text-[10px] text-muted-foreground uppercase tracking-wider">
                  or use biometrics
                </span>
              </div>

              <Button
                type="button"
                onClick={handlePasskeyLogin}
                variant="glass"
                className="w-full py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 border-white/10 hover:bg-white/5"
                disabled={passkeyLoginLoading || loginLoading}
              >
                {passkeyLoginLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                ) : (
                  <Fingerprint className="h-4.5 w-4.5 text-primary" />
                )}
                <span>Sign in with Passkey</span>
              </Button>
            </div>
          </div>
        ) : (
          /* AUTHENTICATED DASHBOARD STATE */
          <div className="space-y-8 animate-fade-up">
            
            {/* STAT CARDS ROW */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="glass rounded-2xl border border-white/10 p-6 flex items-center justify-between shadow-lg">
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground">Total Submissions</span>
                  <p className="text-3xl font-extrabold text-white">{totalApps}</p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
              </div>

              <div className="glass rounded-2xl border border-white/10 p-6 flex items-center justify-between shadow-lg">
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground">Last 7 Days</span>
                  <p className="text-3xl font-extrabold text-white">{currentWeekApps}</p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-purple-400" />
                </div>
              </div>

              <div className="glass rounded-2xl border border-white/10 p-6 flex items-center justify-between shadow-lg">
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground">Active Role Listing</span>
                  <p className="text-2xl font-bold text-white max-w-[180px] truncate">Marketing Intern</p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-emerald-400" />
                </div>
              </div>
            </div>

            {/* FILTER & UTILITY BAR */}
            <div className="glass rounded-2xl border border-white/10 p-5 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search applicants, emails, colleges..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full glass border border-white/10 rounded-xl text-sm placeholder:text-muted-foreground/60 text-white focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:border-primary/50"
                />
              </div>

              <div className="flex w-full md:w-auto items-center justify-end gap-3">
                <Button
                  onClick={() => {
                    const savedPw = sessionStorage.getItem("admin_password");
                    const savedToken = sessionStorage.getItem("admin_token");
                    if (savedPw) loadSubmissions({ pw: savedPw });
                    else if (savedToken) loadSubmissions({ token: savedToken });
                  }}
                  variant="glass"
                  className="rounded-xl px-4 text-xs py-2.5 flex items-center gap-2 w-full md:w-auto border-white/10 hover:bg-white/5"
                  disabled={isLoading}
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`} />
                  <span>Refresh</span>
                </Button>
                <Button
                  onClick={exportToCSV}
                  disabled={filteredResponses.length === 0}
                  variant="hero"
                  className="rounded-xl px-5 text-xs py-2.5 flex items-center gap-2 w-full md:w-auto"
                >
                  <Download className="h-4 w-4" />
                  <span>Export to Excel (CSV)</span>
                </Button>
              </div>
            </div>

            {/* RESPONSIVE TABLE GRID */}
            <div className="glass rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3">
                  <Loader2 className="h-8 w-8 text-primary animate-spin" />
                  <span className="text-sm text-muted-foreground">Fetching records...</span>
                </div>
              ) : filteredResponses.length === 0 ? (
                <div className="py-20 text-center text-muted-foreground flex flex-col items-center gap-2">
                  <div className="h-12 w-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-2">
                    <Search className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold text-white">No applicants found</h3>
                  <p className="text-xs max-w-xs leading-relaxed">
                    {responses.length === 0
                      ? "Submissions list is currently empty. Complete the careers application to capture records."
                      : "Refine your filter query keywords to search other candidate rows."}
                  </p>
                </div>
              ) : (
                /* SCROLLABLE TABLE BODY */
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left text-sm text-white/90 min-w-[1000px]">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/[0.02]">
                        <th className="p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Applied For</th>
                        <th className="p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Applicant Name</th>
                        <th className="p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Contact details</th>
                        <th className="p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">College & Year</th>
                        <th className="p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Source / Referral</th>
                        <th className="p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Portfolio URL</th>
                        <th className="p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Date</th>
                        <th className="p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredResponses.map((item) => (
                        <tr
                          key={item.id}
                          className="hover:bg-white/[0.02] transition-colors"
                        >
                          {/* Role */}
                          <td className="p-4 font-semibold text-white text-xs whitespace-nowrap">
                            <span className="glass px-2.5 py-1 rounded-full border border-primary/20 text-primary">
                              {item.jobTitle}
                            </span>
                          </td>

                          {/* Name */}
                          <td className="p-4 font-semibold text-white whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <User className="h-4.5 w-4.5 text-muted-foreground" />
                              <span>{item.name}</span>
                            </div>
                          </td>

                          {/* Contact Info */}
                          <td className="p-4 whitespace-nowrap">
                            <div className="space-y-1 text-xs">
                              <a
                                href={`mailto:${item.email}`}
                                className="flex items-center gap-1.5 hover:text-primary transition-all text-muted-foreground"
                              >
                                <Mail className="h-3 w-3" />
                                <span>{item.email}</span>
                              </a>
                              <a
                                href={`tel:${item.phone}`}
                                className="flex items-center gap-1.5 hover:text-primary transition-all text-muted-foreground"
                              >
                                <Phone className="h-3 w-3" />
                                <span>{item.phone}</span>
                              </a>
                            </div>
                          </td>

                          {/* College */}
                          <td className="p-4">
                            <div className="space-y-1 max-w-[220px]">
                              <div className="flex items-start gap-1.5 text-xs text-white/90">
                                <Building2 className="h-3.5 w-3.5 text-muted-foreground/80 mt-0.5 shrink-0" />
                                <span className="line-clamp-2">{item.college}</span>
                              </div>
                              <p className="text-[10px] text-muted-foreground pl-5">{item.semesterYear}</p>
                            </div>
                          </td>

                          {/* Source */}
                          <td className="p-4 whitespace-nowrap">
                            <span className="text-xs bg-[#15161c] px-2.5 py-1 rounded-lg text-muted-foreground border border-white/5">
                              {item.source}
                            </span>
                          </td>

                          {/* Link */}
                          <td className="p-4 whitespace-nowrap">
                            {item.portfolio ? (
                              <a
                                href={item.portfolio}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 text-xs text-primary hover:underline group"
                              >
                                <span>View Portfolio</span>
                                <ExternalLink className="h-3 w-3 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                              </a>
                            ) : (
                              <span className="text-xs text-muted-foreground/45 italic">Not provided</span>
                            )}
                          </td>

                          {/* Date */}
                          <td className="p-4 text-xs text-muted-foreground whitespace-nowrap">
                            {new Date(item.submittedAt).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric"
                            })}
                          </td>

                          {/* Delete Action */}
                          <td className="p-4 text-center whitespace-nowrap">
                            <Button
                              onClick={() => handleDeleteResponse(item.id)}
                              disabled={deletingId === item.id}
                              variant="glass"
                              size="sm"
                              className="h-8 w-8 p-0 rounded-lg hover:bg-destructive/15 border-white/10 hover:border-destructive/30 text-muted-foreground hover:text-destructive transition-all"
                              title="Delete Application"
                            >
                              {deletingId === item.id ? (
                                <Loader2 className="h-4 w-4 animate-spin text-destructive" />
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>
        )}
      </main>
    </div>
  );
}
