<template>
    <td @click="onClickTd">{{cellData}}</td>
</template>

<script>
    export default {
        props: {
            cellData: String,
            rowIndex: Number,
            cellIndex: Number
        },
        methods: {
            onClickTd(){
                if(this.cellData) return;

                console.log(this.$root.$data);
                console.log(this.$parent.$data);
                let rootData = this.$root.$data;
                // '객체나 배열'에 index로 접근해 값을 바꾸면 화면에 반영되지 않음. Array.push()와 같이 배열의 메서드로 접근하는 경우엔 반영됨.
                //rootData.tableData[this.rowIndex][this.cellIndex] = rootData.turn;
                this.$set(rootData.tableData[this.rowIndex], this.cellIndex, rootData.turn);
                
                let win = false;
                if(rootData.tableData[this.rowIndex][0] === rootData.turn && rootData.tableData[this.rowIndex][1] === rootData.turn && rootData.tableData[this.rowIndex][2] === rootData.turn){
                    win = true;
                }
                if(rootData.tableData[0][this.cellIndex] === rootData.turn && rootData.tableData[1][this.cellIndex] === rootData.turn && rootData.tableData[2][this.cellIndex] === rootData.turn){
                    win = true;
                }
                if(rootData.tableData[0][0] === rootData.turn && rootData.tableData[1][1] === rootData.turn && rootData.tableData[2][2] === rootData.turn){
                    win = true;
                }
                if(rootData.tableData[0][2] === rootData.turn && rootData.tableData[1][1] === rootData.turn && rootData.tableData[2][0] === rootData.turn){
                    win = true;
                }

                if(win){ // 이긴 경우: 3줄 달성
                    rootData.winner = rootData.turn;
                    rootData.turn = 'O';
                    rootData.tableData = [['','',''],['','',''],['','','']];
                }else{ // 무승부
                    let all = true; // all의 true면 무승부라는 뜻
                    rootData.tableData.forEach((row) => { // 무승부 검사
                        row.forEach((cell) => {
                            if(!cell){
                                all = false;
                            }
                        });
                    });
                    if(all){ // 무승부
                        rootData.winner = '';
                        rootData.turn = 'O';
                        rootData.tableData = [['','',''],['','',''],['','','']];
                    }else{
                        rootData.turn = rootData.turn === 'O' ? 'X' : 'O';
                    }
                }
            }
        }
    };
</script>

<style>
    
</style>