import { useState, useEffect } from "react"
import io from "socket.io-client";
let socket;

export default function ABasicComponent({room}){
  const CONNECTION_PORT = "localhost:3001/"
  useEffect(() => {
      socket = io(CONNECTION_PORT);
  }, [CONNECTION_PORT]);

  useEffect(()=>{
    socket.emit('create_room', room);  
  }, [])

    return (
       <div>

       </div> 
    )
}