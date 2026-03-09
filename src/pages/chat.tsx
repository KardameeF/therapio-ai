import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Send, User, Settings, Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { supabase } from "../lib/supabaseClient";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export function ChatPage() {
  const { t } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [messagesUsed, setMessagesUsed] = useState(0);
  const [messagesLimit, setMessagesLimit] = useState(30);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

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

      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content: data.reply },
      ]);
      setMessagesUsed(data.used ?? messagesUsed + 1);
      setMessagesLimit(data.limit ?? messagesLimit);
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

  return (
    <div className="flex h-screen bg-background overflow-hidden">

      {/* SIDEBAR */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 flex flex-col
        bg-secondary/50 border-r border-border/50
        transform transition-transform duration-200
        md:relative md:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Лого */}
        <div className="flex items-center justify-between p-4 border-b border-border/50">
          <Link to="/" className="flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="12" stroke="url(#eg)" strokeWidth="1.5" fill="none" opacity="0.25"/>
              <circle cx="14" cy="14" r="7" stroke="url(#eg)" strokeWidth="1.5" fill="none" opacity="0.5"/>
              <circle cx="14" cy="14" r="2.5" fill="url(#eg)"/>
              <ellipse cx="14" cy="14" rx="12" ry="4.5" stroke="url(#eg)" strokeWidth="1" fill="none" opacity="0.35" transform="rotate(-30 14 14)"/>
              <defs>
                <linearGradient id="eg" x1="2" y1="2" x2="26" y2="26" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#a78bfa"/>
                  <stop offset="100%" stopColor="#22d3ee"/>
                </linearGradient>
              </defs>
            </svg>
            <span className="font-semibold text-sm bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Eterapp
            </span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* New Chat */}
        <div className="p-3">
          <button
            onClick={() => { handleNewChat(); setSidebarOpen(false); }}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl
              bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium
              transition-colors">
            <Plus className="w-4 h-4" />
            Нов чат
          </button>
        </div>

        {/* История */}
        <div className="flex-1 overflow-y-auto px-3">
          <p className="text-xs text-muted-foreground px-2 py-2 font-medium uppercase tracking-wider">
            Последни
          </p>
          <p className="text-xs text-muted-foreground px-2 py-1">Няма чатове още</p>
        </div>

        {/* User */}
        <div className="p-3 border-t border-border/50">
          <div className="flex items-center gap-3 px-2 py-2 rounded-lg
            hover:bg-secondary transition-colors cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-violet-500/20
              flex items-center justify-center shrink-0">
              <User className="w-4 h-4 text-violet-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground truncate">Профил</p>
            </div>
            <Link to="/billing">
              <Settings className="w-4 h-4 text-muted-foreground hover:text-foreground" />
            </Link>
          </div>
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
          border-b border-border/50 bg-background/80 backdrop-blur-sm shrink-0">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden">
            <Menu className="w-5 h-5 text-muted-foreground" />
          </button>
          <div className="flex-1" />
          <span className="text-xs text-muted-foreground">
            {messagesUsed} / {messagesLimit}
          </span>
        </header>

        {/* CHAT AREA */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
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
            <div className="max-w-3xl mx-auto space-y-0">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 mb-6 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center
                    ${msg.role === "user" ? "bg-violet-500/20" : "bg-secondary border border-border/50"}`}>
                    {msg.role === "user" ? (
                      <User className="w-4 h-4 text-violet-400" />
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 28 28" fill="none">
                        <circle cx="14" cy="14" r="12" stroke="url(#ma)" strokeWidth="1.5" fill="none" opacity="0.25"/>
                        <circle cx="14" cy="14" r="7" stroke="url(#ma)" strokeWidth="1.5" fill="none" opacity="0.5"/>
                        <circle cx="14" cy="14" r="2.5" fill="url(#ma)"/>
                        <ellipse cx="14" cy="14" rx="12" ry="4.5" stroke="url(#ma)" strokeWidth="1" fill="none" opacity="0.35" transform="rotate(-30 14 14)"/>
                        <defs>
                          <linearGradient id="ma" x1="2" y1="2" x2="26" y2="26" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#a78bfa"/>
                            <stop offset="100%" stopColor="#22d3ee"/>
                          </linearGradient>
                        </defs>
                      </svg>
                    )}
                  </div>
                  <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap
                    ${msg.role === "user"
                      ? "bg-violet-600 text-white rounded-tr-sm"
                      : "bg-secondary text-foreground rounded-tl-sm"}`}>
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-secondary border border-border/50 flex items-center justify-center shrink-0">
                    <svg width="16" height="16" viewBox="0 0 28 28" fill="none">
                      <circle cx="14" cy="14" r="12" stroke="url(#ta)" strokeWidth="1.5" fill="none" opacity="0.25"/>
                      <circle cx="14" cy="14" r="7" stroke="url(#ta)" strokeWidth="1.5" fill="none" opacity="0.5"/>
                      <circle cx="14" cy="14" r="2.5" fill="url(#ta)"/>
                      <ellipse cx="14" cy="14" rx="12" ry="4.5" stroke="url(#ta)" strokeWidth="1" fill="none" opacity="0.35" transform="rotate(-30 14 14)"/>
                      <defs>
                        <linearGradient id="ta" x1="2" y1="2" x2="26" y2="26" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#a78bfa"/>
                          <stop offset="100%" stopColor="#22d3ee"/>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-secondary">
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
        <div className="shrink-0 px-4 py-4 border-t border-border/50">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-end gap-2 px-4 py-3 rounded-2xl
              border border-border/60 bg-secondary/50
              focus-within:border-violet-400/60 focus-within:bg-background
              transition-all duration-200">
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Напиши нещо..."
                rows={1}
                disabled={isLoading}
                className="flex-1 bg-transparent resize-none outline-none text-sm
                  text-foreground placeholder:text-muted-foreground
                  max-h-32 overflow-y-auto disabled:cursor-not-allowed"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="w-8 h-8 rounded-xl bg-violet-600 hover:bg-violet-500
                  disabled:opacity-30 disabled:cursor-not-allowed
                  flex items-center justify-center shrink-0
                  transition-colors">
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
            <p className="text-center text-xs text-muted-foreground mt-2">
              Eterapp не е медицинска услуга.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
