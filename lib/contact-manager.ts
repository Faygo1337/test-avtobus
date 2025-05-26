import type { Contact } from "@/types/contacts"

export class ContactManager {
  addContact(contacts: Contact[], contactData: Omit<Contact, "id">): Contact[] {
    const newContact: Contact = {
      id: Date.now().toString(),
      ...contactData,
    }
    return [...contacts, newContact]
  }

  updateContact(contacts: Contact[], id: string, contactData: Omit<Contact, "id">): Contact[] {
    return contacts.map((contact) => (contact.id === id ? { ...contact, ...contactData } : contact))
  }

  deleteContact(contacts: Contact[], id: string): Contact[] {
    return contacts.filter((contact) => contact.id !== id)
  }

  validatePhone(phone: string): boolean {
    const phoneRegex = /^\+7 $$\d{3}$$ \d{3}-\d{2}-\d{2}$/
    return phoneRegex.test(phone)
  }

  validateName(name: string): boolean {
    return name.trim().length > 0
  }
}
