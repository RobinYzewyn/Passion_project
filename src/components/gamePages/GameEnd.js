import { useState, useEffect } from "react";
import boardJson from "../data/board.json";
import overview_bluePlayer_icon from "../../assets/overview_bluePlayer_icon.svg";
import first_icon from "../../assets/overview_first.svg";
import second_icon from "../../assets/overview_second.svg";
import third_icon from "../../assets/overview_third.svg";
import fourth_icon from "../../assets/overview_fourth.svg";

import pushup_mini from "../../assets/pushup_mini.svg";
import card_mini from "../../assets/card_mini.svg";

import styles from "./gamehome.module.css"
let board = boardJson.board;
export default function GameHome({playerAmount, playerData, thrower, money, color, number, properties}){

    const [leaderBoard, setleaderBoard] = useState([]);

    // useEffect(()=>{
    //     for (let i = 0; i < properties.length; i++) {
    //         let property = properties[i]
    //         console.log(board);
    //         console.log(board.board[property])
    //     }
    // }, [properties])

    useEffect(()=>{
        const updateMoney = () => {
            let sortable = [];
            for (let i = 0; i < playerAmount-1; i++) {
                sortable.push(['Player'+i.toString(), playerData['Player'+i.toString()].money]);
            }

            // for (const player in playerData) {
            //     sortable.push([player, playerData[player].money]);
            // }
            sortable.sort(function(a, b) {
                return a[1] - b[1];
            });
            setleaderBoard(sortable.reverse());
        }
        updateMoney();
    }, [playerData])

    const refreshPage = () =>{
        window.location.reload();
    }

    return (
       <div>
            <p className={styles.title}>Game done!</p>
            <div className={styles.container}>
                <p className={styles.container_title}>Leaderboard</p>
                {playerAmount-2 > 0 && leaderBoard[0] ?
                <div className={styles.leaderboard_player}>
                        <div className={styles.leaderboard_player_left}>
                            <img alt="player icon" src={first_icon}/>
                            <p className={styles.leaderboard_player_name}><strong>{leaderBoard[0][0]}</strong></p>
                        </div>
                        <p className={styles.leaderboard_player_money}><strong>${leaderBoard[0][1]}</strong></p>
                </div>
                : ''
                }
                {playerAmount-2 > 0 && leaderBoard[1] ?
                <div className={styles.leaderboard_player}>
                        <div className={styles.leaderboard_player_left}>
                            <img alt="player icon" src={second_icon}/>
                            <p className={styles.leaderboard_player_name}>{leaderBoard[1][0]}</p>
                        </div>
                        <p className={styles.leaderboard_player_money}>${leaderBoard[1][1]}</p>
                </div>
                : ''
                }
                {playerAmount-2 > 1 && leaderBoard[2] ?
                <div className={styles.leaderboard_player}>
                        <div className={styles.leaderboard_player_left}>
                            <img alt="player icon" src={third_icon}/>
                            <p className={styles.leaderboard_player_name}>{leaderBoard[2][0]}</p>
                        </div>
                        <p className={styles.leaderboard_player_money}>${leaderBoard[2][1]}</p>
                </div>
                : ''
                }
                {playerAmount-2 > 2 && leaderBoard[3] ?
                <div className={styles.leaderboard_player}>
                        <div className={styles.leaderboard_player_left}>
                            <img alt="player icon" src={fourth_icon}/>
                            <p className={styles.leaderboard_player_name}>{leaderBoard[3][0]}</p>
                        </div>
                        <p className={styles.leaderboard_player_money}>${leaderBoard[3][1]}</p>
                </div>
                : ''
                }   
            </div>
            <button onClick={refreshPage}>To homepage</button>
        </div> 
    )
}