import { useState, useEffect } from "react"
import io from "socket.io-client";
import styles from "../styles/Board.module.css";

let socket;

export default function BoardInterface({room}){
  const CONNECTION_PORT = "localhost:3001/"
  useEffect(() => {
      socket = io(CONNECTION_PORT);
  }, [CONNECTION_PORT]);

  useEffect(()=>{
    socket.emit('create_room', room);  
  }, [])

    return (
       <div>

            <div className={styles.players}>
                <div className={styles.player_one}></div>
                <div className={styles.player_two}></div>
                <div className={styles.player_three}></div>
                <div className={styles.player_four}></div>
            </div>
           

           <div className={styles.board}>
               
               <div className={styles.middleBoard}>Update</div>

               <div className={styles.start}>Start</div>
               <div className={styles.one}>1</div>
               <div className={styles.card_one}>Kaartje</div>
               <div className={styles.two}>2</div>
               <div className={styles.tax_one}>Belasting</div>
               <div className={styles.station_one}>Station</div>
               <div className={styles.three}>3</div>
               <div className={styles.card_two}>Kaartje</div>
               <div className={styles.four}>4</div>
               <div className={styles.five}>5</div>
               <div className={styles.jail}>Gevangenis</div>
               <div className={styles.six}>6</div>
               <div className={styles.company_one}>Fitshop</div>
               <div className={styles.seven}>7</div>
               <div className={styles.eight}>8</div>
               <div className={styles.station_two}>Station</div>
               <div className={styles.nine}>9</div>
               <div className={styles.card_three}>Kaartje</div>
               <div className={styles.ten}>10</div>
               <div className={styles.eleven}>11</div>
               <div className={styles.rest}>Rust</div>
               <div className={styles.twelve}>12</div>
               <div className={styles.card_four}>Kaartje</div>
               <div className={styles.thirteen}>13</div>
               <div className={styles.fourteen}>14</div>
               <div className={styles.station_three}>Station</div>
               <div className={styles.fifteen}>15</div>
               <div className={styles.sixteen}>16</div>
               <div className={styles.company_two}>Bodyshop</div>
               <div className={styles.seventeen}>17</div>
               <div className={styles.tojail}>Naar gevang</div>
               <div className={styles.eighteen}>18</div>
               <div className={styles.nineteen}>19</div>
               <div className={styles.card_five}>Kaartje</div>
               <div className={styles.twenty}>20</div>
               <div className={styles.station_four}>Station</div>
               <div className={styles.card_six}>Kaartje</div>
               <div className={styles.twentyone}>21</div>
               <div className={styles.tax_two}>Belasting</div>
               <div className={styles.twentytwo}>22</div>
           </div>
       </div> 
    )
}