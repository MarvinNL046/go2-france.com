import { useEffect, useRef } from 'react';

interface AffiliateWidgetProps {
  scriptContent?: string;
  className?: string;
  minHeight?: string;
}

export default function AffiliateWidget({ scriptContent = '', className = '', minHeight = '200px' }: AffiliateWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const srcMatch = scriptContent.match(/src="([^"]+)"/);
      if (srcMatch && srcMatch[1]) {
        const script = document.createElement('script');
        script.src = srcMatch[1];
        script.async = true;
        script.charset = 'utf-8';
        containerRef.current.appendChild(script);

        return () => {
          if (script && script.parentNode) {
            script.parentNode.removeChild(script);
          }
        };
      }
    }
  }, [scriptContent]);

  return (
    <div ref={containerRef} className={`affiliate-widget ${className}`} style={{ minHeight }} />
  );
}
