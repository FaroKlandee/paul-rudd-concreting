'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function NavigationEvents() {
    const [isLoading, setIsLoading] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        // Handle page navigation loading state
        const handleStart = () => setIsLoading(true);
        const handleStop = () => setIsLoading(false);

        // Handle hash changes for section navigation
        const handleHashChange = () => {
            // Show brief loading indicator for section navigation
            setIsLoading(true);
            setTimeout(() => setIsLoading(false), 300);
        };

        // Listen for page navigation events
        window.addEventListener('beforeunload', handleStart);
        window.addEventListener('load', handleStop);

        // Listen for hash changes (section navigation)
        window.addEventListener('hashchange', handleHashChange);

        return () => {
            window.removeEventListener('beforeunload', handleStart);
            window.removeEventListener('load', handleStop);
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, [pathname]);

    return isLoading ? (
        <div className="fixed top-0 left-0 w-full h-1 bg-orange-500 animate-pulse z-50" />
    ) : null;
}
