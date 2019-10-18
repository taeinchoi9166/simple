import React, {createRef, useEffect, useState} from 'react';
import './DotCanvas.scss';
import img from '../../test.png';
import {ColorPicker} from '../ColorPicker';
import {ColorView} from '../ColorView';

function DotCanvas(){
    const IMAGE_SIZE = 50;
    const [pImage, setPImage] = useState([]);
    const [colorPoint, setColorPoint] = useState({});
    const canvasRef = createRef();
    const image = document.createElement('img');
    const [color, setColor] = useState('');
    image.src = img.toString();


    useEffect(() => {
        let _colorPoint = {};
        const ctx = canvasRef.current.getContext('2d');
        ctx.drawImage(image, 0, 0,IMAGE_SIZE,IMAGE_SIZE);

        if(pImage.length == 0){
            const data = ctx.getImageData(0,0, canvasRef.current.width, canvasRef.current.height);
            setPImage(data.data);
            for(let i = 0; i < data.data.length / 4; i++){
                const idx = i * 4;

                let code = '';
                if(data.data[idx + 3] > 30) {
                    data.data[idx + 3] = 255;
                    code = '#' + (data.data[idx]).toString(16) + (data.data[idx + 1]).toString(16) + (data.data[idx + 2]).toString(16);

                }else{
                    data.data[idx + 3] = 0;
                }

                if(code){
                    const pl = _colorPoint[code];
                    if(!pl) _colorPoint[code] = [];
                    _colorPoint[code].push({x: Math.floor(i / IMAGE_SIZE), y: i % IMAGE_SIZE});
                }
            }

            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            ctx.putImageData(data, 0,0);
            setColorPoint(_colorPoint);
            console.log(colorPoint);

        }
    });

    const changeColor = (e) => {
        const color = e.target.style.backgroundColor;
        setColor(color);
    }

    return (
        <div className="dot-canvas">
            <ColorView color={color}/>
            <canvas width={IMAGE_SIZE} height={IMAGE_SIZE} ref={canvasRef}></canvas>
            <ColorPicker colors={Object.keys(colorPoint)} onChangeColor={changeColor}/>
        </div>
    );
};

export default DotCanvas;
