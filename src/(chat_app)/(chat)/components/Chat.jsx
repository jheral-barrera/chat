import { useEffect, useRef, useState } from 'react'
import { CameraIcon, FaceSmileIcon, InformationCircleIcon, MicrophoneIcon, PaperAirplaneIcon, PhoneIcon, PhotoIcon, UserCircleIcon, VideoCameraIcon } from '@heroicons/react/24/outline'
import '../styles/chat.css'
import { iconSize, userPhotoPath } from '../../../types'

import EmojiPicker from 'emoji-picker-react'
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'
import { FirebaseDB } from '../../../(services)/firebase/firebase'
import { authStore, chatStore } from '../../../(zustand)'
import { useForm } from '../../../hooks/useForm'

export const Chat = () => {
  const [openEmoji, setOpenEmoji] = useState(false);
  const [ chat, setChat ] = useState( null );

  const { text, formState, handleInputForm, handleResetForm, handleEmojiClick } = useForm({ initialState: { text: '' } });

  const { user: currentUser } = authStore();
  const { chatId, user } = chatStore();

  const endChatRef = useRef(null);

  useEffect( () => {
    endChatRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect( () => {
    
    const unSub = onSnapshot( doc( FirebaseDB, `chats/${ chatId }` ), ( documentChat ) => {
      setChat( documentChat.data() );
    } ) ;

    return () => unSub();
  }, [ chatId ] );

  const onEmojiClick = (emojiValue) => {
    handleEmojiClick( emojiValue );
    setOpenEmoji(false);
  }

  const onSubmitMessage = async ( event ) => {
    event.preventDefault();
    if ( text === '' ) return;

    try {

      await updateDoc( doc( FirebaseDB, `chats/${ chatId }`), {
        messages: arrayUnion({
          senderId: currentUser?.uid,
          text,
          createdAt: new Date()
        })
      } );

      const usersIDs = [ currentUser?.uid, user?.uid ];

      usersIDs.forEach( async ( userID ) => {

        const usersChatsDocumentRef = doc( FirebaseDB, `users_chats/${ userID }`);
        const usersChatsSnapshot = await getDoc( usersChatsDocumentRef );

        if ( usersChatsSnapshot.exists() ) {
          const usersChatsData = usersChatsSnapshot.data();

          const chatIndex = usersChatsData.chats.findIndex( ( c ) => c.chatId === chatId );

          usersChatsData.chats[ chatIndex ].lastMessage = text;
          usersChatsData.chats[ chatIndex ].isSeen = userID === currentUser.uid ? true : false;
          usersChatsData.chats[ chatIndex ].updatedAt = Date.now();

          await updateDoc( usersChatsDocumentRef, {
            chats: usersChatsData.chats
          })
        }

      } );

    } catch (error) {
      console.log( error );
    } 

    handleResetForm();
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

        {
          chat?.messages.map( ( message ) => (
            <div className='chat__middle__message emiter' key={ message?.createdAt }>

              <div className='chat__middle__message__info emiter__info'>
                <p>{ message.text }</p>
                {/* <strong>2 min ago</strong> */}
              </div>
            </div>
    
            // <div className='chat__middle__message reciever'>
            //   <img src={ userPhotoPath } alt='avatar' />
    
            //   <div className='chat__middle__message__info reciever__info'>
            //     <img src='https://cdn.pixabay.com/photo/2012/08/27/14/19/mountains-55067_640.png' alt='image sended' />
            //     <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia, ratione perferendis possimus nobis saepe id aliquam sint magni nihil eveniet sapiente at similique asperiores illum unde consequuntur. Quaerat, cupiditate! Dolores?</p>
            //     <strong>2 min ago</strong>
            //   </div>
            // </div>
  
          ) )
        }

      </div>
      
      <div className='chat__bottom'>

        <div className='chat__bottom__icons'>
          <PhotoIcon height={ iconSize } width={ iconSize } />
          <CameraIcon height={ iconSize } width={ iconSize } />
          <MicrophoneIcon height={ iconSize } width={ iconSize } />
        </div>
        
        <form onSubmit={ onSubmitMessage }>

          <div className="chat__bottom__input">
            <input 
              name='text'
              type="text" 
              placeholder='Escribe tu mensaje...'
              onChange={ handleInputForm }
              value={ text }
            />
          </div>

          <div className='chat__bottom__emoji'>
            <FaceSmileIcon height={ iconSize } width={ iconSize } onClick={() => setOpenEmoji(!openEmoji)} />
            <div className='chat__bottom__emoji__picker'>
              <EmojiPicker open={ openEmoji } onEmojiClick={ onEmojiClick } />
            </div>
          </div>

          <button 
            className='chat__bottom__send'
            type='submit'
          >
            <PaperAirplaneIcon height={ iconSize } width={ iconSize } />
          </button>
{/* 
          <div className='chat__bottom__send' onClick={ () => buttonSendRef.current.click() }>
            <PaperAirplaneIcon height={ iconSize } width={ iconSize } />
          </div> */}

        </form>
      </div>

    </div>
  )
}
