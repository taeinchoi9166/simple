import React, {createRef, useEffect, useState, useRef} from 'react';
import PropTypes from 'prop-types';
import './DotCanvas.scss';
import commonUtil from '../../util/common';

function usePrevious(value){
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    }, value);

    return ref.current;
}


function DotCanvas({canvasRef, backCanvasRef, imageSize, colorPoint, color, pokemon}){
    const [canvSize, setCanvSize] = useState(imageSize);
    const [curPoint, setCurPoint] = useState({});
    const [dotSize, setDotSize] = useState(0);
    const [curPokemon, setCurPokemon] = useState('');

    const prevPokemon = usePrevious(pokemon);

    function renderImage(){ //화면 크기에 따라 이미지 다시 그리기
        console.log('dot canvas render image init!');


        const canv = canvasRef.current;
        const ctx = canv.getContext('2d');
        window.ctx = ctx;
        const bctx = backCanvasRef.current.getContext('2d');
        const _canvSize = canv.offsetWidth;
        setCanvSize(_canvSize);
        const _dotSize = Math.floor(_canvSize / imageSize);
        setDotSize(_dotSize);
        setCurPokemon(pokemon);



        ctx.clearRect(0, 0, canvSize, canvSize);
        bctx.clearRect(0, 0, canvSize, canvSize);




        for(const point in curPoint){
            const pos = point.split(',');
            ctx.fillStyle = colorPoint[point];
            // console.log('rgba(' + commonUtil.convertHexToRgb(colorPoint[point], true) + ', 1)')
            // console.log(parseInt(pos[0]) * dotSize, parseInt(pos[1]) * dotSize, dotSize, dotSize, colorPoint[point]);
            ctx.fillRect(parseInt(pos[1]) * dotSize, parseInt(pos[0]) * dotSize, dotSize, dotSize);
        }

        // if(isPokemonChanged){
        //     ctx.clearRect(0, 0, canvSize, canvSize);
        //     setCurPoint({});
        // }

        for(const point in colorPoint){
            const pos = point.split(',');
            bctx.fillStyle = 'rgba(' + commonUtil.convertHexToRgb(colorPoint[point], true) + ', 0.4)';
           // console.log('rgba(' + commonUtil.convertHexToRgb(colorPoint[point], true) + ', 1)')
           // console.log(parseInt(pos[0]) * dotSize, parseInt(pos[1]) * dotSize, dotSize, dotSize, colorPoint[point]);
            bctx.fillRect(parseInt(pos[1]) * dotSize, parseInt(pos[0]) * dotSize, dotSize, dotSize);
        }


        //console.log((Object.keys(curPoint).length / Object.keys(colorPoint).length) * 100 + "%")
    }

    function onClickOnCanvas(e){
        const [rx, ry] = [Math.floor((e.pageX - canvasRef.current.parentElement.offsetLeft) / dotSize) , Math.floor((e.pageY - canvasRef.current.parentElement.offsetTop) / dotSize)];
        const [ax, ay] = [rx * dotSize, ry * dotSize];
        const ctx = canvasRef.current.getContext('2d');

        try{
            ctx.fillStyle = commonUtil.convertRgbToHex(color);
        }catch(err){
            console.log(err);
        }

        const dotColor = colorPoint[ ry + ',' + rx ];

        if(ctx.fillStyle === dotColor){
            const _curPoint = curPoint;
            _curPoint[ry + ',' + rx] = dotColor;
            setCurPoint(_curPoint);

            ctx.fillRect(ax, ay, dotSize, dotSize);
        }

    }

    useEffect(() => {

        console.log(pokemon, curPokemon);
        if(pokemon !== curPokemon){
            ctx.clearRect(0, 0, canvSize, canvSize);
            setCurPoint({});
        }

        renderImage();

        window.addEventListener('resize', renderImage);
        console.log('dotcanvas useeffect init!');


        return () => {
            //ctx.clearRect(0, 0, canvSize, canvSize);
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
