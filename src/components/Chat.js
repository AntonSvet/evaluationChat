import React from 'react'
import socket from '../components/socket'
import './style.css'
import VideoChat from './videoCat/videoChat'

const Chat = ({ users, messages, userName, roomId, onAddMessage }) => {
  const [messageValue, setmessageValue] = React.useState('')
  const messagesRef = React.useRef(null)
  const onSendMessage = () => {
    socket.emit('ROOM:NEW_MESSAGE', {
      userName,
      roomId,
      text: messageValue,
    })
    onAddMessage({ userName, text: messageValue })

    setmessageValue('')
  }

  React.useEffect(() => {
    messagesRef.current.scrollTo(0, 999999)
  }, [messages])

  return (
    <div className="wrapper">
      <div className="navbar">
        <div className="user">
          Room: <b>{roomId}</b>
          <hr />
          <hr />
          <b>Online({users.length}):</b>
          <ul>
            {users.map((name, index) => (
              <li key={name + index}>{name}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="wrapper__chat">
        <div ref={messagesRef} className="chat">
          {messages &&
            messages.map((message, index) => (
              <div key={index} className="chat__message">
                <div>
                  <i>{message.userName}: </i>
                </div>
                <br />
                <span>{message.text}</span>
              </div>
            ))}
        </div>
        <div className="chat__panel">
          <textarea
            value={messageValue}
            className="form-control"
            onChange={(e) => setmessageValue(e.target.value)}
            cols="30"
            rows="10"
          ></textarea>
          <button
            onClick={messageValue ? onSendMessage : null}
            type="submit"
            className="btn"
          >
            Send
          </button>
        </div>
      </div>
      <div className="chats_rooms">
        <div className="rooms">
          <span>Rooms:</span>
          <ul>
            <li className="active">Chat 1</li>
            <li>Chat 2</li>
            <li>Chat 3</li>
            <li>Chat 4</li>
            <li>Chat 5</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
export default Chat
