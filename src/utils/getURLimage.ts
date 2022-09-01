import { getDownloadURL, getStorage, ref } from "firebase/storage";


export const URL = async (id) => {

    const storage = getStorage()
    return await getDownloadURL(ref(storage, `${id}.png`))

}
