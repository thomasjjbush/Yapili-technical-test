import React from 'react';
import { shallow } from 'enzyme';
import { Image } from './image';
import { Dimensions, ImageProps as Props } from '../../../types';

describe('Image', () => {
    const props: Props = {
        extension: 'ext',
        path: 'path',
    };

    it('should add correct src prop', () => {
        expect(shallow(<Image {...props} />).prop('src')).toBe('path.ext');
    });

    it('should add correct width prop', () => {
        expect(shallow(<Image {...props} width="100%" />).prop('width')).toBe('100%');
    });

    it.each`
        dimension               | expected
        ${Dimensions.LANDSCAPE} | ${'path/landscape_amazing.ext 250w, path/landscape_incredible.ext 464w, path/landscape_large.ext 190w, path/landscape_medium.ext 175w, path/landscape_small.ext 120w, path/landscape_xlarge.ext 270w'}
        ${Dimensions.STANDARD}  | ${'path/standard_amazing.ext 180w, path/standard_fantastic.ext 250w, path/standard_large.ext 140w, path/standard_medium.ext 100w, path/standard_small.ext 65w, path/standard_xlarge.ext 200w'}
    `('should return correct srcSet for $dimension', ({ dimension, expected }) => {
        expect(shallow(<Image {...props} dimension={dimension} />).prop('srcSet')).toBe(expected);
    });
});
