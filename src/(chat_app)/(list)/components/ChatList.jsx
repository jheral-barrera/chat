import { useEffect, useState } from 'react';

import { MagnifyingGlassIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import '../styles/chatList.css'

import { iconSize, userPhotoPath } from '../../../types'
import { AddUser } from '../../(add_user)/components/AddUser';
import { authStore } from '../../../(zustand)/authStore';
import { startGetChats } from '../../../helpers';

export const ChatList = () => {
  const [ addUser, setAddUser ] = useState(false);
  const [ chats, setChats ] = useState( [] );

  const { user } = authStore();

  useEffect( () => {
    const { chatData, unSub } = startGetChats( user );

    setChats( chatData.sort( ( a, b ) => a.createdAt - b.createdAt ) );

    return () => {
      unSub();
    }
  }, [ user?.uid ] );

  console.log( chats );

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

      { 
        chats.map( ( chat ) => (
          <div className='chatList__chat'>
            <img src={ userPhotoPath } alt='avatar' />
            <div className='chatList__chat__info'>
              <strong>Jheral Barrera</strong>
              <p>Hola, ¿cómo estás?</p>
            </div> 
          </div>
        ) )
      }
          
      { ( addUser ) && <AddUser /> }
    </div>
  )
}
