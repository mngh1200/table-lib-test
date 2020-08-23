const path = require('path');

module.exports = {
  entry: './src/js/main.js',
  output: {
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, "dist"), // distディレクトリのファイルを確認する
    port: 3000, // 3000ポートを利用
  },
};
