import { useRef, useCallback } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { GrPowerReset } from "react-icons/gr";
// import { WiMoonAltThirdQuarter } from "react-icons/wi"
import { /*RiTranslate,*/ RiArrowGoBackFill } from "react-icons/ri"

import Dpk from './img/pokeball.png';
import Lpk from './img/pokeball.png';
import Dark from "./img/dark.png";
import Light from "./img/light.png";
import ÜbersetzungsPic from "./img/ubersetzenSVG.svg";
// import backButton from './img/back-button.png';
import PokemonLogo from './img/PokeLogo.png';

function Header(props) {
    let navigate = useNavigate();
    const searchRef = useRef();
    const params = useParams();


    const handleOnClick = useCallback(() => navigate('/', { replace: true }), [navigate]);

    return (
        <header>
            <Link className="LogoLink" to="/"> <img className="Logo" src={PokemonLogo} alt="Pokemon Logo"></img></Link>
            <nav>
                <button className="btn_img_burger button" type="button">{params.pokemon === "pokemon" ? <Link to="/"><RiArrowGoBackFill /></Link> : <Link to="/filter"> <img src={props.burgerimg === "Dpk" ? Dpk : Lpk} className="burgerimg" alt="burgerMenu" ></img></Link>}</button>
                <input id="searchInput" onChange={(e) => { props.search(e.target.value); handleOnClick(); }} placeholder="Search Pokemon" Ref={searchRef}></input>
                <span className="button_wrapper">
                    <button onClick={() => props.resetButton()}>
                        <Link to="/"><GrPowerReset className="btn_reset" /></Link>
                    </button>
                    {/* <button type="button" onClick={() => props.setDarkmode()} ><WiMoonAltThirdQuarter className="btn_LD" /></button> */}
                    <button type="button" onClick={() => props.setDarkmode()} ><img className="btn_LD" src={props.dlimg === "Dark" ? Dark : Light} alt="DarkMode"></img></button>
                    <button className="üButton" type="button" onClick={() => props.setLanguage()} ><img className="btn_LD" src={ÜbersetzungsPic} alt="DarkMode"></img></button>
                    {/* <button type="button" onClick={() => props.setLanguage()} ><RiTranslate className="üButton" /></button> */}
                </span>
            </nav>
        </header>
    );
}


export default Header;