import './App.css'
import io from 'socket.io-client'
import { useState } from 'react'
import Chat from './Chat'

const socket = io('http://localhost:8000')

function App() {
	const [username, setUsername] = useState('')
	const [room, setRoom] = useState('')
	const [showChat, setShowChat] = useState(false)

	const joinRoom = () => {
		if (username.trim() !== '' && room.trim() !== '') {
			socket.emit('join_room', room)
			setShowChat(true)
		}
	}

	return (
		<div className="App">
			{!showChat ? (
				<div className="joinChatContainer">
					<h3>Join a Chat</h3>
					<input
						onChange={e => {
							setUsername(e.target.value)
						}}
						type="text"
						placeholder="Name..."
					/>
					<input
						onChange={e => {
							setRoom(e.target.value)
						}}
						type="text"
						placeholder="Room..."
					/>
					<button onClick={joinRoom}>Join Room</button>
				</div>
			) : (
				<Chat socket={socket} username={username} room={room} />
			)}
		</div>
	)
}

export default App
