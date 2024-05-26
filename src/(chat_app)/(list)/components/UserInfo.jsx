import { EllipsisHorizontalCircleIcon, PencilSquareIcon, UserCircleIcon, VideoCameraIcon } from '@heroicons/react/24/outline'
import '../styles/userInfo.css'
import { iconSize, userPhotoPath } from '../../../types'
import { authStore } from '../../../(zustand)/authStore';

export const UserInfo = () => {
  const { user } = authStore();

  return (
    <div className='userInfo'>

      <div className="userInfo__user">
        <img src={ user?.photoURL || userPhotoPath  } alt='avatar' />
        <h3>{ user?.displayName }</h3>
      </div>

      <div className="userInfo__icons">
        <EllipsisHorizontalCircleIcon height={ iconSize } width={ iconSize } />
        <VideoCameraIcon height={ iconSize } width={ iconSize } />
        <PencilSquareIcon height={ iconSize } width={ iconSize } />
      </div>
      
    </div>
  )
}
