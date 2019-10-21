import React, {Component, createRef} from 'react';
import {DotCanvas} from '../components/DotCanvas';
import {ColorView} from "../components/ColorView";
import {ColorPicker} from "../components/ColorPicker";
import img from '../test.png';

class MainContainer extends Component{
    constructor(props){
        super(props);
        this.canvasRef = createRef();
        this.onclick = this.onclick.bind(this);
    }

    state = {
        color: '#ffffff',
        pImage: [],
        isImageLoaded: false,
        imageSize: 90,
        colorPoint: {}
    }

    componentDidMount() {
    }

    onclick(){
        if(this.state.isImageLoaded) return false;
        const that = this;

        that.image = document.createElement('img');
        that.image.src = img.toString();

        that.image.onload = function(){
            let _colorPoint = {};
            const ctx = that.canvasRef.current.getContext('2d');
            ctx.drawImage(that.image, 0, 0, that.state.imageSize, that.state.imageSize);

            if(that.state.pImage.length == 0){
                const data = ctx.getImageData(0,0, that.canvasRef.current.width, that.canvasRef.current.height);

                for(let i = 0; i < data.data.length / 4; i++){
                    const idx = i * 4;

                    let code = '';
                    if(data.data[idx + 3] > 30) {
                        data.data[idx + 3] = 255;
                        code = '#' + ('0' + (data.data[idx]).toString(16)).slice(-2) + ('0' + (data.data[idx + 1]).toString(16)).slice(-2) + ('0' + (data.data[idx + 2]).toString(16)).slice(-2);

                    }else{
                        data.data[idx + 3] = 0;
                    }

                    if(code && data.data[idx + 3] > 0){
                        const pl = _colorPoint[code];
                        if(!pl) _colorPoint[code] = [];
                        _colorPoint[code].push({x: Math.floor(i / that.state.imageSize), y: i % that.state.imageSize});
                    }
                }

                ctx.clearRect(0, 0, that.canvasRef.current.width, that.canvasRef.current.height);
                ctx.putImageData(data, 0,0);
                that.setState({
                    ...that.state,
                    isImageLoaded: true,
                    colorPoint:_colorPoint
                });
            }
        }

    }

    changeColor = (e) => { //팔레트 색 바꾸기
        const color = e.target.style.backgroundColor;

        this.setState({
            ...this.state,
            color: color
        });
    }

    render() {
        return (
            <div>
                <button onClick={this.onclick}>ll</button>
                <ColorView color={this.state.color}/>
                <DotCanvas canvasRef={this.canvasRef} imageSize={this.state.imageSize}/>
                <ColorPicker colors={Object.keys(this.state.colorPoint)} onChangeColor={this.changeColor}/>
            </div>
        )
    }
}

export default MainContainer;
