<template>
    <div>
        <mine-form />
        <div>{{timer}}</div>
        <table-component />
        <div>{{result}}</div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import store, {INCREMENT_TIMER} from './store';
    import TableComponent from './TableComponent';
    import MineForm from './MineForm';

    let interval;
    export default {
        store,
        components: {
            TableComponent, MineForm
        },
        computed:{
            ...mapState(['timer', 'result', 'halted'])
        },
        methods: {
            
        },
        watch: {
            halted(value, oldValue){
                if(value === false){ // false일 때 진행중
                    interval = setInterval(() => {
                        this.$store.commit(INCREMENT_TIMER);
                        // 정확한 시간은 new Date()로 시작 시간과 비교해 출력할 것
                    }, 1000);
                }else{ // 중단
                    clearInterval(interval);
                }
            }
        }
    }
</script>

<style>
    table{
        border-collapse: collapse;
    }
    td{
        border: 1px solid black;
        width: 40px;
        height: 40px;
        text-align: center;
    }
</style>