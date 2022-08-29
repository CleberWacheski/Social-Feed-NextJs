import style from './style.module.css'
import Image from 'next/image'

export function Header () {
    return (
        <header className={style.header}>
            <Image src='/Logo.svg' alt='Logo da rede social'
                width={45} height={45}
            />
            <strong>
                Feed Social
            </strong>
        </header>
    )
}