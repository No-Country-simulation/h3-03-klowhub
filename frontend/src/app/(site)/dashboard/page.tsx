import Link from "next/link";

const sections = [
  { label: "Cursos", route: "/dashboard/courses" },
  { label: "Aplicaciones", route: "/dashboard/applications" },
  { label: "Proyectos", route: "/dashboard/projects" },
];

const DashboardPage = () => {
  return (
    <div className="container h-full pt-10 lg:pt-40">
      <div className="flex justify-center gap-10 h-full flex-wrap">
        {
          sections.map((s, idx) => (
            <Link href={s.route} key={`section-${idx}`} className="p-20 border-1 border-primary-200 rounded-xl cursor-pointer flex-1 text-center">{s.label}</Link>
          ))
        }
      </div>
    </div>
  )   
};

export default DashboardPage
