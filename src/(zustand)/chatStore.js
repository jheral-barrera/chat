import { create } from "zustand";
import { authStore } from "./authStore";

export const chatStore = create( ( set ) => ({
    chats: [],
    user: null,
    isCurrentUserBlocked: false,
    isRecieverBlocked: false,

    changeChat: ( chatId, user ) => {
        const currentUser = authStore.getState().user;

        if ( user.usersBlocked.includes( currentUser?.uid ) ) return set({ 
            chatId,
            user: null,
            isCurrentUserBlocked: true,
            isRecieverBlocked: false,
        });

        else if ( currentUser.usersBlocked.includes( user?.uid ) ) return set({ 
            chatId,
            user,
            isCurrentUserBlocked: false,
            isRecieverBlocked: true,
        });
        else set({ 
            chatId,
            user,
            isCurrentUserBlocked: false,
            isRecieverBlocked: false,
        });
    },
    changeAddBlocked: ( ) => {
        set( state => ({ ...state, isRecieverBlocked: !state.isRecieverBlocked }) );
    }

}) )
