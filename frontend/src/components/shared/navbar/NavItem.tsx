
export const NavItem = ({ href, children, active = false }: any) => {
    return (
        <a
            href={href}
            className={`text-sm hover:text-purple-300 transition-colors ${active ? "text-purple-400" : ""
                }`}
        >
            {children}
        </a>
    )
}
