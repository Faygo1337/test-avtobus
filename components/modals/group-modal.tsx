"use client";

import type React from "react";
import { useState } from "react";
import type { Group } from "@/types/contacts";
import Image from "next/image";
interface GroupModalProps {
  groups: Group[];
  editingGroup?: Group | null;
  onSave: (group: Omit<Group, "id">) => void;
  onEdit: (group: Group) => void;
  onDelete: (group: Group) => void;
  onClose: () => void;
}

export function GroupModal({
  groups,
  onSave,
  onDelete,
  onClose,
}: GroupModalProps) {
  const [newGroupName, setNewGroupName] = useState("");
  // const [editName, setEditName] = useState(editingGroup?.name || "")

  const handleAddGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;

    onSave({ name: newGroupName.trim() });
    setNewGroupName("");
  };

  // const handleEditGroup = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   if (!editName.trim() || !editingGroup) return

  //   onSave({ name: editName.trim() })
  //   setEditName("")
  // }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="sidebar" onClick={(e) => e.stopPropagation()}>
        <div className="sidebar__header">
          <h2 className="sidebar__title">Группы контактов</h2>
          <button className="sidebar__close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="sidebar__content">
          <div className="groups-list">
            {groups.map((group) => (
              <div key={group.id} className="group-item">
                <span className="group-item__name">{group.name}</span>
              
                <div className="contact-item__actions">
                  <button
                    className="contact-item__action contact-item__action--delete"
                    onClick={() => onDelete(group)}
                    aria-label="Удалить контакт"
                  >
                    <Image
                      src="/delete.svg"
                      alt="Удалить"
                      width={26}
                      height={26}
                    />
                  </button>
                </div>
              </div>
            ))}
            <div className="group-item">
              <input
                type="text"
                className="form-field__input"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                placeholder="Введите название"
                style={{
                  background: "none",
                  border: "none",
                  boxShadow: "none",
                  outline: "none",
                  padding: 0,
                  fontSize: "var(--font-size-base)",
                  color: "var(--color-text)",
                }}
              />
            </div>
          </div>
        </div>

        <div className="sidebar__actions">
          <button
            type="button"
            className="button button--secondary"
            onClick={onClose}
          >
            Добавить
          </button>
          <button
            type="button"
            className="button button--primary"
            onClick={handleAddGroup}
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}
