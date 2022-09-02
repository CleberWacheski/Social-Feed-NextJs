import style from './style.module.css'

import { SignOut } from 'phosphor-react'
import { Avatar } from '../Avatar'
import { useContext, useRef, useState } from 'react'
import { Context } from '../../Context/PostAndComments'
import { useRouter } from 'next/router'

export function SideBar() {
    const { User, editDataFromUser } = useContext(Context)
    const inputReference = useRef<HTMLInputElement>(null)
    const {push} = useRouter()
    const [userStatus,setUserStatus] = useState('')

    function handleUpdateStatusForUser() {
            const { email, name, photo, status } = User

            const data = {
                email,
                name,
                image: photo,
                status: userStatus
            }

            editDataFromUser(data)
            console.log(User)
            inputReference.current.blur()
            
    }

    

    function handleSignOut () {
        push('/')
    }

    return (
        <aside className={style.sidebar}>
            <div>
                <Avatar
                    src={User.photo}
                    alt=''
                    className='avatarForSidebar'
                />
                <strong>{User.name}</strong>
               

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

