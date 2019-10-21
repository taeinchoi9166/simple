import React, {createRef, useEffect, useState} from 'react';
import './DotCanvas.scss';

function DotCanvas({canvasRef, imageSize}){
    return (
        <div className="dot-canvas" >
            <canvas width={imageSize} height={imageSize} ref={canvasRef} className="canv"></canvas>
        </div>
    );
};

export default DotCanvas;
