'use client';

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Breadcrumb() {
    const pathname = usePathname();
    const segments = pathname.split('/').filter(Boolean);

    return (
        <nav className="flex items-center space-x-2 text-sm text-gray-600 py-4">
            <Link href="/" className="hover:text-gray-900">Home</Link>
            {segments.map((segment, index) => (
                <div key={segment} className="flex items-center space-x-2">
                    <ChevronRight className="h-4 w-4" />
                    <Link
                        href={`/${segments.slice(0, index + 1).join('/')}`}
                        className="capitalize hover:text-gray-900"
                    >
                        {segment}
                    </Link>
                </div>
            ))}
        </nav>
    );
}