import { useState, useEffect } from 'react';

const useScript = (s: string) => {
    useEffect(() => {
        if (!s) {
            return;
        }
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = s;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, [s]);
};

export const useInlineScript = (scriptBody: string, check: string) => {
    const [load, setLoad] = useState(false);
    useScript(scriptBody);

    useEffect(() => {
        const interval = setInterval(() => {
            if ((window as any)[check]) {
                setLoad(true);
            }
        }, 1000);
        if (load) {
            clearInterval(interval);
        }
    }, [load, check]);

    return load;
};
