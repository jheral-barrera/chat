import { ArrowDownCircleIcon, ArrowDownTrayIcon, ArrowUpCircleIcon } from '@heroicons/react/24/outline'
import { iconSize, userPhotoPath } from '../../../types'
import '../styles/details.css'
import { authStore } from '../../../(zustand)/authStore';

export const Details = () => {

  const { user, authenticated, logoutUser } = authStore();

  return (
    <div className='details'>
      
      <div className='details__user'>
        <img src={ user?.photoURL || userPhotoPath } alt='avatar' />
        <h2>{ user?.displayName }</h2>
        <p>Lorem ipsum dolor sit amet</p>
      </div>

      <div className='details__options'>
        
        <div className='details__option'>
          <div className='details__option__title'>
            <span>Chat Settings</span>
            <ArrowUpCircleIcon height={ iconSize } width={ iconSize } />
          </div>
        </div>

        <div className='details__option'>
          <div className='details__option__title'>
            <span>Privacy & Help</span>
            <ArrowUpCircleIcon height={ iconSize } width={ iconSize } />
          </div>
        </div>

        <div className='details__option'>

          <div className='details__option__title'>
            <span>Shared Photos</span>
            <ArrowDownCircleIcon height={ iconSize } width={ iconSize } />
          </div>

          <div className='details__option__photo__list'>

            <div className='details__option__photos__list__item'>
              <div className="details__option__photos__list__item__details">
                <img src='https://cdn.pixabay.com/photo/2012/08/27/14/19/mountains-55067_640.png' alt='image shared' />
                <span>photo_2024_1.png</span>
              </div>

              <ArrowDownTrayIcon height={ iconSize } width={ iconSize } />
            </div>

            <div className='details__option__photos__list__item'>
              <div className="details__option__photos__list__item__details">
                <img src='https://cdn.pixabay.com/photo/2012/08/27/14/19/mountains-55067_640.png' alt='image shared' />
                <span>photo_2024_1.png</span>
              </div>

              <ArrowDownTrayIcon height={ iconSize } width={ iconSize } />
            </div>

            <div className='details__option__photos__list__item'>
              <div className="details__option__photos__list__item__details">
                <img src='https://cdn.pixabay.com/photo/2012/08/27/14/19/mountains-55067_640.png' alt='image shared' />
                <span>photo_2024_1.png</span>
              </div>

              <ArrowDownTrayIcon height={ iconSize } width={ iconSize } />
            </div>

            <div className='details__option__photos__list__item'>
              <div className="details__option__photos__list__item__details">
                <img src='https://cdn.pixabay.com/photo/2012/08/27/14/19/mountains-55067_640.png' alt='image shared' />
                <span>photo_2024_1.png</span>
              </div>

              <ArrowDownTrayIcon height={ iconSize } width={ iconSize } />
            </div>

            <div className='details__option__photos__list__item'>
              <div className="details__option__photos__list__item__details">
                <img src='https://cdn.pixabay.com/photo/2012/08/27/14/19/mountains-55067_640.png' alt='image shared' />
                <span>photo_2024_1.png</span>
              </div>

              <ArrowDownTrayIcon height={ iconSize } width={ iconSize } />
            </div>

          </div>

        </div>

        <div className='details__option'>
          <div className='details__option__title'>
            <span>Shared Files</span>
            <ArrowUpCircleIcon height={ iconSize } width={ iconSize } />
          </div>
        </div>

        <button>Block User</button>
      
      </div>

      <div className="details__logout">
        <button onClick={ logoutUser }>Logout</button>
      </div>
    </div>
  )
}
