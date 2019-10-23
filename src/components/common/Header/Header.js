import React from 'react';
import icon from '../../../asset/image/pokeball.png';
import './Header.scss';
import {DrawerMenuToggler} from '../DrawerMenuToggler';

function Header({isDrawerShown, onToggleDrawerMenu}){
    return (
        <header>
            <div className="icon">
                <img src={icon} alt=""/>
            </div>
            <h1>PokeDot</h1>
            <DrawerMenuToggler onToggleDrawerMenu={onToggleDrawerMenu}/>
        </header>
    )
}

export default Header;
