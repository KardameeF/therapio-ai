import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: string;
}

export function useSEO({
  title = "Eterapp — Твоят асистент за емоционална подкрепа",
  description = "Eterapp е твоят асистент за емоционална подкрепа, наличен 24/7.",
  keywords = "психично здраве, емоционална подкрепа, асистент, настроение, стрес, Eterapp",
  ogTitle,
  ogDescription,
  ogImage = "/og-image.png",
  twitterCard = "summary_large_image"
}: SEOProps = {}) {
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update or create meta description
    updateMetaTag("description", description);
    updateMetaTag("keywords", keywords);
    
    // Open Graph tags
    updateMetaTag("og:title", ogTitle || title);
    updateMetaTag("og:description", ogDescription || description);
    updateMetaTag("og:image", ogImage);
    updateMetaTag("og:type", "website");
    
    // Twitter Card tags
    updateMetaTag("twitter:card", twitterCard);
    updateMetaTag("twitter:title", ogTitle || title);
    updateMetaTag("twitter:description", ogDescription || description);
    updateMetaTag("twitter:image", ogImage);
    
    // Additional meta tags for PWA
    updateMetaTag("theme-color", "#A0C4FF");
    updateMetaTag("apple-mobile-web-app-capable", "yes");
    updateMetaTag("apple-mobile-web-app-status-bar-style", "default");
    updateMetaTag("apple-mobile-web-app-title", "Eterapp");
    
  }, [title, description, keywords, ogTitle, ogDescription, ogImage, twitterCard]);
}

function updateMetaTag(name: string, content: string) {
  const metaTag = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`) as HTMLMetaElement;
  
  if (metaTag) {
    metaTag.content = content;
  } else {
    const newMetaTag = document.createElement("meta");
    if (name.startsWith("og:") || name.startsWith("twitter:")) {
      newMetaTag.setAttribute("property", name);
    } else {
      newMetaTag.setAttribute("name", name);
    }
    newMetaTag.content = content;
    document.head.appendChild(newMetaTag);
  }
}
