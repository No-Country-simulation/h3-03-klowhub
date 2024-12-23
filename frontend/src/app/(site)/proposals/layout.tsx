'use client'
import { KanbanProvider } from "@/components/kanban/context/kanban.contex";
import React from "react";

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