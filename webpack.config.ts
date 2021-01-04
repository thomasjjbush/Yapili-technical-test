import dotenv from 'dotenv';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import path from 'path';
import webpack from 'webpack';
import { WebpackConfig } from './types';

interface WebpackArgs {
    MARVEL_DOMAIN?: string;
    NODE_ENV: string;
    PUBLIC_KEY?: string;
}

export default ({ NODE_ENV, ...args }: WebpackArgs): WebpackConfig => ({
    devServer: {
        historyApiFallback: true,
        open: true,
    },
    entry: ['./src/modules/entry-point/index.tsx'],
    mode: NODE_ENV,
    module: {
        rules: [
            {
                exclude: [/node_modules/, /\.(spec|test).(tx|tsx)?$/],
                test: /\.(ts|tsx)$/,
                use: {
                    loader: 'ts-loader',
                },
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                },
            },
        ],
    },
    output: {
        publicPath: '/',
    },
    plugins: [
        new HtmlWebPackPlugin({
            filename: 'index.html',
            template: './src/index.html',
        }),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify({
                ...dotenv.config({ path: `${path.join(__dirname)}/.env` }).parsed,
                ...args,
            }),
        }),
    ],
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
    },
});
