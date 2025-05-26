"use client"
interface ToastProps {
  message: string
  type: "success" | "error"
  onClose: () => void
}

export function Toast({ message, type }: ToastProps) {
  return (
    <div className={`toast toast--${type}`}>
      <div className="toast__icon">{type === "success" ? "✓" : "!"}</div>
      <span className="toast__message">{message}</span>
    </div>
  )
}
