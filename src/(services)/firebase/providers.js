import { AuthErrorCodes, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { FirebaseAuth } from "./firebase"

export const registerUserWithEmailAndPassword = async ({ displayName, email, password, photoUrl }) => {

    try {
        const result = await createUserWithEmailAndPassword( FirebaseAuth, email, password );
        
        await updateProfile( FirebaseAuth.currentUser, { displayName } );
        console.log( result );

        return {
            authResult: true,
            userName,
            email,
            avatarUrl
        }
    } catch (error) {

        return {
            authResult: false,
            errorCode,
            errorMessage
        }
    }
}
