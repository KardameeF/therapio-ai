import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Send, User, Menu, X, PanelLeftOpen, PanelLeftClose, LogOut, Search, Mic, MicOff, Loader2, ImageIcon, ClipboardList, CheckSquare, Lock, Headphones } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import { LegalModal } from "../components/LegalModal";
import { useLegalModal } from "../hooks/useLegalModal";
import { ThemeToggle } from "../components/theme-toggle";
import { DisplayNamePrompt } from "../components/display-name-prompt";
import { DisclaimerModal } from "../components/disclaimer-modal";
import { useVoiceRecorder } from "../hooks/useVoiceRecorder";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../components/ui/dialog";

interface SessionNote {
  id: string;
  content: string;
  is_read: boolean;
  created_at: string;
}

interface SessionTask {
  id: string;
  title: string;
  description: string;
  is_completed: boolean;
  completed_at: string | null;
}

interface TherapyAudio {
  id: string;
  title: string;
  description: string;
  duration_seconds: number;
  storage_path: string;
  condition: string;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ChatSession {
  id: string | number;
  title: string;
  updated_at: string;
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
  const { t } = useTranslation();
  const { legalModal, openLegal, closeLegal } = useLegalModal();
  const [isDesktop, setIsDesktop] = useState(() => typeof window !== "undefined" && window.innerWidth >= 768);

  useEffect(() => {
    const handler = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [messagesUsed, setMessagesUsed] = useState(0);
  const [messagesLimit, setMessagesLimit] = useState(30);
  const [currentPlan, setCurrentPlan] = useState("first_step");
  const [currentSessionId, setCurrentSessionId] = useState<string | number | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatSession[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [placeholderVisible, setPlaceholderVisible] = useState(true);
  const [attachedImage, setAttachedImage] = useState<{ base64: string; preview: string } | null>(null);
  const [notesModalSession, setNotesModalSession] = useState<string | number | null>(null);
  const [tasksModalSession, setTasksModalSession] = useState<string | number | null>(null);
  const [sessionNotes, setSessionNotes] = useState<SessionNote[]>([]);
  const [sessionTasks, setSessionTasks] = useState<SessionTask[]>([]);
  const [therapyModalSession, setTherapyModalSession] = useState<string | number | null>(null);
  const [therapyAudio, setTherapyAudio] = useState<TherapyAudio | null>(null);
  const [sessionsWithTherapy, setSessionsWithTherapy] = useState<Set<string>>(new Set());
  const [isLoadingTherapy, setIsLoadingTherapy] = useState(false);
  const [showCompressionNotice, setShowCompressionNotice] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false);
  const [voiceListening, setVoiceListening] = useState(false);
  const [voiceSpeaking, setVoiceSpeaking] = useState(false);
  const [preferredVoice, setPreferredVoice] = useState<"alloy" | "onyx">("alloy");
  const voiceRecognitionRef = useRef<SpeechRecognition | null>(null);
  const voiceAudioRef = useRef<HTMLAudioElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const profilePopupRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { isRecording, isTranscribing, startRecording, stopAndTranscribe } = useVoiceRecorder();
  const isPaidPlan = ["personal_growth", "expanded_horizons"].includes(currentPlan);
  const typewriterRef = useRef<{ timeoutId: ReturnType<typeof setTimeout> | null; cancelled: boolean }>({
    timeoutId: null,
    cancelled: false,
  });

  const typewriterEffect = useCallback(
    (fullText: string, onUpdate: (current: string) => void, onDone: () => void) => {
      typewriterRef.current.cancelled = false;
      let i = 0;
      let scrollCounter = 0;

      const type = () => {
        if (typewriterRef.current.cancelled) return;
        if (i < fullText.length) {
          const delay = Math.random() * 30 + 25;
          onUpdate(fullText.slice(0, i + 1));
          i++;
          scrollCounter++;
          if (scrollCounter % 10 === 0) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
          }
          typewriterRef.current.timeoutId = setTimeout(type, delay);
        } else {
          typewriterRef.current.timeoutId = null;
          onDone();
        }
      };
      type();
    },
    []
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

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
        .select("messages_used, subscription_plan, preferred_voice_gender")
        .eq("id", session.user.id)
        .single();

      if (profile) {
        setMessagesUsed(profile.messages_used ?? 0);
        const plan = profile.subscription_plan ?? "first_step";
        setCurrentPlan(plan);
        const limits: Record<string, number> = {
          first_step: 30,
          personal_growth: 500,
          expanded_horizons: 1500,
        };
        setMessagesLimit(limits[plan] ?? 30);
        setPreferredVoice(profile.preferred_voice_gender === "male" ? "onyx" : "alloy");
      }

      // Load chat sessions for sidebar
      const { data: sessions } = await supabase
        .from("chat_sessions")
        .select("id, title, updated_at")
        .eq("user_id", session.user.id)
        .order("updated_at", { ascending: false })
        .limit(30);

      if (sessions && sessions.length > 0) {
        setChatHistory(sessions);
        // Load the most recent session's messages
        const latestId = sessions[0].id;
        setCurrentSessionId(latestId);
        const { data: msgs } = await supabase
          .from("chat_messages")
          .select("id, role, content")
          .eq("session_id", latestId)
          .order("created_at", { ascending: true });
        if (msgs && msgs.length > 0) {
          setMessages(msgs as Message[]);
        }
      }

      setUserEmail(session.user.email ?? "");

      // Preload which sessions have therapy audio (expanded_horizons)
      const { data: therapySessions } = await supabase
        .from("user_therapy_sessions")
        .select("chat_session_id")
        .eq("user_id", session.user.id);
      if (therapySessions?.length) {
        setSessionsWithTherapy(
          new Set(therapySessions.map((ts: { chat_session_id: string }) => String(ts.chat_session_id)))
        );
      }
    };
    loadData();
  }, []);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    typewriterRef.current.cancelled = true;
    if (typewriterRef.current.timeoutId) {
      clearTimeout(typewriterRef.current.timeoutId);
      typewriterRef.current.timeoutId = null;
    }

