import { Metadata } from "next";
import { ReactNode, Suspense } from "react";

export const metadata: Metadata = {
    title: 'Clean & Click | Produk Laundry',
    description: 'Welcome to Clean & Click',
}

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <Suspense fallback={<h1>Loading...</h1>}>
            {children}
        </Suspense>
    );
}