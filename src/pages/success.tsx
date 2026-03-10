import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export function SuccessPage() {
  const [searchParams] = useSearchParams();
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (countdown === 0) {
      navigate("/app");
      return;
    }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="mx-auto w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-green-600">Плащането е успешно!</h1>
          <p className="text-muted-foreground">
            Абонаментът ти е активиран. Добре дошъл в новия си план!
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          Пренасочване към чата след{" "}
          <span className="font-semibold text-foreground">{countdown}</span> секунди...
        </p>
        <button
          onClick={() => navigate("/app")}
          className="w-full py-2 px-4 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium transition-colors"
        >
          Към чата сега
        </button>
      </div>
    </div>
  );
}