    const isFirstMessage = messages.length === 0;
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
          ...(attachedImage ? { image: attachedImage.base64 } : {}),
          ...(currentSessionId ? { sessionId: currentSessionId } : {}),
        }),
      });

      const data = await res.json();

      if (res.headers.get("x-context-compressed") === "true") {
        setShowCompressionNotice(true);
        setTimeout(() => setShowCompressionNotice(false), 3000);
      }

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

      if (data.therapyAudioId && currentSessionId) {
        setSessionsWithTherapy((prev) => new Set([...prev, String(currentSessionId)]));
      }

      setIsLoading(false);
      setAttachedImage(null);

      const tempId = crypto.randomUUID();
      setMessages((prev) => [...prev, { id: tempId, role: "assistant", content: "" }]);

      typewriterEffect(
        data.reply,
        (currentText) => {
          setMessages((prev) =>
            prev.map((m) => (m.id === tempId ? { ...m, content: currentText } : m))
          );
        },
        () => {
          setMessages((prev) =>
            prev.map((m) => (m.id === tempId ? { ...m, content: data.reply } : m))
          );
          if (voiceMode && data.reply) {
            playTTS(data.reply);
          }
        }
      );

      const { data: { session: currentSession } } = await supabase.auth.getSession();
      if (currentSession) {
        let sessionId = currentSessionId;

        // Create a new chat_session if this is a fresh chat
        if (!sessionId) {
          const { data: newSession } = await supabase
            .from("chat_sessions")
            .insert({ user_id: currentSession.user.id, title: t("chat.newChat") })
            .select("id")
            .single();
          if (newSession) {
            sessionId = newSession.id;
            setCurrentSessionId(sessionId);
            setChatHistory((prev) => [
              { id: sessionId!, title: t("chat.newChat"), updated_at: new Date().toISOString() },
              ...prev,
            ]);
          }
        }

        await supabase.from("chat_messages").insert([
          { user_id: currentSession.user.id, session_id: sessionId, role: "user", content: text },
          { user_id: currentSession.user.id, session_id: sessionId, role: "assistant", content: data.reply },
        ]);

        // Update session timestamp
        if (sessionId) {
          await supabase
            .from("chat_sessions")
            .update({ updated_at: new Date().toISOString() })
            .eq("id", sessionId);
        }

        // Generate GPT title after first exchange
        if (isFirstMessage && data.reply && sessionId) {
          generateChatTitle(text, data.reply, sessionId);
        }
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
    setCurrentSessionId(null);
  };

  const generateChatTitle = useCallback(async (userMsg: string, botMsg: string, sessionId: string | number) => {
    try {
      const lang = (localStorage.getItem("etherapp_language") || "bg").startsWith("en") ? "en" : "bg";

      const res = await fetch("/.netlify/functions/generate-title", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userMessage: userMsg.slice(0, 200),
          botMessage: botMsg.slice(0, 200),
          language: lang,
        }),
      });

      if (!res.ok) return;
      const { title } = await res.json();

      // chat_sessions.id може да е bigint (1,2,3) — подаваме raw стойност
      const idForEq = typeof sessionId === "string" && /^\d+$/.test(sessionId)
        ? parseInt(sessionId, 10)
        : sessionId;

      await supabase
        .from("chat_sessions")
        .update({ title, updated_at: new Date().toISOString() })
        .eq("id", idForEq);

      setChatHistory((prev) =>
        prev.map((s) => (String(s.id) === String(sessionId) ? { ...s, title } : s))
      );
    } catch {
      // Silent — sidebar stays with "Нов чат"
    }
  }, []);

  const handleVoiceToggle = async () => {
    if (isRecording) {
      try {
        const text = await stopAndTranscribe();
        if (text) {
          setInput((prev) => (prev ? prev + " " + text : text));
          inputRef.current?.focus();
        }
      } catch {
        // error is set inside the hook
      }
    } else {
      await startRecording();
    }
  };

  const playTTS = useCallback(async (text: string) => {
    try {
      setVoiceSpeaking(true);
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;
      const res = await fetch("/.netlify/functions/tts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text, voice: preferredVoice }),
      });
      if (!res.ok) return;
      const { audio } = await res.json();
      const audioBlob = new Blob(
        [Uint8Array.from(atob(audio), (c) => c.charCodeAt(0))],
        { type: "audio/mpeg" }
      );
      const url = URL.createObjectURL(audioBlob);
      const audioEl = new Audio(url);
      voiceAudioRef.current = audioEl;
      audioEl.onended = () => {
        setVoiceSpeaking(false);
        URL.revokeObjectURL(url);
        if (voiceMode) startVoiceListening();
      };
      await audioEl.play();
    } catch {
      setVoiceSpeaking(false);
    }
  }, [preferredVoice, voiceMode]);

  const startVoiceListening = useCallback(() => {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) return;

    const recognition = new SpeechRec();
    const lang = (localStorage.getItem("etherapp_language") || "bg").startsWith("en") ? "en-US" : "bg-BG";
    recognition.lang = lang;
    recognition.interimResults = false;
    recognition.continuous = false;
    voiceRecognitionRef.current = recognition;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0]?.[0]?.transcript;
      if (transcript) {
        setVoiceListening(false);
        setInput(transcript);
        setTimeout(() => {
          const sendBtn = document.querySelector<HTMLButtonElement>("[data-voice-send]");
          sendBtn?.click();
        }, 100);
      }
    };

    recognition.onerror = () => setVoiceListening(false);
    recognition.onend = () => setVoiceListening(false);

    setVoiceListening(true);
    recognition.start();
  }, []);

  const toggleVoiceMode = useCallback(() => {
    if (voiceMode) {
      voiceRecognitionRef.current?.abort();
      voiceAudioRef.current?.pause();
      setVoiceMode(false);
      setVoiceListening(false);
      setVoiceSpeaking(false);
    } else {
      setVoiceMode(true);
      startVoiceListening();
    }
  }, [voiceMode, startVoiceListening]);

  // Cleanup voice mode on unmount
  useEffect(() => {
    return () => {
      voiceRecognitionRef.current?.abort();
      voiceAudioRef.current?.pause();
    };
  }, []);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 4 * 1024 * 1024) {
      alert(t("chat.imageTooLarge"));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setAttachedImage({ base64, preview: base64 });
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const displayTitle = (title: string) =>
    title ? title.charAt(0).toUpperCase() + title.slice(1) : t("chat.newChat");

  const deleteSession = async (sessionId: string | number) => {
    const idForEq = typeof sessionId === "string" && /^\d+$/.test(sessionId)
      ? parseInt(sessionId, 10)
      : sessionId;

    await supabase.from("chat_messages").delete().eq("session_id", idForEq);
    await supabase.from("chat_sessions").delete().eq("id", idForEq);

    setChatHistory((prev) => prev.filter((s) => String(s.id) !== String(sessionId)));

    if (String(currentSessionId) === String(sessionId)) {
      setCurrentSessionId(null);
      setMessages([]);
    }
  };

  const openNotesModal = async (sessionId: string | number) => {
    if (!isPaidPlan) return;
    setNotesModalSession(sessionId);
    const { data } = await supabase
      .from("session_notes")
      .select("*")
      .eq("chat_session_id", sessionId)
      .order("created_at", { ascending: false });
    setSessionNotes((data as SessionNote[]) || []);
    if (data?.length) {
      await supabase
        .from("session_notes")
        .update({ is_read: true })
        .eq("chat_session_id", sessionId);
    }
  };

  const openTasksModal = async (sessionId: string | number) => {
    if (!isPaidPlan) return;
    setTasksModalSession(sessionId);
    const { data } = await supabase
      .from("session_tasks")
      .select("*")
      .eq("chat_session_id", sessionId)
      .order("created_at", { ascending: true });
    setSessionTasks((data as SessionTask[]) || []);
  };

  const toggleTaskComplete = async (taskId: string, currentlyCompleted: boolean) => {
    const completed_at = !currentlyCompleted ? new Date().toISOString() : null;
    await supabase
      .from("session_tasks")
      .update({ is_completed: !currentlyCompleted, completed_at })
      .eq("id", taskId);
    setSessionTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? { ...t, is_completed: !currentlyCompleted, completed_at }
          : t
      )
    );
  };

  const openTherapyModal = async (sessionId: string | number) => {
    setTherapyModalSession(sessionId);
    setTherapyAudio(null);
    setIsLoadingTherapy(true);
    try {
      const { data: uts } = await supabase
        .from("user_therapy_sessions")
        .select("therapy_audio_id")
        .eq("chat_session_id", sessionId)
        .limit(1)
        .single();
      if (uts?.therapy_audio_id) {
        const { data: audio } = await supabase
          .from("therapy_audio")
          .select("id, title, description, duration_seconds, storage_path, condition")
          .eq("id", uts.therapy_audio_id)
          .single();
        if (audio) setTherapyAudio(audio as TherapyAudio);
        await supabase
          .from("user_therapy_sessions")
          .update({ listened_at: new Date().toISOString() })
          .eq("chat_session_id", sessionId);
      }
    } finally {
      setIsLoadingTherapy(false);
    }
  };

  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const isTopPlan = currentPlan === "expanded_horizons";

  const filteredHistory = searchQuery.trim()
    ? chatHistory.filter((s) =>
        s.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : chatHistory;

  const messageUsagePercent = messagesLimit > 0 ? (messagesUsed / messagesLimit) * 100 : 0;
  const showWarning75 = messageUsagePercent >= 75 && messageUsagePercent < 90;
  const showWarning90 = messageUsagePercent >= 90 && messageUsagePercent < 100;
  const showLimitReached = messagesUsed >= messagesLimit;

  return (
    <div className="flex bg-background overflow-hidden" style={{ height: '100dvh' }}>

      {/* SIDEBAR */}
      <motion.aside
        className={`
          fixed inset-y-0 left-0 z-50 flex flex-col
          bg-background border-r border-border
          md:relative
          ${sidebarCollapsed ? "md:w-14" : "w-56"}
        `}
        initial={false}
        animate={{ x: isDesktop || sidebarOpen ? 0 : "-100%" }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        {/* Лого */}
        <div className={`flex items-center p-4 border-b border-border ${sidebarCollapsed ? "justify-center" : "justify-between"}`}>
          <Link to="/" className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 28 28" fill="none" className="shrink-0">
              <circle cx="14" cy="14" r="12" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.25"/>
              <circle cx="14" cy="14" r="7" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5"/>
              <circle cx="14" cy="14" r="2.5" fill="currentColor"/>
              <ellipse cx="14" cy="14" rx="12" ry="4.5" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.35" transform="rotate(-30 14 14)" className="icon-orbit"/>
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
            title={t("chat.newChat")}
            className={`w-full flex items-center rounded-xl border border-border bg-transparent hover:bg-secondary text-foreground text-sm font-medium transition-colors ${sidebarCollapsed ? "justify-center p-2" : "gap-2 px-3 py-2"}`}>
            <Plus className="w-4 h-4 shrink-0" />
            {!sidebarCollapsed && t("chat.newChat")}
          </button>
        </div>

        {!sidebarCollapsed && messagesLimit - messagesUsed <= 10 && messagesLimit - messagesUsed > 0 && (
          <div className="mx-3 mb-2 px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-600 dark:text-amber-400">
            <span className="font-medium">{messagesLimit - messagesUsed} {t("chat.messagesLeft")}</span>
            <p className="text-amber-500/80 mt-0.5">{t("chat.upgradeForMore")}</p>
          </div>
        )}
        {!sidebarCollapsed && messagesUsed >= messagesLimit && (
          <div className="mx-3 mb-2 px-3 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-600 dark:text-red-400">
            <span className="font-medium">{t("chat.limitReached")}</span>
            <p className="text-red-500/80 mt-0.5"><Link to="/billing" className="underline">{t("chat.upgradeNow")}</Link></p>
          </div>
        )}

        {/* История */}
        <div className="flex-1 flex flex-col overflow-hidden min-h-0 px-3">
          {sidebarCollapsed ? (
            <button
              title="Търси"
              onClick={() => setSidebarCollapsed(false)}
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
              placeholder={t("chat.searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-xs bg-background/60 border border-border/40 rounded-lg outline-none focus:border-primary/50 text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <p className="text-xs text-muted-foreground px-1 py-1 font-medium uppercase tracking-wider">
            {t("chat.recent")}
          </p>

          <div className="flex-1 overflow-y-auto space-y-0.5 min-h-0">
            {filteredHistory.length === 0 ? (
              <p className="text-xs text-muted-foreground px-2 py-1">
                {searchQuery ? t("chat.noResults") : t("chat.noChats")}
              </p>
            ) : (
              filteredHistory.map((session) => (
                <div key={session.id} className="group">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={async () => {
                        setCurrentSessionId(session.id);
                        const { data } = await supabase
                          .from("chat_messages")
                          .select("id, role, content")
                          .eq("session_id", session.id)
                          .order("created_at", { ascending: true });
                        if (data) setMessages(data as Message[]);
                        if (!isDesktop) setSidebarOpen(false);
                      }}
                      className={`flex-1 text-left text-sm truncate px-2 py-1.5 rounded-lg transition-colors min-w-0 ${
                        String(currentSessionId) === String(session.id)
                          ? "bg-primary/10 text-foreground font-medium"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      }`}
                    >
                      {!sidebarCollapsed && displayTitle(session.title)}
                    </button>
                    <button
                      onClick={() => deleteSession(session.id)}
                      className="p-1 rounded hover:bg-destructive/20 text-muted-foreground hover:text-destructive shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      title={t("chat.deleteSession")}
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {String(currentSessionId) === String(session.id) && !sidebarCollapsed && isPaidPlan && (
                    <div className="flex gap-1 px-1 pb-1">
                      <button
                        onClick={() => openNotesModal(session.id)}
                        title={t("chat.sessionNotes")}
                        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground px-2 py-1.5 rounded-md hover:bg-primary/10 transition-colors w-full border border-transparent hover:border-primary/20"
                      >
                        <ClipboardList className="w-3.5 h-3.5 shrink-0 text-primary/70" />
                        <span className="truncate">{t("chat.notes")}</span>
                      </button>
                      <button
                        onClick={() => openTasksModal(session.id)}
                        title={t("chat.sessionTasks")}
                        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground px-2 py-1.5 rounded-md hover:bg-primary/10 transition-colors w-full border border-transparent hover:border-primary/20"
                      >
                        <CheckSquare className="w-3.5 h-3.5 shrink-0 text-primary/70" />
                        <span className="truncate">{t("chat.tasks")}</span>
                      </button>
                      {sessionsWithTherapy.has(String(session.id)) && (
                        <button
                          onClick={() => openTherapyModal(session.id)}
                          title={t("chat.therapyAudio")}
                          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground px-2 py-1.5 rounded-md hover:bg-primary/10 transition-colors border border-transparent hover:border-primary/20"
                        >
                          <Headphones className="w-3.5 h-3.5 shrink-0" />
                        </button>
                      )}
                    </div>
                  )}
                  {String(currentSessionId) === String(session.id) && !sidebarCollapsed && !isPaidPlan && (
                    <div className="flex gap-1 px-1 pb-1">
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground/50 px-2 py-1">
                        <Lock className="w-3 h-3" />
                        <span>{t("chat.upgradeForInsights")}</span>
                      </span>
                    </div>
                  )}
                </div>
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
            onClick={() => {
              if (sidebarCollapsed) {
                navigate("/profile");
              } else {
                setProfileOpen((o) => !o);
              }
            }}
            title={t("nav.profile")}
          >
            <div className="w-8 h-8 rounded-full bg-secondary border border-border flex items-center justify-center shrink-0">
              <User className="w-4 h-4 text-muted-foreground" />
            </div>
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground truncate">{t("nav.profile")}</p>
              </div>
            )}
          </div>

          {profileOpen && (
            <div className="absolute bottom-16 left-4 right-4 z-[100] rounded-xl border border-border bg-background p-3 space-y-2 shadow-lg">
              {userEmail && <p className="text-xs text-muted-foreground truncate px-2">{userEmail}</p>}
              <Link to="/profile" className="block text-sm px-2 py-1.5 rounded-lg hover:bg-secondary" onClick={() => setProfileOpen(false)}>
                {t("profile.title")}
              </Link>
              <Link to="/billing" className="block text-sm px-2 py-1.5 rounded-lg hover:bg-secondary" onClick={() => setProfileOpen(false)}>
                {t("nav.billing")}
              </Link>
              <Link to="/features" className="block text-sm px-2 py-1.5 rounded-lg hover:bg-secondary" onClick={() => setProfileOpen(false)}>
                {t("nav.features")}
              </Link>
              <div className="h-px bg-border/50 my-1" />
              <p className="text-[10px] text-muted-foreground px-2 pt-1 uppercase tracking-wider">{t("nav.legal")}</p>
              <button
                className="block text-xs px-2 py-1 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground w-full text-left"
                onClick={() => { setProfileOpen(false); openLegal("privacy"); }}
              >
                {t("nav.privacy")}
              </button>
              <button
                className="block text-xs px-2 py-1 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground w-full text-left"
                onClick={() => { setProfileOpen(false); openLegal("cookies"); }}
              >
                {t("nav.cookies")}
              </button>
              <button
                className="block text-xs px-2 py-1 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground w-full text-left"
                onClick={() => { setProfileOpen(false); openLegal("terms"); }}
              >
                {t("nav.terms")}
              </button>
              <div className="h-px bg-border my-1" />
              <button
                className="w-full flex items-center gap-2 text-sm px-2 py-1.5 rounded-lg hover:bg-destructive/10 text-destructive"
                onClick={async () => {
                  await supabase.auth.signOut();
                  navigate("/");
                }}
              >
                <LogOut className="w-4 h-4" />
                {t("auth.logout")}
              </button>
            </div>
          )}
        </div>
      </motion.aside>

      {/* Overlay за мобилен */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)} />
      )}

      {/* MAIN */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">

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
                <h2 className="text-2xl font-semibold">{t("chat.greeting")}</h2>
                <p className="text-muted-foreground text-sm">
                  {t("chat.greetingSub")}
                </p>
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto w-full space-y-3">
              {messages.map((msg, index) => {
                const isNewSender = index === 0 || messages[index - 1].role !== msg.role;
                return msg.role === "user" ? (
                  <motion.div
                    key={msg.id}
                    className={`flex justify-end ${isNewSender ? "mt-4" : "mt-1"}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    <div className="bg-primary/10 text-foreground rounded-2xl px-4 py-2.5 ml-auto max-w-[75%] text-base leading-relaxed whitespace-pre-wrap">
                      {msg.content}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={msg.id}
                    className={`flex gap-3 ${isNewSender ? "mt-4" : "mt-1"}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center bg-muted ${isLoading && index === messages.length - 1 ? "bot-thinking" : ""}`}>
                      <svg width="16" height="16" viewBox="0 0 28 28" fill="none" className="text-primary">
                        <circle cx="14" cy="14" r="12" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.25"/>
                        <circle cx="14" cy="14" r="7" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5"/>
                        <circle cx="14" cy="14" r="2.5" fill="currentColor"/>
                        <ellipse cx="14" cy="14" rx="12" ry="4.5" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.35" transform="rotate(-30 14 14)" className="icon-orbit"/>
                      </svg>
                    </div>
                    <div className="max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap bg-muted text-foreground rounded-tl-sm">
                      {msg.content}
                    </div>
                  </motion.div>
                );
              })}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-3 mt-4"
                >
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0 bot-thinking">
                    <svg width="16" height="16" viewBox="0 0 28 28" fill="none" className="text-primary">
                      <circle cx="14" cy="14" r="12" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.25"/>
                      <circle cx="14" cy="14" r="7" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5"/>
                      <circle cx="14" cy="14" r="2.5" fill="currentColor"/>
                      <ellipse cx="14" cy="14" rx="12" ry="4.5" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.35" transform="rotate(-30 14 14)" className="icon-orbit"/>
                    </svg>
                  </div>
                  <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-muted flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{t("chat.thinking")}</span>
                    <div className="flex items-center gap-1">
                      {[0, 1, 2].map(i => (
                        <motion.span
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-primary"
                          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {showLimitReached && (
          <div className="shrink-0 px-4 py-2 bg-destructive/10 border-t border-destructive/20 text-center">
            <p className="text-xs text-destructive font-medium">{t("chat.limitReached")}</p>
            <Link to="/billing" className="text-xs text-destructive underline">{t("chat.upgradePlan")}</Link>
          </div>
        )}
        {!showLimitReached && showWarning90 && (
          <div className="shrink-0 px-4 py-1.5 bg-orange-500/10 border-t border-orange-500/20 text-center">
            <p className="text-xs text-orange-500">
              {t("chat.warning90", { used: messagesUsed, limit: messagesLimit })}
            </p>
          </div>
        )}
        {!showLimitReached && !showWarning90 && showWarning75 && (
          <div className="shrink-0 px-4 py-1.5 bg-yellow-500/10 border-t border-yellow-500/20 text-center">
            <p className="text-xs text-yellow-600 dark:text-yellow-400">
              {t("chat.warning75", { used: messagesUsed, limit: messagesLimit })}
            </p>
          </div>
        )}

        <AnimatePresence>
          {showCompressionNotice && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-xs text-muted-foreground text-center py-1 bg-muted/30 rounded-lg mx-4"
            >
              {t("chat.historyOptimized")}
            </motion.div>
          )}
        </AnimatePresence>

        {/* INPUT BAR */}
        <div className="shrink-0 px-3 pt-1 pb-[max(0.25rem,env(safe-area-inset-bottom))] md:py-4 border-t border-border">
          <div className="max-w-2xl mx-auto w-full flex flex-col gap-1.5">

            {attachedImage && (
              <div className="flex items-center gap-2 mb-2">
                <div className="relative">
                  <img
                    src={attachedImage.preview}
                    alt="attachment"
                    className="w-14 h-14 rounded-xl object-cover border border-border"
                  />
                  <button
                    onClick={() => setAttachedImage(null)}
                    className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-destructive flex items-center justify-center"
                  >
                    <X className="w-2.5 h-2.5 text-destructive-foreground" />
                  </button>
                </div>
                <span className="text-xs text-muted-foreground">{t("chat.imageAttached")}</span>
              </div>
            )}

            {/* Voice mode indicator */}
            {voiceMode && (
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className={`flex items-center gap-2 px-4 py-1.5 text-xs rounded-full w-fit ${
                  voiceSpeaking
                    ? "text-primary bg-primary/10"
                    : voiceListening
                      ? "text-green-600 bg-green-500/10"
                      : "text-muted-foreground bg-muted"
                }`}>
                  {voiceSpeaking ? (
                    <>
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      {t("chat.voiceModeSpeaking")}
                    </>
                  ) : voiceListening ? (
                    <>
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      {t("chat.voiceModeListening")}
                    </>
                  ) : (
                    <>
                      <Loader2 className="w-3 h-3 animate-spin" />
                      {t("chat.voiceMode")}
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Recording indicator */}
            {isRecording && (
              <div className="flex items-center gap-2 px-4 py-1.5 text-xs text-destructive bg-destructive/10 rounded-full w-fit mx-auto mb-2">
                <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
                {t("chat.recording")}
              </div>
            )}

            {isTranscribing && (
              <div className="flex items-center gap-2 px-4 py-1.5 text-xs text-muted-foreground bg-muted rounded-full w-fit mx-auto mb-2">
                <Loader2 className="w-3 h-3 animate-spin" />
                {t("chat.transcribing")}
              </div>
            )}

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl min-h-[36px]
              border border-border bg-card
              focus-within:border-primary/50
              transition-colors">
              <div className="relative flex-1 flex items-center">
                {input.length === 0 && !isRecording && (
                  <span
                    className="absolute inset-0 flex items-center text-sm text-muted-foreground pointer-events-none select-none"
                    style={{ opacity: placeholderVisible ? 1 : 0, transition: "opacity 0.4s ease-in-out" }}
                  >
                    {PLACEHOLDER_PHRASES[placeholderIdx]}
                  </span>
                )}
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={1}
                  disabled={isLoading || isTranscribing}
                  className="w-full bg-transparent resize-none outline-none text-sm
                    text-foreground max-h-32 overflow-y-auto disabled:cursor-not-allowed py-0 self-center"
                />
              </div>

              {/* Mic button */}
              <div className="relative group self-center">
                {voiceListening && (
                  <>
                    <motion.div
                      className="absolute inset-0 rounded-full bg-red-500/20"
                      animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full bg-red-500/10"
                      animate={{ scale: [1, 2.4, 1], opacity: [0.4, 0, 0.4] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                    />
                  </>
                )}
                <button
                  type="button"
                  onClick={isPaidPlan ? handleVoiceToggle : undefined}
                  disabled={isTranscribing || isLoading}
                  className={`relative z-10 w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200
                    ${!isPaidPlan
                      ? "text-muted-foreground/30 cursor-not-allowed"
                      : isRecording
                        ? "text-destructive bg-destructive/10 animate-pulse"
                        : isTranscribing
                          ? "text-muted-foreground"
                          : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                    }
                    disabled:opacity-30 disabled:cursor-not-allowed
                  `}
                >
                  {isTranscribing
                    ? <Loader2 className="w-4 h-4 animate-spin" />
                    : isRecording
                      ? <MicOff className="w-4 h-4" />
                      : <Mic className="w-4 h-4" />
                  }
                </button>
                {!isPaidPlan && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                    px-2 py-1 text-xs bg-popover border border-border
                    rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100
                    transition-opacity pointer-events-none z-10">
                    {t("chat.voiceUpgradeRequired")}
                  </div>
                )}
              </div>

              {/* Image button */}
              <div className="relative group self-center">
                <button
                  type="button"
                  onClick={isPaidPlan ? () => fileInputRef.current?.click() : undefined}
                  disabled={isLoading || isTranscribing}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 ${
                    !isPaidPlan
                      ? "text-muted-foreground/30 cursor-not-allowed"
                      : attachedImage
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                  } disabled:opacity-30 disabled:cursor-not-allowed`}
                >
                  <ImageIcon className="w-4 h-4" />
                </button>
                {!isPaidPlan && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                    px-2 py-1 text-xs bg-popover border border-border
                    rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100
                    transition-opacity pointer-events-none z-10">
                    {t("chat.imageUpgradeRequired")}
                  </div>
                )}
              </div>

              {/* Voice assistant mode button */}
              <div className="relative group self-center">
                <button
                  type="button"
                  onClick={isTopPlan ? toggleVoiceMode : undefined}
                  disabled={isLoading}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 ${
                    !isTopPlan
                      ? "text-muted-foreground/30 cursor-not-allowed"
                      : voiceMode
                        ? "text-primary bg-primary/10 animate-pulse"
                        : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                  } disabled:opacity-30 disabled:cursor-not-allowed`}
                >
                  <Headphones className="w-4 h-4" />
                </button>
                {!isTopPlan && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                    px-2 py-1 text-xs bg-popover border border-border
                    rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100
                    transition-opacity pointer-events-none z-10">
                    {t("chat.voiceModeUpgrade")}
                  </div>
                )}
              </div>

              <button
                onClick={handleSend}
                data-voice-send
                disabled={!input.trim() || isLoading}
                className="w-8 h-8 rounded-xl bg-primary hover:bg-primary/90
                  disabled:opacity-30 disabled:cursor-not-allowed
                  flex items-center justify-center shrink-0 self-center
                  transition-colors">
                <Send className="w-4 h-4 text-primary-foreground" />
              </button>
              {voiceSpeaking && (
                <motion.div className="flex items-center gap-0.5 px-2 self-center">
                  {[0.4, 0.7, 1, 0.7, 0.4].map((h, i) => (
                    <motion.div
                      key={i}
                      className="w-0.5 bg-primary rounded-full"
                      animate={{ scaleY: [h, 1, h] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
                      style={{ height: 16 }}
                    />
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">{t("chat.speaking")}</span>
                </motion.div>
              )}
            </div>
            <p className="text-center text-xs text-muted-foreground pb-1">
              {t("chat.disclaimer")}
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              onChange={handleImageSelect}
            />
          </div>
        </div>

      </div>

      <DisplayNamePrompt />
      <DisclaimerModal />

      {/* Session Notes Modal */}
      <Dialog open={notesModalSession !== null} onOpenChange={(open) => { if (!open) setNotesModalSession(null); }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{t("chat.sessionNotes")}</DialogTitle>
            <DialogDescription className="sr-only">{t("chat.sessionNotes")}</DialogDescription>
          </DialogHeader>
          {sessionNotes.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">
              {t("chat.sessionNotesEmpty")}
            </p>
          ) : (
            <div className="space-y-3 max-h-[60vh] overflow-y-auto">
              {sessionNotes.map((note) => (
                <div key={note.id} className="rounded-lg border border-border bg-muted/30 p-3">
                  <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                    {note.content}
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-2">
                    {new Date(note.created_at).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Session Tasks Modal */}
      <Dialog open={tasksModalSession !== null} onOpenChange={(open) => { if (!open) setTasksModalSession(null); }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{t("chat.sessionTasks")}</DialogTitle>
            <DialogDescription className="sr-only">{t("chat.sessionTasks")}</DialogDescription>
          </DialogHeader>
          {sessionTasks.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">
              {t("chat.sessionTasksEmpty")}
            </p>
          ) : (
            <div className="space-y-2 max-h-[60vh] overflow-y-auto">
              {sessionTasks.map((task) => (
                <label
                  key={task.id}
                  className={`flex items-start gap-3 rounded-lg border border-border p-3 cursor-pointer transition-colors ${
                    task.is_completed ? "bg-muted/40 opacity-70" : "hover:bg-muted/20"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={task.is_completed}
                    onChange={() => toggleTaskComplete(task.id, task.is_completed)}
                    className="mt-0.5 h-4 w-4 rounded border-border accent-primary shrink-0"
                  />
                  <div className="min-w-0">
                    <p className={`text-sm font-medium ${task.is_completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
                      {task.title}
                    </p>
                    {task.description && (
                      <p className="text-xs text-muted-foreground mt-0.5">{task.description}</p>
                    )}
                    {task.is_completed && task.completed_at && (
                      <p className="text-[10px] text-muted-foreground mt-1">
                        {t("chat.completed")} {new Date(task.completed_at).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </label>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Therapy Audio Modal */}
      <Dialog open={therapyModalSession !== null} onOpenChange={(open) => { if (!open) setTherapyModalSession(null); }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{t("chat.therapyAudio")}</DialogTitle>
            <DialogDescription className="sr-only">{t("chat.therapyAudio")}</DialogDescription>
          </DialogHeader>
          {isLoadingTherapy ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-sm text-muted-foreground p-3"
            >
              <motion.div
                className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              />
              {t("chat.loadingTherapy")}
            </motion.div>
          ) : !therapyAudio ? (
            <p className="text-sm text-muted-foreground py-4 text-center">
              {t("chat.therapyAudioEmpty")}
            </p>
          ) : (
            <div className="space-y-4">
              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-foreground">{therapyAudio.title}</h4>
                {therapyAudio.description && (
                  <p className="text-sm text-muted-foreground mt-1">{therapyAudio.description}</p>
                )}
                <p className="text-xs text-muted-foreground mt-2">
                  {t("chat.duration")}: {formatDuration(therapyAudio.duration_seconds)}
                </p>
              </div>
              <audio
                controls
                className="w-full"
                src={`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/${therapyAudio.storage_path}`}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
      <LegalModal open={legalModal} onClose={closeLegal} />
    </div>
  );
}
