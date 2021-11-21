import { useState, useEffect } from "react"
import io from "socket.io-client";
let socket;

export default function QRCamera(){
  const CONNECTION_PORT = "localhost:3001/"
  useEffect(() => {
      socket = io(CONNECTION_PORT);
  }, [CONNECTION_PORT]);

  const [amountPlayers, setamountPlayers] = useState(2);

  useEffect(()=>{
    
  }, [])

    return (
        <div>
            <p>Lobby</p>
            <p>{amountPlayers}</p>
        </div>
    )
}