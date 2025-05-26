"use client"

interface ToastProps {
  message: string
  type: "success" | "error"
  onClose: () => void
}

export function Toast({ message, type, onClose }: ToastProps) {
  return (
    <div className={`toast toast--${type}`}>
      <div className="toast__icon">{type === "success" ? "✓" : "!"}</div>
      <span className="toast__message">{message}</span>
      <button className="toast__close" onClick={onClose}>
        ×
      </button>
    </div>
  )
}
