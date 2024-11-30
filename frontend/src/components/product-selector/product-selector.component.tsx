import { ReactNode, useState } from "react";
import { AppInfo } from "../product-card/product-card.types";
import { Label } from "../ui/label";
import { FieldValues } from "react-hook-form";

type Props = {
  name: 
  children: ReactNode
}

const ProductSelector = <T extends FieldValues>({ children }: Props<T>) => {
  const { name, label, register, className, ...otherProps } = props;

  const [ current, setCurrent ] = useState(NaN);   

  return (
    <div className={`${containerStyles} ${className || ""}`}>
      <Label htmlFor={name} className="flex gap-2">
        { children }
        <input type="radio" { ...register(name) } />
      </Label>
    </div>
  )
};
