/* eslint-disable react/prop-types */
const Notification = ({ notification }) => {
  if (!notification) {
    return null
  }

  return <div>{notification}</div>
}

export default Notification
