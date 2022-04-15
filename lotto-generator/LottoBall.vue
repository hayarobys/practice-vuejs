<template>
    <div class="ball" :style="styleObject">{{number}}</div>
</template>

<script>
    export default {
        name: 'LottoBall',
        //props: ['number'], // props값은 read-only
        props: {number: Number},
        computed: {
            styleObject(){
                let background;
                if(this.number < 10){
                    background = 'red';
                }else if(this.number <= 20){
                    background = 'orange';
                }else if(this.number <= 30){
                    background = 'yellow';
                }else if(this.number <= 40){
                    background = 'blue';
                }else{
                    background = 'green';
                }
                return {
                    background
                    //,numberData: this.number, // 부모 데이터는 여전히 read-only. 자식과 부모값간 데이터 불일치 발생
                    // 올바른 방법은 부모값을 바꾸는 함수를 자식에게 props로 전달하는 것
                };
            }
        }
    }
</script>

<style>
    .ball {
        display: inline-block;
        border: 1px solid black;
        border-radius: 20px;
        width: 40px;
        height: 40px;
        line-height: 40px;
        font-size: 20px;
        text-align: center;
        margin-right: 20px;
    }
</style>