const path = require('path');

module.exports = [
  {
    entry: './src/js/main.js',
    output: {
      path: __dirname + '/dist', // 出力先ディレクトリ
      filename: 'bundle.js'
    },
    devServer: {
      contentBase: path.resolve(__dirname, "dist"), // distディレクトリのファイルを確認する
      port: 3000, // 3000ポートを利用
    }
  }
];
