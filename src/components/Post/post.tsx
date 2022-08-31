import { useState,FormEvent, useContext } from 'react'
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { Comments } from '../Comments'
import { Avatar } from '../Avatar'

import style from './style.module.css'
import { Context, PostProps } from '../../Context/PostAndComments';
import { Trash } from 'phosphor-react';
import Image from 'next/image';

interface Post {
    content : PostProps
}

export function Post ({content} : Post ) {

    const [textComment,setTextComment] = useState('')
    const TimeFormart = formatDistanceToNow(new Date(content.time),{
        locale: ptBR
    })

    const {User,RemovePost,CreateNewComment} = useContext(Context)

    const disabledButton = !textComment

     function HandlePublishCommentInPost (event :FormEvent ) {
             event.preventDefault()
             CreateNewComment(textComment,content.id)
             setTextComment('')
     }
    
    function HandleAddLikeInComment (id:string,liked:boolean) {
        const commentSelected = content.comments.map((comment)=> {
            if (comment.id === id && liked === false) {
                comment.likes++
            }
            else if (comment.id === id && liked === true) {
                comment.likes--
            }
            return comment
        })

    }


    return (
        <div className={style.post}>
            <header>
                <div>
                    <div>
                        <Avatar
                            src={content.photo}
                            alt=''
                            className='avatarForPost'
                        />
                    </div>
                    <div>
                        <strong>{content.name}</strong>
                        <p>{content.status}</p>
                    </div>
                </div>
                <div className={style.WrapperTimeAndIcon}>
                    <time>
                        Publicado há {TimeFormart}
                    </time>
                    {(content.name === User.name) &&
                    <button onClick={()=> RemovePost(content.id)}>
                        <Trash size={24}/>
                    </button>
                    }
                </div>
            </header>
            <main>

                { 
               (content.image) &&
               <Image 
                    src={content.image}
                    alt={content.image.name}
                    width={100}
                    height={100}
                    objectFit='cover'
                />
                } 
                <p>{content.content}</p>

            </main>
            <form onSubmit={HandlePublishCommentInPost}>
                <strong>Deixe seu feedback</strong>
                <textarea
                    onChange={(e)=> setTextComment(e.target.value)}
                    required
                    name='TextPost'
                    value={textComment}
                    placeholder='Deixe seu comentario'
                />

                <button 
                    disabled={disabledButton}
                    type='submit'
                >
                    Publicar
                </button>
            </form>

             {content.comments.map((comment)=> 
                <Comments 
                    PostID = {content.id}
                    comment={comment}
                    key={comment.id}
                    HandleAddLikeInComment={HandleAddLikeInComment}
                />
            )}

        </div>
    )
}

