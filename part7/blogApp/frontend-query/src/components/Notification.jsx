import { useNotificationValue } from '../context/NotificationContext'

const Notification = () => {
  const notification = useNotificationValue()

  if (!notification) {
    return null
  }

  return <p className={notification.type}>{notification.message}</p>
}

export default Notification
