import { ReactNode } from "react";
import { InputProps } from "./input.types";

const Wrapper = ({ children }: { children: ReactNode }) => <div className="flex flex-col">{ children }</div>

const Input = (props: InputProps) => {
  const { name, type, label, register, ...otherProps } = props;

  if (type === "text") {
    return (
      <Wrapper>
        <label htmlFor={name}>{ label }</label>
        <input type={type} { ...register(name)} className="text-card" {...otherProps} />
      </Wrapper>
    )
  };

  if (type === "radio") {
    const { options } = props;
    return (
      <Wrapper>
        <label htmlFor={name}>{ label }</label>
        <div>
          <div>
            <label htmlFor={name}>{ options[0] }</label>
            <input type={type} { ...register(name) } />
          </div>
          <div>
            <label htmlFor={name}>{ options[1] }</label>
            <input type={type} { ...register(name) } />
          </div>
        </div>
      </Wrapper>
    )
  };
};

export default Input
