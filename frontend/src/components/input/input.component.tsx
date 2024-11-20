import { Controller } from "react-hook-form";
import { ReactNode } from "react";
import { InputProps, SelectOption } from "./input.types";
import 'react-quill-new/dist/quill.snow.css';
import dynamic from 'next/dynamic'
import { useContext } from "react";
import { IsClientCtx } from "@/contexts/is-client.context";
import Select from "react-select";
import { Label } from "../ui/label";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false })

const Wrapper = ({ children }: { children: ReactNode, className?: string }) => <div className="flex flex-col gap-5 flex-1">{ children }</div>

const Input = (props: InputProps) => {
  const { name, type, label, register, ...otherProps } = props;
  const isClient = useContext(IsClientCtx);

  if (type === "text") {
    return (
      <Wrapper>
        <Label htmlFor={name} className="font-bold">{ label }</Label>
        <input type="text" { ...register(name)} className="px-3 py-5 h-8 text-card rounded-sm" {...otherProps} />
      </Wrapper>
    )
  };

  if (type === "radio-group") {
    const { options } = props;
    return (
      <Wrapper>
        <Label htmlFor={name} className="font-bold">{ label }</Label>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Label htmlFor={name}>{ options[0] }</Label>
            <input type="radio" { ...register(name) } />
          </div>
          <div className="flex gap-2">
            <Label htmlFor={name}>{ options[1] }</Label>
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
        <Label htmlFor={name} className="font-bold">{ label }</Label>
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
        <Label htmlFor={name} className="font-bold">{ label }</Label>
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
