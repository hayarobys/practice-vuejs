<template>
    <div>
        <h1>{{result}}</h1>
        <!-- v-on:을 @로 대체 가능 -->
        <div><span style="opacity:0.01;">{{answer}}</span> <- Answer here! Drag & Copy</div>
        <form @submit.prevent="onSubmitForm">
            <input ref="answer" maxlength="4" v-model="value" />
            <button type="submit">입력</button>
        </form>
        <div>시도: {{tries.length}}</div>
        <ul>
            <li v-for="el in tries.slice().reverse()">
                <div>{{el.try}}</div>
                <div>{{el.result}}</div>
            </li>
        </ul>
    </div>
</template>

<script>
    const getNumbers = () => {
        const candidates = [1,2,3,4,5,6,7,8,9];
        const array = [];
        for(let i=0; i<4; i+=1){
            const chosen = candidates.splice(
                Math.floor(Math.random() * (9-i))
                ,1
            )[0];
            array.push(chosen);
        }
        return array;
    }

    export default {
        data() {
            return {
                result: '',
                answer: getNumbers(),
                tries: [],
                value: ''
            }
        },
        methods: {
            onSubmitForm(e) {
                //e.preventDefault(); @submit.prevent 로 대체
                if(this.value === this.answer.join('')){
                    this.tries.push({
                        try: this.value,
                        result: '홈런'
                    });
                    this.result = `'${this.answer}' Correct!`;
                    this.tries = [];
                    this.answer = getNumbers();
                }else{
                    if(this.tries.length >= 9){
                        this.result = `10 FAIL! Correct answer is '${this.answer.join('')}'.`;
                        this.tries = [];
                        this.answer = getNumbers();
                    }else{
                        this.result = '';
                        let strike = 0;
                        let ball = 0;
                        const answerArray = this.value.split('').map(v => parseInt(v));

                        for(let i=0; i<4; i+=1){
                            if(answerArray[i] === this.answer[i]){
                                strike++;
                            }else if(this.answer.includes(answerArray[i])){
                                ball++;
                            }
                        }

                        this.tries.push({
                            try: this.value,
                            result: `${strike} 스트라이크, ${ball} 볼 입니다.`
                        });
                    }
                }
                
                this.value = '';
                this.$refs.answer.focus();
            }
        }
    }
</script>

<style>
    
</style>