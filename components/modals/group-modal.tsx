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

  const handleAddGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;

    onSave({ name: newGroupName.trim() });
    setNewGroupName("");
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="sidebar" onClick={(e) => e.stopPropagation()}>
        <div className="sidebar__header">
          <h2 className="sidebar__title">Группы контактов</h2>
          <button className="sidebar__close" onClick={onClose}>
          <Image src="/closeIcon.svg" width={20} height={20} alt="closeicon"/>
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
                    style={{width: "45px", height: "45px"}}
                  >
                    <Image
                      src="/deleteIcon.svg"
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
                  fontWeight: 500,
                  color: "var(--color-text)",
                  fontSize: "var(--font-size-base)",
                  backgroundColor: "var(--color-background-hover)",
                  border: "none",
                  borderRadius: "6px",
                  boxShadow: "none",
                  padding: "12px 10px 12px 10px",
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
