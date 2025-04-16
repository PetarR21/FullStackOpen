const Notification = ({ notification }) => {
  if (!notification) {
    return null
  }

  return <p className={notification.type}>{notification.message}</p>
}

export default Notification
