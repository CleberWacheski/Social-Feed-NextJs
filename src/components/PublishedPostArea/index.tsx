import { useContext, useState } from 'react';
import { Context } from '../../Context/PostAndComments';
import { Avatar } from '../Avatar'
import style from './style.module.css'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import * as zod from 'zod'


const createNewPostValidationSchema = zod.object({
    textForPublication : zod.string()
})

type NewPost = zod.infer<typeof createNewPostValidationSchema>

export function PublishedPostArea () {


    const {CreateNewPost,User} = useContext(Context)
    
    function handleClickInButtonForPublishedPost (data : NewPost) {
        CreateNewPost(data.textForPublication)
        reset()
       
    }

    const {register,reset,handleSubmit,watch} = useForm<NewPost>({
       resolver : zodResolver(createNewPostValidationSchema),
       defaultValues : {
        textForPublication : ''
       }
    })  

    const writing = watch('textForPublication')
    const isDisabled = !writing

    return (
        <div
            className={style.textAreaContainer}
        >
            <Avatar
                src={User.photo}
                className='avatarforComment'
                alt=''
            />
            <form onSubmit={handleSubmit(handleClickInButtonForPublishedPost)}>
                 <textarea
                placeholder='Crie uma postagem aqui!'
                autoFocus
                required
                className={style.textArea}
                {...register('textForPublication')}
                />  
                <button 
                className={style.ButtonForPublishedPost}
                type='submit'
                disabled={isDisabled}
                >Publicar 
                </button>
                
            </form>
            

        </div>
    )
}