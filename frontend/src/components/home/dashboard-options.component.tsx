import Image from "next/image";

const DashboardOptions = () => {

    const cards = [
        {
            title: "Mis cursos",
            href: "/dashboard/courses",
            image: "/temp/imgs/options-bg.png"
        },
        {
            title: "Mis proyectos",
            href: "/dashboard/projects",
            image: "/temp/imgs/options-bg.png"
        },
        {
            title: "Mis aplicaciones",
            href: "/dashboard/applications",
            image: "/temp/imgs/options-bg.png"
        },
        {
            title: "Consultas tecnicas",
            href: "#",
            image: "/temp/imgs/options-bg.png"
        },
    ]

    return (
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((card) => (
                <a
                    key={card.title}
                    href={card.href}
                    className="group relative block overflow-hidden rounded-lg transition-all duration-200 hover:shadow-xl hover:shadow-purple-500/20 hover:-translate-y-1"
                >
                    <Image
                        src={card.image}
                        alt={card.title}
                        width={1400}
                        height={200}
                        className="transition-transform duration-200 group-hover:scale-110 h-28"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <h3 className="absolute bottom-4 left-4 text-lg font-semibold text-white">
                        {card.title}
                    </h3>
                </a>
            ))}
        </section>
    )
}

export default DashboardOptions;
