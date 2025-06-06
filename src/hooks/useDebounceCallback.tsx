import { useCallback } from "react"
import { useRef } from "react"

export function useDebounceCallback(callback: (...args: any[]) => void, delay: number = 300) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  return useCallback((...args: any[]) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      callback(...args)
    }, delay)
  }, [callback, delay])
}