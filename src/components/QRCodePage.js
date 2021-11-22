import QRCode from "react-qr-code";
import io from "socket.io-client";
import { useState, useEffect } from "react"
import Lobby from "./Lobby";
let socket;

export default function QRCodePage(){
	
    const CONNECTION_PORT = "localhost:3001/"
	useEffect(() => {
        socket = io(CONNECTION_PORT);
    }, [CONNECTION_PORT]);

	const [room, setRoom] = useState('');
	const [amountUsers, setamountUsers] = useState(0);
	const [startGame, setstartGame] = useState(false);
	useEffect(()=>{
		randomCode();

		socket.on('successful_connection', (amountPlayers)=>{
			setamountUsers(amountPlayers);
		})
	}, [])

	const randomCode = () =>{
		var result = '';
		var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		var charactersLength = characters.length;
		for ( var i = 0; i < 3; i++ ) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		setRoom(result);
		socket.emit('create_room', result);
	}

	const closeRoom = () =>{		
		setstartGame(true);
		socket.emit('start_game', room);
	}

    return (
        <div>
			{!startGame && amountUsers < 5 ? 
			<div>
				<p>Code: {room}</p>
				<p>Players in room: {amountUsers}</p>
				<QRCode value={room} />
				<button onClick={()=>closeRoom()}>Start game</button>
			</div> 
			: 
			<div>
				<Lobby playerNumber={0} creatorJoined={true} room={room} amountUsers={amountUsers}/>
			</div>
			}
            
        </div> 
    )
}