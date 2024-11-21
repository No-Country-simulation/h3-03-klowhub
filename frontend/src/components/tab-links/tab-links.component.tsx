import Link from "next/link";

const TabLinks = () => {
    return (
        <>
            <ul className="w-full h-[38px] flex">
                <li className="h-full">
                    <Link
                        href={"#"}
                        className="px-3 h-full flex items-center justify-center text-sm font-[400] border-b-2 hover:bg-slate-700 transition-colors text-primary-300 border-b-primary-300"
                    >
                        Ultimos movimientos
                    </Link>
                </li>
                <li className="sm:flex hidden">
                    <Link
                        href={"#"}
                        className="px-5 h-full flex items-center justify-center text-sm font-[400] border-b-2 hover:bg-slate-700 transition-colors"
                    >
                        Este mes
                    </Link>
                </li>
                <li className="sm:flex hidden">
                    <Link
                        href={"#"}
                        className="px-5 h-full flex items-center justify-center text-sm font-[400] border-b-2 hover:bg-slate-700 transition-colors"
                    >
                        3 Meses
                    </Link>
                </li>
                <li className="sm:flex hidden">
                    <Link
                        href={"#"}
                        className="px-5 h-full flex items-center justify-center text-sm font-[400] border-b-2 hover:bg-slate-700 transition-colors"
                    >
                        Este año
                    </Link>
                </li>
                <li className="sm:hidden flex">
                    <Link
                        href={"#"}
                        className="px-5 h-full flex items-center justify-center text-sm font-[400] border-b-2 hover:bg-slate-700 transition-colors"
                    >
                        Mis cursos
                    </Link>
                </li>
            </ul>
        </>
    );
};

export default TabLinks;
