import './DrawerMenu.scss';
import {useCommonConsumer} from '../../../contexts/common';

function DrawerMenu(props){
    const {state, actions} = props.value;
    const {isDrawerShown} = state;
    const {toggleDrawerMenu, changeModalType} = actions;
    return (
        <div className={"drawer-menu " + (isDrawerShown ? 'active': '')}>
            <nav>
                <button className={'drawer-close-btn'} onClick={toggleDrawerMenu}>
                    <i className="fas fa-times"></i>
                </button>
                <ul>
                    <li>
                        <button className="nav-btn" onClick={() => {changeModalType('SELECT_POKEMON')}}>포켓몬 선택하기</button>
                    </li>
                    <li>
                        <button className="nav-btn" onClick={() => {changeModalType('POKEMON_INFO')}}>포켓몬 정보보기</button>
                    </li>
                </ul>
            </nav>

        </div>
    );
}

export default useCommonConsumer(DrawerMenu);
