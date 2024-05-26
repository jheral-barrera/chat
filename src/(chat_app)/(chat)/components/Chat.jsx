import { useEffect, useRef, useState } from 'react'
import { CameraIcon, FaceSmileIcon, InformationCircleIcon, MicrophoneIcon, PaperAirplaneIcon, PhoneIcon, PhotoIcon, UserCircleIcon, VideoCameraIcon } from '@heroicons/react/24/outline'
import '../styles/chat.css'
import { iconSize, userPhotoPath } from '../../../types'

import EmojiPicker from 'emoji-picker-react'
import { authStore } from '../../../(zustand)/authStore'

export const Chat = () => {
  const [openEmoji, setOpenEmoji] = useState(false);
  const [message, setMessage] = useState('');

  const { user } = authStore();

  const endChatRef = useRef(null);

  useEffect( () => {
    endChatRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);


  const handleEmojiClick = (emojiValue) => {
    setMessage(message + emojiValue.emoji);
    setOpenEmoji(false);
  }

  return (
    <div className='chat'>

      <div className='chat__top'>

        <div className='chat__top__user'>
          <img src={ user?.photoURL || userPhotoPath  } alt='avatar' />

          <div className='chat__top__user__info'>
            <strong>{ user?.displayName }</strong>
            <p>Active</p>
          </div>

        </div>

        <div className='chat__top__icons'>
          <PhoneIcon height={ iconSize } width={ iconSize } />
          <VideoCameraIcon height={ iconSize } width={ iconSize } />
          <InformationCircleIcon height={ iconSize } width={ iconSize } />
        </div>

      </div>

      <div className='chat__middle'>

        <div className='chat__middle__message reciever'>
          <img src={ userPhotoPath } alt='avatar' />

          <div className='chat__middle__message__info reciever__info'>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia, ratione perferendis possimus nobis saepe id aliquam sint magni nihil eveniet sapiente at similique asperiores illum unde consequuntur. Quaerat, cupiditate! Dolores?</p>
            <strong>2 min ago</strong>
          </div>
        </div>

        <div className='chat__middle__message emiter'>

          <div className='chat__middle__message__info emiter__info'>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia, ratione perferendis possimus nobis saepe id aliquam sint magni nihil eveniet sapiente at similique asperiores illum unde consequuntur. Quaerat, cupiditate! Dolores?</p>
            <strong>2 min ago</strong>
          </div>
        </div>

        <div className='chat__middle__message reciever'>
          <img src={ userPhotoPath } alt='avatar' />

          <div className='chat__middle__message__info reciever__info'>
            <img src='https://cdn.pixabay.com/photo/2012/08/27/14/19/mountains-55067_640.png' alt='image sended' />
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia, ratione perferendis possimus nobis saepe id aliquam sint magni nihil eveniet sapiente at similique asperiores illum unde consequuntur. Quaerat, cupiditate! Dolores?</p>
            <strong>2 min ago</strong>
          </div>
        </div>

        <div className='chat__middle__message reciever'>
          <img src={ userPhotoPath } alt='avatar' />

          <div className='chat__middle__message__info reciever__info'>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia, ratione perferendis possimus nobis saepe id aliquam sint magni nihil eveniet sapiente at similique asperiores illum unde consequuntur. Quaerat, cupiditate! Dolores?</p>
            <strong>2 min ago</strong>
          </div>
        </div>

        <div className='chat__middle__message emiter'>

          <div className='chat__middle__message__info emiter__info'> 
            <img src='https://cdn.pixabay.com/photo/2012/08/27/14/19/mountains-55067_640.png' alt='image sended' />
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia, ratione perferendis possimus nobis saepe id aliquam sint magni nihil eveniet sapiente at similique asperiores illum unde consequuntur. Quaerat, cupiditate! Dolores?</p>
            <strong>2 min ago</strong>
          </div>
        </div>

        <div ref={ endChatRef }></div>
      </div>
      
      <div className='chat__bottom'>

        <div className='chat__bottom__icons'>
          <PhotoIcon height={ iconSize } width={ iconSize } />
          <CameraIcon height={ iconSize } width={ iconSize } />
          <MicrophoneIcon height={ iconSize } width={ iconSize } />
        </div>
        
        <div className="chat__bottom__input">
          <input 
            type="text" 
            placeholder='Escribe tu mensaje...'
            onChange={ (e) => setMessage(e.target.value) }
            value={ message }
          />
        </div>

        <div className='chat__bottom__emoji'>
          <FaceSmileIcon height={ iconSize } width={ iconSize } onClick={() => setOpenEmoji(!openEmoji)} />
          <div className='chat__bottom__emoji__picker'>
            <EmojiPicker open={ openEmoji } onEmojiClick={ handleEmojiClick } />
          </div>
        </div>

        <button disabled>enviar</button>

        <div className='chat__bottom__send'>
          <PaperAirplaneIcon height={ iconSize } width={ iconSize } />
        </div>
      </div>

    </div>
  )
}
