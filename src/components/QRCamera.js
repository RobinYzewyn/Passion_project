import QrReader from 'react-qr-reader'
import Lobby from "./Lobby"
import { useState, useEffect } from "react"
import io from "socket.io-client";
let socket;
let input;
let closeNumber = false;
export default function QRCamera(){
  const CONNECTION_PORT = "localhost:3001/"
  useEffect(() => {
    socket = io(CONNECTION_PORT);
  }, [CONNECTION_PORT]);

  const [result, setResult] = useState('');
  const [amountUsers, setamountUsers] = useState(1);
  const [number, setnumber] = useState(1);
  useEffect(()=>{
    socket.on('successful_connection', (amountPlayers)=>{
      console.log('succes', amountPlayers);
      setamountUsers(amountPlayers);
      if(!closeNumber){
        closeNumber = true;
        amountPlayers--;
        setnumber(amountPlayers);
      }
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
  
  const changeInput = (e) =>{
    input = (e.target.value);
  }

  const joinRoom = () =>{
    socket.emit('join_room', input);
    setResult(input);
  }

    return (
        <div>
            {result === '' ? 
            <div>
              <p>Camera</p>
              <p>Code: {result}</p>
              <input onChange={(e)=>changeInput(e)} type="text"/>
              <button onClick={()=>joinRoom()}>Join</button>
              <QrReader delay={300} onError={handleError} onScan={handleScan} style={{ width: '30%' }}/>
            </div> 
            : 
            <div>
              <Lobby playerNumber={number} room={result} amountUsers={amountUsers} />
            </div>}
        </div>
    )
}