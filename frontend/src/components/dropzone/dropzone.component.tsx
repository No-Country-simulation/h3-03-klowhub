import React, {ReactNode, useCallback} from 'react'
import { DropzoneState } from 'react-dropzone'
import {useDropzone} from 'react-dropzone'
import { CloudUpload } from 'lucide-react'
import { FileType } from '@/types/global.types'

type Props = {
  children: ReactNode
  onDrop: (files: File[]) => void
  filetypes: FileType
}

const Dropzone = ({ children, onDrop, filetypes }: Props) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDrop,
    accept: filetypes
  })

  return (
    <div {...getRootProps()} className='leading-6 max-w-72 border border-dashed border-primary-200 bg-gray-100 rounded-xl p-5 text-center flex flex-col items-center justify-center gap-5'>
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
