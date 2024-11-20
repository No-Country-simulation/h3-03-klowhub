import { Props } from "./input.types";

const Input = ({ name, type, register, ...otherProps }: Props) => {
  return (
    <div className="flex flex-col">
      { type === "text" &&
        <>
          <label htmlFor={name}>Título del curso / lección</label>
          <input type={type} { ...register(name)} {...otherProps} />
        </>
      }
    </div>
  )
};

export default Input
