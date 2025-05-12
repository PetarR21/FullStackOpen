import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((store) => store.notification)

  if (!notification) {
    return null
  }

  return <p className={notification.type}>{notification.message}</p>
}

export default Notification
