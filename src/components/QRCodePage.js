import QRCode from "react-qr-code";
import io from "socket.io-client";
import { useState, useEffect } from "react"

export default function QRCodex(){
	let socket;
    const CONNECTION_PORT = "localhost:3001/"
	useEffect(() => {
        socket = io(CONNECTION_PORT);
    }, [CONNECTION_PORT]);

	const [room, setRoom] = useState('');
	const [amountUsers, setamountUsers] = useState(1);
	useEffect(()=>{
		randomCode();

		socket.on('successful_connection', (amountPlayers)=>{
			console.log('succes', amountPlayers);
			setamountUsers(amountPlayers);
		})
	}, [])

	useEffect(()=>{
		
	})

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

    return (
        <div>
            <p>Code: {room}</p>
			<p>Players in room: {amountUsers}</p>
            <QRCode value={room} />
			<button>Start game</button>
        </div> 
    )
}