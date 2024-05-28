import { useState } from 'react';
import { FirebaseDB } from '../../../(services)/firebase/firebase';
import { arrayUnion, collection, doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { authStore } from '../../../(zustand)/authStore';
import { startSearchUser } from '../../../helpers/startSearchUser';
import { useForm } from '../../../hooks/useForm';

import '../styles/addUser.css'

export const AddUser = () => {
  const { userName, formState, handleInputForm, handleResetForm } = useForm( { initialState: { userName: '' } } );

  const { user: currentUser } = authStore();

  const [ user, setUser ] = useState( null );

  const onSubmitSearch = async ( event ) => {
    event.preventDefault();

    const userSearched = await startSearchUser( { userName } );
    setUser( userSearched );

    handleResetForm();
  }
  
  console.log( user );

  const onClickAddUser = async () => {

    const chatsCollectionRef = collection( FirebaseDB, `chats` );
    const userChatsCollectionRef = collection( FirebaseDB, `users_chats` );

    try {

      const newChatCollectionRef = doc( chatsCollectionRef );

      await setDoc( newChatCollectionRef, {
        createdAt: serverTimestamp(),
        messages: []
      })

      await updateDoc( doc( userChatsCollectionRef, user?.uid ), {
        chats: arrayUnion({
          chatId: newChatCollectionRef.id,
          lastMessage: '',
          recieverId: currentUser?.uid,
          updatedAt: Date.now(),
        })
      });

      await updateDoc( doc( userChatsCollectionRef, currentUser?.uid ), {
        chats: arrayUnion({
          chatId: newChatCollectionRef.id,
          lastMessage: '',
          recieverId: user?.uid,
          updatedAt: Date.now(),
        })
      });

      console.log( newChatCollectionRef );

    } catch ( error ) {
      console.log( error );
    }
  }

  return (
    <div className='addUser'>
      <form onSubmit={ onSubmitSearch }>
        <input 
          type="text" 
          name='userName' 
          placeholder="User to search" 
          onChange={ handleInputForm }
          value={ userName }
        />
        <button type='submit'>Search</button>
      </form>

      { 
        user && (
          <div className="addUser__user">
            <div className="addUser__user__detail">
              <img src={ user?.photoURL } alt="" />
              <span>{ user?.displayName }</span>
            </div>
    
            <button onClick={ onClickAddUser }>Add User</button>
          </div>
        ) 
        
      }
    </div>
  )
}
