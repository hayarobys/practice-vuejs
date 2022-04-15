<template>
    <div> <!-- 최상단 div는 template으로 변경 불가. 7강에서 다른 방법 알려준다 함 -->
        <!-- v-bind:class를 :class 로 축약 가능 -->
        <div id="screen" :class="state" @click="onClickScreen">{{message}}</div>
        <template v-show="result.length"> <!-- v-if는 태그숨김, v-show는 display:none 처리. template 선언시 태그 자체가 제거되어 무효 처리 -->
            <div>평균 시간: {{result.reduce((a,c)=>a+c,0) / result.length || 0}}ms</div>
            <button @click="onReset">리셋</button>
        </template>
    </div>
</template>

<script>
    let startTime = 0;
    let endTime = 0;
    let timeout = null;

    export default {
        data() {
            return {
                result: []
                ,state: 'waiting'
                ,message: '클릭해서 시작하세요.'
            }
        },
        computed: {
            average(){
                return this.result.reduce((a, c) => a + c, 0) / result.length || 0;
            }
        },
        methods: {
            onReset() {
                this.state = 'waiting';
                this.message = '클릭해서 시작하세요.';
                clearTimeout(timeout);
                this.result = [];
            }
            ,onClickScreen() {
                //alert('click');
                if(this.state === 'waiting'){
                    this.state = 'ready';
                    this.message = '초록색이 되면 클릭하세요';
                    timeout = setTimeout(() => {
                        this.state = 'now';
                        this.message = '지금 클릭!';
                        startTime = new Date();
                    }, Math.floor(Math.random() * 1000) + 2000);
                }else if(this.state === 'ready'){
                    clearTimeout(timeout);
                    this.state = 'waiting';
                    this.message = '너무 성급하시군요! 초록색이 된 후에 클릭하세요.';
                }else if(this.state === 'now'){
                    endTime = new Date();
                    this.state = 'waiting';
                    this.message = '클릭해서 시작하세요.';
                    this.result.push(endTime - startTime);
                }
            }
        }
    }
</script>

<style scoped>
    #screen {
        cursor: pointer;
        width: 300px;
        height: 200px;
        text-align: center;
        user-select: none;
    }
    #screen.waiting {
        background-color: aqua;
    }
    #screen.ready {
        background-color: red;
        color: white;
    }
    #screen.now {
        background-color: greenyellow;
    }
</style>