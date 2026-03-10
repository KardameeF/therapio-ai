import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useToast } from "../hooks/use-toast";
import { ToastAction } from "./ui/toast";

export function DisplayNamePrompt() {
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (localStorage.getItem("eterapp_name_dismissed") === "true") return;

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("display_name")
        .eq("id", session.user.id)
        .single();

      const hasName = profile?.display_name && profile.display_name.trim() !== "";
      if (hasName) return;

      const { dismiss } = toast({
        title: "Как да те наричаме?",
        description: "Добави display name в профила си за по-персонализирано изживяване.",
        action: (
          <ToastAction
            altText="Добави"
            onClick={() => {
              localStorage.setItem("eterapp_name_dismissed", "true");
              dismiss();
              navigate("/profile");
            }}
          >
            Добави
          </ToastAction>
        ),
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [toast, navigate]);

  return null;
}
