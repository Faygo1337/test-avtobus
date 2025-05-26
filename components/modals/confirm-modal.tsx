"use client"
import Image from "next/image"
interface ConfirmModalProps {
  title: string
  message: string
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmModal({ title, message, onConfirm, onCancel }: ConfirmModalProps) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal modal--wide" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <button className="modal__close" onClick={onCancel}>
            <Image src="/closeIcon.svg" width={20} height={20} alt="closeicon"/>
          </button>
        </div>
        <h2 className="modal__title">{title}</h2>

        <div className="modal__content">
          <p className="modal__message">{message}</p>
        </div>

        <div className="modal__actions">
        <button className="button button--primary" onClick={onConfirm}>
            Да, удалить
          </button>
          <button className="button button--secondary" onClick={onCancel}>
            Отмена
          </button>
        </div>
      </div>
    </div>
  )
}
