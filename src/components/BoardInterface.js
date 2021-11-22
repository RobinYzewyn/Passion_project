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
           <div className={styles.board}>
               <div className={styles.middleBoard}>Update</div>
               <div className={styles.corner}>Start</div>
               <div>1</div>
               <div>Kaartje</div>
               <div>2</div>
               <div>Belasting</div>
               <div>Station</div>
               <div>3</div>
               <div>Kaartje</div>
               <div>4</div>
               <div>5</div>
               <div className={styles.corner}>Gevangenis</div>
               <div>6</div>
               <div>Elektriek</div>
               <div>7</div>
               <div>8</div>
               <div>Station</div>
               <div>9</div>
               <div>Kaartje</div>
               <div>10</div>
               <div>11</div>
               <div className={styles.corner}>Rust</div>
               <div>12</div>
               <div>Kaartje</div>
               <div>13</div>
               <div>14</div>
               <div>Station</div>
               <div>15</div>
               <div>16</div>
               <div>Elektriek</div>
               <div>17</div>
               <div className={styles.corner}>Naar gevang</div>
               <div>18</div>
               <div>19</div>
               <div>Kaartje</div>
               <div>20</div>
               <div>Station</div>
               <div>Kaartje</div>
               <div>21</div>
               <div>Belasting</div>
               <div>22</div>
           </div>
       </div> 
    )
}