type Props = {
  entity: "proyectos" | "cursos" | "aplicaciones"
}

const NoData = ({ entity }: Props) => {
  return (
    <span className="w-full p-5 border-1 border-primary-300 text-center rounded-lg text-primary-200">Aún no hay { entity }</span>
  )   
};

export default NoData
