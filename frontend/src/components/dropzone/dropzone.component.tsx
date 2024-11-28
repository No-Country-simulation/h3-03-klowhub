import React, {ReactNode} from 'react'
import {useDropzone} from 'react-dropzone'
import { CloudUpload } from 'lucide-react'
import { FileType } from '@/types/global.types'

type Props = {
  children: ReactNode
  onDrop: (files: File[]) => void
  filetypes: FileType
  isMulti?: boolean
  limit?: number
}

const Dropzone = ({ children, onDrop, filetypes, isMulti }: Props) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDrop,
    accept: filetypes,
    multiple: isMulti,
  })

  return (
    <div {...getRootProps()} className='
      leading-6 border border-dashed border-primary-200 bg-gray-50 rounded-xl p-5 text-center flex flex-col items-center justify-center gap-5 cursor-pointer
    '>
      <input {...getInputProps()} />
      <CloudUpload className='text-primary-300' size={40}/>
      <span className='text-primary-300'>
        { children }
      </span>
      <p>Arrastre o haga click aqui para subir los archivos</p>
    </div>
  )
}

export default Dropzone
