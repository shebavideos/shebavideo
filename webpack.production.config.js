
const path = require("path"),
    MiniCssExtractPlugin = require("mini-css-extract-plugin"),
    { CleanWebpackPlugin } = require("clean-webpack-plugin"),
    HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "production",
    module: {
        rules: [
            {
                test: /\.(png|jpg)$/,
                use: [
                    'file-loader'
                ]
            }, {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, 'css-loader'
                ]
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/env'
                            ],
                            plugins: [
                                'babel-plugin-transform-class-properties'
                            ]

                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[contenthash].css'
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                '**/*'
            ]

        }),
        new HTMLWebpackPlugin({
            title: "sheba video player",
            meta: {
                author: "K.T Motshoana"
            },
        })
    ]


}