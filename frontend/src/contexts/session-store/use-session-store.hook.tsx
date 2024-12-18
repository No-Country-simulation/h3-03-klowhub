import SessionStoreCtx from "./session-store.context";
import { StoreKeys } from "./session-store.context";
import { useState, useEffect, useContext } from "react"

const useSessionStore = <T extends object>(key: string, initialValue?: T): [ T, (value: T) => void, boolean ] => {
  const { sessionStore, setSessionStore } = useContext(SessionStoreCtx);

  const [ isLoading, setIsLoading ] = useState(false)
  const [ localValue, setLocalValue ] = useState<T | undefined>()

  useEffect(() => {
    setIsLoading(true)

    if (localValue !== undefined) {
      window.localStorage.setItem(key, JSON.stringify(localValue))
    };

    setSessionStore(prev => ({ ...prev, [key]: localValue }))

    setIsLoading(false)
  }, [key, localValue, setSessionStore])

  useEffect(() => {
    const storedValue = window.sessionStorage.getItem(key);
    const parsedStoreValue = storedValue ? JSON.parse(storedValue) : initialValue;
    setLocalValue(parsedStoreValue)
  }, [initialValue, key])

  return [ sessionStore[key as StoreKeys] !== undefined ? (sessionStore[key as StoreKeys] as T) : (localValue as T), setLocalValue, isLoading]
};

export default useSessionStore
