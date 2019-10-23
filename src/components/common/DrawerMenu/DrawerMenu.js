import './DrawerMenu.scss';

function DrawerMenu({isDrawerShown, onToggleDrawerMenu}){
    return (
        <div className={"drawer-menu " + (isDrawerShown ? 'active': '')}>
            <nav>
                <button className={'drawer-close-btn'} onClick={onToggleDrawerMenu}>
                    <i className="fas fa-times"></i>
                </button>
                <ul>
                    <li>
                        <button className="nav-btn">포켓몬 선택하기</button>
                    </li>
                    <li>
                        <button className="nav-btn">포켓몬 정보보기</button>
                    </li>
                </ul>
            </nav>

        </div>
    )
}

export default DrawerMenu;
