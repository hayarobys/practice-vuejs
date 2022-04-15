import Vue from 'vue';
import Vuex from 'vuex';

// vue와 vuex 연결
Vue.use(Vuex); // this.$store 가 이때 생김
//Vue.use(axios); // this.$axios 생성

// object dynamic property 동적속성 ES2015
export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';
export const NO_WINNER = 'NO_WINNER';
// export const는 import {SET_WINNER, CLICK_CELL} from './store' 식으로 고정된 이름으로 부를 수 있음
// export defualt는 import store from './store' 식으로 별칭 부여 가능
export default new Vuex.Store({
    state:{
        tableData: [
            ['','',''],
            ['','',''],
            ['','','']
        ],
        turn: 'O',
        winner: ''
    }, // vue의 data와 비슷
    getters:{
        turnMessage(state){
            return state.turn + '님이 승리하셨습니다.';
        }
    }, // vue의 computed와 비슷.
    mutations:{
        [SET_WINNER](state, winner){
            state.winner = winner;
        },
        [CLICK_CELL](state, {row, cell}){
            //state.tableData[row][cell] = state.turn;
            Vue.set(state.tableData[row],cell,state.turn); // vuex는 this.$set이 을므로 Vue.set() 사용
        },
        [CHANGE_TURN](state){
            state.turn = state.turn === 'O'?'X':'O';
        },
        [RESET_GAME](state){
            state.turn = 'O';
            state.tableData = [
                ['','','',],
                ['','','',],
                ['','','',]
            ];
        },
        [NO_WINNER](state){
            state.winner = '';
        }
    }, // state를 수정할 때 사용해요. 동기적으로. state를 바꿀때는 mutations를 통해 변경하는 것을 권장함
    actions:{

    } // 비동기를 사용할때, 또는 여러 뮤테이션을 연달아 실행할 떄
});