import QrReader from 'react-qr-reader'
import Lobby from "./Lobby"
import { useState, useEffect } from "react"
import io from "socket.io-client";
import styles from "./QRCamera.module.css"
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
            <div className={styles.containerQRC}>
              <div className={styles.QRPBG}></div>
              <p>Fitopoly</p>
              <p>Scan the QR code displayed on the computer.</p>
              <div className={styles.QRReaderBG}><QrReader delay={300} onError={handleError} onScan={handleScan} className={styles.QRReader}/></div>
            </div> 
            : 
            <div>
              <Lobby playerNumber={number} room={result} amountUsers={amountUsers} />
            </div>}
        </div>
    )
}