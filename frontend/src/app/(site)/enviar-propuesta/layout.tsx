'use client'
import React from "react";
import { KanbanProvider } from "./context/kanbanContext";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <KanbanProvider>
            <div>
                {children}
            </div>
        </KanbanProvider>
    );
};

export default Layout;