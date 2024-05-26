import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth"
import { FirebaseAuth } from "./firebase"

export const registerWithEmailAndPassword = async ({ displayName, email, password }) => {
    try {
        const result = await createUserWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, photoURL } = result.user;   
        
        await updateProfile( FirebaseAuth.currentUser, { displayName } );

        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid
        }
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            errorCode,
            errorMessage
        }
    }
}

export const loginWithEmailAndPassword = async ({ email, password }) => {
    try {
        const result = await signInWithEmailAndPassword( FirebaseAuth, email, password );
        const { displayName, photoURL, uid } = result.user;

        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid
        }
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            errorCode,
            errorMessage
        }
    }
}
