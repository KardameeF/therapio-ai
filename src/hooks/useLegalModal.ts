import { useState, useCallback } from "react";
import type { LegalModalType } from "../components/LegalModal";

export function useLegalModal() {
  const [legalModal, setLegalModal] = useState<LegalModalType>(null);

  const openLegal = useCallback((type: LegalModalType) => {
    setLegalModal(type);
  }, []);

  const closeLegal = useCallback(() => {
    setLegalModal(null);
  }, []);

  return { legalModal, openLegal, closeLegal };
}
