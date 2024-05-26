import { collection, getDocs, query, where } from "firebase/firestore"
import { FirebaseDB } from "../(services)/firebase/firebase"

export const startSearchUser = async ({ userName }) => { 
    try {

        const userCollectionRef = collection( FirebaseDB, `users` );
        
        const queryDb = query( userCollectionRef, where( 'displayName', '==', userName ))

        const querySnapShot = await getDocs( queryDb );

        if ( querySnapShot.empty ) return;

        return querySnapShot.docs[0].data();

    } catch ( error ) {
        throw new Error( 'Error in the user search', error );
    }
}
