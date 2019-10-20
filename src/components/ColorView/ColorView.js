import React from 'react';
import './ColorView.scss';

function ColorView({color}){
    return (
        <div className="color-view">
            <div className="color-box" style={{background:color}}></div>
        </div>
    );
}

export default ColorView;
