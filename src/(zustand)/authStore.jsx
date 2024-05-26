import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";
import { FirebaseAuth, FirebaseDB } from "../(services)/firebase/firebase";

export const authStore = create( (set) => ({
    user: null,
    authenticated: false,
    isLoading: false,

    fetchUserData: async ( uid ) => {
        set( { isLoading: true } );
        if ( !uid ) return set({ user: null, authenticated: false, isLoading: false });

        try {

            const documentRef = doc( FirebaseDB, `users/${ uid }`);
            const documentSnap = await getDoc( documentRef );

            if ( documentSnap.exists() ) set({ user: documentSnap.data(), authenticated: true });
            else set({ user: null, authenticated: false, isLoading: false });

        } catch ( error ) {
            console.log( 'Error fetching user data:', error );
            return set({ user: null, authenticated: false, isLoading: false });
        }
        set( { isLoading: false } );
    },
    logoutUser: async () => {
        set( { isLoading: true } );
        await FirebaseAuth.signOut();
        set({ user: null, authenticated: false, isLoading: false });
        set({ isLoading: false });
    },
}))
