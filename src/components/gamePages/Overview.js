import { useState, useEffect } from "react"

import Dice from "./Dice";
import GameHeader from "./GameHeader";
import GameHome from "./GameHome";
import Property from "./Property";
import Card from "./Card";
import io from "socket.io-client";
import GameEnd from "./GameEnd";

let socket;
export default function Overview({pos1, pos2, pos3, pos4, showCard, payPlayer, payProperty, payTaxes, playerDone, soldProperty, buyProperty, propertyStatus, price, owner, propertyState, showScreen, rolledNumber, showDice, playerAmount, playerData, room, number, money, color, position, thrower, properties}){
    const CONNECTION_PORT = "localhost:3001/"
    useEffect(() => {
        socket = io(CONNECTION_PORT);
    }, [CONNECTION_PORT]);

    useEffect(()=>{
        socket.emit('create_room', room); 
    },[])
    
    const setRolledNumber = (val) =>{
        rolledNumber(val);
    }

    useEffect(()=>{
        socket.on('user_left', ()=>{
            console.log('user left');
            window.location.reload();
        })

        socket.on('end_game', ()=>{
            setgameEnd(true);
        })
    })

    const [gameEnd, setgameEnd] = useState(false);
    
    return (
        <div>
            {!gameEnd ? 
            <div>
                <GameHeader money={money} number={number} color={color} room={room}/>
                {     
                showScreen ? <Property payPlayer={payPlayer} payProperty={payProperty} payTaxes={payTaxes} playerDone={playerDone} soldProperty={soldProperty} buyProperty={buyProperty} propertyStatus={propertyStatus} price={price} owner={owner} propertyState={propertyState}/> : 
                showDice ? <Dice rolledNumber={(val)=>setRolledNumber(val)}/> :
                <GameHome pos1={pos1} pos2={pos2} pos3={pos3} pos4={pos4} playerAmount={playerAmount} playerData={playerData} thrower={thrower} money={money} color={color} number={number} properties={properties}/>
                }
            </div> 
            :
            <GameEnd playerAmount={playerAmount} playerData={playerData}/>}
        </div> 
    )
}