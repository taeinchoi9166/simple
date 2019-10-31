import produce from 'immer';

export function createReducer(initState, handlers){ // 초기 state와 해당 리듀서 로직 전체를 전달
    return (state = initState, action) => { //리듀서 실행시  현재 상태와 받아온 action을 읽어낸다.
        return produce(state, draft => { // immer가 하는 일은, 이전의 state와 draft라는 변하게 할 state로 바꾸는 것
            const reducer = handlers[action.type];
            if(reducer) reducer(draft, action); //넘긴 액션에 따라 달라지는 리듀서로 draft를 state로 념겨 변경
        })
    }
}
