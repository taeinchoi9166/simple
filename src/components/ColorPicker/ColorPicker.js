import React from 'react';

function ColorPicker({colors, onChangeColor}){
    return (
      <div className="c-picker">
          {
              colors.map(color => {
                      return (
                          <div style={{background: color, width: '20px', height: '20px', float: 'left'}}
                               onClick={onChangeColor} data-color={color}/>
                      );
                  }
              )
          }
      </div>
    );
}

export default ColorPicker;