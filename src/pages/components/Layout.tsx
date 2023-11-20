import { ReactNode } from "react";

interface LayoutPorps {
    children: ReactNode;
}

export const Layout = ({children}: LayoutPorps) => {
    return(
        <div className="layout">
            {children}
        </div>
    )
}