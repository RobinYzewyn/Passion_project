import stylesDesign from "../styles/BoardDesign.module.css";
import kettlebell from "../assets/kettlebell.svg"
import moneybag from "../assets/moneybag.svg";
import station from "../assets/station.svg";
import board_start from "../assets/board_start.svg";
import board_tojail from "../assets/board_tojail.svg";
import board_jail from "../assets/jail.svg";
import board_bed from "../assets/board_bed.svg";

export default function BoardDesign(){
    return (
       <div className={stylesDesign.board}>
           <div className={stylesDesign.middle}></div>
           <div className={stylesDesign.zero}><img src={board_start} alt="start"/></div>
           <div className={stylesDesign.one}><section><p>$60</p><p>Pull-up</p></section><div></div></div>
           <div className={stylesDesign.two}><img className={stylesDesign.kettlebellTop} alt="card" src={kettlebell}/></div>
           <div className={stylesDesign.three}><section><p>$60</p><p>Push-up</p></section><div></div></div>
           <div className={stylesDesign.four}><section><p>$100</p><p>Lat pulldown</p></section><div></div></div>
           <div className={stylesDesign.five}><img className={stylesDesign.stationTop} src={station} alt="station"/></div>
           <div className={stylesDesign.six}><p>$200</p><p>Taxes</p><img className={stylesDesign.moneybagTop} src={moneybag} alt="money bag"/></div>
           <div className={stylesDesign.seven}><section><p>$100</p><p>Cable row</p></section><div></div></div>
           <div className={stylesDesign.eight}><section><p>$100</p><p>Bent over row</p></section><div></div></div>
           <div className={stylesDesign.nine}><img className={stylesDesign.jail} src={board_jail} alt="jail"/></div>
           <div className={stylesDesign.ten}><div></div><section><p>Skullcrusher</p><p>$140</p></section></div>
           <div className={stylesDesign.eleven}><div></div><section><p>Rope pushdown</p><p>$140</p></section></div>
           <div className={stylesDesign.twelve}><img className={stylesDesign.kettlebellRight} alt="card" src={kettlebell}/></div>
           <div className={stylesDesign.thirteen}><div></div><section><p>Tricep dips</p><p>$160</p></section></div>
           <div className={stylesDesign.fourteen}><img src={board_bed} alt="bed"/></div>
           <div className={stylesDesign.fifteen}><div></div><section><p>Lateral raise</p><p>$180</p></section></div>
           <div className={stylesDesign.sixteen}><div></div><section><p>Shoulder press</p><p>$180</p></section></div>
           <div className={stylesDesign.seventeen}><img className={stylesDesign.kettlebellBottom} alt="card" src={kettlebell}/></div>
           <div className={stylesDesign.eightteen}><div></div><section><p>Upright row</p><p>$200</p></section></div>
           <div className={stylesDesign.nineteen}><img className={stylesDesign.stationBottom} src={station} alt="station"/></div>
           <div className={stylesDesign.twenty}><div></div><section><p>Hammer curl</p><p>$220</p></section></div>
           <div className={stylesDesign.twentyone}><img className={stylesDesign.moneybagBottom} src={moneybag} alt="money bag"/><p>Taxes</p><p>$200</p></div>
           <div className={stylesDesign.twentytwo}><div></div><section><p>Reverse curl</p><p>$220</p></section></div>
           <div className={stylesDesign.twentythree}><img src={board_tojail} alt="to jail"/></div>
           <div className={stylesDesign.twentyfour}><section><p>Squat</p><p>$240</p></section><div></div></div>
           <div className={stylesDesign.twentyfive}><section><p>Leg curl</p><p>$260</p></section><div></div></div>
           <div className={stylesDesign.twentysix}><img className={stylesDesign.kettlebellLeft} alt="card" src={kettlebell}/></div>
           <div className={stylesDesign.twentyseven}><section><p>Hip thrust</p><p>$260</p></section><div></div></div>

       </div> 
    )
}