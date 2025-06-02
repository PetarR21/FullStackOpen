const Notification = ({ notification }: { notification: string }) => {
  return (
    <div style={{ color: 'red', marginBottom: '10px' }}>{notification}</div>
  )
}

export default Notification
