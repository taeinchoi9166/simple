import React from 'react';

function ColorView({color}){
    return (
        <div style={{border:'3px solid #333',borderRadius:20}}>
            <div style={{width:30,height:30,background:color}}></div>
        </div>
    );
}

export default ColorView;