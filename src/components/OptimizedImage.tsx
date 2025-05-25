import { useState, useEffect } from 'react';

/**
 * Optimised Image Component
 * A component that handles image optimisation and lazy loading.
 * Converts images to WebP format for better performance.
 * Provides loading states and error handling.
 */

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

const OptimizedImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

	// Convert image to WebP format
  const getOptimizedSrc = (src: string) => {
    if (src.endsWith('.webp')) return src;
    return src.replace(/\.(jpg|jpeg|png)$/, '.webp');
  };

  useEffect(() => {
	const img = new Image();
    img.src = getOptimizedSrc(src);
    img.onload = () => setIsLoaded(true);
    img.onerror = () => setError(true);
  }, [src]);

  if (error) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
		<span className = "text-gray-500" >Image failed to load</span>
      </div>
    );
  }

  return (
	<div className = {`relative ${className}`}>
      {!isLoaded && !priority && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <img
		src = {getOptimizedSrc(src)}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
      />
	</div>
  );
};

export default OptimizedImage; 