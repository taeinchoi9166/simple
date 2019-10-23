import React from 'react';
import './ColorPicker.scss';

function ColorPicker({colors, onChangeColor}){
    return (
      <div className="c-picker">
          {
              colors.map(color => {
                      return (
                          <div
                              className="color-item"
                              style={{background: color}}
                               onClick={onChangeColor}/>
                      );
                  }
              )
          }
      </div>
    );
}

export default ColorPicker;
