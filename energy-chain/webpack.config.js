const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const copyWebpackPlugin = require("copy-webpack-plugin");
module.exports = {
    entry: {
        index: './src/index.js',
        signIn: './src/signIn.js',
        register: './src/register.js',
        admin: './src/admin.js',
        welcome: './src/welcome.js',
        mySale: './src/my-sale.js',
        tradingRecord: './src/trading-record.js',
        saleShop: './src/sale-shop.js',
        echarts1: './src/echarts1.js',
        echarts2: './src/echarts2.js',
        echarts3: './src/echarts3.js',
        echartsMap: './src/echarts_map.js',
        saleAdd: './src/sale-add.js',
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        hot: true,
        port: 8081
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new copyWebpackPlugin([{from: path.resolve(__dirname + '/src/lib'), to: './public'}]),
        new copyWebpackPlugin([{from: path.resolve(__dirname + '/src/assets'), to: './public'}]),
        new copyWebpackPlugin([{from: path.resolve(__dirname + '/src/json'), to: './json'}]),
        new HtmlWebpackPlugin({filename: 'index.html', template: './src/index.html', chunks: ['index']}),
        new HtmlWebpackPlugin({filename: 'signIn.html', template: './src/signIn.html', chunks: ['signIn']}),
        new HtmlWebpackPlugin({filename: 'register.html', template: './src/register.html', chunks: ['register']}),
        new HtmlWebpackPlugin({filename: 'admin.html', template: './src/admin.html', chunks: ['admin']}),
        new HtmlWebpackPlugin({filename: 'welcome.html', template: './src/welcome.html', chunks: ['welcome']}),
        new HtmlWebpackPlugin({filename: 'my-sale.html', template: './src/my-sale.html', chunks: ['mySale']}),
        new HtmlWebpackPlugin({filename: 'trading-record.html', template: './src/trading-record.html', chunks: ['tradingRecord']}),
        new HtmlWebpackPlugin({filename: 'sale-shop.html', template: './src/sale-shop.html', chunks: ['saleShop']}),
        new HtmlWebpackPlugin({filename: 'echarts1.html', template: './src/echarts1.html', chunks: ['echarts1']}),
        new HtmlWebpackPlugin({filename: 'echarts2.html', template: './src/echarts2.html', chunks: ['echarts2']}),
        new HtmlWebpackPlugin({filename: 'echarts3.html', template: './src/echarts3.html', chunks: ['echarts3']}),
        new HtmlWebpackPlugin({filename: 'echarts_map.html', template: './src/echarts_map.html', chunks: ['echartsMap']}),
        new HtmlWebpackPlugin({filename: 'sale-add.html', template: './src/sale-add.html', chunks: ['saleAdd']}),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    output: {
        filename: 'scripts/[name].bundle.js',
        path:
            path.resolve(__dirname, 'dist'),
        publicPath:
            ''
    }

}
;
