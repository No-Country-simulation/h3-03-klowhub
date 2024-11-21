import { Controller } from "react-hook-form";
import { InputProps, SelectOption } from "./input.types";
import 'react-quill-new/dist/quill.snow.css';
import dynamic from 'next/dynamic'
import { useContext } from "react";
import { IsClientCtx } from "@/contexts/is-client.context";
import Select from "react-select";
import { Label } from "../ui/label";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false })

const Input = (props: InputProps) => {
  const { name, type, label, register, className, ...otherProps } = props;
  const isClient = useContext(IsClientCtx);

  return (
    <div className={`flex flex-col gap-5 ${className || ""}`}>
      { type === "text" && 
        <>
          <Label htmlFor={name} className="font-bold">{ label }</Label>
          <input type="text" { ...register(name)} className="px-3 py-5 h-8 text-card rounded-sm" {...otherProps} />
        </>
      }

      { type === "radio-group" &&
        <>
          <Label htmlFor={name} className="font-bold">{ label }</Label>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Label htmlFor={name}>{ props.options[0] }</Label>
              <input type="radio" { ...register(name) } />
            </div>
            <div className="flex gap-2">
              <Label htmlFor={name}>{ props.options[1] }</Label>
              <input type="radio" { ...register(name) } />
            </div>
          </div>
        </> 
      }

      { type === "select" && isClient &&
        <>
          <Label htmlFor={name} className="font-bold">{ label }</Label>
          <Controller 
            name={name}
            control={props.control}
            defaultValue=""
            render={({ field: { onChange } }) => (
              <Select
                getOptionLabel={(op: SelectOption) => op.label}
                getOptionValue={(op: SelectOption) => op.name}
                onChange={(selected) => {
                  return props.isMulti ? onChange(selected) : onChange(selected?.name)
                }}
                options={ props.options }
                isMulti={ props.isMulti } // TODO: remove this prop drilling
                { ...otherProps }
              />
            )}
          />
        </> 
      }

      { type === "richtext" &&
        <>
          <Label htmlFor={name} className="font-bold">{ label }</Label>
          <Controller 
            name={name}
            control={props.control}
            defaultValue=""
            render={({ field: { value, onChange } }) => (
              <ReactQuill theme="snow" value={value as string} onChange={onChange} />
            )}
          />
        </> 
      }
    </div>
  )
};

export default Input
