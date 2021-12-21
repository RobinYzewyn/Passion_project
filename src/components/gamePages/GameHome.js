import { useState, useEffect } from "react";
import boardJson from "../data/board.json";
import overview_bluePlayer_icon from "../../assets/overview_bluePlayer_icon.svg";
import first_icon from "../../assets/overview_first.svg";
import second_icon from "../../assets/overview_second.svg";
import third_icon from "../../assets/overview_third.svg";
import fourth_icon from "../../assets/overview_fourth.svg";

import pushup_mini from "../../assets/pushup_mini.svg";
import card_mini from "../../assets/card_mini.svg";

import player_red_icon from "../../assets/player_red_icon.svg";
import player_blue_icon from "../../assets/player_blue_icon.svg";
import player_green_icon from "../../assets/player_green_icon.svg";
import player_yellow_icon from "../../assets/player_yellow_icon.svg";

import styles from "./gamehome.module.css"
let board = boardJson.board;
export default function GameHome({playerAmount, playerData, thrower, money, color, number, properties, pos1, pos2, pos3, pos4}){

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

        console.log(playerData);
    }, [playerData])

    return (
       <div>
            <p className={styles.title}>Overview</p>
            <div className={styles.info_container}>
                    <img alt="player icon" src={overview_bluePlayer_icon}/>
                    <p>{thrower} is currently playing. Please wait a moment</p>
            </div>
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
            <div className={styles.overview_bottom}>
                <div className={styles.container}>
                    <p className={styles.container_title}>Properties</p>
                    {properties.map((item, index)=>{return <div key={index} className={styles.property}>
                        <img alt="exercise" src={pushup_mini}/>
                        <p>{board[item].details.name}</p>
                    </div>})}
                    {properties.length > 5 ? <button className={styles.button_viewproperty}>View all</button> : ''}
                </div>

                <div className={styles.container}>
                    <p className={styles.container_title}>Positions</p>
                    {playerAmount-1 > 0 ? 
                    <div className={styles.card}>
                        <img alt="exercise" src={player_red_icon}/>
                        <p>Empty{pos1}</p>
                    </div> : ''}

                    {playerAmount-1 > 1 ?
                    <div className={styles.card}>
                        <img alt="exercise" src={player_blue_icon}/>
                        <p>Empty{pos2}</p>
                    </div> : ''}
                    
                    {playerAmount-1 > 2 ?
                    <div className={styles.card}>
                        <img alt="exercise" src={player_green_icon}/>
                        <p>Empty{pos3}</p>
                    </div> : ''}

                    {playerAmount-1 > 3 ?
                    <div className={styles.card}>
                        <img alt="exercise" src={player_yellow_icon}/>
                        <p>Empty{pos4}</p>
                    </div> : ''}
                </div>
            </div>
        </div> 
    )
}