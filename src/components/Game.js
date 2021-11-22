import { useState, useEffect } from "react"
import io from "socket.io-client";
import PlayerInterface from "./PlayerInterface";
import BoardInterface from "./BoardInterface";

let socket;

export default function Game({money, color, room, playerAmount}){
    const CONNECTION_PORT = "localhost:3001/"
    useEffect(() => {
        socket = io(CONNECTION_PORT);
    }, [CONNECTION_PORT]);

    useEffect(()=>{
        socket.emit('create_room', room);  
    },[])

    //Aantal pionnen op de start
    //Spel

    return (
       <div>
           <PlayerInterface />
       </div> 
    )
}