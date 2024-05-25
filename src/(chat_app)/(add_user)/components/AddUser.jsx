import { imgAvatarPath } from '../../../types'
import '../styles/addUser.css'

export const AddUser = () => {
  return (
    <div className='addUser'>
      <form>
        <input type="text" name='username' placeholder="Username" />
        <button>Search</button>
      </form>

      <div className="addUser__user">
        <div className="addUser__user__detail">
          <img src={ imgAvatarPath } alt="" />
          <span>Jheral Barrera</span>
        </div>

        <button>Add User</button>
      </div>
    </div>
  )
}
