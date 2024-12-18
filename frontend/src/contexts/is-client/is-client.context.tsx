"use client"

import { createContext, useState, useEffect, ReactNode } from "react"

export const IsClientCtx = createContext(false)

type IsClientProviderProps = {
  children: ReactNode
}

export const IsClientProvider = ({ children }: IsClientProviderProps) => {
  const [isClientCtx, setIsClientCtx] = useState(false)
  useEffect(() => {
    setIsClientCtx(true)
  }, [])

  return <IsClientCtx.Provider value={isClientCtx}>{children}</IsClientCtx.Provider>
}

