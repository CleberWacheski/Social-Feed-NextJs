import { DocumentData, QuerySnapshot } from "firebase/firestore"
import produce from "immer"
import { CommentProps, PostProps } from "../../Context/PostAndComments"
import { ActionTypes } from "./actions"

interface actionProps {
    type: ActionTypes.CREATE_NEW_POST | ActionTypes.REMOVE_POST | ActionTypes.CREATE_NEW_COMMENT | ActionTypes.REMOVE_COMMENT | ActionTypes.GET_DATA_FIRESTORE
    payload?: {
        post?: PostProps,
        ID?: {
            comment?: string,
            post?: string
        },
        comment?: CommentProps,
        data?: PostProps[],
    }
}

export function ListsPostsReducer(state: PostProps[], action: actionProps) {
    switch (action.type) {
        case ActionTypes.CREATE_NEW_POST:
            return produce(state, draft => {
                draft.unshift(action.payload!.post!)
                return draft
            })
        case ActionTypes.REMOVE_POST:
            return produce(state, draft => {
                const stateFilterred = draft.filter((post) => post.id != action.payload!.ID!.post)
                return stateFilterred
            })
        case ActionTypes.CREATE_NEW_COMMENT:
            return produce(state, draft => {
                draft.forEach((post, i) => {
                    if (post.id === action.payload!.ID!.post) {
                        draft[i].comments.unshift(action.payload!.comment!)
                    }
                })
                return draft
            })
        case ActionTypes.REMOVE_COMMENT:
            return produce(state, draft => {
                draft.forEach((post, i) => {
                    if (post.id === action.payload!.ID!.post) {
                        const stateForComment = post.comments.filter((comment) => comment.id != action.payload!.ID!.comment)
                        draft[i].comments = stateForComment
                    }
                })
                return draft
            })
        case ActionTypes.GET_DATA_FIRESTORE: {
           return produce(state,draft=> {
               draft = action.payload.data
               return draft
           })
        }
    }
    return state
}