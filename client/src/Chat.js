import React, { useEffect, useState } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'

function Chat({ socket, username, room }) {
	const [currMessage, setCurrMessage] = useState('')
	const [messageList, setMessageList] = useState([])

	const sendMessage = async () => {
		if (currMessage.trim() !== '') {
			const messageData = {
				room: room,
				author: username,
				message: currMessage,
				time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
			}

			await socket.emit('send_message', messageData)
			setMessageList(prev => [...prev, messageData])
      setCurrMessage('')
		}
	}

	useEffect(() => {
		socket.on('receive_message', data => {
			setMessageList(prev => [...prev, data])
		})
	}, [socket])

	return (
		<div className="chat-window">
			<div className="chat-header">
				<p>Chat App</p>
			</div>
			<div className="chat-body">
				<ScrollToBottom className="message-container">
					{messageList.map(item => {
						return (
							<div className="message" id={username === item.author ? 'you' : 'other'}>
								<div>
									<div className="message-content">
										<p>{item.message}</p>
									</div>
									<div className="message-meta">
										<p id="time">{item.time}</p>
										<p id="author">{item.author}</p>
									</div>
								</div>
							</div>
						)
					})}
				</ScrollToBottom>
			</div>
			<div className="chat-footer">
				<input
					type="text"
          value={currMessage}
					placeholder="Send Message..."
					onChange={e => {
						setCurrMessage(e.target.value)
					}}
					onKeyPress={e => {
						e.key === 'Enter' && sendMessage()
            setCurrMessage('') 
					}}
				/>
				<button onClick={sendMessage}>&#9658;</button>
			</div>
		</div>
	)
}

export default Chat
