import style from './style.module.css'

import { useContext, useEffect } from 'react'
import { Context } from '../../src/Context/PostAndComments'
import { SideBar } from '../../src/components/SideBar'
import { PublishedPostArea } from '../../src/components/PublishedPostArea'
import { Post } from '../../src/components/Post/post'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function Home() {

  const { listPosts, editDataFromUser, User } = useContext(Context)
  const { data: session } = useSession()
  const { push } = useRouter()

  useEffect(() => {
    if (!session) {
      push('/')
    }
    else {
      const data = { status: User.status, ...session.user }
      editDataFromUser(data)
    }

  }, [])


  if (session) {


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
  else {
    return (
      <div></div>
    )
  }

}

