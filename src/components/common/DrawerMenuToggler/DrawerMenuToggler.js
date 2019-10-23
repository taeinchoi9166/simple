import './DrawerMenuToggler.scss'

function DrawerMenuToggler({onToggleDrawerMenu}){
    return (
        <div className={"drawer-toggler"} style={{float:'right'}}>
            <button className={"drawer-toggle-btn"} onClick={onToggleDrawerMenu} style={{fontSize:'1.8rem',color:'#fff'}}>
                <i className="fas fa-bars"></i>
            </button>
        </div>
    );
}

export default DrawerMenuToggler;
