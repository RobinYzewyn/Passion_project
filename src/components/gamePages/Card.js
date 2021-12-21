import { useState, useEffect } from "react"
import io from "socket.io-client";
import mouse from "../../assets/mouse.svg";
import card_back from "../../assets/card_back.svg";
import card_front from "../../assets/card_front.svg";
import styles from "./card.module.css";
import mascotte_card from "../../assets/mascotte_card.svg";
import cards from "../data/cards.json";

let socket;

export default function Card({room, playerDone}){
  const CONNECTION_PORT = "localhost:3001/"
  useEffect(() => {
      socket = io(CONNECTION_PORT);
  }, [CONNECTION_PORT]);

  const [pickedCard, setpickedCard] = useState(cards.cards[0]);
  useEffect(()=>{
    socket.emit('create_room', room); 

    const getRandomCard = () =>{
      const number = Math.floor(Math.random() * cards.cards.length);
      setpickedCard(cards.cards[number]);
    }

    getRandomCard();
  }, [])

  const [showTask, setshowTask] = useState(false);
  const [ableFlip, setableFlip] = useState(false);
  const [flipped, setflipped] = useState(false);
  const [showMouse, setshowMouse] = useState(true);
  const flipCard = (e) =>{
    setableFlip(true);
    setshowMouse(false);
    const stopAnimation = () =>{
      setableFlip(false);
      setflipped(true);
      let tmp = !showTask;
      setshowTask(tmp);
    }

    setTimeout(stopAnimation, 999)
  }

  const doAction = () =>{
    console.log('actie');
    playerDone();

    socket.emit('doneCard', room);
  }

    return (
      <div>
        {console.log(pickedCard)}
        <p className={styles.title}>Pick a card</p>
        
        {showTask ? 
        <div className={styles.taskContent}>
          <img alt="mascotte" src={mascotte_card}/>
          <p>{pickedCard.text}</p>
          <button onClick={doAction} className={styles.buttonRed}>Done</button>
        </div>
        :
        (showMouse ? <img className={styles.mouse} alt="mouse" src={mouse}/> : '')
        }
        {flipped ? <img onClick={(e)=>flipCard(e)} className={!ableFlip ? styles.card_front : styles.card_frontAni} alt="card front" src={card_front}/> :
        <div onClick={(e)=>flipCard(e)} className={styles.cardDiv}>
          <img className={!ableFlip ? styles.card_back : styles.card_backAni} src={card_back} alt="card back"/>
          <img onClick={(e)=>flipCard(e)} className={!ableFlip ? styles.card_front : styles.card_frontAni} alt="card front" src={card_front}/>
        </div>
        }
        
          {/* <img onClick={(e)=>flipCard(e)} className={!showTask ? styles.card_back : styles.card_backFlip} alt="card back" src={card_back}/> */}
        <div className={styles.pattern}></div>
      </div> 
    )
}