const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  target: 'web',
  entry: {
    background: './src/background/background.ts',
    popup: './src/popup/popup.ts',
    contentScript: './src/content/content.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: true
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: './src/index.html'
    }),
    new CopyPlugin({
        patterns: [{
            from: path.resolve('manifest.json'),
            to: path.resolve('dist')
        }]
    })
  ],
  module: {
    rules: [
        {
            test: /.(ts|tsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env',
                        ['@babel/preset-react', {'runtime': 'automatic'}],
                        '@babel/preset-typescript',
                    ]
                }
            }
        }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx']
  }
};