"use client"

import type React from "react"
import { useState, useEffect } from "react"
import type { Contact, Group } from "@/types/contacts"
import { CustomDropdown } from "../ui/custom-dropdown"
import { PhoneInput } from "../ui/phone-input"
import Image from "next/image"
interface ContactModalProps {
  contact?: Contact | null
  groups: Group[]
  onSave: (contact: Omit<Contact, "id">) => void
  onClose: () => void
}

interface ValidationErrors {
  name?: string
  phone?: string
}

export function ContactModal({ contact, groups, onSave, onClose }: ContactModalProps) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [groupId, setGroupId] = useState("")
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [touched, setTouched] = useState<{ name: boolean; phone: boolean }>({ name: false, phone: false })

  useEffect(() => {
    if (contact) {
      setName(contact.name)
      setPhone(contact.phone)
      setGroupId(contact.groupId)
    }
  }, [contact])

  const validateField = (field: string, value: string) => {
    const newErrors = { ...errors }

    if (field === "name") {
      if (!value.trim()) {
        newErrors.name = "Поле является обязательным"
      } else {
        delete newErrors.name
      }
    }

    if (field === "phone") {
      if (!value.trim()) {
        newErrors.phone = "Поле является обязательным"
      } else {
        delete newErrors.phone
      }
    }

    setErrors(newErrors)
  }

  const handleNameChange = (value: string) => {
    setName(value)
    if (touched.name) {
      validateField("name", value)
    }
  }

  const handlePhoneChange = (value: string) => {
    setPhone(value)
    if (touched.phone) {
      validateField("phone", value)
    }
  }

  const handleNameBlur = () => {
    setTouched((prev) => ({ ...prev, name: true }))
    validateField("name", name)
  }

  const handlePhoneBlur = () => {
    setTouched((prev) => ({ ...prev, phone: true }))
    validateField("phone", phone)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate all fields
    const newErrors: ValidationErrors = {}
    if (!name.trim()) newErrors.name = "Поле является обязательным"
    if (!phone.trim()) newErrors.phone = "Поле является обязательным"

    setErrors(newErrors)
    setTouched({ name: true, phone: true })

    if (Object.keys(newErrors).length > 0) return

    onSave({ name: name.trim(), phone, groupId })
  }

  const groupOptions = groups.map((group) => ({
    value: group.id,
    label: group.name,
  }))

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="contact-sidebar" onClick={(e) => e.stopPropagation()}>
        <div className="contact-sidebar__header">
          <h2 className="contact-sidebar__title">{contact ? "Редактировать контакт" : "Добавление контакта"}</h2>
          <button className="contact-sidebar__close" onClick={onClose}>
          <Image src="/closeIcon.svg" width={20} height={20} alt="closeicon"/>
          </button>
        </div>

        <form className="contact-sidebar__form" onSubmit={handleSubmit}>
          <div className="form-field">
            <input
              type="text"
              className={`form-field__input ${errors.name ? "form-field__input--error" : ""}`}
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              onBlur={handleNameBlur}
              placeholder="Введите ФИО"
            />
            {errors.name && <div className="form-field__error">{errors.name}</div>}
          </div>

          <div className="form-field">

            <PhoneInput
              value={phone}
              onChange={handlePhoneChange}
              onBlur={handlePhoneBlur}
              placeholder="Введите номер"
              hasError={!!errors.phone}
            />
            {errors.phone && <div className="form-field__error">{errors.phone}</div>}
          </div>

          <div className="form-field">
            <CustomDropdown
              options={groupOptions}
              value={groupId}
              onChange={setGroupId}
              placeholder="Выберите группу"
            />
          </div>

          <div className="contact-sidebar__actions">
            <button type="submit" className="button button--primary">
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
