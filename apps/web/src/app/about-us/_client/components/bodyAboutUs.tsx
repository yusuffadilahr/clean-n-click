'use client'

import React from "react";
import AboutUsComponent from "@/app/about-us/_client/components/aboutUsComponent";
import TimComponent from "@/app/about-us/_client/components/timComponent";
import { useAboutUsHooks } from "@/app/about-us/_client/hooks/useAboutUs";

export default function Page() {
    const { boxContent, teamContent } = useAboutUsHooks()
    return (
        <main className="w-full h-fit flex-col pt-0 md:pb-0 pb-28 flex md:pt-[90px]">
            <AboutUsComponent boxContent={boxContent} />
            <TimComponent teamContent={teamContent} />
        </main>
    );
}