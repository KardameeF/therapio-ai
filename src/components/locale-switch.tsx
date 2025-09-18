import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";

export function LocaleSwitch() {
  const { i18n } = useTranslation();
  
  const currentLocale = i18n.language;
  const toggleLocale = () => {
    i18n.changeLanguage(currentLocale === 'en' ? 'bg' : 'en');
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={toggleLocale}
      className="h-10 px-4 rounded-lg border-2 border-border hover:border-primary transition-colors font-medium min-w-[60px]"
    >
      {currentLocale === 'en' ? 'BG' : 'EN'}
    </Button>
  );
}