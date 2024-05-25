import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export const Notification = () => {
  return (
    <div>
      <ToastContainer position="bottom-right" autoClose={2000} theme="dark"  hideProgressBar />
    </div>
  )
}
