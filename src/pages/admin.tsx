import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { Search, Users, TrendingUp, UserCheck, Ban } from "lucide-react";

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
  personal_growth: "text-violet-600 bg-violet-100 dark:bg-violet-900/30",
  expanded_horizons: "text-cyan-600 bg-cyan-100 dark:bg-cyan-900/30",
};

export function AdminPage() {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<UserRow[]>([]);
  const [search, setSearch] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

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
        <h1 className="text-2xl font-bold">Администраторски панел</h1>
        <p className="text-sm text-muted-foreground">Управление на потребители и абонаменти</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Общо потребители", value: totalUsers, icon: Users, color: "text-foreground" },
          { label: "Платени", value: paidUsers, icon: TrendingUp, color: "text-violet-500" },
          { label: "Безплатни", value: freeUsers, icon: UserCheck, color: "text-muted-foreground" },
          { label: "Блокирани", value: blockedUsers, icon: Ban, color: "text-destructive" },
        ].map(stat => (
          <div key={stat.label} className="rounded-xl border border-border/50 bg-card p-4 flex items-center gap-3">
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
          placeholder="Търси по имейл..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-border/50 bg-background outline-none focus:border-violet-400/60 transition-colors"
        />
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border/50 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 border-b border-border/30">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Имейл</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">План</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Съобщения</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Регистрация</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Действия</th>
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
                    <option value="first_step">Първа Стъпка</option>
                    <option value="personal_growth">Личен Растеж</option>
                    <option value="expanded_horizons">Разширени Хоризонти</option>
                  </select>
                </td>
                <td className="px-4 py-3 text-muted-foreground tabular-nums">{user.messages_used}</td>
                <td className="px-4 py-3 text-muted-foreground text-xs tabular-nums">
                  {new Date(user.created_at).toLocaleDateString("bg-BG")}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleToggleBlock(user.id, user.is_blocked)}
                    disabled={actionLoading === user.id + "_block" || user.role === "admin"}
                    className={`text-xs px-3 py-1 rounded-lg font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
                      user.is_blocked
                        ? "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400"
                    }`}
                  >
                    {user.is_blocked ? "Деблокирай" : "Блокирай"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground text-sm py-8">Няма резултати</p>
        )}
      </div>
    </div>
  );
}
