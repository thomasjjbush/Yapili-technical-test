import { MarvelResponse, Options } from '../../../types';

export const db = (endpoint: string, overrides?: Options): Promise<MarvelResponse> => {
    const params: Options = { apikey: process.env.PUBLIC_KEY, ...overrides };
    return fetch(
        `${process.env.MARVEL_DOMAIN}${endpoint}${Object.keys(params).reduce(
            (acc, key, i) => acc + `${i ? '&' : '?'}${key}=${params[key]}`,
            '',
        )}`,
    )
        .then((res) => res.json())
        .then((res: { data: MarvelResponse }) => res.data);
};
