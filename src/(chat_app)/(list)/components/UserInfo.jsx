import { EllipsisHorizontalCircleIcon, PencilSquareIcon, UserCircleIcon, VideoCameraIcon } from '@heroicons/react/24/outline'
import '../styles/userInfo.css'
import { iconSize, imgAvatarPath } from '../../../types'

export const UserInfo = () => {
  return (
    <div className='userInfo'>

      <div className="userInfo__user">
        <img src={ imgAvatarPath } alt='avatar' />
        <h3>Jheral Barrera</h3>
      </div>

      <div className="userInfo__icons">
        <EllipsisHorizontalCircleIcon height={ iconSize } width={ iconSize } />
        <VideoCameraIcon height={ iconSize } width={ iconSize } />
        <PencilSquareIcon height={ iconSize } width={ iconSize } />
      </div>
      
    </div>
  )
}
