"use client"

import { Controller } from "react-hook-form";
import { InputProps, SelectOption } from "./input.types";
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
import { X, Plus } from "lucide-react";
import FileBadge from "../file-badge/file-badge.component";
import { Button } from "../ui/button";

import 'react-quill-new/dist/quill.snow.css';
import "./input.styles.css"
import { postVideo } from "./input.api";
import { TDocument, TImage, TVideo } from "@/types/global.types";
import { isDocument, isImage } from "@/utils/type.utils";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false })

const containerStyles = `
flex flex-col 
gap-2
sm:gap-3
md:gap-5
`;
const labelStyles = "font-bold leading-6";

const Input = <T extends FieldValues>(props: InputProps<T>) => {
  const { name, type, label, register, className, ...otherProps } = props;
  const isClient = useContext(IsClientCtx);

  if (type === "text") {
    const { placeholder } = props;

    return (
      <div className={`${containerStyles} ${className || ""}`}>
        <Label htmlFor={name} className={labelStyles}>{ label }</Label>
        <input type="text" placeholder={placeholder} { ...register(name)} className="px-3 py-5 h-8 text-card rounded-md w-full" {...otherProps} />
      </div>
    )
  };

  if (type === "textarea") {
    const { placeholder } = props;

    return (
      <div className={`${containerStyles} ${className || ""}`}>
        <Label htmlFor={name} className={labelStyles}>{ label }</Label>
        <textarea placeholder={placeholder} { ...register(name)} rows={4} className="px-3 py-3 text-card rounded-md" {...otherProps} />
      </div>
    )
  };

  if (type === "multitext") {
    const { control, placeholder, addButtonLabel } = props;

    const update = (currentNew: string, oldVal: string[], currentId: number) => {
      return oldVal.map((old, idx) => {
        if (idx !== currentId) return old;
        return currentNew
      });
    };

    const remove = (currentVal: string[], currentId: number) => {
      return currentVal.filter((_, idx) => idx !== currentId);
    };

    return (
      <div className={`${containerStyles} ${className || ""}`}>
        <Label htmlFor={name} className={labelStyles}>{ label }</Label>
        <div className="flex flex-col gap-3">
          <Controller 
            name={name}
            control={control}
            render={({ field: { onChange, value}}) => (
              <>
                {
                  value.map((b: string, idx: number) => (
                    <div key={`${name}-${idx}`} className="flex gap-3">
                      <input 
                        type="text"
                        placeholder={placeholder} 
                        className="px-3 py-5 h-8 text-card rounded-md w-full" 
                        value={b}
                        onChange={e => onChange(update(e.target.value, value, idx))}
                      />
                      { value.length > 1 &&
                        <Button 
                          type="button" 
                          variant="outline"
                          className="border-red-500 text-red-500 hover:bg-red-600/50"
                          onClick={() => onChange(remove(value, idx))}
                        >
                          <X />
                        </Button>
                      }
                    </div>
                  ))
                }
                <Button 
                  className="self-end px-5"
                  type="button" 
                  onClick={() => onChange([...value, ""])}
                >
                  <span>{ addButtonLabel }</span>
                  <Plus />
                </Button>
              </>
            )}
          />
        </div>
      </div>
    )
  };

  if (type === "number") {
    const { placeholder } = props;

    return (
      <div className={`${containerStyles} ${className || ""}`}>
        { label && <Label htmlFor={name} className={labelStyles}>{ label }</Label> }
        <input type="number" placeholder={placeholder} { ...register(name, { valueAsNumber: true })} className="px-3 appearance-none py-5 h-8 text-card rounded-md w-full" {...otherProps} />
      </div>
    )
  };

  // if (type === "range") {
  //   const { control } = props;
  //
  //   return (
  //     <div className={`${containerStyles} ${className || ""}`}>
  //       <Label htmlFor={name} className={labelStyles}>{ label }</Label>
  //       <Controller 
  //         name={name}
  //         control={control}
  //         render={({ field: { onChange, value } }) => {
  //
  //           return (
  //           <div className="w-full flex gap-5 items-center">
  //             <input
  //               type="number" 
  //               placeholder="min" 
  //               value={value.min} 
  //               { ...register(name)} 
  //               onChange={(e) => onChange({ ...value, min: Number(e.target.value) })}
  //               className="w-full flex-1 px-3 py-5 h-8 text-card rounded-md"
  //               {...otherProps} 
  //             />
  //             <span className="font-bold">-</span>
  //             <input
  //               type="number" 
  //               placeholder="max" 
  //               value={value.max}
  //               { ...register(name)} 
  //               onChange={(e) => onChange({ ...value, max: Number(e.target.value) })}
  //               className="w-full flex-1 px-3 py-5 h-8 text-card rounded-md"
  //               {...otherProps}
  //             />
  //           </div>
  //         )}}
  //       />
  //     </div>
  //   )
  // };

  if (type === "link") {
    const { placeholder } = props;

    return (
      <div className={`flex ${containerStyles} ${className || ""}`}>
        { label && <Label htmlFor={name} className={`${labelStyles}`}>{label}</Label> }
        <div className="flex">
          <span className={"border border-solid border-primary-200 text-primary-200 rounded-l-lg flex flex-col justify-center px-5 grow-0"}>
            Enlace
          </span>
          <input
            type="text" 
            placeholder={placeholder} 
            className="px-3 py-5 h-8 text-card rounded-r-lg flex-1 w-full sm:w-auto sm:grow-0" 
            {...otherProps} 
            { ...register(name)} 
          />
        </div>
      </div>
    )
  };

  if (type === "upload") {
    const { control, isMulti, limit = 1, filetypes, dropzoneLabel } = props;

    return (
      <Controller 
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <div className={`flex flex-col gap-5 col-span-2 ${className}`}>
            { label && <Label htmlFor={name} className={labelStyles}>{ label }</Label> }
            { isMulti ? 
              <div className={"grid grid-cols-1 md:grid-cols-3 gap-5 grid-rows-auto items-start"}>
                { value.map((v: TImage | TVideo | TDocument, idx: number) => {
                  console.log(v.url);
                  if (v.mimetype.includes("pdf")) {
                    if (!isDocument(v)) return;
                    return <FileBadge 
                      key={`resource-${idx}`} 
                      data={v}
                      removeCb={() => onChange(removeImage(value, idx))}
                    />
                  };

                  if (v.mimetype.includes("image")) {
                    console.log(v.url);
                    return <UploadedImage 
                      key={`${name}-thumbnail-${idx}`}
                      src={v.url}
                      deleteCb={() => onChange(removeImage(value, idx))}
                    />      
                  };

                  if (v.mimetype.includes("video")) {
                    return <UploadedImage 
                      key={`${name}-thumbnail-${idx}`}
                      src={v.url}
                      deleteCb={() => onChange(removeImage(value, idx))}
                    />      
                  };
                })}
                { value.length < limit &&
                  <Dropzone 
                    { ...{isMulti, limit, filetypes} }
                    onDrop={(files) => {
                      if (value.length + files.length <= limit) {
                        let uploadedFile = []
                        if (files[0].type.includes("image")) {
                          // post to image endpoint
                        };
                        if (files[0].type.includes("video")) {
                          // post to video endpoint
                        };
                        if (files[0].type.includes("pdf")) {
                          // post to document endpoint
                        };
                        onChange([...value, ...uploadedFile])
                      };
                    }}
                  >
                    { dropzoneLabel }
                  </Dropzone> 
                }
              </div>
              : <div className="grid grid-cols-1 md:grid-cols-3 gap-5 grid-rows-auto items-start">
                  { value ? 
                    <UploadedImage 
                      src={value.thumbnail_url || value.url}
                      deleteCb={() => onChange(null)}
                    /> :
                    <Dropzone
                      { ...{isMulti, filetypes} }
                      onDrop={async (files) => {
                        const video = await postVideo(files[0])
                        onChange(video)
                      }}
                    >
                      { dropzoneLabel }
                    </Dropzone>
                  }
                </div>

            }

          </div>
          )}
      />
    )
  };

  if (type === "product-selector") {
    const { children, productId, control, productType } = props;

    return (
      <div className={`${containerStyles} ${className || ""}`}>
        <Controller 
          name={name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <div onClick={() => onChange({ type: productType, id: productId })} className={"cursor-pointer relative"}>
              <div className={`${value.id === productId ? "absolute w-full h-full ring-4 ring-inset ring-primary-400 rounded-lg" : ""}`}></div>
              { children }
            </div>
          )}
        />
      </div>
    )
  };

  if (type === "radio-group") {
    const { options } = props;

    return (
      <div className={`${containerStyles} ${className || ""}`}>
        <Label htmlFor={name} className={labelStyles}>{ label }</Label>
        <div className="flex flex-col gap-4">
          <Label htmlFor={name} className="flex gap-2">
            { options[0].label }
            <input type="radio" { ...register(name) } value={options[0].value} />
          </Label>
          <Label htmlFor={name} className="flex gap-2">
            { options[1].label }
            <input type="radio" { ...register(name) } value={options[1].value} />
          </Label>
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
          render={({ field: { onChange, value } }) => (
            <Select
              getOptionLabel={(op: SelectOption) => op.label}
              getOptionValue={(op: SelectOption) => op.name}
              onChange={(selected) => onChange(selected)}
              defaultValue={value}
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
              className="bg-white text-card rounded-xl min-h-48"
              placeholder={placeholder}
            />
          )}
        />
      </div>
    )
  };
};

export default Input
