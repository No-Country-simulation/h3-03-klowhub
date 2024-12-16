import StoreCtx from "./store.context";
import { StoreKeys } from "./store.context";
import { useState, useEffect, useContext } from "react"

const useStore = <T extends object>(key: string, initialValue?: T): [ T, (value: T) => void, boolean ] => {
  const { store, setStore } = useContext(StoreCtx);

  const [ isLoading, setIsLoading ] = useState(false)
  const [ localValue, setLocalValue ] = useState<T | undefined>()

  useEffect(() => {
    setIsLoading(true)

    if (localValue !== undefined) {
      window.localStorage.setItem(key, JSON.stringify(localValue))
    };

    setStore(prev => ({ ...prev, [key]: localValue }))

    setIsLoading(false)
  }, [key, localValue, setStore])

  useEffect(() => {
    const storedValue = localStorage.getItem(key);
    const parsedStoreValue = storedValue ? JSON.parse(storedValue) : initialValue;
    setLocalValue(parsedStoreValue)
  }, [initialValue, key])

  return [ store[key as StoreKeys] !== undefined ? (store[key as StoreKeys] as T) : (localValue as T), setLocalValue, isLoading]
};

export default useStore
