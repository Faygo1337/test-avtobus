"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"

interface DropdownOption {
  value: string
  label: string
}

interface CustomDropdownProps {
  options: DropdownOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function CustomDropdown({ options, value, onChange, placeholder }: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find((option) => option.value === value)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <button
        type="button"
        className={`custom-dropdown__trigger ${isOpen ? "custom-dropdown__trigger--open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="custom-dropdown__value">{selectedOption ? selectedOption.label : placeholder}</span>
        <span className="custom-dropdown__arrow" style={{ transition: 'transform 0.2s', transform: isOpen ? 'rotate(0deg)' : 'rotate(180deg)' }}>
          <Image src="/arrow.svg" alt="arrow" width={13} height={8} />
        </span>
      </button>

      {isOpen && (
        <div className="custom-dropdown__menu">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`custom-dropdown__option ${option.value === value ? "custom-dropdown__option--selected" : ""}`}
              onClick={() => {
                onChange(option.value)
                setIsOpen(false)
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
