"use client"

import { useState } from "react";

const PromotionsSection = () => {
  const [ showSelector, setShowSelector ] = useState(false);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-5">
        <h3 className="font-bold">Fusiona tus cursos y apps, expande tus posibilidades</h3>
        <p>En AppSheetHub, te damos la libertad de combinar tus aplicaciones y cursos para crear soluciones únicas y personalizadas. No te limites a una sola herramienta: potencia tu creatividad uniendo conocimientos y funcionalidades para lograr un impacto mayor. Diseña, comparte y aprende como nunca antes. ¡El límite lo pones vos!</p>
      </div>
      <div className="flex flex-col gap-5">
        <h3 className="font-bold">¿Te gustaría ofrecer un descuento en alguno de tus otros productos al comprar este artículo?</h3>
        <div>
          <div className="flex gap-3">
            <input type="radio" name="promotion" />
            <label htmlFor="promotion">Sí</label>
          </div>
          <div className="flex gap-3">
            <input type="radio" name="promotion" />
            <label htmlFor="promotion">No</label>
          </div>
        </div>
      </div>
      <div>

      </div>
    </div>
  )
};

export default PromotionsSection
