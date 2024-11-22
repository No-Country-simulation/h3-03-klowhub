"use client"

import { Button } from "../ui/button";
import Image from "next/image";
import { Controller } from "react-hook-form";
import { InputProps, SelectOption } from "./input.types";
import 'react-quill-new/dist/quill.snow.css';
import dynamic from 'next/dynamic'
import { useContext } from "react";
import { IsClientCtx } from "@/contexts/is-client.context";
import Select from "react-select";
import { Label } from "../ui/label";
import { StylesConfig } from "react-select";
import { FieldValues } from "react-hook-form";
import Dropzone from "../dropzone/dropzone.component";
import { removeImage } from "./input.utils";
import UploadedImage from "../uploaded-image/uploaded-image.component";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false })

const containerStyles = "flex flex-col gap-5";
const labelStyles = "font-bold leading-6";

const Input = <T extends FieldValues>(props: InputProps<T>) => {
  const { name, type, label, register, className, ...otherProps } = props;
  const isClient = useContext(IsClientCtx);

  if (type === "text") {
    const { placeholder } = props;

    return (
      <div className={`${containerStyles} ${className || ""}`}>
        <Label htmlFor={name} className={labelStyles}>{ label }</Label>
        <input type="text" placeholder={placeholder} { ...register(name)} className="px-3 py-5 h-8 text-card rounded-md" {...otherProps} />
      </div>
    )
  };

  if (type === "link") {
    const { placeholder } = props;

    return (
      <div className={`flex ${className || ""}`}>
        <Label htmlFor={name} className={`border border-solid border-primary-200 text-primary-200 rounded-l-lg flex flex-col justify-center px-5 ${labelStyles}`}>{ label }</Label>
        <input type="text" placeholder={placeholder} { ...register(name)} className="px-3 py-5 h-8 text-card rounded-r-lg" {...otherProps} />
      </div>
    )
  };

  if (type === "upload") {
    const { control, limit = 1 } = props;

    return (
      <Controller 
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <div className={`grid grid-cols-3 gap-5 grid-rows-auto items-start`}>
            { value.map((v: File, idx: number) => {
              return (
                <UploadedImage 
                  key={`video-thumbnail-${idx}`}
                  src={URL.createObjectURL(v)}
                  deleteCb={() => onChange(removeImage(value, idx))}
                />
              )
            }) }
            { value.length < limit ?  
              <Dropzone onDrop={(files) => onChange([...value, ...files])}>{ label }</Dropzone> : <></>
            }
          </div>
        )}
      />
    )
  };

  if (type === "radio-group") {
    const { options } = props;

    return (
      <div className={`${containerStyles} ${className || ""}`}>
        <Label htmlFor={name} className={labelStyles}>{ label }</Label>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <Label htmlFor={name}>{ options[0] }</Label>
            <input type="radio" { ...register(name) } />
          </div>
          <div className="flex gap-2">
            <Label htmlFor={name}>{ options[1] }</Label>
            <input type="radio" { ...register(name) } />
          </div>
        </div>
      </div>
    )
  };

  if (type === "select" && isClient) {
    const { control, options, isMulti, placeholder, ...otherProps } = props;

    const customStyles: StylesConfig<SelectOption, boolean> = {
      control: (provided) => ({
        ...provided,
        borderRadius: "8px",
      }),
      menu: (provided) => ({
        ...provided,
        borderRadius: "8px",
      }),
    };

    return (
      <div className={`${containerStyles} ${className || ""}`}>
        <Label htmlFor={name} className={labelStyles}>{ label }</Label>
        <Controller 
          name={name}
          control={control}
          render={({ field: { onChange } }) => (
            <Select
              getOptionLabel={(op: SelectOption) => op.label}
              getOptionValue={(op: SelectOption) => op.name}
              onChange={(selected) => {
                return isMulti ? onChange(selected) : onChange(selected?.name)
              }}
              options={options}
              isMulti={isMulti} // TODO: remove this prop drilling
              styles={customStyles}
              className="text-card"
              placeholder={placeholder}
              { ...otherProps }
            />
          )}
        />
      </div>
    )
  };

  if (type === "richtext") {
    const { control, placeholder } = props;

    return (
      <div className={`${containerStyles} ${className || ""}`}>
        <Label htmlFor={name} className={labelStyles}>{ label }</Label>
        <Controller 
          name={name}
          control={control}
          render={({ field: { value, onChange } }) => (
            <ReactQuill 
              theme="snow" value={value as string} onChange={onChange} 
              className="bg-white text-card rounded-xl border-none min-h-48"
              placeholder={placeholder}
            />
          )}
        />
      </div>
    )
  };
};

export default Input
