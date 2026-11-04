import React, { useState } from 'react';
import { sanitizeImageUrl, getCategoryDefaultImage } from '../../utils/imageUtils';
import { Globe, Sparkles } from 'lucide-react';

interface SafeImageProps {
  src?: string;
  alt?: string;
  className?: string;
  categorySlug?: string;
  isAiGenerated?: boolean;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt = 'NEWS WORLD Article',
  className = 'w-full h-full object-cover',
  categorySlug = 'international-news',
  isAiGenerated = true
}) => {
  const primaryUrl = sanitizeImageUrl(src, categorySlug);
  const [currentSrc, setCurrentSrc] = useState<string>(primaryUrl);
  const [hasFailedOnce, setHasFailedOnce] = useState(false);
  const [allFailed, setAllFailed] = useState(false);

  const handleError = () => {
    if (!hasFailedOnce) {
      // First fallback: Use category high-res CDN photo
      setHasFailedOnce(true);
      setCurrentSrc(getCategoryDefaultImage(categorySlug, 1));
    } else {
      // Complete fallback
      setAllFailed(true);
    }
  };

  if (allFailed) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-stone-800 to-stone-950 text-stone-200 p-4 text-center select-none">
        <Globe className="w-8 h-8 mb-1.5 opacity-60 text-amber-400" />
        <span className="text-[11px] font-bold uppercase tracking-wider text-stone-300">
          NEWS WORLD
        </span>
        <span className="text-[9px] text-stone-400 mt-0.5 capitalize">
          {categorySlug.replace('-', ' ')}
        </span>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={handleError}
      className={className}
    />
  );
};
