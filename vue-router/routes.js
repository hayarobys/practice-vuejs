import Vue from 'vue';
import VueRouter from 'vue-router';
//import NumberBaseball from '../bulls-and-cows/NumberBaseball';
//import ResponseCheck from '../response-check/ResponseCheck';
//import RockScissorsPaper from '../rock-scissors-paper/RockScissorsPaper';
//import LottoGenerator from '../lotto-generator/LottoGenerator';
import GameMatcher from './GameMatcher';

Vue.use(VueRouter);

export default new VueRouter ({
    //mode: 'hisotry',
    routes: [
        //{ path: '/number-baseball', component: NumberBaseball },
        //{ path: '/response-check', component: ResponseCheck },
        //{ path: '/rock-scissors-paper', comonent: RockScissorsPaper },
        //{ path: '/lotto-generator', component: LottoGenerator },
        { path: '/game/:name', component: GameMatcher } // /game/number-baseball
    ]
})