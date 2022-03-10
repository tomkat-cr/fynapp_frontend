var HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            '@': path.resolve(__dirname, 'src/'),
        }
    },
    plugins: [new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public", "index.html"),
        favicon: "./public/favicon.ico",
        filename: "index.html",
        manifest: "./public/manifest.json",
  })],
    devServer: {
        historyApiFallback: true
    },
    externals: {
        // global app config object
        // config: JSON.stringify({
        //     apiUrl: 'http://localhost:5000',
        // })
    }
}