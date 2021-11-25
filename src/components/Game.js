import { useState, useEffect } from "react"
import io from "socket.io-client";
import players_data from "./data/players.json"
import board_data from "./data/board.json";
import cards from "./data/cards.json";
import { Socket } from "socket.io-client";

let data = players_data.roomCode;
let socket;
export default function Game({number, moneyX, color, room, playerAmount}){
    const CONNECTION_PORT = "localhost:3001/"
    useEffect(() => {
        socket = io(CONNECTION_PORT);
    }, [CONNECTION_PORT]);

    useEffect(()=>{
        socket.emit('create_room', room); 
        let tmp_money = moneyX;
        setmoney(tmp_money);

        checkWhoThrows();
    },[])

    useEffect(()=>{
        socket.on('receive_turnNextPlayer', (newPlayerData) =>{
            console.log('Volgende speler');
            data = newPlayerData;
            checkWhoThrows();
        })

        socket.on('receive_payPlayer', (data)=>{
            let yourName = 'Player' + number.toString()
            if(yourName === data.name){
                let tmp_money = money+data.amount;
                setmoney(tmp_money);
            }
        })
    })

    const [money, setmoney] = useState(0);
    const [properties, setproperties] = useState([]);

    const [showDice, setshowDice] = useState(false);
    const [diceNumber, setdiceNumber] = useState(1);
    const [yourPosition, setyourPosition] = useState(0);

    const [thrower, setthrower] = useState('');
    const [action, setaction] = useState('');
    const [yourTurn, setyourTurn] = useState(false);

    const [screen, setScreen] = useState('');
    const [soldProperty, setSoldProperty] = useState('');
    const [owner, setOwner] = useState('');
    const [price, setPrice] = useState(0);
    const [propertyId, setPropertyId] = useState(0);
    const [buyProperty, setBuyProperty] = useState('');
    const [cardAction, setCardAction] = useState('');

    const checkWhoThrows = () =>{
        for (let i = 0; i < playerAmount-1; i++) {
            let index = Object.keys(data)[i]
            if(data[index].throw){
                if(data[index].skip_throw){
                    let indexYou = Object.keys(data)[number]
                    let you = data[indexYou];
                    if(you === index){
                        you.skip_throw = false;
                    }

                    console.log(`${index} moet een beurt overslaan`);
                    data[index].skip_throw = false;
                    data[index].throw = false;

                    let indexCurrentKey = Object.keys(data).indexOf(index);
                    let indexNextKey = indexCurrentKey + 1;
                    if(indexNextKey === playerAmount-1){
                        indexNextKey = 0
                    }
                    let nextPlayerName = Object.keys(data)[indexNextKey]
                    let nextPlayer = data[nextPlayerName];
                    if(nextPlayer.skip_throw){
                        console.log(nextPlayerName + ' moet ook overslaan');
                        nextPlayer.skip_throw = false;
                    }
                    else {
                        console.log(nextPlayerName + ' mag gooien');
                        data[nextPlayerName].throw = true;
                        //Geef worp aan speler
                        playerDone();
                        return;
                    }
                    
                    if(indexNextKey === playerAmount-1){
                        indexNextKey = 0
                    }
                    else {
                        indexNextKey++;
                    }
                    let nextnextPlayerName = Object.keys(data)[indexNextKey]
                    let nextnextPlayer = data[nextnextPlayerName];
                    if(nextnextPlayer.skip_throw){
                        console.log(nextnextPlayerName + ' moet ook overslaan');
                        nextnextPlayer.skip_throw = false;
                    }
                    else {
                        console.log(nextnextPlayerName + ' mag gooien');
                        data[nextnextPlayerName].throw = true;
                        //Geef worp aan speler
                        playerDone();
                        return;
                    }
                }
                else{
                    if(data[index].number === number){
                        setthrower('jij')
                        setshowDice(true);
                        setyourTurn(true);
                    }
                    else {
                        setthrower(index)
                        return;
                    }
                }
            }
        }
    }
    const updateThrower = () =>{
        //Jouw beurt weg
        let indexCurrentKey = Object.keys(data)[number]
        let you = data[indexCurrentKey]
        you.throw = false;
        
        //Volgende speler aan de beurt
        let nextPlayerIndex = number+1

        if (number === playerAmount-2){
            nextPlayerIndex = 0
        }
        let indexNextKey = Object.keys(data)[nextPlayerIndex]
        let next = data[indexNextKey]
        next.throw = true;

        setshowDice(false);
    }
    const rollDice = () =>{
        console.log(data);

        let rndNumber = Math.floor(Math.random() * 6)+1;
        setdiceNumber(rndNumber);
        updatePosition(rndNumber);
        updateThrower()

        let info = {
            room: room,
            data_info: data,
            players_info: players_data
        }
        socket.emit('player_roll', info);
    }
    const updatePosition = (numberX) =>{
        let tmp = yourPosition + numberX;
        if(tmp > 39){
            tmp = tmp - 40;
            //Geld geven
            let indexCurrentKey = Object.keys(data)[number]
            let you = data[indexCurrentKey];
            let tmp_money = money + 200
            setmoney(tmp_money);
            you.money += 200;
        }
        setyourPosition(tmp);
        checkPosition(tmp);
    }

    const amountStation = (name) =>{
        let player_properties = data[name].property;
        let amount = 0;
        for (let i = 0; i < player_properties.length; i++) {
            if(player_properties[i] === 5 || player_properties[i] === 15 || player_properties[i] === 25 || player_properties[i] === 35){
                amount++;
            }
        }
        return amount;
    }

    const passNextThrow = () =>{
        let indexCurrentKey = Object.keys(data)[number]
        let you = data[indexCurrentKey];
        you.skip_throw = true;
    }

    const toJail = () =>{
        setyourPosition(10)
    }

    const checkPosition = (position) =>{
        let dataBoard = board_data.board[position];
        let players = data;
        switch (dataBoard.type) {
            case "start":
                setaction('start');
                setScreen('start')
                break;
            case "property":
                //Property informatie
                for (const key in players){
                    let player_properties = players[key].property;
                    if(player_properties.indexOf(position) !== -1){
                        let yourName = 'Player' + number.toString();
                        if(yourName !== key){
                            setaction(`${board_data.board[position].details.name} is verkocht, betaal ${key} ${board_data.board[position].details.rental_price} euro`);
                            setScreen('soldProperty');
                            setOwner(key); setSoldProperty(board_data.board[position].details.name); setPrice(board_data.board[position].details.rental_price);
                            return;
                        }
                        else{
                            console.log('Property is van jou');
                        }
                        return;
                    }
                }
                
                //Nog niet verkocht, kopen of niet?
                setaction(`property`);
                setScreen('buyProperty');
                setPrice(board_data.board[position].details.price); 
                setPropertyId(board_data.board[position].id);
                setBuyProperty(board_data.board[position].details.name);
                return;

            case "tax":
                //Tax betalen
                setaction(`tax`);
                setaction(`Taxes! Je moet ${dataBoard.details.price} betalen`);
                setScreen('tax'); setPrice(dataBoard.details.price);
                return;     
            case "station":
                //Station informatie
                for (const key in players){
                    let player_properties = players[key].property;
                    if(player_properties.indexOf(position) !== -1){
                        let yourName = 'Player' + number.toString();
                        if(yourName !== key){
                            let tmp_price = amountStation*diceNumber;
                            setPrice(tmp_price);
                            setaction('station');
                            setScreen('soldStation');
                            setOwner(key); setSoldProperty(board_data.board[position].details.name);
                            return;
                        }
                        else{
                            console.log('Station is van jou');
                        }
                        return;
                    }
                }
                
                //Nog niet verkocht, kopen of niet?
                setaction(`station`);
                setScreen('buyStation');
                setPrice(board_data.board[position].details.price); 
                setPropertyId(board_data.board[position].id);
                setBuyProperty(board_data.board[position].details.name);
                return;
            case "card":
                //Kaart tonen
                let randomNumber = Math.floor(Math.random() * cards.cards.length);
                let card = cards.cards[randomNumber];
                //TODO: opdracht tonen
                setaction(`kaartje`);  
                setScreen('card');
                setCardAction(card.text);
                break;
            case "jail":
                //Niks
                setaction('gevang');
                setScreen('jail_visit')
                break;
            case "company":
                //Company informatie
                for (const key in players){
                    let player_properties = players[key].property;
                    if(player_properties.indexOf(position) !== -1){
                        let yourName = 'Player' + number.toString();
                        if(yourName !== key){
                            setaction('bedrijf');
                            setScreen('soldCompany');
                            setOwner(key); setSoldProperty(board_data.board[position].details.name); setPrice(board_data.board[position].details.rental_price);
                            return;
                        }
                        else{
                            console.log('Company is van jou');
                        }
                        return;
                    }
                }
                
                //Nog niet verkocht, kopen of niet?
                setaction(`company`);
                setScreen('buyCompany');
                setPrice(board_data.board[position].details.price); 
                setPropertyId(board_data.board[position].id);
                setBuyProperty(board_data.board[position].details.name);
                return;
            case "rest":
                //Niks
                setaction('rust');
                setScreen('rust');
                break;
            case "to_jail":
                //Beurt overslaan, naar gevang
                //TODO: beurt over slaan
                passNextThrow();
                toJail();
                setaction(`naar gevang`); 
                setScreen('toJail');
                break;
            default:
                break;
        }
    }

    const playerDone = () =>{
        setyourTurn(false);
        checkWhoThrows();
        let info = {
            room: room,
            player_data: data,
        }
        socket.emit('turnNextPlayer', info);
        setScreen(''); setSoldProperty(''); setOwner(''); setPrice(0); setPropertyId(0); setBuyProperty(''); setCardAction('');
    }

    const payPlayer = () =>{
        //Min geld van jezelf
        let tmp_money = money-price
        setmoney(tmp_money);
        let indexCurrentKey = Object.keys(data)[number]
        let you = data[indexCurrentKey]
        you.money = tmp_money;

        //Plus geld van ander
        //Socket naar ander 
        data[owner].money = data[owner].money + price;
        let info = {
            room: room,
            details: {
                name: owner,
                amount: price
            } 
        }
        socket.emit('pay_player', info)

        //Player done
        playerDone();
    }

    const payTaxes = () =>{
        let tmp_money = money-price;
        setmoney(tmp_money);
        let indexCurrentKey = Object.keys(data)[number]
        let you = data[indexCurrentKey]
        you.money = tmp_money;

        playerDone();
    }

    const payProperty = () =>{
        let indexCurrentKey = Object.keys(data)[number]
        let you = data[indexCurrentKey]

        let tmp_money = money-price;
        setmoney(tmp_money);
        you.money = tmp_money;
        
        let tmp_properties = [...properties, propertyId];
        setproperties(tmp_properties);
        you.property = tmp_properties;

        playerDone();
    }

    return (
       <div>
            <div>
                <p>Your number: {number}</p>
                <p>Your money: {money}</p>
                <p>Your color: {color}</p>
                <p>Your position: {yourPosition}</p>
                <p>Aan de beurt: {thrower}</p>
                <p>Your properties: {properties.map((item)=>{return item + ', '})}</p>
            </div> 
            {showDice ? 
            <div>
                <button onClick={rollDice}>{diceNumber}</button>
            </div> : (yourTurn ? 
            <div>
                <p>You rolled: {diceNumber}</p>
                
                <p>Actie: {action}</p>
                {
                screen === 'start' ?
                <div>
                    <p>Je komt op start! Ontvang 200 euro.</p>
                    <button onClick={playerDone}>Next</button>
                </div>
                :
                screen === 'soldProperty' ? 
                <div>
                    <p>Je kwam op {soldProperty}! Betaal {owner} {price} euro huur</p>
                    <button onClick={payPlayer}>Betaal {price} euro</button>
                </div> 
                :
                screen === 'buyProperty' ?
                <div>
                    <p>Je kwam op {buyProperty}. Je kan het kopen voor {price} euro.</p>
                    <button onClick={payProperty}>Koop voor {price} euro</button>
                    <button onClick={playerDone}>Niet kopen</button>
                </div> 
                : 
                screen === 'tax' ? 
                <div>
                    <button onClick={payTaxes}>Betaal belastingen</button>
                </div>
                :
                screen === 'soldStation' ?
                <div>
                    <p>Je kwam op {soldProperty}. Betaal {owner} {price} euro voor het gebruik van de fitness</p>
                    <button onClick={payPlayer}>Betaal {price} euro</button>
                </div>
                :
                screen === 'buyStation' ?
                <div>
                    <p>Je kwam op {buyProperty} fitness. Je kan het kopen voor {price} euro.</p>
                    <button onClick={payProperty}>Koop voor {price} euro</button>
                    <button onClick={playerDone}>Niet kopen</button>
                </div> 
                : 
                screen === 'card' ? 
                <div>
                    <p>{cardAction}</p>
                    <button onClick={playerDone}>Done</button>
                </div>
                :
                screen === 'jail_visit' ?
                <div>
                    <p>Op bezoek in de gevangenis. Niks aan de hand</p>
                    <button onClick={playerDone}>Next</button>
                </div>
                :
                screen === 'nothing' ? 
                <div>
                    <button onClick={playerDone}>Next</button>
                </div>
                :
                screen === 'soldCompany' ?
                <div>
                    <p>Je kwam op {soldProperty}! Je betaal 10 maal je laatste worp aan {owner}</p>
                    <button onClick={payPlayer}>Betaal {price} euro</button>
                </div>
                :
                screen === 'buyCompany' ? 
                <div>
                    <p>Je kwam op {buyProperty} bedrijf. Je kan het kopen voor {price} euro.</p>
                    <button onClick={payProperty}>Koop voor {price} euro</button>
                    <button onClick={playerDone}>Niet kopen</button>
                </div>
                :
                screen === 'rust' ?
                <div>
                    <p>Je mag even rusten, niks aan de hand. Er gebeurt niks.</p>
                    <button onClick={playerDone}>Next</button>
                </div>
                :
                screen === 'toJail' ?
                <div>
                    <p>Foei! Ga naar het gevangenis. U ontvangt geen 200 euro</p>
                    <button onClick={playerDone}>Next</button>
                </div> 
                : ''
                }
            </div> : '')}
            
       </div> 
    )
}