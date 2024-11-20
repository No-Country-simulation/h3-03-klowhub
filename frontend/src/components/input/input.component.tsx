import { Controller } from "react-hook-form";
import { ReactNode } from "react";
import { InputProps, SelectOption } from "./input.types";
import 'react-quill-new/dist/quill.snow.css';
import dynamic from 'next/dynamic'
import { useContext } from "react";
import { IsClientCtx } from "@/contexts/is-client.context";
import Select from "react-select";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false })

const Wrapper = ({ children }: { children: ReactNode }) => <div className="flex flex-col">{ children }</div>

const Input = (props: InputProps) => {
  const { name, type, label, register, ...otherProps } = props;
  const isClient = useContext(IsClientCtx);

  if (type === "text") {
    return (
      <Wrapper>
        <label htmlFor={name}>{ label }</label>
        <input type="text" { ...register(name)} className="text-card" {...otherProps} />
      </Wrapper>
    )
  };

  if (type === "radio-group") {
    const { options } = props;
    return (
      <Wrapper>
        <label htmlFor={name}>{ label }</label>
        <div>
          <div>
            <label htmlFor={name}>{ options[0] }</label>
            <input type="radio" { ...register(name) } />
          </div>
          <div>
            <label htmlFor={name}>{ options[1] }</label>
            <input type="radio" { ...register(name) } />
          </div>
        </div>
      </Wrapper>
    )
  };

  if (type === "select" && isClient) {
    const { control, options, isMulti, ...otherProps } = props;
    console.log(isClient)

    return (
      <Wrapper>
        <label htmlFor={name}>{ label }</label>
        <Controller 
          name={name}
          control={control}
          defaultValue=""
          render={({ field: { onChange } }) => (
            <Select
              getOptionLabel={(op: SelectOption) => op.label}
              getOptionValue={(op: SelectOption) => op.name}
              onChange={(selected) => {
                return isMulti ? onChange(selected) : onChange(selected?.name)
              }}
              options={options}
              isMulti={isMulti} // TODO: remove this prop drilling
              { ...otherProps }
            />
          )}
        />
      </Wrapper>
    )
  };

  if (type === "richtext") {
    const { control } = props;
    return (
      <Wrapper>
        <label htmlFor={name}>{ label }</label>
        <Controller 
          name={name}
          control={control}
          defaultValue=""
          render={({ field: { value, onChange } }) => (
            <ReactQuill theme="snow" value={value as string} onChange={onChange} />
          )}
        />
      </Wrapper>
    )
  };
};

export default Input
