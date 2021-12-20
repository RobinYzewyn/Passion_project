import { useState, useEffect } from "react"
import styles from "./property.module.css"
import mascotte from "../../assets/mascotte_normal.svg";
import mascotte_jail from "../../assets/mascotte_jail.svg";
import pushup from "../../assets/push-up.svg";
import taxes_bag from "../../assets/taxes_icon.svg";
import stopwatch from "../../assets/stopwatch.svg";
import Card from "./Card";

let seconds = 10;
let interval;
export default function Property({payPlayer, payProperty, payTaxes, playerDone, buyProperty, soldProperty, price, owner, propertyState, propertyStatus}){
  //const [propertyStatus, setpropertyStatus] = useState('available');
  //const [propertyState, setpropertyState] = useState('jail');
//payPlayer={payPlayer} payProperty={payProperty} payTaxes={payTaxes} playerDone={playerDone}
    const [jail_seconds, setjail_seconds] = useState(10);
    useEffect(()=>{
        if(propertyState === 'to_jail'){
            const countdown = () =>{
                seconds--;        
                if(seconds <= 0){
                    clearInterval(interval);
                    playerDone()
                }
                else{
                    setjail_seconds(seconds);
                }
            }
            interval = setInterval(countdown, 1000);
        }
    }, [propertyState])
    return (
        <div>
            {propertyState === 'property' ? 
            <div>
                <img className={styles.mascotte} alt="mascotte" src={mascotte}/>
                <p className={styles.title}>{propertyStatus === 'available' ? "Lucky you! It's not sold" : "Aw! It’s sold"}</p>
                <div className={styles.container}>
                    <div className={styles.container_top}>
                        <div className={propertyStatus === 'available' ? styles.container_flagAvailable : propertyStatus === 'sold' ? styles.container_flagSold : styles.container_flagYours}>
                            <p>{propertyStatus === 'available' ? "Available" : propertyStatus === 'sold' ? "Sold" : "Yours"}</p>
                        </div>
                        <div>
                            <img alt="exercise" src={pushup}/>
                            <p className={styles.subtitle}>{buyProperty !== '' ? buyProperty : soldProperty}</p>
                        </div>
                        <div></div>
                    </div>
                    
                    {propertyStatus === 'available' ? <p className={styles.description}>You landed on the {buyProperty !== '' ? buyProperty : soldProperty}! This one has not yet been sold. Want to buy this one for ${price}?</p> : <p className={styles.description}>You landed on the {buyProperty !== '' ? buyProperty : soldProperty}! This is owned by {owner}. Pay ${price} rent.</p>}
                    {propertyStatus === 'available' ? <div>
                    <button onClick={playerDone} className={styles.buttonDecline}>No thanks</button>
                    <button onClick={payProperty} className={styles.buttonBuy}>Buy for ${price}</button></div>
                    : 
                    propertyStatus === 'sold' ?
                    <button onClick={payPlayer} className={styles.buttonPay}>Pay {owner} ${price}</button>
                    :
                    <button onClick={playerDone}>Next, its mine</button>
                    }
                </div>
            </div>
            : 
            propertyState === 'tax' ?
            <div>
                <img className={styles.mascotte} alt="mascotte" src={mascotte}/>
                <p className={styles.title}>Pay your taxes!</p>
                <div className={styles.container}>
                    <div className={styles.container_top}>
                        <div>
                            <img className={styles.tax_icon} alt="exercise" src={taxes_bag}/>
                        </div>
                    </div>
                    
                    <p className={styles.description}>You landed on the taxes! Pay ${price} taxes</p>
                    <button onClick={payTaxes} className={styles.buttonDecline}>Pay ${price} taxes</button>
                </div>
            </div>
            : 
            propertyState === 'to_jail' ?
            <div>
                <img className={styles.mascotte} alt="mascotte" src={mascotte_jail}/>
                <p className={styles.title}>Go to the jail!</p>
                <div className={styles.stopwatch_container}>
                    <p className={styles.stopwatch_text}>You have {jail_seconds} seconds to move your pawn.</p>
                    <img className={styles.stopwatch_image} alt="stopwatch" src={stopwatch}/>
                </div>
            </div>
            :
            propertyState === 'start' ?
            <div>
                <img className={styles.mascotte} alt="mascotte" src={mascotte}/>
                <p className={styles.title}>Passed start!</p>
                <div className={styles.container}>
                    <div className={styles.container_top}>
                        <div>
                            <img className={styles.tax_icon} alt="exercise" src={taxes_bag}/>
                        </div>
                    </div>
                    
                    <p className={styles.description}>You landed on the start! You receive $200</p>
                    <button onClick={playerDone} className={styles.buttonBuy}>Collect $200</button>
                </div>
            </div>
            :
            propertyState === 'jail' ?
            <div>
                <img className={styles.mascotte} alt="mascotte" src={mascotte}/>
                <p className={styles.title}>Jail visit!</p>
                <div className={styles.container}>
                    <div className={styles.container_top}>
                        <div>
                            <img className={styles.tax_icon} alt="exercise" src={taxes_bag}/>
                        </div>
                    </div>
                    
                    <p className={styles.description}>You are visiting the jail. No stress!</p>
                    <button onClick={playerDone} className={styles.buttonBuy}>Done</button>
                </div>
            </div>
            :
            propertyState === 'rest' ?
            <div>
                <img className={styles.mascotte} alt="mascotte" src={mascotte}/>
                <p className={styles.title}>Rest!</p>
                <div className={styles.container}>
                    <div className={styles.container_top}>
                        <div>
                            <img className={styles.tax_icon} alt="exercise" src={taxes_bag}/>
                        </div>
                    </div>
                    
                    <p className={styles.description}>Finally some rest, you can chill.</p>
                    <button onClick={playerDone} className={styles.buttonBuy}>Done</button>
                </div>
            </div>
            :
            <div>
                <Card playerDone={playerDone}/>
            </div>
            }
            <div className={styles.pattern}></div>
        </div> 
    )
}