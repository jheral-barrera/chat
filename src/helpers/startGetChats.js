// import { doc, getDoc, onSnapshot } from 'firebase/firestore';
// import { FirebaseDB } from '../../../(services)/firebase';
// import { authStore } from '../(zustand)/authStore';

import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { FirebaseDB } from "../(services)/firebase";
// import { authStore } from "../(zustand)/authStore";

export const startGetChats = ( user ) => {
    let chatData = [];

    const unSub = onSnapshot( doc( FirebaseDB, `users_chats/${ user?.uid }`), 
        async ( documentChats ) => {

            const chatsItems = documentChats.data().chats;
    
            const dataPromises = chatsItems.map( async ( chat ) => {

                const userDocumentRef = doc( FirebaseDB, `users/${ chat.recieverId }`);
                const userDocumentSnap = await getDoc( userDocumentRef );
        
                const user = userDocumentSnap.data();
        
                return { ...chat, user };

            })
    
            chatData = await Promise.all( dataPromises );
        } )

    return {
        chatData,
        unSub
    };
}
