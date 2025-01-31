import { ReactNode, Suspense } from 'react'
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Clean & Click | Permintaan Pengiriman',
    description: 'Welcome to Clean & Click',
}

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <Suspense fallback={<h1>Loading...</h1>}>
            {children}
        </Suspense>
    );
}