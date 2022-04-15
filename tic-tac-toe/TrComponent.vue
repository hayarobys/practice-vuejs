<template>
    <tr>
        <td-component v-for="(cellData, index) in rowData" :key="index" :row-data="rowData" :cell-data="cellData" :cell-index="index" :row-index="rowIndex"></td-component>
    </tr>
</template>

<script>
    import TdComponent from './TdComponent';

    export default {
        props: {
            rowData: Array,
            rowIndex: Number
        },
        data(){
            return {
                parent: "I'm your father"
            };
        },
        components: {
            TdComponent
        }
    }
</script>

<style>
    
</style>