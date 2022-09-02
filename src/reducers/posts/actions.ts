import { CommentProps, PostProps } from "../../Context/PostAndComments";

export enum ActionTypes {
    REMOVE_POST = 'REMOVE_POST',
    CREATE_NEW_POST = 'CREATE_NEW_POST',
    CREATE_NEW_COMMENT = 'CREATE_NEW_COMMENT',
    REMOVE_COMMENT = 'REMOVE_COMMENT',
    GET_DATA_FIRESTORE = 'GET_DATA_FIRESTORE'
}

export function createNewPostAction (newPost: PostProps) {
    return {
        type: ActionTypes.CREATE_NEW_POST,
        payload: {
          post: newPost,
        }
      }
}

export function removePostAction (id : string) {
    return {
        type: ActionTypes.REMOVE_POST,
        payload: {
          ID: {
            post: id
          }
        }
      }
}

export function createNewCommentAction (comment : CommentProps, id : string) {
    return {
        type: ActionTypes.CREATE_NEW_COMMENT,
        payload: {
          comment: comment,
          ID: {
            post: id
          }
        }
      }
}

export function removeCommentAction (idForPost : string, idForComment : string) {
    return {
        type: ActionTypes.REMOVE_COMMENT,
        payload: {
          ID: {
            post: idForPost,
            comment: idForComment,
          }
        }
      }
}

export function getDataForFirestoreAction (docs : PostProps[]) {
    return {
        type: ActionTypes.GET_DATA_FIRESTORE,
        payload: {
          data: docs
        }
      }
}