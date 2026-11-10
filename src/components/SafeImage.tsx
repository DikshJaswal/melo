'use client';

import React, { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';

interface SafeImageProps extends Omit<ImageProps, 'src' | 'onError'> {
  src?: string | null;
  fallbackSrc?: string;
}

export default function SafeImage({
  src,
  fallbackSrc = '/icon-512.png',
  alt,
  ...rest
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(src || fallbackSrc);
  const [retryCount, setRetryCount] = useState<number>(0);

  useEffect(() => {
    setImgSrc(src || fallbackSrc);
    setRetryCount(0);
  }, [src, fallbackSrc]);

  return (
    <Image
      {...rest}
      src={imgSrc}
      alt={alt || 'Music Artwork'}
      onError={() => {
        if (retryCount === 0 && imgSrc.includes('500x500')) {
          // Fall back to 150x150 if 500x500 was not available on CDN
          setRetryCount(1);
          setImgSrc(imgSrc.replace('500x500', '150x150'));
        } else if (retryCount <= 1) {
          // Final fallback to clean default icon
          setRetryCount(2);
          setImgSrc(fallbackSrc);
        }
      }}
    />
  );
}
