import LayoutContainer from "./layoutContainer";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
    return (
        <LayoutContainer>
            {children}
        </LayoutContainer>
    );
}