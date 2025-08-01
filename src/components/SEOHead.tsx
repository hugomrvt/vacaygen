
import { useTranslation } from '@/hooks/useTranslation';
import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

const SEOHead = ({ title, description, image, url }: SEOHeadProps) => {
  const { language, t } = useTranslation();

  useEffect(() => {
    // Update document title
    const pageTitle = title || t('seo.title');
    document.title = pageTitle;

    // Update meta description
    const metaDescription = description || t('seo.description');
    let descMeta = document.querySelector('meta[name="description"]');
    if (!descMeta) {
      descMeta = document.createElement('meta');
      descMeta.setAttribute('name', 'description');
      document.head.appendChild(descMeta);
    }
    descMeta.setAttribute('content', metaDescription);

    // Update language
    document.documentElement.lang = language;

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', pageTitle);

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', metaDescription);

    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage && image) ogImage.setAttribute('content', image);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl && url) ogUrl.setAttribute('content', url);

    // Update Twitter Card tags
    let twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (!twitterTitle) {
      twitterTitle = document.createElement('meta');
      twitterTitle.setAttribute('name', 'twitter:title');
      document.head.appendChild(twitterTitle);
    }
    twitterTitle.setAttribute('content', pageTitle);

    let twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (!twitterDescription) {
      twitterDescription = document.createElement('meta');
      twitterDescription.setAttribute('name', 'twitter:description');
      document.head.appendChild(twitterDescription);
    }
    twitterDescription.setAttribute('content', metaDescription);

    const twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (twitterImage && image) twitterImage.setAttribute('content', image);

    // Add keywords meta tag
    let keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (!keywordsMeta) {
      keywordsMeta = document.createElement('meta');
      keywordsMeta.setAttribute('name', 'keywords');
      document.head.appendChild(keywordsMeta);
    }
    keywordsMeta.setAttribute('content', t('seo.keywords'));

    // Add canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url || window.location.href);

    // Add hreflang tags
    const hreflangFr = document.querySelector('link[hreflang="fr"]');
    const hreflangEn = document.querySelector('link[hreflang="en"]');
    const hreflangDefault = document.querySelector('link[hreflang="x-default"]');

    if (!hreflangFr) {
      const fr = document.createElement('link');
      fr.setAttribute('rel', 'alternate');
      fr.setAttribute('hreflang', 'fr');
      fr.setAttribute('href', window.location.href);
      document.head.appendChild(fr);
    }

    if (!hreflangEn) {
      const en = document.createElement('link');
      en.setAttribute('rel', 'alternate');
      en.setAttribute('hreflang', 'en');
      en.setAttribute('href', window.location.href);
      document.head.appendChild(en);
    }

    if (!hreflangDefault) {
      const def = document.createElement('link');
      def.setAttribute('rel', 'alternate');
      def.setAttribute('hreflang', 'x-default');
      def.setAttribute('href', window.location.href);
      document.head.appendChild(def);
    }

    // Add JSON-LD structured data
    let jsonLd = document.querySelector('script[type="application/ld+json"]');
    if (!jsonLd) {
      jsonLd = document.createElement('script');
      jsonLd.setAttribute('type', 'application/ld+json');
      document.head.appendChild(jsonLd);
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "VacayGen",
      "description": metaDescription,
      "url": url || window.location.href,
      "applicationCategory": "ProductivityApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "EUR"
      },
      "author": {
        "@type": "Person",
        "name": "Hugo Mourlevat",
        "url": "https://www.linkedin.com/in/hugomrvt/"
      }
    };

    jsonLd.textContent = JSON.stringify(structuredData);

  }, [language, title, description, image, url, t]);

  return null;
};

export default SEOHead;
