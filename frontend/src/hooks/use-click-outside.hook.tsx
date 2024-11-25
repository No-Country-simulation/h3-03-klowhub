import { useEffect, RefObject } from "react"

const useClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: () => void,
) => {
  useEffect(() => {
    const trigger = (e: MouseEvent) => {
      if (
        (e.target as T).isConnected &&
        !ref?.current?.contains(e.target as Node)
      )
        handler()
    }
    document.addEventListener("click", trigger)
    return () => document.removeEventListener("click", trigger)
  }, [handler, ref])
}

export default useClickOutside
