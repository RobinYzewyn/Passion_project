import { useState, useEffect } from "react"
import io from "socket.io-client";

import players_data from "./data/players.json"
import board_data from "./data/board.json";
import cards from "./data/cards.json";

import { Socket } from "socket.io-client";
import Overview from "./gamePages/Overview";

let data = players_data.roomCode;
let data_board = board_data;
let socket;
export default function Game({number, moneyX, color, room, playerAmount, pos1, pos2, pos3, pos4}){
    const CONNECTION_PORT = "localhost:3001/"
    useEffect(() => {
        socket = io(CONNECTION_PORT);
    }, [CONNECTION_PORT]);

    useEffect(()=>{
        socket.emit('create_room', room); 
        let tmp_money = moneyX;
        setmoney(tmp_money);
        setplayerData(data);
        checkWhoThrows();
        setData()
    },[])

    const setData = async () =>{
        const fet = await fetch('http://localhost:8000/data')
        const res = await fet.json();
        data = res[room].players;
        data_board = res[room].board;
    }

    useEffect(()=>{
        socket.on('receive_turnNextPlayer', (newPlayerData) =>{
            data = newPlayerData;
            setplayerData(data);
            checkWhoThrows();
            const next = async () =>{
                const fet = await fetch('http://localhost:8000/data')
                const res = await fet.json();
                if(data !==  await res[room].players){
                    data = await res[room].players;
                    console.log(data);
                    await setplayerData(data);
                    await checkWhoThrows();
                }
                
            }
            //next();
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
    const [yourTurn, setyourTurn] = useState(false);

    const [screen, setScreen] = useState('');
    const [soldProperty, setSoldProperty] = useState('');
    const [owner, setOwner] = useState('');
    const [price, setPrice] = useState(0);
    const [propertyId, setPropertyId] = useState(0);
    const [buyProperty, setBuyProperty] = useState('');
    const [cardAction, setCardAction] = useState('');

    const [playerData, setplayerData] = useState(data);

    const [showScreen, setshowScreen] = useState(false);
    const [propertyState, setpropertyState] = useState('property');
    const [propertyStatus, setpropertyStatus] = useState('available');
    const [showCard, setshowCard] = useState(false);

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
                        setthrower('You')
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
        setplayerData(data);
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
        setplayerData(data);
    }

    const rollDice = (rndNumber) =>{
        //let rndNumber = Math.floor(Math.random() * 6)+1;
        setdiceNumber(rndNumber);
        updatePosition(rndNumber);
        updateThrower()

        let info = {
            room: room,
            players_info: data
        }
        socket.emit('player_roll', info);
        setplayerData(data);
    }
    const updatePosition = (numberX) =>{
        let tmp = yourPosition + numberX;
        if(tmp > 28){
            tmp = tmp - 29;
            //Geld geven
            let indexCurrentKey = Object.keys(data)[number]
            let you = data[indexCurrentKey];
            let tmp_money = money + 200
            setmoney(tmp_money);
            you.money += 200;
        }
        setyourPosition(tmp);
        checkPosition(tmp);
        setplayerData(data);
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
        setplayerData(data);
    }

    const toJail = () =>{
        setyourPosition(10)
        setplayerData(data);
    }

    const checkPosition = (position) =>{
        let dataBoard = data_board[position];
        let players = data;
        console.log(dataBoard);
        console.log(position);
        console.log(data_board);

        setshowScreen(true);

        switch (dataBoard.type) {
            case "start":
                //setaction('start');
                setScreen('start')
                setpropertyState('start');
                break;
            case "property":
                //Property informatie
                for (const key in players){
                    let player_properties = players[key].property;
                    if(player_properties.indexOf(position) !== -1){
                        let yourName = 'Player' + number.toString();
                        if(yourName !== key){
                            //setaction(`${board_data.board[position].details.name} is verkocht, betaal ${key} ${board_data.board[position].details.rental_price} euro`);
                            setScreen('soldProperty');
                            setpropertyState('property');
                            setpropertyStatus('sold')
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
                //setaction(`property`);
                setScreen('buyProperty');
                setpropertyStatus('available')
                setpropertyState('property');
                setPrice(board_data.board[position].details.price); 
                setPropertyId(board_data.board[position].id);
                setBuyProperty(board_data.board[position].details.name);
                return;

            case "tax":
                //Tax betalen
                //setaction(`tax`);
                //setaction(`Taxes! Je moet ${dataBoard.details.price} betalen`);
                setScreen('tax'); setPrice(dataBoard.details.price);
                setpropertyState('tax');
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
                            //setaction('station');
                            setScreen('soldStation');
                            setpropertyStatus('sold')
                            setpropertyState('property');
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
                //setaction(`station`);
                setScreen('buyStation');
                setpropertyStatus('available')
                setpropertyState('property');
                setPrice(board_data.board[position].details.price); 
                setPropertyId(board_data.board[position].id);
                setBuyProperty(board_data.board[position].details.name);
                return;
            case "card":
                //Kaart tonen
                let randomNumber = Math.floor(Math.random() * cards.cards.length);
                let card = cards.cards[randomNumber];
                //TODO: opdracht tonen
                //setaction(`kaartje`);  
                setScreen('card');
                setpropertyState('card');
                setCardAction(card.text);
                setshowCard(true);
                break;
            case "jail":
                //Niks
                //setaction('gevang');
                setScreen('jail_visit')
                setpropertyState('jail');
                break;
            case "company":
                //Company informatie
                for (const key in players){
                    let player_properties = players[key].property;
                    if(player_properties.indexOf(position) !== -1){
                        let yourName = 'Player' + number.toString();
                        if(yourName !== key){
                            //setaction('bedrijf');
                            setScreen('soldCompany');
                            setpropertyStatus('sold')
                            setpropertyState('property');
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
                //setaction(`company`);
                setScreen('buyCompany');
                setpropertyStatus('available')
                setpropertyState('property');
                setPrice(board_data.board[position].details.price); 
                setPropertyId(board_data.board[position].id);
                setBuyProperty(board_data.board[position].details.name);
                return;
            case "rest":
                //Niks
                //setaction('rust');
                setScreen('rust');
                setpropertyState('rest');
                break;
            case "to_jail":
                //Beurt overslaan, naar gevang
                //TODO: beurt over slaan
                passNextThrow();
                toJail();
                //setaction(`naar gevang`); 
                setScreen('toJail');
                setpropertyState('to_jail');
                break;
            default:
                break;
        }

    }

    const playerDone = async () => {
        setyourTurn(false);
        checkWhoThrows();
        let info = {
            room: room,
            player_data: data,
        }
        console.log(data);
        setplayerData(data);
        socket.emit('turnNextPlayer', info);
        
        const fet = await fetch('http://localhost:8000/data');
    	let dataX = await fet.json()	
        let board = data_board;
        let players = data;
    	dataX[room] = {board, players};
    	const fet2 = await fetch('http://localhost:8000/data', {
    	    method: 'POST',
    	    headers: {
    	        'Content-Type': 'application/json',
    	    },
    	    body: JSON.stringify(dataX),
    	})
    	const res2 = await fet2.json();

        setScreen(''); setSoldProperty(''); setOwner(''); setPrice(0); setPropertyId(0); setBuyProperty(''); setCardAction(''); setshowScreen(false);
        setpropertyState('');
    }

    const payPlayer = () =>{
        //Min geld van jezelf
        console.log(data);
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

    const getRolledNumber = (val) =>{
        //console.log(val);
        rollDice(val);
    }

    return (
       <div>
           {/* 
           PROPERTY
            - price
            - owner
           screen:
           - property ---- propertyStatus (available | sold)
           - start
           - tax
           - card
           - nothing
           - to_jail

            - soldProperty
            - buyProperty

            - playerDone (volgende, niks)
            - payPlayer
            - payProperty
            - payTaxes 
             
            */}
            <Overview pos1={pos1} pos2={pos2} pos3={pos3} pos4={pos4} showCard={showCard} payPlayer={payPlayer} payProperty={payProperty} payTaxes={payTaxes} playerDone={playerDone} soldProperty={soldProperty} buyProperty={buyProperty} propertyStatus={propertyStatus} price={price} owner={owner} propertyState={propertyState} showScreen={showScreen} rolledNumber={(val)=>getRolledNumber(val)} showDice={showDice} playerAmount={playerAmount} playerData={playerData} room={room} number={number} money={money} color={color} position={yourPosition} thrower={thrower} properties={properties}/>
            
       </div> 
    )
}