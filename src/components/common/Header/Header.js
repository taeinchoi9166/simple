import React from 'react';
import icon from '../../../asset/image/pokeball.png';
import './Header.scss';
import {DrawerMenuToggler} from '../DrawerMenuToggler';

function Header(props){
    return (
        <header>
            <div className="icon">
                <img src={icon} alt=""/>
            </div>
            <h1>PokeDot</h1>
            <DrawerMenuToggler/>
        </header>
    )
}

export default Header;
