import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

export const CODE = {
    MINE: -7,
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    OPENED: 0 // 0 이상이면 다 opened
};

/**
 * row * cell 칸을 만들고 mine수 만큼 지뢰를 채웁니다.
 * @param row 행
 * @param cell 열
 * @param mine 지뢰 수
 */
const plantMine = (row, cell, mine) => {
    const candidate = Array(row*cell).fill().map((arr, i) => {
        return i;
    });
    const shuffle = [];
    while(candidate.length > row * cell - mine){
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuffle.push(chosen);
    }
    const data = [];
    for(let i=0; i<row; i++){
        const rowData = [];
        data.push(rowData);
        for(let j=0; j<cell; j++){
            rowData.push(CODE.NORMAL);
        }
    }
    
    for(let k=0; k<shuffle.length; k++){
        const ver = Math.floor(shuffle[k]/cell);
        const hor = shuffle[k] % cell;
        data[ver][hor] = CODE.MINE;
    }

    return data;
}

export default new Vuex.Store({
    state:{
        tableData: [
        ],
        data: {
            row: 0,
            cell: 0,
            mine: 0
        },
        timer: 0,
        halted: true, // true: 중단, false: 시작
        result: ''
    }, // vue의 data와 비슷
    getters:{
        
    }, // vue의 computed와 비슷
    mutations:{
        [START_GAME](state, {row, cell, mine}){
            state.data = {
                row,
                cell,
                mine
            };
            /*
            // 배열처럼 객체 안 속성을 바꾸면 화면이 안 바뀔 수 있습니다.
            state.data['row']=row;
            state.data.row=row;
            Vue.set(state.data, 'row', row);
            */
            state.tableData = plantMine(row, cell, mine);
            state.timer = 0;
            state.halted = false;
        },
        [OPEN_CELL](state, {row,cell}){
            const checked = [];
            function checkAround(){ // 주변 8칸 지뢰인지 검색
                let checkRowOrCellIsUndefined = row  < 0 || row >= state.tableData.length || cell < 0 || cell >= state.tableData[0].length;
                if(checkRowOrCellIsUndfined){
                    return;
                }
                
                let around = [];
                if(state.tableData[row-1]){
                    around = around.concat([
                        state.tableData[row-1][cell-1], state.tableData[row-1][cell], state.tableData[row-1][cell+1]
                    ]);
                }
                around = around.concat([
                    state.tableData[row][cell-1], state.tableData[row][cell+1]
                ]);
                if(state.tableData[row+1]){
                    around = around.concat([
                        state.tableData[row+1][cell-1], state.tableData[row+1][cell], state.tableData[row+1][cell+1]
                    ]);
                }
                const counted = around.filter(function(v){
                    return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v);
                });
                return counted.length;
            }
            const count = checkAround();
            Vue.set(state.tableData[row], cell, count);
        },
        [CLICK_MINE](state, { row, cell }){
            state.halted = true;
            Vue.set(state.tableData[row], cell, CODE.CLICKED_MINE);
        },
        [FLAG_CELL](state, {row,cell}){
            if(state.tableData[row][cell] === CODE.MINE){
                Vue.set(state.tableData[row], cell, CODE.FLAG_MINE);
            }else{
                Vue.set(state.tableData[row], cell, CODE.FLAG);
            }
        },
        [QUESTION_CELL](state, {row,cell}){
            if(state.tableData[row][cell] === CODE.FLAG_MINE){
                Vue.set(state.tableData[row], cell, CODE.QUESTION_MINE);
            }else{
                Vue.set(state.tableData[row], cell, CODE.QUESTION);
            }
        },
        [NORMALIZE_CELL](state, {row,cell}){
            if(state.tableData[row][cell] === CODE.QUESTION_MINE){
                Vue.set(state.tableData[row], cell, CODE.MINE);
            }else{
                Vue.set(state.tableData[row], cell, CODE.NORMAL);
            }
        },
        [INCREMENT_TIMER](state){
            state.timer += 1;
        }
    } // state를 수정할 때 사용해요. 동기적으로
});