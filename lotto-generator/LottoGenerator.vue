<template>
    <div>
        <div>당첨 숫자</div>
        <div id="결과창">
            <lotto-ball v-for="ball in winBalls" :key="ball" :number="ball"></lotto-ball>
        </div>
        <div>보너스</div>
        <lotto-ball v-if="bonus" :number="bonus"></lotto-ball>
        <button v-if="redo" @click="onClickRedo">한 번 더!</button>
    </div>
</template>

<script>
    import LottoBall from './LottoBall';

    function getWinNumbers(){
        console.log('getWinNumbers');
        const candidate = Array(45).fill().map((v, i) => i + 1);
        const shuffle = [];
        while(candidate.length > 0){
            shuffle.push(
                candidate.splice(
                    Math.floor(Math.random() * candidate.length), 1
                )[0]
            );
        }
        const bonusNumber = shuffle[shuffle.length - 1];
        const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
        return [...winNumbers, bonusNumber];
    }

    const timeouts = [];
    export default {
        components: {
            'lotto-ball': LottoBall // 그냥 LottoBall만 써두면 <lotto-ball>로 사용 가능. 파스칼 to 케밥케이스
        },
        data() {
            return {
               winNumbers: getWinNumbers(),
               winBalls: [],
               bonus: null,
               redo: false    
            };
        },
        computed: {
            
        },
        methods: {
            onClickRedo(){
                this.winNumbers = getWinNumbers();
                this.winBalls = [];
                this.bonus = null;
                this.redo = false;
                //this.showBalls(); // watch로 대체할 수도 있지만 이번 경우엔 methods에 두는게 직관적
            },
            showBalls(){
                // var 대신 let을 쓰면 클로져 문제 회피
                for(let i=0; i<this.winNumbers.length-1; i++){
                    timeouts[i] = setTimeout(() => {
                        this.winBalls.push(this.winNumbers[i])
                    }, (i+1)*1000);
                }
                timeouts[6] = setTimeout(() => {
                    this.bonus = this.winNumbers[6];
                    this.redo = true;
                }, 7000);
            }
        },
        mounted(){
            this.showBalls();
        },
        beforeDestroy(){
            timeouts.forEach((t) => {
                clearTimeout(t);
            });
        },
        watch:{ // 복잡도를 높이기에 가급적 사용 자제
            winBalls(value, oldValue){
                // 배열은 참조관계라 계속 같은 값이 나옴
                console.log(value, oldValue);
                if(value.length === 0){
                    this.showBalls();
                }
            }
        }
    }
</script>

<style scoped>
    
</style>