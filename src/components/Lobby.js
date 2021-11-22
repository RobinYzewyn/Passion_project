import { useState, useEffect } from "react"
import io from "socket.io-client";
import CreatePlayer from "./CreatePlayer";

let socket;
let timeInterval;
let varSeconds = 6

export default function Lobby({room, amountUsers, creatorJoined, playerNumber}){
  const CONNECTION_PORT = "localhost:3001/"
  useEffect(() => {
      socket = io(CONNECTION_PORT);
  }, [CONNECTION_PORT]);

  const [seconds, setseconds] = useState(6);
  useEffect(()=>{
    socket.emit('create_room', room);

    if(creatorJoined){
        const timer = () =>{
            if(varSeconds > 0){
                varSeconds -= 1;
                const data = {
                    room: room,
                    seconds: varSeconds
                }
                socket.emit('send_timer', data);
            }
            else {
                clearInterval(timeInterval);
            }
            setseconds(varSeconds);
        }
        timeInterval = setInterval(timer, 1000);
    }
  }, [])

  useEffect(()=>{
    socket.on('receive_timer', (seconds)=>{
        setseconds(seconds);
    })
  })

    return (
        <div>
            {seconds !== 0 ? 
            <div>
                <p>Lobby: {room}</p>
                <p>Verbonden apparaten: {amountUsers}</p>
                {seconds < 6 ? 
                <div>
                    <p>Veel succes!</p>
                    <p>Spel start in {seconds} seconden.</p>
                </div> : ''}
                
            </div> 
            :
            <CreatePlayer amountPlayers={amountUsers} playerNumber={playerNumber-1} room={room}/>
            }
        </div>
    )
}