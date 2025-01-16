'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function NavigationEvents() {
    const [isLoading, setIsLoading] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleStart = () => setIsLoading(true);
        const handleStop = () => setIsLoading(false);

        window.addEventListener('beforeunload', handleStart);
        window.addEventListener('load', handleStop);

        return () => {
            window.removeEventListener('beforeunload', handleStart);
            window.removeEventListener('load', handleStop);
        };
    }, [pathname]);

    return isLoading ? (
        <div className="fixed top-0 left-0 w-full h-1 bg-orange-500 animate-pulse" />
    ) : null;
}