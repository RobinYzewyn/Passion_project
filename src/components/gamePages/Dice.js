import { useState, useEffect } from "react"
import mouse from "../../assets/mouse.svg";
import dice from "../../assets/placeholder_dice.svg";
import styles from "./dice.module.css";
import stopwatch from "../../assets/stopwatch.svg";
import Roll1 from "../../assets/dice/Roll1.json";
import Roll2 from "../../assets/dice/Roll2.json"
import Roll3 from "../../assets/dice/Roll3.json"
import Roll4 from "../../assets/dice/Roll4.json"
import Roll5 from "../../assets/dice/Roll5.json"
import Roll6 from "../../assets/dice/Roll6.json"
import PH_Dice1 from "../../assets/PH_Dice1.svg";
import PH_Dice2 from "../../assets/PH_Dice2.svg";
import PH_Dice3 from "../../assets/PH_Dice3.svg";
import PH_Dice4 from "../../assets/PH_Dice4.svg";
import PH_Dice5 from "../../assets/PH_Dice5.svg";
import PH_Dice6 from "../../assets/PH_Dice6.svg";
import stopwatchData from "../../assets/Stopwatch.json";
import Lottie from 'react-lottie';
import io from "socket.io-client";
import ClockSound from "../../assets/Sounds/mixkit-tick-tock-clock-timer-1045.wav";
import MultiPlayer from "../Multiplayer";

let countdownInterval;
let rndNumber;
let countNmbr = 10;
let socket;
let playSound = false;
export default function Dice({rolledNumber, room}){
  const CONNECTION_PORT = "localhost:3001/"
  useEffect(() => {
      socket = io(CONNECTION_PORT);
  }, [CONNECTION_PORT]);

  useEffect(()=>{
    socket.emit('create_room', room); 
  },[])

  const [showStopwatch, setshowStopwatch] = useState(false);
  const [timerNumb, settimerNumb] = useState(10);
  const [rollNmb, setrollNmb] = useState(0);

  useEffect(()=>{
    setshowStopwatch(false);
  }, [])

  const [playSoundEffect, setplaySoundEffect] = useState(false);

  const rollDice = (e) => {
    console.log('click')

    setclassDice(styles.diceAni)
    const showAni = () =>{
      rndNumber = Math.floor(Math.random() * 6)+1;
      const data = {
        room: room,
        diceNumber: rndNumber
      }
      socket.emit('rolledDice', data);


      setrollNmb(rndNumber)
      if(rndNumber === 1){
        setaniData(Roll1)
        setphDice(PH_Dice1)
      }
      else if(rndNumber === 2){
        setaniData(Roll2)
        setphDice(PH_Dice2)
      }
      else if(rndNumber === 3){
        setaniData(Roll3)
        setphDice(PH_Dice3)
      }
      else if(rndNumber === 4){
        setaniData(Roll4)
        setphDice(PH_Dice4)
      }
      else if(rndNumber === 5){
        setaniData(Roll5)
        setphDice(PH_Dice5)
      }
      else if(rndNumber === 6){
        setaniData(Roll6)
        setphDice(PH_Dice6)
      }
      setshowAnimation(true);
      

      
      const hideAnimation = () =>{
        setshowAnimation(false);
        setshowStopwatch(true);

        
        playSound = true;
        if(playSound){
          playSound = false;
          setplaySoundEffect(true);

          const enableSound = () =>{
            playSound = true;
            setplaySoundEffect(false);
          }
          setTimeout(enableSound, 2000);
        }
        
        
        countdownInterval = setInterval(countdown, 1000)
      }
      setTimeout(hideAnimation, 2200);

      setclassDice(styles.hidden);
      
    }
    setTimeout(showAni, 500);
    
  }

  const countdown = () =>{
    console.log('timer')
    countNmbr = countNmbr-1;

    settimerNumb(countNmbr);
    if(countNmbr < 1){
      settimerNumb(10); countNmbr = 10;
      clearInterval(countdownInterval);
      rolledNumber(rndNumber);
      return;
    }
  }
  const [aniData, setaniData] = useState(Roll1);
  const [classDice, setclassDice] = useState(styles.dice);
  const [showAnimation, setshowAnimation] = useState(false);
  const [phDice, setphDice] = useState(PH_Dice1);
  const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: aniData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };

  const clockOptions = {
      loop: true,
      autoplay: true,
      animationData: stopwatchData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };
    return (
       <div>
          {!showStopwatch ? <div>
          <p className={styles.title}>Roll the dice</p>

          {classDice === styles.dice ? <img className={styles.mouse} src={mouse} alt="mouse"/> : ''}

          </div> : ''}
          {showAnimation ? <Lottie className={styles.lottieDice} options={defaultOptions} style={{width:'100%', position:'absolute', top:'-40%', left:'0'}}/> : ''}
          <img onClick={(e)=>rollDice(e)} className={showStopwatch ? styles.diceTop : classDice} src={phDice} alt="dice"/>
          <div className={styles.pattern}></div>

          {showStopwatch ? 
          <div className={styles.stopwatchDiv}>
            {playSoundEffect ? <MultiPlayer urls={[ClockSound]}/> : ''}
            <p className={styles.dice_result}>You rolled {rollNmb}!</p>
            <div className={styles.stopwatch_container}>
              <p className={styles.stopwatch_text}>You have {timerNumb} seconds to move your pawn.</p>
              {/* <img className={styles.stopwatch_image} alt="stopwatch" src={stopwatch}/> */}
              <Lottie className={styles.stopwatch_image} options={clockOptions} style={{width:'60%'}}/>
            </div>
          </div>
          : ''}
          
       </div> 
    )
}