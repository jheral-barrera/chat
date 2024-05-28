import { useEffect, useState } from 'react';

import { MagnifyingGlassIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import '../styles/chatList.css'

import { iconSize, userPhotoPath } from '../../../types'
import { AddUser } from '../../(add_user)/components/AddUser';
import { authStore, chatStore } from '../../../(zustand)';
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { FirebaseDB } from '../../../(services)/firebase/firebase';

export const ChatList = () => {
  const [ addUser, setAddUser ] = useState(false);
  const [ chats, setChats ] = useState( [] );

  const { user } = authStore();
  const { changeChat } = chatStore();

  useEffect( () => {

    const unSub = onSnapshot( doc( FirebaseDB, `users_chats/${ user?.uid }`),
    async ( documentChats ) => {

        const chatsItems = documentChats.data().chats;

        const dataPromises = chatsItems.map( async ( chat ) => {

            const userDocumentRef = doc( FirebaseDB, `users/${ chat.recieverId }`);
            const userDocumentSnap = await getDoc( userDocumentRef );
    
            const user = userDocumentSnap.data();
    
            return { ...chat, user };
        })

        const chatData = await Promise.all( dataPromises );

        setChats( chatData );
    } )

    return () => {
        unSub();
    }

  }, [ user?.uid ] );

  const onClickChat = async ( chat ) => {

    const userChats = chats.map( ( item ) => {
      const { user, ...rest } = item;

      return rest;
    })

    const chatIndex = userChats.findIndex( ( item ) => item.chatId === chat.chatId );

    userChats[ chatIndex ].isSeen = true;

    const userChatsRef = doc( FirebaseDB, `users_chats/${ user?.uid }`);

    try {

      await updateDoc( userChatsRef, {
        chats: userChats,
      } );
      
      changeChat( chat.chatId, chat.user );
    } catch (error) {
      console.log( error );
    }
    

  }

  console.log( chats[0] )

  return (
    <div className='chatList'>

      <div className='chatList__search'>

        <div className='chatList__search__bar'>
          <MagnifyingGlassIcon height={ iconSize } width={ iconSize} />
          <input type='text' placeholder='Buscar' />  
        </div>

        <div className='chatList__search__plusIcon' onClick={ () => setAddUser( !addUser ) }>
          {
            ( addUser ) 
              ? <MinusIcon height={ iconSize } width={ iconSize } />
              : <PlusIcon height={ iconSize } width={ iconSize } />
          }
        </div>

      </div>

      {chats.map( chat => console.log( chat ) )}

      { 
        chats.map( ( chat ) => (
          <div 
            className='chatList__chat' 
            key={ chat.chatId }
            onClick={ () => onClickChat( chat ) }
            // style={{ backgroundColor: chat.isSeen ? 'transparent' : 'rgba(0, 0, 0, 0.2)' }} // <--- arreglar esto
            style={{ backgroundColor: chat?.isSeen ? "transparent" : "#5183fe", }} // <--- arreglar esto
          >
            <img src={ chat.user?.photoURL || userPhotoPath } alt='avatar' />
            <div className='chatList__chat__info'>
              <strong>{ chat.user.displayName }</strong>
              <p>{ chat.lastMessage }</p>
            </div> 
          </div>
        ) ) 
      }
          
      { ( addUser ) && <AddUser /> }
    </div>
  )
}
