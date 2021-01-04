import React from 'react';
import { shallow } from 'enzyme';
import { AspectRatios } from '../../../types';
import { AspectRatio } from './aspect-ratio';

describe('AspectRatio', () => {
    it.each`
        ratio
        ${AspectRatios['16:9']}
        ${AspectRatios['1:1']}
        ${AspectRatios['4:3']}
    `('Should produce correct styles for $ratio', ({ ratio }) => {
        expect(shallow(<AspectRatio ratio={ratio}>Child</AspectRatio>)).toMatchSnapshot();
    });
});
