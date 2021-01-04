import { ReactNode } from 'react';
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import { Json } from 'enzyme-to-json';
import { MockStoreEnhanced } from 'redux-mock-store';

export type Action = ThunkAction<Promise<AnyAction | void>, Store, unknown, AnyAction>;

export interface AspectRatioProps {
    children: ReactNode;
    ratio: AspectRatios;
}

export enum AspectRatios {
    '1:1' = 100,
    '16:9' = 56.25,
    '4:3' = 75,
}

export interface Character {
    comics?: CharecterCollection;
    description?: string;
    error?: boolean;
    events?: CharecterCollection;
    id?: number;
    modified?: string;
    name?: string;
    resourceURI?: string;
    series?: CharecterCollection;
    stories?: CharecterCollection;
    thumbnail?: {
        extension: string;
        path: string;
    };
}

export enum CharacterActions {
    CLEARED = 'character/CLEARED',
    ERROR = 'character/ERROR',
    LOADED = 'character/LOADED',
}

interface CharecterCollection {
    available?: number;
    collectionURI?: string;
    items: Resource[];
    returned?: number;
}

export enum Dimensions {
    LANDSCAPE = 'landscape',
    STANDARD = 'standard',
}

export type Dispatch = ThunkDispatch<Store, void, AnyAction>;

export interface FallbackImageProps {
    src: string;
    width?: string;
    height?: string;
}

export interface Home extends Partial<MarvelResponse> {
    error?: boolean;
    results?: Character[];
}

export enum HomeActions {
    ERROR = 'home/ERROR',
    LOADED = 'home/LOADED',
    LOADING = 'home/LOADING',
}

export interface ImageProps {
    dimension?: Dimensions;
    extension: string;
    height?: string;
    path: string;
    width?: string;
}

export interface MarvelResponse {
    count: number;
    limit: number;
    offset: number;
    results: any[];
    total: number;
}

export type MockStore = MockStoreEnhanced<Partial<Store>, Dispatch>;

export interface Options {
    [key: string]: string | number;
    apikey?: string;
    limit?: number;
    offset?: number;
}

export interface PaginatedButtonsProps {
    currentPage: number;
    numberOfButtons: number;
    numberOfPages: number;
    skip?: number;
    to: (i: number) => Partial<Location>;
}

export interface Resource {
    resourceURI: string;
    name: string;
    type?: string;
}

export interface SerializerMap extends Json {
    node: {
        type: {
            componentStyle?: {
                baseStyle?: {
                    rules: (string | ((props: StyledProps) => string))[];
                };
                rules: (string | ((props: StyledProps) => string))[];
            };
        };
    };
}

export interface Store {
    character: Character;
    home: Home;
}

export type StyledProps<Props = {}> = { theme: Theme } & Props;

export interface Theme {
    breakpoints: {
        desktop: number;
        tabletLandscape: number;
        tabletPortrait: number;
    };
    colors: {
        darkGrey: string;
        marvelRed: string;
        mediumGrey: string;
    };
}

export interface WebpackConfig {
    devServer: { historyApiFallback: boolean; open: boolean };
    entry: string[];
    mode: string;
    module: {
        rules: WebpackRule[];
    };
    output: { path?: string; publicPath: string };
    plugins: HtmlWebPackPlugin[];
    resolve: { extensions: string[] };
}

interface WebpackRule {
    exclude?: (RegExp | string)[];
    test: RegExp;
    use: {
        loader: string;
        options?: { plugins: string[] };
    };
}
