import React, {Component, createRef} from 'react';
import Pixelate from 'pixelate';
import {DotCanvas} from '../components/DotCanvas';
import {ColorView} from "../components/ColorView";
import {ColorPicker} from "../components/ColorPicker";
import img from '../asset/image/pokemon/dialga.png';

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
        imageWidth: 40,
        imageHeight: 30,
        colorPoint: {},
        colorList: []
    }

    componentDidMount() {

    }

    onclick(){
        if(this.state.isImageLoaded) return false;


        this.image = document.createElement('img');
        this.image.src = img.toString();

        const that = this;

        that.image.onload = function(){
           // const pixelate = new Pixelate(that.image, {amount: 1});
            let _colorPoint = {};
            let _colorList = [];
            const ctx = that.canvasRef.current.getContext('2d');
            ctx.drawImage(that.image, 0, 0, that.state.imageWidth, that.state.imageHeight);

            if(that.state.pImage.length == 0){
                const data = ctx.getImageData(0,0, that.state.imageWidth, that.state.imageHeight);

                for(let i = 0; i < data.data.length / 4; i++){
                    const idx = i * 4;

                    let code = '';
                    if(data.data[idx + 3] > 40) {
                        data.data[idx + 3] = 255;
                        code = '#' + ('0' + (data.data[idx]).toString(16)).slice(-2) + ('0' + (data.data[idx + 1]).toString(16)).slice(-2) + ('0' + (data.data[idx + 2]).toString(16)).slice(-2);

                    }else{
                        data.data[idx + 3] = 0;
                    }

                    if(code && data.data[idx + 3] > 0){
                        const [x, y] = [Math.floor(i / that.state.imageWidth), i % that.state.imageWidth];
                        const pos =  x + ',' + y;
                        _colorPoint[pos] = code;

                        const isExistColor = _colorList.findIndex(item => item === code);

                        if(isExistColor === -1) {
                            _colorList.push(code);
                        }
                        // const pl = _colorPoint[code];
                        // if(!pl) _colorPoint[code] = [];
                        // _colorPoint[code].push({x: Math.floor(i / that.state.imageSize), y: i % that.state.imageSize});
                    }
                }

                ctx.clearRect(0, 0, that.canvasRef.current.width, that.canvasRef.current.height);
                //ctx.putImageData(data, 0,0);

                that.setState({
                    ...that.state,
                    isImageLoaded: true,
                    colorPoint:_colorPoint,
                    colorList:_colorList
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
                <DotCanvas canvasRef={this.canvasRef} imageSize={Math.floor(this.state.imageWidth)} colorPoint={this.state.colorPoint}/>
                <ColorPicker colors={this.state.colorList} onChangeColor={this.changeColor}/>
            </div>
        )
    }
}

export default MainContainer;
