import React, {Component, createRef} from 'react';
import {DotCanvas} from '../components/DotCanvas';
import {ColorView} from "../components/ColorView";
import {ColorPicker} from "../components/ColorPicker";
import img from '../test.png';

class MainContainer extends Component{
    constructor(){
        super();
        this.canvasRef = createRef();
        this.image = document.createElement('img');
        this.image.src = img.toString();

    }

    state = {
        color:'#000000',
        pImage:[],
        imageSize:50,
        colorPoint:{}
    }



    componentDidMount() {
        let _colorPoint = {};
        const ctx = this.canvasRef.current.getContext('2d');
        ctx.drawImage(this.image, 0, 0,this.state.imageSize, this.state.imageSize);

        if(this.state.pImage.length == 0){
            const data = ctx.getImageData(0,0, this.canvasRef.current.width, this.canvasRef.current.height);
            this.setState({
                ...this.state,
                pImage: data.data
            });

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
                    _colorPoint[code].push({x: Math.floor(i / this.state.imageSize), y: i % this.state.imageSize});
                }
            }

            ctx.clearRect(0, 0, this.canvasRef.current.width, this.canvasRef.current.height);
            ctx.putImageData(data, 0,0);
            this.setState({
                ...this.state,
                colorPoint:_colorPoint
            });

        }
    }

    changeColor = (e) => {
        const color = e.target.style.backgroundColor;

        this.setState({
            ...this.state,
            color: color
        });
    }

    render() {
        console.log(this.state.colorPoint)
        return (
            <div>
                <ColorView color={this.state.color} />
                <DotCanvas canvasRef={this.canvasRef}/>
                <ColorPicker colors={Object.keys(this.state.colorPoint)} onChangeColor={this.changeColor}/>
            </div>
        )
    }
}

export default MainContainer;
