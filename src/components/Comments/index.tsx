import { useContext, useEffect, useState } from 'react';

import style from './style.module.css'

import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {  Trash } from 'phosphor-react'

import { Avatar } from '../Avatar'
import { CommentProps, Context } from '../../Context/PostAndComments';


interface contentProps {
    comment: CommentProps
    PostID: string;
}

export function Comments({ comment, PostID }: contentProps) {

    const TimeForComment = formatDistanceToNow(new Date(comment.time), {
        locale: ptBR
    })
    
    const { User, RemoveCommentInPost } = useContext(Context)


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
                    {(User.name === comment.name) &&
                        <button
                            className={style.ButtonRemoveComment}
                            onClick={() => RemoveCommentInPost(comment.id, PostID)}
                        >
                            <Trash size={24} />
                        </button>
                    }
                </div>
            </div>
        </div>
    )
}