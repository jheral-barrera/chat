import { useState } from 'react';

import { MagnifyingGlassIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import '../styles/chatList.css'

import { iconSize, userPhotoPath } from '../../../types'
import { AddUser } from '../../(add_user)/components/AddUser';

export const ChatList = () => {
  const [addUser, setAddUser] = useState(false);

  return (
    <div className='chatList'>

      <div className='chatList__search'>

        <div className='chatList__search__bar'>
          <MagnifyingGlassIcon height={ iconSize } width={ iconSize} />
          <input type='text' placeholder='Buscar' />  
        </div>

        <div className='chatList__search__plusIcon' onClick={ () => setAddUser(!addUser) }>
          {
            ( addUser ) 
              ? <MinusIcon height={ iconSize } width={ iconSize } />
              : <PlusIcon height={ iconSize } width={ iconSize } />
          }
        </div>

      </div>

      <div className='chatList__chat'>
        <img src={ userPhotoPath } alt='avatar' />
        <div className='chatList__chat__info'>
          <strong>Jheral Barrera</strong>
          <p>Hola, ¿cómo estás?</p>
        </div> 
      </div>

      <div className='chatList__chat'>
        <img src={ userPhotoPath } alt='avatar' />
        <div className='chatList__chat__info'>
          <strong>Jheral Barrera</strong>
          <p>Hola, ¿cómo estás?</p>
        </div> 
      </div>

      <div className='chatList__chat'>
        <img src={ userPhotoPath } alt='avatar' />
        <div className='chatList__chat__info'>
          <strong>Jheral Barrera</strong>
          <p>Hola, ¿cómo estás?</p>
        </div> 
      </div>

      <div className='chatList__chat'>
        <img src={ userPhotoPath } alt='avatar' />
        <div className='chatList__chat__info'>
          <strong>Jheral Barrera</strong>
          <p>Hola, ¿cómo estás?</p>
        </div> 
      </div>

      <div className='chatList__chat'>
        <img src={ userPhotoPath } alt='avatar' />
        <div className='chatList__chat__info'>
          <strong>Jheral Barrera</strong>
          <p>Hola, ¿cómo estás?</p>
        </div> 
      </div>

      <div className='chatList__chat'>
        <img src={ userPhotoPath } alt='avatar' />
        <div className='chatList__chat__info'>
          <strong>Jheral Barrera</strong>
          <p>Hola, ¿cómo estás?</p>
        </div> 
      </div>

      <div className='chatList__chat'>
        <img src={ userPhotoPath } alt='avatar' />
        <div className='chatList__chat__info'>
          <strong>Jheral Barrera</strong>
          <p>Hola, ¿cómo estás?</p>
        </div> 
      </div>

      <div className='chatList__chat'>
        <img src={ userPhotoPath } alt='avatar' />
        <div className='chatList__chat__info'>
          <strong>Jheral Barrera</strong>
          <p>Hola, ¿cómo estás?</p>
        </div> 
      </div>
          
      { ( addUser ) && <AddUser /> }
    </div>
  )
}
