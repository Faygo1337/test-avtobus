"use client"

interface HeaderProps {
  onAddContact: () => void
  onManageGroups: () => void
}

export function Header({ onAddContact, onManageGroups }: HeaderProps) {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__left">
          <h1 className="header__title">Книга контактов</h1>
        </div>
        <div className="header__right">
          <button className="header__button header__button--add" onClick={onAddContact}>
            Добавить контакт +
          </button>
          <button className="header__button header__button--groups" onClick={onManageGroups}>
            Группы
          </button>
        </div>
      </div>
    </header>
  )
}
