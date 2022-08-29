import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useContext } from 'react'
import { Avatar } from '../../src/components/Avatar'
import { Context } from '../../src/Context/PostAndComments'
import style from './style.module.css'


export default function Autentication() {
    const { User, editDataFromUser } = useContext(Context)

    const { data: session } = useSession()

    if (session) {
        const data = { ...session.user, status: '' }
        editDataFromUser(data)
    }


    return (
        <div className={style.container}>
            <section >
                {
                    (!session) ?
                        <span>
                            <Avatar
                                src={User.photo}
                                alt='Foto do usuario'
                                className='avatarForSidebar'
                            />
                        </span>
                        :
                        <Avatar
                            src={User.photo}
                            alt='Foto do usuario'
                            className='avatarForSidebar'
                        />
                }

                <p>{User.name}</p>
                <p>{User.email}</p>
                <p>{User.status}</p>
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
                    <button className={style.UserLoggedButton}>
                        <Link href='/'>
                            <span>
                                Continuar como {User.name}
                            </span>
                        </Link>
                    </button>
                }
            </section>
        </div>
    )
}