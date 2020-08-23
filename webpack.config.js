const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [
  {
    entry: __dirname + "/src/_js/main.js", // トランスパイル対象
    output: {
      path: __dirname + '/dist', // 出力先ディレクトリ
      filename: 'bundle.js' // 入力されたファイルをまとめて出力するときのファイル名
    },
    module: {
      rules: [
        {
          test: ".js",
          exclude: /node_modules/,
          loader: "babel-loader", // Babelをwebpackで利用できるようにする
        }
      ]
    },
    devServer: {
      contentBase: path.resolve(__dirname, "dist"), // distディレクトリのファイルを確認する
      port: 3000, // 3000ポートを利用
    },
    resolve: {
      extensions: ['.js'] // jsファイル, jsxファイルを対象とする
    }
  },
  {
    entry: {
      style: __dirname + "/src/sass/style.scss", // トランスパイル対象
    },
    output: {
      path: path.join(__dirname, './dist/css'),
      filename: '[name].css'
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [{loader: 'css-loader', options: {minimize: true}}, 'sass-loader']
          })
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin('[name].css')
    ]
  }
];