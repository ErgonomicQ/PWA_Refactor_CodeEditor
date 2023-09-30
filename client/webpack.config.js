const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');



module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'J.a.t.e'
      }),
      new InjectManifest ({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js'
      }),
      new WebpackPwaManifest({
        inject: true,
        name: 'Just another text editor',
        short_name: "J.a.t.e",
        description: "An installable text editor!",
        background_color: '#000000',
        theme_color: '#000000',
        start_url: '/',
        publicPath: '/',
        icons: [{
          src: path.resolve('src/images/logo.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('assets', 'icons'),
        },
      ],
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/, //applies this rule to .js and .mjs files using regex
          exclude: /node_modules/, //but NOT this. We don't want babel touching these.
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
              
            }
          }
        }
      ],
    },
  };
};
