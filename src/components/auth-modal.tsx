import { Dialog, DialogContent } from "./ui/dialog";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { LoginForm } from "../pages/login";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  defaultTab?: "login" | "register";
}

export function AuthModal({ open, onClose, defaultTab }: AuthModalProps) {
  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent
        className="max-w-md w-full p-0"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <GoogleReCaptchaProvider reCaptchaKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}>
          <LoginForm onSuccess={onClose} defaultTab={defaultTab} />
        </GoogleReCaptchaProvider>
      </DialogContent>
    </Dialog>
  );
}
