import { ReactNode } from "react";
import MenuList from "./menu";

interface LayoutPorps {
    children: ReactNode;
}

export const Layout = ({children}: LayoutPorps) => {
    return(
        <div className="layout">
            {children}
            <MenuList />
        </div>
    )
}