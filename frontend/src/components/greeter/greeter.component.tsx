import Overlay from "../overlay/overlay.component";
import { X } from "lucide-react";

const Greeter = () => {
  return (
    <div className="p-">
      <Overlay />
      <X />
      <div>
        <h2>¡Felicitaciones! Tu curso/lección se publicó con éxito</h2>
        <p>Ya está disponible para que estudiantes de todo el mundo lo descubran y aprovechen.</p>
        <div></div>
      </div>
    </div>
  )   
};

export default Greeter
