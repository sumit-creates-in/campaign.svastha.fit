import { useEffect } from "react";

interface MetaData {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
}

export const useMeta = (metaData: MetaData) => {
  useEffect(() => {
    // Update document title
    document.title = metaData.title;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", metaData.description);
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", metaData.ogTitle || metaData.title);
    }

    const ogDescription = document.querySelector(
      'meta[property="og:description"]',
    );
    if (ogDescription) {
      ogDescription.setAttribute(
        "content",
        metaData.ogDescription || metaData.description,
      );
    }

    if (metaData.ogImage) {
      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage) {
        ogImage.setAttribute("content", metaData.ogImage);
      }
    }

    // Update Twitter tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute(
        "content",
        metaData.twitterTitle || metaData.title,
      );
    } else {
      // Create twitter:title if it doesn't exist
      const newTwitterTitle = document.createElement("meta");
      newTwitterTitle.setAttribute("name", "twitter:title");
      newTwitterTitle.setAttribute(
        "content",
        metaData.twitterTitle || metaData.title,
      );
      document.head.appendChild(newTwitterTitle);
    }

    const twitterDescription = document.querySelector(
      'meta[name="twitter:description"]',
    );
    if (twitterDescription) {
      twitterDescription.setAttribute(
        "content",
        metaData.twitterDescription || metaData.description,
      );
    } else {
      // Create twitter:description if it doesn't exist
      const newTwitterDescription = document.createElement("meta");
      newTwitterDescription.setAttribute("name", "twitter:description");
      newTwitterDescription.setAttribute(
        "content",
        metaData.twitterDescription || metaData.description,
      );
      document.head.appendChild(newTwitterDescription);
    }

    if (metaData.twitterImage) {
      const twitterImage = document.querySelector('meta[name="twitter:image"]');
      if (twitterImage) {
        twitterImage.setAttribute("content", metaData.twitterImage);
      }
    }
  }, [metaData]);
};
