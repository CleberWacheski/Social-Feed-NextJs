import style from './style.module.css'

import { Check, PencilLine, SignOut } from 'phosphor-react'
import { Avatar } from '../Avatar'
import { useContext, useState } from 'react'
import { Context } from '../../Context/PostAndComments'

export function SideBar() {
    const { User, editDataFromUser } = useContext(Context)

    const [statusFromInput, setStatusFromInput] = useState(User.status)
    const [enabledStatusEdit, setEnabledStatusEdit] = useState(true)

    function handleUpdateStatusForUser() {
        setEnabledStatusEdit(state => state ? false : true)
        if (statusFromInput != User.status) {
            const { email, name, photo, status } = User

            const data = {
                email,
                name,
                picture: photo,
                status: statusFromInput
            }
            editDataFromUser(data)
        }
    }

    return (
        <aside className={style.sideBar}>
            <div>
                <img
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=20"
                    alt="foto de capa"
                    className={style.cover}
                />
                <Avatar
                    src={User.photo}
                    alt=''
                    className='avatarForSidebar'
                />
                <strong>{User.name}</strong>

                <span
                    className={style.SelectStatusUser}
                >
                    {enabledStatusEdit ?
                        <>
                            <p>{User.status}</p>
                            <span
                                onClick={handleUpdateStatusForUser}
                            >
                                <PencilLine size={18} color='#A0C8C3' />
                            </span>
                        </>
                        :
                        <>
                            <input
                                required
                                value={statusFromInput}
                                onChange={(e) => setStatusFromInput(e.target.value)}
                            />
                            <span
                                onClick={handleUpdateStatusForUser}
                            >
                                <Check size={19} />
                            </span>
                        </>
                    }
                </span>

                <footer >
                    <a href='/Autentication'>
                        <button >
                            Sair
                            <SignOut size={25} />
                        </button>
                    </a>

                </footer>

            </div>

        </aside>
    )
}