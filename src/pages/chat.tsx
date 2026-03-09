import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Send, User, Settings, Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";

export function ChatPage() {
  const { t } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [input, setInput] = useState("");

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
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded-xl
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
          {/* placeholder */}
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
          <button onClick={() => setSidebarOpen(true)}
            className="md:hidden">
            <Menu className="w-5 h-5 text-muted-foreground" />
          </button>
          <div className="flex-1" />
          <span className="text-xs text-muted-foreground">0 / 30</span>
        </header>

        {/* CHAT AREA */}
        <div className="flex-1 overflow-y-auto flex items-center justify-center p-8">
          <div className="text-center space-y-4 max-w-md">
            <h2 className="text-2xl font-semibold">Здравей, как си днес?</h2>
            <p className="text-muted-foreground text-sm">
              Тук съм за теб. Можеш да споделиш всичко.
            </p>
          </div>
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
                placeholder="Напиши нещо..."
                rows={1}
                className="flex-1 bg-transparent resize-none outline-none text-sm
                  text-foreground placeholder:text-muted-foreground"
              />
              <button
                disabled={!input.trim()}
                className="w-8 h-8 rounded-xl bg-violet-600 hover:bg-violet-500
                  disabled:opacity-30 flex items-center justify-center shrink-0
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
