import { useContext, useState } from 'react';
import { Context } from '../../Context/PostAndComments';
import { Avatar } from '../Avatar'
import style from './style.module.css'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { Paperclip } from 'phosphor-react';


const createNewPostValidationSchema = zod.object({
    textForPublication: zod.string(),

})

type NewPost = zod.infer<typeof createNewPostValidationSchema>

export function PublishedPostArea() {


    const { CreateNewPost, User } = useContext(Context)
    const [img,setImage]= useState('')
    console.log(img)

    function handleClickInButtonForPublishedPost(data: NewPost, img: File) {
        CreateNewPost(data.textForPublication, img)
        reset()

    }

    const { register, reset, handleSubmit, watch } = useForm<NewPost>({
        resolver: zodResolver(createNewPostValidationSchema),
        defaultValues: {
            textForPublication: '',
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
                <div>
                    <label htmlFor='arquivo'>
                        <Paperclip size={24}/>
                    </label>
                    <input type="file" 
                    onChange={(e)=>setImage(URL.createObjectURL(e.target.files[0]))} 
                    id='arquivo'
                    />

                    <button
                        className={style.ButtonForPublishedPost}
                        type='submit'
                        disabled={isDisabled}
                    >Publicar
                    </button>
                </div>

            </form>


        </div>
    )
}