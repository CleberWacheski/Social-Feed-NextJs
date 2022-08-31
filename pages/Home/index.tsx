import style from './style.module.css'

import { useContext, useEffect } from 'react'
import { Context } from '../../src/Context/PostAndComments'
import { SideBar } from '../../src/components/SideBar'
import { PublishedPostArea } from '../../src/components/PublishedPostArea'
import { Post } from '../../src/components/Post/post'
import { useSession } from 'next-auth/react'


export default function Home() {

  const { listPosts, editDataFromUser, User } = useContext(Context)
  const { data: session } = useSession()

    if (session) {
      const data = { ...session.user, status: '' }
      editDataFromUser(data)
    }
  
    
  return (
    <section className={style.Wrapper}>
      <SideBar />
      <main>
        <PublishedPostArea />
        {listPosts.map(post =>
          <Post
            key={post.id}
            content={post}
          />
        )}
      </main>
    </section>
  )
}

