"use client"

import type { Contact } from "@/types/contacts"
import Image from "next/image"

interface ContactItemProps {
  contact: Contact
  onEdit: () => void
  onDelete: () => void
}

export function ContactItem({ contact, onEdit, onDelete }: ContactItemProps) {
  return (
    <div className="contact-item">
      <div className="contact-item__info">
        <div className="contact-item__name">{contact.name}</div>
        <div className="contact-item__phone">{contact.phone}</div>
      </div>

      <div className="contact-item__actions">
        <button className="contact-item__action" onClick={onEdit} aria-label="Редактировать контакт">
          <Image src="/penIcon.svg" alt="Редактировать" width={18} height={18} />
        </button>
        <button
          className="contact-item__action contact-item__action--delete"
          onClick={onDelete}
          aria-label="Удалить контакт"
        >
          <Image src="/deleteIcon.svg" alt="Удалить" width={26} height={26} />
        </button>
      </div>
    </div>
  )
}
