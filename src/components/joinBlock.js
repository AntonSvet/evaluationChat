import { useState } from 'react'
import axios from 'axios'

const JoinBlock = ({ onLogin }) => {
  const [roomId, setRoomId] = useState('Chat1')
  const [userName, setUserName] = useState('')
  const [isLoading, setLoading] = useState(false)

  const onEnter = async () => {
    if (!roomId || !userName) {
      return alert('Enter your name')
    }
    const obj = {
      roomId,
      userName,
    }
    setLoading(true)
    await axios.post('/rooms', obj)

    onLogin(obj)
  }
  return (
    <div className="join-block">
      <input
        type="text"
        placeholder="Enter your name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />

      <button disabled={isLoading} onClick={onEnter}>
        {isLoading ? 'Connect...' : 'Connect'}
      </button>
    </div>
  )
}
export default JoinBlock
