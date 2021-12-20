import QRCode from "./QRCodePage";
import QRCamera from "./QRCamera";
import { useState, useEffect } from "react";
import styles from "./homepage.module.css";
import mascotte_homepage from "../assets/mascotte_homepage.svg"

export default function Homepage() {
    const [page, setPage] = useState('');

    const [screenwidth, setscreenwidth] = useState(0);
    useEffect(()=>{
        function getWindowDimensions() {
            const { innerWidth: width, innerHeight: height } = window;
            return {
                width,
            };
        }
        let width = getWindowDimensions();
        setscreenwidth(width.width);
    }, [])

    return (
    <div>
        {page === '' ? 
        <div className={styles.pageHome}>
            {screenwidth > 999 ? 
            <div className={styles.containerHome}>
                <img src={mascotte_homepage} alt="mascotte"/>
                <p>Fitopoly</p>
                <p>Welcome to Fitopoly! The nicest and sportiest version of Monopoly!</p>
                <button onClick={() => setPage('create')}>Create game</button>
            </div> 
            : 
            <div className={styles.containerHome}>
                <img src={mascotte_homepage} alt="mascotte"/>
                <p>Fitopoly</p>
                <p>Welcome to Fitopoly! The nicest and sportiest version of Monopoly!</p>
                <button onClick={() => setPage('join')}>Join game</button>
            </div>
            }
        </div> 
        : 
        <div>
            {
            page === 'create' ? <div><QRCode /></div> : (
            page === 'join' ? <div><QRCamera /></div> : 
            '')}  
        </div>
        }
    </div>
    )
}