import { dataProps } from "./reducer"

export enum ActionTypesForUser {
    EDIT_DATA_USER = 'EDIT_DATA_USER'
}


export function editDataUser (data : dataProps) {
    return {
        type : ActionTypesForUser.EDIT_DATA_USER,
        payload : {
            data : data
        }
    }
}