import QRCode from "./QRCodePage";
import QRCamera from "./QRCamera";
import { useState } from "react";

export default function Homepage() {
    const [page, setPage] = useState('');

    return (
    <div>
        {page === '' ? 
        <div>
            <button onClick={() => setPage('create')}>Create game</button>
            <button onClick={() => setPage('join')}>Join game</button>
        </div> 
        : 
        <div>
            <button onClick={() => setPage('')}>Go back</button>
            {
            page === 'create' ? <QRCode /> : (
            page === 'join' ? <QRCamera /> : 
            '')}  
        </div>
        }
    </div>
    )
}