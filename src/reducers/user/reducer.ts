import produce from "immer";
import { UserProps } from "../../Context/PostAndComments";
import { ActionTypesForUser } from "./actions";

export interface dataProps {
    name?: string;
    image ?: string;
    email ?: string;
    status ?: string;
}

interface actionProps {
    type :  ActionTypesForUser.EDIT_DATA_USER,
    payload : {
        data : dataProps
    }
}

export function USER_Reducer (state : UserProps,action : actionProps ) {
    switch (action.type)  {
        case (ActionTypesForUser.EDIT_DATA_USER) : 
            return produce(state,draft=> {
                draft.name = action.payload.data.name
                draft.email = action.payload.data.email
                draft.photo = action.payload.data.image
                draft.status = action.payload.data.status
                return draft
            })
    }   

}