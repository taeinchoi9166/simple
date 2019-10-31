import './DrawerMenuToggler.scss'
import {useCommonConsumer} from '../../../contexts/common';

function DrawerMenuToggler(props){

    const {toggleDrawerMenu} = props.value.actions;
    return (
        <div className={"drawer-toggler"} style={{float:'right'}}>
            <button className={"drawer-toggle-btn"} onClick={toggleDrawerMenu} style={{fontSize:'1.8rem',color:'#fff'}}>
                <i className="fas fa-bars"></i>
            </button>
        </div>
    );
}

export default useCommonConsumer(DrawerMenuToggler);
