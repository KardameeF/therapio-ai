import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export function DisclaimerModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("eterapp_disclaimer_accepted") !== "true") {
      setOpen(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("eterapp_disclaimer_accepted", "true");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60"
      onPointerDown={(e) => e.target === e.currentTarget && e.preventDefault()}
    >
      <div
        className="relative w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-xl"
        onPointerDown={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-2">Преди да започнеш</h2>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          Eterapp е инструмент за емоционална подкрепа и НЕ е медицинска услуга. Не замества професионална психологическа или психиатрична помощ.
          <br /><br />
          При спешна ситуация или мисли за самонараняване, моля обади се незабавно на:
          <br /><br />
          <strong>Телефон за доверие:</strong> 0800 18 448 (безплатен, 24/7)
          <br />
          <strong>Спешна помощ:</strong> 112
        </p>
        <Button
          onClick={handleAccept}
          className="w-full bg-primary hover:bg-primary/90"
        >
          Разбирам и продължавам
        </Button>
      </div>
    </div>
  );
}
