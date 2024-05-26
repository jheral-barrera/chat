import { doc, setDoc } from "firebase/firestore";
import { FirebaseDB, registerWithEmailAndPassword } from "../(services)/firebase";
import { fireStoreUpload } from "./fireStoreUpload";

export const startRegisterUser = async ( { displayName, email, password, userPhoto } ) => {
    const result = await registerWithEmailAndPassword({
      displayName,
      email,
      password,
    });

    const { uid } = result;

    try {
        const photoURL = await fireStoreUpload( userPhoto.file );

        await setDoc( doc( FirebaseDB, `users/${ uid }` ), {
            displayName,
            email,
            photoURL,
            uid,
            usersBlocked: []
        } )
        await setDoc( doc( FirebaseDB, `users_chats/${ uid }` ), {
            chats: []
        } )

        return result;
        
    } catch (error) {
        throw new Error( error.message );
    }
}