"use client"
import Image from "next/image"
interface HeaderProps {
  onAddContact: () => void
  onManageGroups: () => void
}

export function Header({ onAddContact, onManageGroups }: HeaderProps) {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__left">
          <h1 className="header__title"> <Image src="/bookIcon.svg" width={25} height={25} alt="book icon"/>Книга контактов</h1>
        </div>
        <div className="header__right">
          <button className="header__button header__button--add" onClick={onAddContact}>
            Добавить контакт <Image src="/plusIcon.svg" width={17} height={17} alt="closeicon"/>
          </button>
          <button className="header__button header__button--groups" onClick={onManageGroups}>
            Группы
          </button>
        </div>
      </div>
    </header>
  )
}
