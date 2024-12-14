type Props = {
  element: string
  reason: string
}

const TempError = ({ element, reason }: Props) => {
  return (
    <div className="bg-red-600 text-white flex flex-col gap-3">
      <span>Sección {element} temporalmente deshabilitado</span>
      <span>
        <strong>Razón: </strong>
        <span>{ reason }</span>
      </span>
    </div>
  )   
};

export default TempError
