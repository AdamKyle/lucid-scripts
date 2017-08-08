const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    LucidEventIcon: './src/lucid/event/icon.js',
    LucidExperiencePoints: './src/lucid/experience_points/experience.js',
    LucidConjuredItems: './src/lucid/conjured_items/conjured.js',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  },
  target: 'web',
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  module: {
    rules: [
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: [['es2015', {'modules': false}]],
          plugins: ["transform-class-properties"]
        }
      },
    ],
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin
  ],
};
