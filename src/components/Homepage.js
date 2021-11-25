import QRCode from "./QRCodePage";
import QRCamera from "./QRCamera";
import { useState, useEffect } from "react";

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
            {
            page === 'create' ? <div><QRCode /></div> : (
            page === 'join' ? <div><QRCamera /></div> : 
            '')}  
        </div>
        }
    </div>
    )
}