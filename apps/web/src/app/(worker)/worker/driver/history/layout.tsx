import * as React from 'react'
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Clean & Click | Riwayat',
    description: 'Welcome to Clean & Click',
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <React.Suspense fallback={<h1>Loading...</h1>}>
            {children}
        </React.Suspense>
    );
}