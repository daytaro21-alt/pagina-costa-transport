import React, { useEffect, useRef, useState } from 'react';

const directionClassMap = {
  up: 'reveal-up',
  left: 'reveal-left',
  right: 'reveal-right',
  scale: 'reveal-scale'
};

const Reveal = ({
  children,
  direction = 'up',
  delay = 0,
  className = '',
  threshold = 0.12
}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(() => typeof IntersectionObserver === 'undefined');

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const hiddenClass = directionClassMap[direction] || 'reveal-up';

  return (
    <div
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`reveal-base ${isVisible ? 'reveal-visible' : hiddenClass} ${className}`}
    >
      {children}
    </div>
  );
};

export default Reveal;
