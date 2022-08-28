import { useContext, useState } from 'react';

import style from './style.module.css'

import { formatDistanceToNow} from 'date-fns'
import {ptBR} from 'date-fns/locale'
import { ThumbsUp, Trash } from 'phosphor-react'

import { Avatar } from '../Avatar'
import { CommentProps, Context } from '../../Context/PostAndComments';


interface contentProps {
    comment : CommentProps
    HandleAddLikeInComment : (id : string,liked:boolean)=> void;
    PostID: string;
}

export function Comments ({comment,HandleAddLikeInComment,PostID} : contentProps) {

    const TimeForComment = formatDistanceToNow(new Date(comment.time),{
        locale: ptBR
    })
    const [likedComment,setLikedComment] = useState(false)

    const {User,RemoveCommentInPost} = useContext(Context)

    function HandleClicklikeButton () {
        HandleAddLikeInComment(comment.id,likedComment)
        setLikedComment(!likedComment ? true : false )
    }

    return (
        <div className={style.commentsWrapper}>
            <div>
                <Avatar
                    src={comment.photo}
                    alt=''
                    className='avatarforComment'
                />
            </div>
            <div className={style.commentContent}>
                <div className={style.comment}>
                    <div>
                        <strong>{comment.name}</strong>
                        <time>há {TimeForComment}</time>
                        <p>{comment.content}</p>
                    </div>
                    {(User.name=== comment.name) &&
                    <button 
                    className={style.ButtonRemoveComment}
                    onClick={()=>RemoveCommentInPost(comment.id,PostID)}
                    >
                    <Trash size={24}/>
                    </button>
                    }
                </div>
                <div className={style.contentLikeComment}>
                    <button 
                        className={(likedComment) ? 'Button Liked' : 'Button NotLiked'}
                        onClick={HandleClicklikeButton}>
                        <ThumbsUp size={23} /> Curtir 
                        
                    </button>
                    <span>&#8226; {comment.likes}</span>
                </div>
            </div>
        </div>
    )
}