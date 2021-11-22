import { useState, useEffect } from "react"
import io from "socket.io-client";
import BoardInterface from "./BoardInterface";
import Game from "./Game";

let socket;
let colorArray = ['red', 'blue', 'green', 'yellow'];

export default function CreatePlayer({room, playerNumber, amountPlayers}){
  const CONNECTION_PORT = "localhost:3001/"
  useEffect(() => {
      socket = io(CONNECTION_PORT);
  }, [CONNECTION_PORT]);

  useEffect(()=>{
    socket.on('receive_readPlayerCreate', ()=>{
        let tmp = amountStart+1;
        setamountStart(tmp);
    })
  })

  const [color, setcolor] = useState('black');
  const [money, setmoney] = useState(1500);
  const [player, setplayer] = useState(0);

  const [amountStart, setamountStart] = useState(0);
  const [youReady, setyouReady] = useState(false);

  useEffect(()=>{
    socket.emit('create_room', room);  
    setplayer(playerNumber);
    setcolor(colorArray[playerNumber])
  }, [])

  const readSettings = () =>{
    let tmp = amountStart+1;
    setamountStart(tmp);
    setyouReady(true);
    socket.emit('readPlayerCreate', room);
  }

    return (
       <div>
           {player > -1 ? (
            amountPlayers !== amountStart+1 ? 
            <div>
                    <p>Jouw nummer: {player}</p>
                    <p>Jouw kleur: {color}</p>
                    <p>Jouw geld: {money}</p>

                    <p>Aantal ready: {amountStart}</p>
                    <button disabled={youReady} onClick={readSettings}>Gelezen</button>
            </div> 
            : 
            <Game money={money} color={color} room={room} playerAmount={amountPlayers}/>
           )
           : 
           <BoardInterface/>}
       </div> 
    )
}