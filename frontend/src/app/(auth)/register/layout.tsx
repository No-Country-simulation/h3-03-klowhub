
export default function RegisterLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main
            className="relative w-full h-[817px] bg-no-repeat bg-cover flex pl-14"
            style={{
                backgroundImage:
                    "url('/imgs/register_background.webp')",
            }}
        >
            <h1 className="text-[54px] font-semibold w-fit mt-[100px] lg:flex hidden">KlowHub</h1>
            <div className="lg:w-[49.34%] lg:min-w-[746px] lg-w-full min-w-full h-full bg-[#20222F]/30 backdrop-blur-sm absolute right-0 flex justify-center">
                {children}
            </div>

        </main>
    );
}