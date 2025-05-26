"use client"

import { useEffect, useRef } from "react"

interface PhoneInputProps {
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  placeholder?: string
  hasError?: boolean
}

export function PhoneInput({ value, onChange, onBlur, placeholder, hasError }: PhoneInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current && typeof window !== "undefined") {
      import("imask").then(({ default: IMask }) => {
        const mask = IMask(inputRef.current!, {
          mask: "+{7} (000) 000-00-00",
        })

        mask.on("accept", () => {
          onChange(mask.value)
        })

        if (value) {
          mask.value = value
        }

        return () => mask.destroy()
      })
    }
  }, [onChange])

  return (
    <input
      ref={inputRef}
      type="tel"
      className={`form-field__input ${hasError ? "form-field__input--error" : ""}`}
      placeholder={placeholder}
      defaultValue={value}
      onBlur={onBlur}
    />
  )
}
