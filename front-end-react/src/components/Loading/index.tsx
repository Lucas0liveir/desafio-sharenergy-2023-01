import { useState, useEffect } from 'react';

export function Loading() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleProgress = (event: ProgressEvent<EventTarget>) => {
            setProgress((event.loaded / event.total) * 100);
        };
        window.addEventListener('progress', handleProgress);
        return () => {
            window.removeEventListener('progress', handleProgress);
        };
    }, []);

    return (
        <div className="loading">
            <div className="loading-bar" style={{ width: `${progress}%` }} />
        </div>
    );
}