import { ReactNode } from "react";
import LayoutContainer from "./_client/components/layoutContainer";

export default function layout({ children }: { children: ReactNode }) {
    return (
        <LayoutContainer>
            {children}
        </LayoutContainer>
    );
}