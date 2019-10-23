import React, {createRef, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './DotCanvas.scss';
import commonUtil from '../../util/common';

function DotCanvas({canvasRef, backCanvasRef, imageSize, colorPoint, color}){
    const [canvSize, setCanvSize] = useState(imageSize);
    const [curPoint, setCurPoint] = useState({});
    const [dotSize, setDotSize] = useState(0);

    function renderImage(){ //화면 크기에 따라 이미지 다시 그리기
        const canv = canvasRef.current;
        const ctx = canv.getContext('2d');
        const bctx = backCanvasRef.current.getContext('2d');
        window.ctx = ctx;
        const _canvSize = canv.offsetWidth;
        setCanvSize(_canvSize);
        const _dotSize = Math.floor(_canvSize / imageSize);
        setDotSize(_dotSize);

        // canv.style.margin = canv.style.width % imageSize + 'px';
        //  canv.style.width = canv.style.width - ((canv.style.width % dotSize) * 2);
        //  canv.style.height = canv.style.height - ((canv.style.height % dotSize) * 2);
        // console.log('dd')


        ctx.clearRect(0, 0, canvSize, canvSize);
        ctx.fillStyle = '1px solid #000';

        bctx.clearRect(0, 0, canvSize, canvSize);


        // for(let i = 0; i < canv.width / dotSize; i++){
        //     for(let j = 0; j < canv.width / dotSize; j++){
        //         ctx.fillStyle = (i + j) % 2 === 1 ? '#333' : '#888';
        //         ctx.fillRect(j * dotSize, i * dotSize, dotSize, dotSize);
        //     }
        // }
        for(const point in curPoint){
            const pos = point.split(',');
            ctx.fillStyle = colorPoint[point];
            // console.log('rgba(' + commonUtil.convertHexToRgb(colorPoint[point], true) + ', 1)')
            // console.log(parseInt(pos[0]) * dotSize, parseInt(pos[1]) * dotSize, dotSize, dotSize, colorPoint[point]);
            ctx.fillRect(parseInt(pos[1]) * dotSize, parseInt(pos[0]) * dotSize, dotSize, dotSize);
        }

        for(const point in colorPoint){
            const pos = point.split(',');
            bctx.fillStyle = 'rgba(' + commonUtil.convertHexToRgb(colorPoint[point], true) + ', 0.4)';
           // console.log('rgba(' + commonUtil.convertHexToRgb(colorPoint[point], true) + ', 1)')
           // console.log(parseInt(pos[0]) * dotSize, parseInt(pos[1]) * dotSize, dotSize, dotSize, colorPoint[point]);
            bctx.fillRect(parseInt(pos[1]) * dotSize, parseInt(pos[0]) * dotSize, dotSize, dotSize);
        }

        console.log((Object.keys(curPoint).length / Object.keys(colorPoint).length) * 100 + "%")
    }

    function onClickOnCanvas(e){
        const [rx, ry] = [Math.floor((e.pageX - canvasRef.current.parentElement.offsetLeft) / dotSize) , Math.floor((e.pageY - canvasRef.current.parentElement.offsetTop) / dotSize)];
        const [ax, ay] = [rx * dotSize, ry * dotSize];
        const ctx = canvasRef.current.getContext('2d');
        console.log(ry,rx)
        try{
            ctx.fillStyle = commonUtil.convertRgbToHex(color);
        }catch(err){
            console.log(err);
        }

        const dotColor = colorPoint[ ry + ',' + rx ];
        console.log(dotColor, ctx.fillStyle);
        if(ctx.fillStyle === dotColor){
            const _curPoint = curPoint;
            _curPoint[ry + ',' + rx] = dotColor;
            setCurPoint(_curPoint);

            ctx.fillRect(ax, ay, dotSize, dotSize);
        }

    }

    useEffect(() => {
        renderImage();
        window.addEventListener('resize', renderImage);

        return () => {
            window.removeEventListener('resize', renderImage);
        };
    },[colorPoint, canvSize]);

    return (
        <div className="dot-canvas">
            <canvas width={canvSize} height={canvSize} ref={backCanvasRef} className="back-canv"></canvas>
            <canvas width={canvSize} height={canvSize} ref={canvasRef} className="canv" onMouseMove={onClickOnCanvas}></canvas>
        </div>
    );
};

DotCanvas.propTypes = {
    canvasRef: PropTypes.object.isRequired,
    imageSize: PropTypes.number.isRequired,
    colorPoint: PropTypes.array.isRequired
}


export default DotCanvas;
