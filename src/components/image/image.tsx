import React, { FC, ReactElement } from 'react';
import { Dimensions, ImageProps as Props } from '../../../types';

// Please see: https://developer.marvel.com/documentation/images

const dimensions = {
    [Dimensions.LANDSCAPE]: [
        { name: 'landscape_amazing', w: 250 },
        { name: 'landscape_incredible', w: 464 },
        { name: 'landscape_large', w: 190 },
        { name: 'landscape_medium', w: 175 },
        { name: 'landscape_small', w: 120 },
        { name: 'landscape_xlarge', w: 270 },
    ],
    [Dimensions.STANDARD]: [
        { name: 'standard_amazing', w: 180 },
        { name: 'standard_fantastic', w: 250 },
        { name: 'standard_large', w: 140 },
        { name: 'standard_medium', w: 100 },
        { name: 'standard_small', w: 65 },
        { name: 'standard_xlarge', w: 200 },
    ],
};

export const Image: FC<Props> = ({ dimension = Dimensions.STANDARD, extension, path, width }: Props): ReactElement => {
    return (
        <img
            src={`${path}.${extension}`}
            srcSet={dimensions[dimension]?.map(({ name, w }) => `${path}/${name}.${extension} ${w}w`).join(', ')}
            width={width}
        />
    );
};
