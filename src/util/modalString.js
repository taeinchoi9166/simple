export default (function(){
    const titles = {
        SELECT_POKEMON: '포켓몬 선택하기',
        POKEMON_INFO: '포켓몬 정보',
    };


    const getTitle = type => titles[type] || 'Error';

    return {
        getTitle
    };
})();
