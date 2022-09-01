import { useContext, useEffect, useState } from 'react';
import { Context } from '../../Context/PostAndComments';
import { Avatar } from '../Avatar'
import style from './style.module.css'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { Paperclip } from 'phosphor-react';

interface ImageProps {
    file : File;
    width : number;
    height : number;
  }

const createNewPostValidationSchema = zod.object({
    textForPublication: zod.string(),

})

type NewPost = zod.infer<typeof createNewPostValidationSchema>

export function PublishedPostArea() {


    const { CreateNewPost, User } = useContext(Context)
    const [img, setImg] = useState({} as ImageProps)
    const [imageName,setImageName] = useState('')


    function getImage(file: File) {
        setImageName(file.name)
       
        const reader = new FileReader()

        reader.readAsDataURL(file)

        reader.onload = (e : any) => {
            const image = new Image()
            image.src = e.target.result
            image.onload = (e: any) => {
                const height = e.target.height
                const width  = e.target.width
                
                return setImg({
                    width,
                    height,
                    file : file,
                })
            }
        }
    }

    function handleClickInButtonForPublishedPost(data: NewPost) {
        CreateNewPost(data.textForPublication, img )
        reset()
        setImageName('')
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
                        <Paperclip size={24} />
                    </label>
                    <input type="file"
                        onChange={(e) => getImage(e.target.files[0])}
                        id='arquivo'
                        accept='image/*'
                    />
                    <p>{imageName}</p>
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




