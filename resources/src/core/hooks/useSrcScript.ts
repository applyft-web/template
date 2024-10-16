import { useState, useEffect } from 'react';

export const useSrcScript = (src: string, isMap = true) => {
  const [status, setStatus] = useState<string>(src ? 'loading' : 'idle');
  useEffect(() => {
    if (!src) {
      setStatus('idle');
      return;
    }
    if (!isMap) return;
    
    let script: HTMLScriptElement | null = document.querySelector(
      `script[src="${src}"]`
    );
    if (!script) {
      script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.setAttribute('data-status', 'loading');
      document.body.appendChild(script);
      
      const setAttributeFromEvent = (event: Event) => {
        script?.setAttribute(
          'data-status',
          event.type === 'load' ? 'ready' : 'error'
        );
      };
      script.addEventListener('load', setAttributeFromEvent);
      script.addEventListener('error', setAttributeFromEvent);
    } else {
      setStatus(script.getAttribute('data-status') || '');
    }
    
    const setStateFromEvent = (event: Event) => {
      setStatus(event.type === 'load' ? 'ready' : 'error');
    };
    
    script.addEventListener('load', setStateFromEvent);
    script.addEventListener('error', setStateFromEvent);
    
    return () => {
      if (script) {
        script.removeEventListener('load', setStateFromEvent);
        script.removeEventListener('error', setStateFromEvent);
      }
    };
  }, [src, isMap]);
  
  return status;
};
