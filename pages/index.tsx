import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { SignOut } from 'phosphor-react'
import { useContext, useEffect } from 'react'
import { Avatar } from '../src/components/Avatar'
import { Context } from '../src/Context/PostAndComments'
import style from './style.module.css'


export default function Autentication() {
    const { User, editDataFromUser } = useContext(Context)

    const { data: session } = useSession()

    useEffect(() => {
        if (session) {
            const data = { ...session.user, status: '' }
            editDataFromUser(data)
        }
        else if (!session) {
            const data = {
                name: '@Usuario',
                email: 'usuario@gmail.com',
                image: '/User.svg',
                status: ''
            }
            editDataFromUser(data)
        }

    }, [session, editDataFromUser])




    return (
        <div className={style.container}>
            <section >
                <Avatar
                    src={User.photo}
                    alt='Foto do usuario'
                    className='avatarForSidebar'
                />
                <p>{User.name}</p>
                <p>{User.email}</p>
                {
                    (!session) ?
                        <span>
                            <button className={style.LoginWithGoogle}
                                onClick={() => signIn('google')}
                            >
                                <span>
                                    <Image
                                        src='/GoogleLogo.svg'
                                        alt=''
                                        width={18}
                                        height={18}
                                    />
                                </span>
                                <span>
                                    Continue com o Google
                                </span>
                            </button>
                        </span>
                        :
                        <>
                            <button className={style.UserLoggedButton}>
                                <Link href='/Home' prefetch>
                                    <span>
                                        Continuar como {User.name}
                                    </span>
                                </Link>
                            </button>
                            <button
                                className={style.UserLoggedButton}
                                onClick={() => signOut()}
                            >
                                <span>
                                    Sair
                                </span>
                                <SignOut size={20} />
                            </button>
                        </>
                }
            </section>
        </div>
    )
}