import { signIn, useSession ,signOut} from 'next-auth/react'
import { useContext, useEffect } from 'react'
import { Context } from '../../src/Context/PostAndComments'
import style from './style.module.css'

export default function Autentication () {

    const { data: session } = useSession()
    const {editDataFromUser,User} = useContext(Context)

    if (session) {
        const data = {...session.user, status: ''}
        editDataFromUser(data)
    }

    
    return (
        <div className={style.container}>
           { (!session) ?
           <button onClick={()=>signIn('google')}>
               Login Google
           </button> 
           :
           <button onClick={()=>signOut()}>
               Logout
           </button>
        }
        </div>
    )
}