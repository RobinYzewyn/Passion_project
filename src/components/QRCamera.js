import QrReader from 'react-qr-reader'
import { useState, useEffect } from "react"
import io from "socket.io-client";
let socket;

export default function QRCamera(){
  const CONNECTION_PORT = "localhost:3001/"
  useEffect(() => {
    socket = io(CONNECTION_PORT);
  }, [CONNECTION_PORT]);

  const [result, setResult] = useState('');
  const [amountUsers, setamountUsers] = useState(1);

  useEffect(()=>{
    socket.on('successful_connection', (amountPlayers)=>{
      console.log('succes', amountPlayers);
      setamountUsers(amountPlayers)
    })
  })

  const handleScan = data => {
    if (data) {
      setResult(data);
      socket.emit('join_room', data);
    }    
  }

  const handleError = err => {
    console.error(err)
  }
  const [input, setinput] = useState('');
  const changeInput = (e) =>{
    setinput(e.target.value);
  }

  const joinRoom = () =>{
    socket.emit('join_room', input);
  }

    return (
        <div>
            <p>Camera</p>
            <p>Amount players in room: {amountUsers}</p>
            <input onChange={(e)=>changeInput(e)} type="text"/>
            <button onClick={()=>joinRoom()}>Join</button>
            <QrReader delay={300} onError={handleError} onScan={handleScan} style={{ width: '30%' }}/>
            <p>{result}</p>
        </div>
    )
}