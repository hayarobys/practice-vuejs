<template>
    <div>
        <div>{{turn}}님의 턴입니다.</div>
        <table-component :table-data="tableData" />
        <div v-if="winner">{{winner}}님의 승리!</div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import store from './store';
    import TableComponent from './TableComponent';

    export default {
        store,
        components: {
            TableComponent
        },
        data(){
            return{
                data: 1
            }
        },
        computed:{
            ...mapState(['winner', 'turn', 'tableData']),
            /*
            ...mapState({
                winner(state){ return state.winner + this.data;},
                turnState: 'turn'
            });
            */
            /*
            winner(){
                return this.$store.state.winner;
            },
            turn(){
                this.$store.state.turn;
            }
            */
        },
        methods: {
            onChangeData(){
                this.$set(this.tableData[1], 0, 'X');
            }
        }
    }
</script>

<style>
    
</style>