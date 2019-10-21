import React, {createRef, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './DotCanvas.scss';

function DotCanvas({canvasRef, imageSize, colorPoint}){

    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d');
        const canvSize = canvasRef.current.parentElement.offsetWidth;
        const dotSize = Math.floor(canvSize / imageSize);
        console.log(dotSize);
        ctx.clearRect(0, 0, canvSize, canvSize);
        //ctx.moveTo(0,0);
        ctx.fillStyle = '1px solid #000';
       // ctx.beginPath();
        //ctx.strokeRect(0, 0, dotSize, dotSize);
        for(const point in colorPoint){
            const pos = point.split(',');
                ctx.fillStyle = colorPoint[point];
                //console.log(parseInt(pos[0]) * dotSize * 2, parseInt(pos[1]) * dotSize * 2, dotSize, dotSize, colorPoint[point]);
                ctx.fillRect(parseInt(pos[1]) * dotSize, parseInt(pos[0]) * dotSize, dotSize, dotSize);


        }

    },[colorPoint]);

    return (
        <div className="dot-canvas" >
            <canvas width={100} height={100} ref={canvasRef} className="canv" onChange={()=>{console.log('resize')}}></canvas>
        </div>
    );
};

DotCanvas.propTypes = {
    canvasRef: PropTypes.object.isRequired,
    imageSize: PropTypes.number.isRequired,
    colorPoint: PropTypes.array.isRequired
}


export default DotCanvas;
