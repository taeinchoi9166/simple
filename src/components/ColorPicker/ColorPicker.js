import React from 'react';

function ColorPicker({colors, onChangeColor}){
    return (
      <div className="c-picker">
          {
              colors.map(color => (
                  <div style={{background:color,width:'20px',height:'20px',float:'left'}} onClick={onChangeColor}/>
              ))
          }
      </div>
    );
}

export default ColorPicker;