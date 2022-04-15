//const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { VueLoaderPlugin } = require('vue-loader');
const path = require('path');

module.exports = {
    mode: 'development' // production
    ,devtool: 'eval' // 개발할때는 eval이 빌드속도 빠름. 배포시엔 hidden-source-map
    ,resolve: {
        extensions: ['.js', '.vue'] // 여기 넣은 값은 import from '~.vue' 에서 확장자 제거 가능
    }
    ,entry: {
        app: path.join(__dirname, 'main.js')
    }
    ,module: {
        rules: [
            {
                test: /\.vue$/
                ,loader: 'vue-loader'
            },{
                test: /\.css$/
                ,use: [
                    'vue-style-loader'
                    ,'css-loader'
                ]
            }
        ]
    }
    ,plugins: [
        new VueLoaderPlugin()
    ]
    ,output: {
        filename: '[name].js'
        ,path: path.join(__dirname, 'dist')
        ,publicPath: '/dist'
    }
}