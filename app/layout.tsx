import type React from "react"
import type { Metadata } from "next"
import "./globals.scss"
import "./fonts.css"

export const metadata: Metadata = {
  title: "Книга контактов",
  description: "Приложение для управления контактами и группами",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}
