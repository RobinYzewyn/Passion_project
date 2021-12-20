import { useState, useEffect } from "react"
import io from "socket.io-client";
import money_icon from "../../assets/money.svg";
import styles from "./gameheader.module.css";
import player_red_icon from "../../assets/player_red_icon.svg";
import player_blue_icon from "../../assets/player_blue_icon.svg";
import player_green_icon from "../../assets/player_green_icon.svg";
import player_yellow_icon from "../../assets/player_yellow_icon.svg";
let socket

export default function Gameheader({money, number, color, room}){
    const CONNECTION_PORT = "localhost:3001/"
    useEffect(() => {
        socket = io(CONNECTION_PORT);
    }, [CONNECTION_PORT]);
    const [ableLose, setableLose] = useState(false);
    useEffect(()=>{
        if(money < 1 && ableLose){
            console.log('game over');
            socket.emit('end_game', room)
        }
        if(money > 1000 & !ableLose){
            setableLose(true);
        }
    }, [money])

    return (
       <div className={styles.header}>
            <div className={styles.header_container}>
                <img className={styles.money_icon} alt="money icon" src={money_icon}/>
                <div className={styles.money_amount}>
                    <p>${money}</p>
                </div>
            </div>
            <div className={styles.header_container}>
                <img className={styles.player_icon} alt="player icon" src={color === 'red' ? player_red_icon : color === 'blue' ? player_blue_icon : color === 'green' ? player_green_icon : player_yellow_icon}/>
                <p>Player {number}</p>
            </div>
       </div> 
    )
}