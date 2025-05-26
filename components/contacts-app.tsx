"use client"

import { useState, useEffect } from "react"
import { ContactManager } from "@/lib/contact-manager"
import { StorageService } from "@/lib/storage-service"
import type { Contact, Group } from "@/types/contacts"
import { Header } from "./header/header"
import { ContactList } from "./contact-list/contact-list"
import { ContactModal } from "./modals/contact-modal"
import { GroupModal } from "./modals/group-modal"
import { ConfirmModal } from "./modals/confirm-modal"
import { Toast } from "./toast/toast"

export function ContactsApp() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [groups, setGroups] = useState<Group[]>([])
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [editingContact, setEditingContact] = useState<Contact | null>(null)
  const [editingGroup, setEditingGroup] = useState<Group | null>(null)
  const [deletingGroup, setDeletingGroup] = useState<Group | null>(null)
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)

  const contactManager = new ContactManager()
  const storageService = new StorageService()

  useEffect(() => {
    const savedContacts = storageService.getContacts()
    const savedGroups = storageService.getGroups()
    setContacts(savedContacts)
    setGroups(savedGroups)
  }, [])

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleSaveContact = (contactData: Omit<Contact, "id">) => {
    try {
      let updatedContacts: Contact[]

      if (editingContact) {
        updatedContacts = contactManager.updateContact(contacts, editingContact.id, contactData)
        showToast("Контакт успешно обновлен")
      } else {
        const existingContact = contacts.find((c) => c.phone === contactData.phone)
        if (existingContact) {
          showToast("Контакт с таким номером уже существует", "error")
          return
        }
        updatedContacts = contactManager.addContact(contacts, contactData)
        showToast("Контакт успешно создан")
      }

      setContacts(updatedContacts)
      storageService.saveContacts(updatedContacts)
      setIsContactModalOpen(false)
      setEditingContact(null)
    } catch {
      showToast("Ошибка при сохранении контакта", "error")
    }
  }

  const handleDeleteContact = (id: string) => {
    const updatedContacts = contactManager.deleteContact(contacts, id)
    setContacts(updatedContacts)
    storageService.saveContacts(updatedContacts)
    showToast("Контакт успешно удален")
  }

  const handleSaveGroup = (groupData: Omit<Group, "id">) => {
    try {
      let updatedGroups: Group[]

      if (editingGroup) {
        updatedGroups = groups.map((g) => (g.id === editingGroup.id ? { ...g, ...groupData } : g))
        showToast("Группа успешно обновлена")
      } else {
        const existingGroup = groups.find((g) => g.name.toLowerCase() === groupData.name.toLowerCase())
        if (existingGroup) {
          showToast("Группа с таким именем уже существует", "error")
          return
        }
        const newGroup: Group = {
          id: Date.now().toString(),
          ...groupData,
        }
        updatedGroups = [...groups, newGroup]
        showToast("Группа успешно создана")
      }

      setGroups(updatedGroups)
      storageService.saveGroups(updatedGroups)
      setIsGroupModalOpen(false)
      setEditingGroup(null)
    } catch {
      showToast("Ошибка при сохранении группы", "error")
    }
  }

  const handleDeleteGroup = () => {
    if (!deletingGroup) return

    const updatedGroups = groups.filter((g) => g.id !== deletingGroup.id)
    const updatedContacts = contacts.filter((c) => c.groupId !== deletingGroup.id)

    setGroups(updatedGroups)
    setContacts(updatedContacts)
    storageService.saveGroups(updatedGroups)
    storageService.saveContacts(updatedContacts)

    setIsConfirmModalOpen(false)
    setDeletingGroup(null)
    showToast("Группа и все контакты успешно удалены")
  }

  return (
    <div className="contacts-app">
      <Header
        // groups={groups}
        // selectedGroup="all"
        // onGroupChange={() => {}}
        onAddContact={() => setIsContactModalOpen(true)}
        onManageGroups={() => setIsGroupModalOpen(true)}
      />
      <div className="add-contact-mobile">
        <button className="button button--primary button--mobile-add" onClick={() => setIsContactModalOpen(true)}>
          
          Добавить контакт +
        </button>
      </div>

      <ContactList
        contacts={contacts}
        groups={groups}
        onEditContact={(contact) => {
          setEditingContact(contact)
          setIsContactModalOpen(true)
        }}
        onDeleteContact={handleDeleteContact}
        onEditGroup={(group) => {
          setEditingGroup(group)
          setIsGroupModalOpen(true)
        }}
        onDeleteGroup={(group) => {
          setDeletingGroup(group)
          setIsConfirmModalOpen(true)
        }}
      />


      

      {isContactModalOpen && (
        <ContactModal
          contact={editingContact}
          groups={groups}
          onSave={handleSaveContact}
          onClose={() => {
            setIsContactModalOpen(false)
            setEditingContact(null)
          }}
        />
      )}

      {isGroupModalOpen && (
        <GroupModal
          groups={groups}
          editingGroup={editingGroup}
          onSave={handleSaveGroup}
          onEdit={setEditingGroup}
          onDelete={(group) => {
            setDeletingGroup(group)
            setIsConfirmModalOpen(true)
          }}
          onClose={() => {
            setIsGroupModalOpen(false)
            setEditingGroup(null)
          }}
        />
      )}

      {isConfirmModalOpen && deletingGroup && (
        <ConfirmModal
          title="Удалить группу?"
          message={`Вы уверены, что хотите удалить эту группу? Это приведет к удалению всех контактов, находящихся в этой группе.`}
          onConfirm={handleDeleteGroup}
          onCancel={() => {
            setIsConfirmModalOpen(false)
            setDeletingGroup(null)
          }}
        />
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
