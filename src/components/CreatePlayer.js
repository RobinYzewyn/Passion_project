import { useState, useEffect } from "react"
import io from "socket.io-client";
import BoardInterface from "./BoardInterface";
import Game from "./Game";
import Lottie from 'react-lottie';
import Red_Animation from "../assets/Red_Animation.json";
import Blue_Animation from "../assets/Blue_Animation.json";
import Green_Animation from "../assets/Green_Animation.json";
import Yellow_Animation from "../assets/Yellow_Animation.json";
import styles from "./CreatePlayer.module.css";
import money_icon from "../assets/money.svg";
import player_red_icon from "../assets/player_red_icon.svg";
import player_blue_icon from "../assets/player_blue_icon.svg";
import player_green_icon from "../assets/player_green_icon.svg";
import player_yellow_icon from "../assets/player_yellow_icon.svg";
import MultiPlayer from "./Multiplayer";
import TapSound from "../assets/Sounds/mixkit-game-ball-tap-2073.wav";

let socket;
let colorArray = ['red', 'blue', 'green', 'yellow'];
let ableEmitPlayerTurn = true;
let playSound = false;
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

  useEffect(()=>{
    const fetchFunction = async (roomCode) =>{
      const fet = await fetch('https://passionprojectjson.herokuapp.com/data');
      const data = await fet.json();
      console.log(data);
    }
    fetchFunction(room)
  }, [])

  const [color, setcolor] = useState('black');
  const [money, setmoney] = useState(1500);
  const [player, setplayer] = useState(0);

  const [amountStart, setamountStart] = useState(0);
  const [youReady, setyouReady] = useState(false);

  useEffect(()=>{
    socket.emit('create_room', room);  
    setplayer(playerNumber);
    setcolor(colorArray[playerNumber])
    if(colorArray[playerNumber] === 'red'){
      setaniData(Red_Animation);
    }
    else if(colorArray[playerNumber] === 'blue'){
      setaniData(Blue_Animation);
    }
    else if(colorArray[playerNumber] === 'green'){
      setaniData(Green_Animation);
    }
    else if(colorArray[playerNumber] === 'yellow'){
      setaniData(Yellow_Animation);
    }

    const showMoney = () =>{
      //Show money
      setshowMoneyState(true);
      const showColor = () =>{
        //Show color
        setshowColorState(true);
        //Hide animation
        setshowAnimationState(false);
      }
      setTimeout(showColor, 2500);
    }

    setTimeout(showMoney, 2000);
  }, [])

  const readSettings = () =>{
    let tmp = amountStart+1;
    setamountStart(tmp);
    setyouReady(true);
    socket.emit('readPlayerCreate', room);

    //SOUND CLICK
    playSound = true;
      if(playSound){
        playSound = false;
        setsoundEffect(TapSound)
        setplaySoundEffect(true);

        const enableSound = () =>{
          playSound = true;
          setplaySoundEffect(false);
        }
        setTimeout(enableSound, 2000);
    }
  }

  const [aniData, setaniData] = useState(Red_Animation);
  const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: aniData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };
    const [showMoneyState, setshowMoneyState] = useState(false);
    const [showColorState, setshowColorState] = useState(false);
    const [showAnimationState, setshowAnimationState] = useState(true);

    const getPlayerTurn = (val) =>{
      if(ableEmitPlayerTurn){
        ableEmitPlayerTurn = false;

        const data = {
          room: room,
          turnPlayer: val
        }
        socket.emit('playerTurn', data)
      }
      const trueAbleEmit = () =>{
        ableEmitPlayerTurn = true;
      }
      setTimeout(trueAbleEmit, 3000);
    }

    const [soundEffect, setsoundEffect] = useState(TapSound);
    const [playSoundEffect, setplaySoundEffect] = useState(false);

    return (
       <div>
         {playSoundEffect ? <MultiPlayer urls={[soundEffect]}/> : ''}
           {player > -1 ? (
            amountPlayers !== amountStart+1 ? 
            <div>
              <div className={styles.header}>
              {showMoneyState ? 
              <div className={styles.header_container}>
                  <img className={styles.money_icon} alt="money icon" src={money_icon}/>
                  <div className={styles.money_amount}>
                      <p>${money}</p>
                  </div>
              </div> : ''}
              {showColorState ?
              <div className={styles.header_container}>
                  <img className={styles.player_icon} alt="player icon" src={color === 'red' ? player_red_icon : color === 'blue' ? player_blue_icon : color === 'green' ? player_green_icon : player_yellow_icon}/>
                  <p>Player {player}</p>
              </div>
               : ''}
            </div> 

             <div className={styles.QRPBG}></div>  
            <div className={styles.divCPInfo}>
              {showAnimationState && !showMoneyState ? <p className={styles.textInfo}>Your money</p> : ''}
              {showAnimationState && !showColorState && showMoneyState ? <p className={styles.textInfo}>Your color</p> : ''}
              {!showAnimationState ? <div className={styles.divCPInfo}><p className={styles.textInfo}>Are you ready?</p><button className={!youReady ? styles.CPButton : styles.CPButtonDisabled} disabled={youReady} onClick={readSettings}>{!youReady ? 'Yes!' : "I'm ready!"}</button></div>: ''}
              {showAnimationState ? <Lottie options={defaultOptions} className={styles.animation} style={{width:'60%'}}/> : ''}
            </div> 
            </div> 
            : 
            <Game number={playerNumber} moneyX={money} color={color} room={room} playerAmount={amountPlayers} playerTurn={(val)=>getPlayerTurn(val)}/>
           )
           : 
           <div>
            <BoardInterface room={room} playerAmount={amountPlayers}/>
           </div>}
       </div> 
    )
}