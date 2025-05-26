"use client"

import type { Contact, Group } from "@/types/contacts"
import { ContactItem } from "./contact-item"
import { useState } from "react"
import Image from "next/image"

interface ContactListProps {
  contacts: Contact[]
  groups: Group[]
  onEditContact: (contact: Contact) => void
  onDeleteContact: (id: string) => void
  onEditGroup: (group: Group) => void
  onDeleteGroup: (group: Group) => void
}

export function ContactList({
  contacts,
  groups,
  onEditContact,
  onDeleteContact,
  // onEditGroup,
  // onDeleteGroup,
}: ContactListProps) {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({})

  const toggleGroup = (groupId: string) => {
    setOpenGroups((prev) => ({ ...prev, [groupId]: !prev[groupId] }))
  }

  const groupedContacts = groups.reduce(
    (acc, group) => {
      acc[group.id] = contacts.filter((contact) => contact.groupId === group.id)
      return acc
    },
    {} as Record<string, Contact[]>,
  )

  const ungroupedContacts = contacts.filter((contact) => !groups.some((group) => group.id === contact.groupId))

  if (contacts.length === 0) {
    return (
      <main className="contact-list">
        <div className="contact-list__container">
          <div className="contact-list__empty">Список контактов пуст</div>
        </div>
      </main>
    )
  }

  return (
    <main className="contact-list">
      <div className="contact-list__container">
        {groups.map((group) => {
          const groupContacts = groupedContacts[group.id] || []
          if (groupContacts.length === 0) return null

          const isOpen = openGroups[group.id] ?? true

          return (
            <div key={group.id} className="contact-list__group">
              <div className="contact-list__group-header" onClick={() => toggleGroup(group.id)} style={{ cursor: 'pointer' }}>
                <div className={`contact-list__group-title${isOpen ? ' contact-list__group-title--active' : ''}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
                  {group.name}
                  <div>
                    <span className={`contact-list__group-arrow${isOpen ? ' contact-list__group-arrow--expanded' : ''}`}>
                      <Image src="/arrow.svg" alt="arrow" width={13} height={8} style={{ transition: 'transform 0.2s', transform: isOpen ? 'rotate(0deg)' : 'rotate(0deg)' }} />
                    </span>
                  </div>
                </div>
                {/* <div className="contact-list__group-actions" onClick={e => e.stopPropagation()}>
                  <button
                    className="contact-list__group-action"
                    onClick={() => onEditGroup(group)}
                    aria-label="Редактировать группу"
                  >
                    <Image src="/penIcon.svg" alt="Редактировать" width={18} height={18} />
                  </button>
                  <button
                    className="contact-list__group-action contact-list__group-action--delete"
                    onClick={() => onDeleteGroup(group)}
                    aria-label="Удалить группу"
                  >
                    <Image src="/deleteIcon.svg" alt="Удалить" width={26} height={26} />
                  </button>
                </div> */}
              </div>

              <div className={`contact-list__items${isOpen ? ' contact-list__items--expanded' : ''}`}
                style={{
                  maxHeight: isOpen ? 500 : 0,
                  opacity: isOpen ? 1 : 0,
                  overflow: 'hidden',
                  transition: 'max-height 0.3s cubic-bezier(.4,0,.2,1), opacity 0.3s cubic-bezier(.4,0,.2,1)'
                }}>
                {groupContacts.map((contact) => (
                  <ContactItem
                    key={contact.id}
                    contact={contact}
                    onEdit={() => onEditContact(contact)}
                    onDelete={() => onDeleteContact(contact.id)}
                  />
                ))}
              </div>
            </div>
          )
        })}

        {ungroupedContacts.length > 0 && (
          <div className="contact-list__group">
            <div className="contact-list__group-header">
              <div className="contact-list__group-title">
                Без группы
                <span className="contact-list__group-arrow contact-list__group-arrow--expanded">▼</span>
              </div>
            </div>
            <div className="contact-list__items contact-list__items--expanded">
              {ungroupedContacts.map((contact) => (
                <ContactItem
                  key={contact.id}
                  contact={contact}
                  onEdit={() => onEditContact(contact)}
                  onDelete={() => onDeleteContact(contact.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
