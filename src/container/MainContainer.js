import React, {PureComponent, createRef, useContext, Component} from 'react';
import {useCommonConsumer} from '../contexts/common';
import CommenUtil from '../util/common';
import {DrawerMenu} from "../components/common/DrawerMenu";
import {DotCanvas} from '../components/DotCanvas';
import {ColorView} from "../components/ColorView";
import {ColorPicker} from "../components/ColorPicker";
import img from '../asset/image/pokemon/xerneas.png';

//const common = useContext(CommonContext);

class MainContainer extends PureComponent{
    constructor(props){
        super(props);
        this.canvasRef = createRef();
        this.backCanvasRef = createRef();
        this.initCanvas = this.initCanvas.bind(this);
    }

    state = {
        color: '#ffffff',
        pImage: [],
        isImageLoaded: false,
        imageWidth: 40,
        imageHeight: 30,
        colorPoint: {},
        colorList: [],
        pokemon: null
    }


    componentDidMount() {
        this.initCanvas();
    }

    initCanvas(){ //포켓몬이미지를 가져온다.
        if(this.state.isImageLoaded) return false;


        this.image = document.createElement('img');

        const {state} = this.props.value;

        this.image.src = state.pokemon && `http://localhost:12000/pokemon/${state.pokemon}.png`;

        const that = this;

        this.image.onload = function(){
            console.log(that.image.src + ' now loading.')
            let _colorPoint = {};
            let _colorList = [];
            const ctx = that.canvasRef.current.getContext('2d');

            ctx.clearRect(0, 0, that.state.imageWidth, that.state.imageHeight);

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
                    }
                }

                ctx.clearRect(0, 0, that.canvasRef.current.width, that.canvasRef.current.height);

                that.setState({
                    ...that.state,
                    isImageLoaded: true,
                    colorPoint:_colorPoint,
                    colorList:_colorList
                });
            }


            ctx.clearRect(0, 0, that.canvasRef.current.width, that.canvasRef.current.height);


        }



    }

    changeColor = (e) => { //팔레트 색 바꾸기
        const color = e.target.style.backgroundColor;

        this.setState({
            ...this.state,
            color: color
        });
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.value.state.pokemon !== this.props.value.state.pokemon){
            console.log(prevProps.value.state.pokemon , this.props.value.state.pokemon);
            this.setState({
                ...this.state,
                isImageLoaded: false
            });
            console.log('main container didupdate init!');
            this.initCanvas();
        }
    }



    render() {
        const {state} = this.props.value;
        this.setState({
            ...this.state,
            pokemon: state.pokemon
        });
        console.log(state.pokemon, )
        if(!state.pokemon) {
            console.log('main container render init!');

        }
        this.initCanvas();

        return (
            <div>
                <DotCanvas canvasRef={this.canvasRef} backCanvasRef={this.backCanvasRef} imageSize={Math.floor(this.state.imageWidth)} colorPoint={this.state.colorPoint} color={this.state.color} pokemon={this.props.value.state.pokemon}/>
                <div className={"bmenu"}>
                    <ColorView color={this.state.color}/>
                    <ColorPicker colors={this.state.colorList} onChangeColor={this.changeColor}/>
                </div>
                <DrawerMenu/>
            </div>
        )
    }
}

export default useCommonConsumer(MainContainer);
