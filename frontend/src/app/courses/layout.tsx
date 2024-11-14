import { Header } from "@/components/shared/Header";

export default function PageLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header/>
            <section>{children}</section>
        </>
    );
}
