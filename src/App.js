import {Fragment, useState} from 'react';
import {Header} from "./components/common/Header";
import MainContainer from "./container/MainContainer";

function App(){
    const [isDrawerShown, setIsDrawerShown] = useState(false);

    const toggleDrawerMenu = () => {
        console.log('d')
        setIsDrawerShown(!isDrawerShown);
    };

    return (
        <Fragment>
            <Header isDrawerShown={isDrawerShown} onToggleDrawerMenu={toggleDrawerMenu}/>
            <MainContainer isDrawerShown={isDrawerShown} onToggleDrawerMenu={toggleDrawerMenu}/>
        </Fragment>
    )
}

export default App;
