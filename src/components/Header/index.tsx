import style from './style.module.css'
import Image from 'next/image'
import Logo from '../../../assets/Logo.svg'

export function Header () {
    return (
        <header className={style.header}>
            <Image src={Logo} alt='Logo da rede social'
                width={45} height={45}
            />
            <strong>
                Feed Social
            </strong>
        </header>
    )
}