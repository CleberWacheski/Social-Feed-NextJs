import { createContext, ReactNode, useEffect, useState, useReducer } from "react";
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

export interface CommentProps {
  id: string;
  name: string;
  photo: string;
  content: string;
  time: string;
  likes: number;
}


export interface PostProps {
  id: string;
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
  CreateNewPost: (text: string) => void;
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


export function ContextProvider({ children }: ContextProviderProps,) {



  const [listPosts, dispatch] = useReducer(ListsPostsReducer, [])

  const [User, dispatchFromUser] = useReducer(USER_Reducer, {
    name: 'Cleber Wacheski',
    email: '',
    status: 'Web e Mobile Developer',
    photo: 'https://avatars.githubusercontent.com/u/94264158?v=4'
  })


  async function CreateNewPost(text: string) {

    const newPost: PostProps = {
      name: User.name,
      comments: [],
      photo: User.photo,
      content: text,
      time: String(new Date()),
      id: uuidv4(),
      status: 'Web e Mobile Developer'
    }

    await setDoc(doc(db, "LIST_POSTS", newPost.id), {
      ...newPost
    })

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
      time: String(new Date()),
      likes: 0,
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

      const FirebasePosts = []
      const docs = await getDocs(collection(db, 'LIST_POSTS'))

      docs.forEach((doc) => FirebasePosts.push(doc.data()))

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


