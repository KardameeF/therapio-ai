import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useTranslation } from "react-i18next";
import { Search, Users, TrendingUp, UserCheck, Ban, MoreHorizontal, RotateCcw, RefreshCw, Mail, UserX } from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../components/ui/dropdown-menu";

interface UserRow {
  id: string;
  email: string;
  subscription_plan: string;
  messages_used: number;
  created_at: string;
  is_blocked: boolean;
  role: string;
}

const PLAN_COLORS: Record<string, string> = {
  first_step: "text-muted-foreground bg-muted",
  personal_growth: "text-primary bg-accent",
  expanded_horizons: "text-accent-foreground bg-accent",
};

export function AdminPage() {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<UserRow[]>([]);
  const [search, setSearch] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const { t } = useTranslation();

  const totalUsers = users.length;
  const paidUsers = users.filter(u => u.subscription_plan !== "first_step").length;
  const freeUsers = users.filter(u => u.subscription_plan === "first_step").length;
  const blockedUsers = users.filter(u => u.is_blocked).length;

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/"); return; }
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();
      if (profile?.role !== "admin") { navigate("/app"); return; }
      setAuthorized(true);
      await loadUsers();
      setLoading(false);
    };
    init();
  }, []);

  const loadUsers = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("id, email, subscription_plan, messages_used, created_at, is_blocked, role")
      .order("created_at", { ascending: false });
    if (data) setUsers(data as UserRow[]);
  };

  const handlePlanChange = async (userId: string, newPlan: string) => {
    setActionLoading(userId + "_plan");
    await supabase.from("profiles").update({ subscription_plan: newPlan }).eq("id", userId);
    await loadUsers();
    setActionLoading(null);
  };

  const handleToggleBlock = async (userId: string, currentlyBlocked: boolean) => {
    setActionLoading(userId + "_block");
    await supabase.from("profiles").update({ is_blocked: !currentlyBlocked }).eq("id", userId);
    await loadUsers();
    setActionLoading(null);
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleResetMessages = async (userId: string) => {
    await supabase.from("profiles").update({ messages_used: 0 }).eq("id", userId);
    await loadUsers();
    showToast(t("admin.resetSuccess"));
  };

  const handleSyncPlan = async (userId: string) => {
    const { data: sub } = await supabase
      .from("subscriptions")
      .select("plan_type, status")
      .eq("user_id", userId)
      .eq("status", "active")
      .single();
    const plan = sub ? sub.plan_type : "first_step";
    await supabase.from("profiles").update({ subscription_plan: plan }).eq("id", userId);
    await loadUsers();
    showToast(`${t("admin.syncSuccess")}: ${plan}`);
  };

  const handleSendEmail = (email: string) => {
    window.open(`mailto:${email}?subject=Eterapp Support`, "_blank");
  };

  const filtered = search.trim()
    ? users.filter(u => u.email?.toLowerCase().includes(search.toLowerCase()))
    : users;

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
    </div>
  );

  if (!authorized) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t("admin.panelTitle")}</h1>
        <p className="text-sm text-muted-foreground">{t("admin.panelSubtitle")}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: t("admin.stats.totalUsers"), value: totalUsers, icon: Users, color: "text-foreground" },
          { label: t("admin.stats.paid"), value: paidUsers, icon: TrendingUp, color: "text-primary" },
          { label: t("admin.stats.free"), value: freeUsers, icon: UserCheck, color: "text-muted-foreground" },
          { label: t("admin.stats.blocked"), value: blockedUsers, icon: Ban, color: "text-destructive" },
        ].map(stat => (
          <div key={stat.label} className="rounded-2xl border border-border bg-card p-4 flex items-center gap-3">
            <stat.icon className={`w-8 h-8 ${stat.color} opacity-70`} />
            <div>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          placeholder={t("admin.table.searchPlaceholder")}
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-border/50 bg-background outline-none focus:border-primary/60 transition-colors"
        />
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 border-b border-border/30">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">{t("admin.table.email")}</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">{t("admin.table.plan")}</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">{t("admin.table.messages")}</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">{t("admin.table.registration")}</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">{t("admin.table.actions")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/30">
            {filtered.map(user => (
              <tr key={user.id} className={`transition-colors hover:bg-muted/30 ${user.is_blocked ? "opacity-40" : ""}`}>
                <td className="px-4 py-3 font-mono text-xs max-w-[200px] truncate">{user.email}</td>
                <td className="px-4 py-3">
                  <select
                    value={user.subscription_plan}
                    disabled={actionLoading === user.id + "_plan"}
                    onChange={e => handlePlanChange(user.id, e.target.value)}
                    className={`text-xs px-2 py-1 rounded-lg font-medium border-0 outline-none cursor-pointer ${PLAN_COLORS[user.subscription_plan]}`}
                  >
                    <option value="first_step">{t("admin.plans.first_step")}</option>
                    <option value="personal_growth">{t("admin.plans.personal_growth")}</option>
                    <option value="expanded_horizons">{t("admin.plans.expanded_horizons")}</option>
                  </select>
                </td>
                <td className="px-4 py-3 text-muted-foreground tabular-nums">{user.messages_used}</td>
                <td className="px-4 py-3 text-muted-foreground text-xs tabular-nums">
                  {new Date(user.created_at).toLocaleDateString("bg-BG")}
                </td>
                <td className="px-4 py-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
                        <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleResetMessages(user.id)}>
                        <RotateCcw className="w-4 h-4 mr-2" />
                        {t("admin.resetMessages")}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleSyncPlan(user.id)}>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        {t("admin.syncPlan")}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleSendEmail(user.email)}>
                        <Mail className="w-4 h-4 mr-2" />
                        {t("admin.sendEmail")}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleToggleBlock(user.id, user.is_blocked)}
                        disabled={user.role === "admin"}
                        className={user.is_blocked ? "text-green-600 focus:text-green-600" : "text-destructive focus:text-destructive"}
                      >
                        {user.is_blocked
                          ? <><UserCheck className="w-4 h-4 mr-2" />{t("admin.unblock")}</>
                          : <><UserX className="w-4 h-4 mr-2" />{t("admin.block")}</>}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground text-sm py-8">{t("admin.noResults")}</p>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground animate-in fade-in slide-in-from-bottom-4">
          {toast}
        </div>
      )}
    </div>
  );
}
