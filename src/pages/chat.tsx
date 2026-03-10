import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Send, User, Menu, X, PanelLeftOpen, PanelLeftClose, LogOut, Search } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import { ThemeToggle } from "../components/theme-toggle";
import { DisplayNamePrompt } from "../components/display-name-prompt";
import { DisclaimerModal } from "../components/disclaimer-modal";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ChatSession {
  date: string;
  preview: string;
  messageCount: number;
}

const PLACEHOLDER_PHRASES = [
  "Как се чувстваш днес?",
  "Искаш ли да споделиш нещо?",
  "Тук съм да те изслушам...",
  "Какво те тревожи?",
  "Разкажи ми повече...",
];

export function ChatPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState("");
  const [messagesUsed, setMessagesUsed] = useState(0);
  const [messagesLimit, setMessagesLimit] = useState(30);
  const [chatHistory, setChatHistory] = useState<ChatSession[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [placeholderVisible, setPlaceholderVisible] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const profilePopupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, isStreaming, streamingMessage]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderVisible(false);
      setTimeout(() => {
        setPlaceholderIdx((i) => (i + 1) % PLACEHOLDER_PHRASES.length);
        setPlaceholderVisible(true);
      }, 400);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileOpen && profilePopupRef.current && !profilePopupRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileOpen]);

  useEffect(() => {
    const loadData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("messages_used, subscription_plan")
        .eq("id", session.user.id)
        .single();

      if (profile) {
        setMessagesUsed(profile.messages_used ?? 0);
        const limits: Record<string, number> = {
          first_step: 30,
          personal_growth: 500,
          expanded_horizons: 1500,
        };
        setMessagesLimit(limits[profile.subscription_plan] ?? 30);
      }

      const { data: history } = await supabase
        .from("chat_messages")
        .select("id, role, content")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: true })
        .limit(50);

      if (history && history.length > 0) {
        setMessages(history as Message[]);
      }

      const { data: allMessages } = await supabase
        .from("chat_messages")
        .select("role, content, created_at")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false })
        .limit(200);

      if (allMessages) {
        const byDate = new Map<string, { preview: string; count: number }>();
        for (const msg of allMessages) {
          const date = msg.created_at.slice(0, 10);
          if (!byDate.has(date)) {
            const firstUser = allMessages
              .filter((m) => m.created_at.slice(0, 10) === date && m.role === "user")
              .pop();
            byDate.set(date, {
              preview: firstUser?.content?.slice(0, 40) || "Разговор",
              count: 0,
            });
          }
          byDate.get(date)!.count++;
        }
        const sessions: ChatSession[] = Array.from(byDate.entries()).map(([date, val]) => ({
          date,
          preview: val.preview,
          messageCount: val.count,
        }));
        setChatHistory(sessions);
      }

      setUserEmail(session.user.email ?? "");
    };
    loadData();
  }, []);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isLoading || isStreaming) return;

    const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: text };
    const history = [...messages, userMsg];

    setInput("");
    setMessages(history);
    setIsLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;

      const res = await fetch("/.netlify/functions/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          messages: history.map(({ role, content }) => ({ role, content })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        const errContent =
          res.status === 429
            ? "Достигна месечния лимит. Надгради за повече съобщения. / Monthly limit reached."
            : data.error || "Нещо се обърка. / Something went wrong.";
        setMessages((prev) => [
          ...prev,
          { id: crypto.randomUUID(), role: "assistant", content: errContent },
        ]);
        return;
      }

      setMessagesUsed(data.used ?? messagesUsed + 1);
      setMessagesLimit(data.limit ?? messagesLimit);

      const streamText = async (fullText: string) => {
        setIsStreaming(true);
        setStreamingMessage("");
        const words = fullText.split(" ");
        let current = "";
        for (let i = 0; i < words.length; i++) {
          current += (i === 0 ? "" : " ") + words[i];
          setStreamingMessage(current);
          await new Promise((r) => setTimeout(r, 30));
        }
        setIsStreaming(false);
        setStreamingMessage("");
        setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "assistant", content: fullText }]);
      };
      await streamText(data.reply);

      const { data: { session: currentSession } } = await supabase.auth.getSession();
      if (currentSession) {
        await supabase.from("chat_messages").insert([
          { user_id: currentSession.user.id, role: "user", content: text },
          { user_id: currentSession.user.id, role: "assistant", content: data.reply },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "Нещо се обърка. Провери връзката и опитай отново.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setInput("");
  };

  const filteredHistory = searchQuery.trim()
    ? chatHistory.filter((s) =>
        s.preview.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : chatHistory;

  return (
    <div className="flex h-screen bg-background overflow-hidden">

      {/* SIDEBAR */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 flex flex-col
        bg-background border-r border-border
        transform transition-all duration-200 ease-in-out
        md:relative
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
        ${sidebarCollapsed ? "md:w-14" : "w-56"}
      `}>
        {/* Лого */}
        <div className={`flex items-center p-4 border-b border-border ${sidebarCollapsed ? "justify-center" : "justify-between"}`}>
          <Link to="/" className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 28 28" fill="none" className="shrink-0">
              <circle cx="14" cy="14" r="12" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.25"/>
              <circle cx="14" cy="14" r="7" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5"/>
              <circle cx="14" cy="14" r="2.5" fill="currentColor"/>
              <ellipse cx="14" cy="14" rx="12" ry="4.5" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.35" transform="rotate(-30 14 14)"/>
            </svg>
            {!sidebarCollapsed && (
              <span className="font-semibold text-sm text-foreground">
                Eterapp
              </span>
            )}
          </Link>
          {!sidebarCollapsed && (
            <button onClick={() => setSidebarOpen(false)} className="md:hidden">
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
        </div>

        {/* New Chat */}
        <div className="p-3">
          <button
            onClick={() => { handleNewChat(); setSidebarOpen(false); }}
            title="Нов чат"
            className={`w-full flex items-center rounded-xl border border-border bg-transparent hover:bg-secondary text-foreground text-sm font-medium transition-colors ${sidebarCollapsed ? "justify-center p-2" : "gap-2 px-3 py-2"}`}>
            <Plus className="w-4 h-4 shrink-0" />
            {!sidebarCollapsed && "Нов чат"}
          </button>
        </div>

        {!sidebarCollapsed && messagesLimit - messagesUsed <= 10 && messagesLimit - messagesUsed > 0 && (
          <div className="mx-3 mb-2 px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-600 dark:text-amber-400">
            <span className="font-medium">Остават {messagesLimit - messagesUsed} съобщения</span>
            <p className="text-amber-500/80 mt-0.5">Надгради за повече</p>
          </div>
        )}
        {!sidebarCollapsed && messagesUsed >= messagesLimit && (
          <div className="mx-3 mb-2 px-3 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-600 dark:text-red-400">
            <span className="font-medium">Лимитът е достигнат</span>
            <p className="text-red-500/80 mt-0.5"><Link to="/billing" className="underline">Надгради сега</Link></p>
          </div>
        )}

        {/* История */}
        <div className="flex-1 flex flex-col overflow-hidden min-h-0 px-3">
          {sidebarCollapsed ? (
            <button
              title="Търси"
              className="flex justify-center w-full p-2 rounded-lg hover:bg-secondary text-muted-foreground transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
          ) : (
            <>
          <div className="relative mb-2">
            <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              placeholder="Търси в чатовете..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-xs bg-background/60 border border-border/40 rounded-lg outline-none focus:border-primary/50 text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <p className="text-xs text-muted-foreground px-1 py-1 font-medium uppercase tracking-wider">
            Последни
          </p>

          <div className="flex-1 overflow-y-auto space-y-0.5 min-h-0">
            {filteredHistory.length === 0 ? (
              <p className="text-xs text-muted-foreground px-2 py-1">
                {searchQuery ? "Няма резултати" : "Няма чатове още"}
              </p>
            ) : (
              filteredHistory.map((session) => (
                <button
                  key={session.date}
                  onClick={() => {
                    const loadSession = async () => {
                      const { data: { session: authSession } } = await supabase.auth.getSession();
                      if (!authSession) return;
                      const dayStart = session.date + "T00:00:00.000Z";
                      const dayEnd = session.date + "T23:59:59.999Z";
                      const { data } = await supabase
                        .from("chat_messages")
                        .select("id, role, content")
                        .eq("user_id", authSession.user.id)
                        .gte("created_at", dayStart)
                        .lte("created_at", dayEnd)
                        .order("created_at", { ascending: true });
                      if (data) setMessages(data as Message[]);
                      setSidebarOpen(false);
                    };
                    loadSession();
                  }}
                  className="w-full text-left px-2 py-2 rounded-lg hover:bg-secondary/60 transition-colors group"
                >
                  <p className="text-xs font-medium text-foreground truncate group-hover:text-primary transition-colors">
                    {session.preview}
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {new Date(session.date).toLocaleDateString("bg-BG", { day: "numeric", month: "short" })}
                    {" · "}{session.messageCount} съобщ.
                  </p>
                </button>
              ))
            )}
          </div>
            </>
          )}
        </div>

        {/* User */}
        <div ref={profilePopupRef} className="p-3 border-t border-border relative">
          <div
            className={`flex items-center rounded-lg hover:bg-secondary transition-colors cursor-pointer ${sidebarCollapsed ? "justify-center p-2" : "gap-3 px-2 py-2"}`}
            onClick={() => setProfileOpen((o) => !o)}
            title="Профил"
          >
            <div className="w-8 h-8 rounded-full bg-secondary border border-border flex items-center justify-center shrink-0">
              <User className="w-4 h-4 text-muted-foreground" />
            </div>
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground truncate">Профил</p>
              </div>
            )}
          </div>

          {profileOpen && (
            <div className="absolute bottom-16 left-4 right-4 z-50 rounded-xl border border-border bg-background p-3 space-y-2">
              {userEmail && <p className="text-xs text-muted-foreground truncate px-2">{userEmail}</p>}
              <Link to="/profile" className="block text-sm px-2 py-1.5 rounded-lg hover:bg-secondary" onClick={() => setProfileOpen(false)}>
                Настройки на профила
              </Link>
              <Link to="/billing" className="block text-sm px-2 py-1.5 rounded-lg hover:bg-secondary" onClick={() => setProfileOpen(false)}>
                Твоят план
              </Link>
              <div className="h-px bg-border/50 my-1" />
              <p className="text-[10px] text-muted-foreground px-2 pt-1 uppercase tracking-wider">Правни</p>
              <Link
                to="/legal/privacy"
                className="block text-xs px-2 py-1 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground"
                onClick={() => setProfileOpen(false)}
              >
                Поверителност
              </Link>
              <Link
                to="/legal/cookies"
                className="block text-xs px-2 py-1 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground"
                onClick={() => setProfileOpen(false)}
              >
                Бисквитки
              </Link>
              <Link
                to="/legal/terms"
                className="block text-xs px-2 py-1 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground"
                onClick={() => setProfileOpen(false)}
              >
                Условия
              </Link>
              <div className="h-px bg-border my-1" />
              <button
                className="w-full flex items-center gap-2 text-sm px-2 py-1.5 rounded-lg hover:bg-destructive/10 text-destructive"
                onClick={async () => {
                  await supabase.auth.signOut();
                  navigate("/");
                }}
              >
                <LogOut className="w-4 h-4" />
                Изход
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Overlay за мобилен */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)} />
      )}

      {/* MAIN */}
      <div className="flex flex-col flex-1 min-w-0">

        {/* TOPBAR */}
        <header className="flex items-center justify-between px-4 h-14
          border-t-2 border-primary/20 border-b border-border bg-background shrink-0">
          <div className="flex items-center gap-2">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden">
              <Menu className="w-5 h-5 text-muted-foreground" />
            </button>
            <button
              onClick={() => setSidebarCollapsed((c) => !c)}
              className="hidden md:flex p-1.5 rounded-lg hover:bg-secondary text-muted-foreground"
              aria-label="Toggle sidebar"
            >
              {sidebarCollapsed ? <PanelLeftOpen className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
            </button>
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">
              {messagesUsed} / {messagesLimit}
            </span>
            <ThemeToggle />
          </div>
        </header>

        {/* CHAT AREA */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          {messages.length === 0 && !isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-4 max-w-md">
                <h2 className="text-2xl font-semibold">Здравей, как си днес?</h2>
                <p className="text-muted-foreground text-sm">
                  Тук съм за теб. Можеш да споделиш всичко.
                </p>
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto w-full space-y-0">
              {messages.map((msg) => (
                msg.role === "user" ? (
                  <div key={msg.id} className="mb-6 flex justify-end">
                    <div className="bg-primary/10 text-foreground rounded-2xl px-4 py-2.5 ml-auto max-w-[75%] text-base leading-relaxed whitespace-pre-wrap">
                      {msg.content}
                    </div>
                  </div>
                ) : (
                  <div key={msg.id} className="flex gap-3 mb-6">
                    <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center bg-muted">
                      <svg width="16" height="16" viewBox="0 0 28 28" fill="none" className="text-primary">
                        <circle cx="14" cy="14" r="12" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.25"/>
                        <circle cx="14" cy="14" r="7" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5"/>
                        <circle cx="14" cy="14" r="2.5" fill="currentColor"/>
                        <ellipse cx="14" cy="14" rx="12" ry="4.5" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.35" transform="rotate(-30 14 14)"/>
                      </svg>
                    </div>
                    <div className="max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap bg-muted text-foreground rounded-tl-sm">
                      {msg.content}
                    </div>
                  </div>
                )
              ))}

              {/* Streaming bubble */}
              {isStreaming && streamingMessage && (
                <div className="flex gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <svg width="16" height="16" viewBox="0 0 28 28" fill="none" className="text-primary">
                      <circle cx="14" cy="14" r="12" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.25"/>
                      <circle cx="14" cy="14" r="7" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5"/>
                      <circle cx="14" cy="14" r="2.5" fill="currentColor"/>
                      <ellipse cx="14" cy="14" rx="12" ry="4.5" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.35" transform="rotate(-30 14 14)"/>
                    </svg>
                  </div>
                  <div className="max-w-[75%] px-4 py-3 rounded-2xl rounded-tl-sm bg-muted text-foreground text-sm leading-relaxed whitespace-pre-wrap">
                    {streamingMessage}
                  </div>
                </div>
              )}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <svg width="16" height="16" viewBox="0 0 28 28" fill="none" className="text-primary">
                      <circle cx="14" cy="14" r="12" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.25"/>
                      <circle cx="14" cy="14" r="7" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5"/>
                      <circle cx="14" cy="14" r="2.5" fill="currentColor"/>
                      <ellipse cx="14" cy="14" rx="12" ry="4.5" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.35" transform="rotate(-30 14 14)"/>
                    </svg>
                  </div>
                  <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-muted">
                    <div className="flex gap-1 items-center h-4">
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* INPUT BAR */}
        <div className="shrink-0 px-4 py-4 border-t border-border">
          <div className="max-w-2xl mx-auto w-full">
            <div className="flex items-end gap-2 px-4 py-3 rounded-xl
              border border-border bg-background
              focus-within:border-primary/50
              transition-colors">
              <div className="relative flex-1">
                {input.length === 0 && (
                  <span
                    className="absolute inset-0 flex items-center text-sm text-muted-foreground pointer-events-none select-none"
                    style={{ opacity: placeholderVisible ? 1 : 0, transition: "opacity 0.4s ease-in-out" }}
                  >
                    {PLACEHOLDER_PHRASES[placeholderIdx]}
                  </span>
                )}
                <textarea
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={1}
                  disabled={isLoading || isStreaming}
                  className="w-full bg-transparent resize-none outline-none text-sm
                    text-foreground max-h-32 overflow-y-auto disabled:cursor-not-allowed"
                />
              </div>
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading || isStreaming}
                className="w-8 h-8 rounded-xl bg-primary hover:bg-primary/90
                  disabled:opacity-30 disabled:cursor-not-allowed
                  flex items-center justify-center shrink-0
                  transition-colors">
                <Send className="w-4 h-4 text-primary-foreground" />
              </button>
            </div>
            <p className="text-center text-xs text-muted-foreground mt-2">
              Eterapp не е медицинска услуга.
            </p>
          </div>
        </div>

      </div>

      <DisplayNamePrompt />
      <DisclaimerModal />
    </div>
  );
}
