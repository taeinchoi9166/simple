import {useRef, useEffect} from 'react';

export default {
    convertRgbToHex: rgb => {
        const startIdx = rgb.lastIndexOf('(');

        if(startIdx === -1){
            throw "It's notRGB code.";
        }else{
            const c = rgb.substring(startIdx + 1, rgb.length - 1).split(',').map(item => parseInt(item.trim()));
            return '#' + ('0' + (c[0]).toString(16)).slice(-2) + ('0' + (c[1]).toString(16)).slice(-2) + ('0' + (c[2]).toString(16)).slice(-2);
        }

    },
    convertHexToRgb: (hex, isOnlyNums = false) => {
        let str = hex.substring(1);

        if(str.length === 3){
            str = str[0] + str[0] + str[1] + str[1] + str[2] + str[2];
        }

        str = (parseInt('0x' + str.substring(0,2))).toString(10) + ',' + (parseInt('0x' + str.substring(2,4))).toString(10) + ',' + (parseInt('0x' + str.substring(4,6))).toString(10);

        return isOnlyNums ? str : 'rbg(' + str + ')';
    },
    usePrevious: value => {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        }, value);

        return ref.current;

    }

}
