'use client'
import { KanbanProvider } from "@/components/kanban/context/kanban.contex";
import React from "react";
// import { KanbanProvider } from "./kanban-context/kanban-contex.tsx";

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