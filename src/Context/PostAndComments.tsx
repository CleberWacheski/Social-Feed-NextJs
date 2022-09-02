import { createContext, ReactNode, useEffect, useReducer } from "react";
import { v4 as uuidv4 } from 'uuid';
import { produce } from 'immer'
import { app } from '../../Firebase/firebase'
import {
  collection,
  getFirestore,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore'
import {
  getStorage,
  ref,
  uploadBytes,
} from 'firebase/storage'
import { ListsPostsReducer } from "../reducers/posts/reducer";
import {
  createNewCommentAction,
  createNewPostAction,
  getDataForFirestoreAction,
  removeCommentAction,
  removePostAction
} from "../reducers/posts/actions";
import { dataProps, USER_Reducer } from "../reducers/user/reducer";
import { editDataUser } from "../reducers/user/actions";
import { URL as findImageURL } from "../utils/getURLimage";

export interface CommentProps {
  id: string;
  name: string;
  photo: string;
  content: string;
  time: string;
}

interface ImageProps {
  file: File | any;
  width: number;
  height: number;
}


export interface PostProps {
  id: string;
  image: ImageProps;
  name: string;
  status?: string;
  photo: string;
  content: string;
  time: string;
  comments: CommentProps[]
}

export interface UserProps {
  name: string,
  photo: string,
  email: string,
  status: string;
}

interface ContextSocialMediaProps {
  listPosts: PostProps[],
  User: UserProps,
  CreateNewPost: (text: string, image: ImageProps) => void;
  RemovePost: (id: string) => void;
  RemoveCommentInPost: (idForComment: string, idForPost: string) => void;
  CreateNewComment: (text: string, id: string) => void;
  editDataFromUser: (status: dataProps) => void;
}

interface ContextProviderProps {
  children: ReactNode
}


export const Context = createContext({} as ContextSocialMediaProps)



const ReturnFiltereedArraysForDate = (A: PostProps | CommentProps, B: PostProps | CommentProps) => {
  if (A.time <= B.time) {
    return 1
  }
  if (A.time >= B.time) {
    return -1
  }
  return 0
}

const db = getFirestore(app)
const storage = getStorage()

export function ContextProvider({ children }: ContextProviderProps,) {



  const [listPosts, dispatch] = useReducer(ListsPostsReducer, [])

  const [User, dispatchFromUser] = useReducer(USER_Reducer, {
    name: '',
    email: '',
    status: '',
    photo: '/User.svg'
  })


  async function CreateNewPost(text: string, image: ImageProps) {

    const id = uuidv4()
    const storageRef = ref(storage, `${id}.png`)

    if (image!= null) {

      uploadBytes(storageRef, image.file).then(() => {
        findImageURL(id).then((url) => {
          setDoc(doc(db, "LIST_POSTS", id), {
            name: User.name,
            image: {
              height: image.height,
              width: image.width,
              file: url,
            },
            comments: [],
            photo: User.photo,
            content: text,
            time: String(new Date()),
            id,
            status: User.status
          })
        })
      })
    } else {
      setDoc(doc(db, "LIST_POSTS", id), {
        name: User.name,
        comments: [],
        photo: User.photo,
        content: text,
        time: String(new Date()),
        id,
        status: User.status
      })
    }

    const Image = (image) ? {
      height: image.height,
      width: image.width,
      file: URL.createObjectURL(image.file)
    } : null

    const newPost: PostProps = {
      name: User.name,
      image: Image,
      comments: [],
      photo: User.photo,
      content: text,
      time: String(new Date()),
      id,
      status: User.status
    }

    dispatch(createNewPostAction(newPost))

  }

  async function RemovePost(id: string) {


    dispatch(removePostAction(id))

    await deleteDoc(doc(db, "LIST_POSTS", id));

  }

  async function CreateNewComment(text: string, id: string) {

    const comment: CommentProps = {
      id: uuidv4(),
      name: User.name,
      photo: User.photo,
      content: text,
      time: String(new Date())
    }

    dispatch(createNewCommentAction(comment, id))

    const postRef = doc(db, "LIST_POSTS", id)
    const postSelectedIndex = listPosts.findIndex((post) => post.id === id)

    await updateDoc(postRef, {
      comments: [...listPosts[postSelectedIndex].comments, comment]
    })

  }

  async function RemoveCommentInPost(idForComment: string, idForPost: string) {

    const newState = produce(listPosts, draft => {
      draft.forEach((post, i) => {
        if (post.id === idForPost) {
          const stateForComment = post.comments.filter((comment) => comment.id != idForComment)
          draft[i].comments = stateForComment
        }
      })
      return draft
    })

    dispatch(removeCommentAction(idForPost, idForComment))

    const postSelected = newState.find(post => post.id === idForPost)
    const commentsUpdated = postSelected!.comments

    const postRef = doc(db, "LIST_POSTS", idForPost)

    await updateDoc(postRef, {
      comments: commentsUpdated
    })

  }


  function editDataFromUser(data: dataProps) {
    dispatchFromUser(editDataUser(data))
  }



  useEffect(() => {

    async function getDataFirebase() {

      const FirebasePosts: PostProps[] = []
      const docs = await getDocs(collection(db, 'LIST_POSTS'))

      docs.forEach((doc) => FirebasePosts.push(doc.data() as PostProps))


      dispatch(getDataForFirestoreAction(FirebasePosts))

    }

    getDataFirebase()

  }, [])



  return (
    <Context.Provider
      value={{
        CreateNewPost,
        listPosts,
        User,
        RemovePost,
        RemoveCommentInPost,
        CreateNewComment,
        editDataFromUser,
      }}>

      {children}
    </Context.Provider>

  )
}



