"use client"

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
          <h2 className="modal__title">{title}</h2>
          <button className="modal__close" onClick={onCancel}>
            ×
          </button>
        </div>

        <div className="modal__content">
          <p className="modal__message">{message}</p>
        </div>

        <div className="modal__actions">
          <button className="button button--secondary" onClick={onCancel}>
            Отмена
          </button>
          <button className="button button--danger" onClick={onConfirm}>
            Да, удалить
          </button>
        </div>
      </div>
    </div>
  )
}
