const path = require("path"),
    { CleanWebpackPlugin } = require("clean-webpack-plugin"),
    HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    devtool: "source-map",
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        port: 9000
    },
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
                    'style-loader', 'css-loader'
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