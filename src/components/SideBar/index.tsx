import style from './style.module.css'

import { SignOut, SignIn } from 'phosphor-react'
import { Avatar } from '../Avatar'
import { useContext, useState } from 'react'
import { Context } from '../../Context/PostAndComments'
import { signOut } from 'next-auth/react'

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
                image: photo,
                status: statusFromInput
            }
            editDataFromUser(data)
        }

    }

    function handleSignOut () {
        signOut()
        location.replace('/Autentication')
    }

    return (
        <aside className={style.sideBar}>
            <div>
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
                            <span onClick={handleUpdateStatusForUser}>
                                <p>{User.status}</p>
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
                                onKeyDown={handleUpdateStatusForUser}
                            >
                            </span>
                        </>
                    }
                </span>

                <footer >
                  <button onClick={handleSignOut}>
                      Sair 
                      <SignOut size={24}/>
                  </button>

                </footer>
            </div>

        </aside>
    )
}

