import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";

export function LocaleSwitch() {
  const { i18n } = useTranslation();
  
  const currentLocale = i18n.language?.startsWith('en') ? 'en' : 'bg';
  const toggleLocale = () => {
    const newLang = currentLocale === 'bg' ? 'en' : 'bg';
    i18n.changeLanguage(newLang);
    localStorage.setItem('etherapp_language', newLang);
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={toggleLocale}
      aria-label={currentLocale === 'en' ? 'Превключи на български' : 'Switch to English'}
      className="h-10 px-4 rounded-lg border-2 border-border hover:border-primary transition-colors font-medium min-w-[60px]"
    >
      {currentLocale === 'en' ? 'BG' : 'EN'}
    </Button>
  );
}