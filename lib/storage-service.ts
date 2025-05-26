import type { Contact, Group } from "@/types/contacts"

export class StorageService {
  private readonly CONTACTS_KEY = "contacts"
  private readonly GROUPS_KEY = "groups"

  saveContacts(contacts: Contact[]): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(this.CONTACTS_KEY, JSON.stringify(contacts))
    }
  }

  getContacts(): Contact[] {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(this.CONTACTS_KEY)
      return saved ? JSON.parse(saved) : []
    }
    return []
  }

  saveGroups(groups: Group[]): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(this.GROUPS_KEY, JSON.stringify(groups))
    }
  }

  getGroups(): Group[] {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(this.GROUPS_KEY)
      return saved ? JSON.parse(saved) : []
    }
    return []
  }

  clearAll(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(this.CONTACTS_KEY)
      localStorage.removeItem(this.GROUPS_KEY)
    }
  }
}
