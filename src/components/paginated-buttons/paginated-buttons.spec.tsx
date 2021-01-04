import React from 'react';
import { shallow } from 'enzyme';
import { PaginatedButtons } from './paginated-buttons';
import { PaginatedButtonsProps as Props } from '../../../types';

describe('PaginatedButtons', () => {
    let props: Props;

    beforeEach(() => {
        props = {
            currentPage: 1,
            numberOfButtons: 5,
            numberOfPages: 10,
            to: jest.fn((i: number) => ({ search: `something=${i}` })),
        };
    });

    it('should match snapshot', () => {
        const wrapper = shallow(<PaginatedButtons {...props} skip={5} />);
        expect(wrapper).toMatchSnapshot();
    });

    it.each`
        currentPage | expectedButtons
        ${1}        | ${['1', '2', '3', '4', '5']}
        ${2}        | ${['1', '2', '3', '4', '5']}
        ${3}        | ${['1', '2', '3', '4', '5']}
        ${4}        | ${['2', '3', '4', '5', '6']}
        ${5}        | ${['3', '4', '5', '6', '7']}
        ${6}        | ${['4', '5', '6', '7', '8']}
        ${7}        | ${['5', '6', '7', '8', '9']}
        ${8}        | ${['6', '7', '8', '9', '10']}
        ${9}        | ${['6', '7', '8', '9', '10']}
        ${10}       | ${['6', '7', '8', '9', '10']}
    `('should render correct array of buttons for current page of $currentPage', ({ currentPage, expectedButtons }) => {
        const wrapper = shallow(<PaginatedButtons {...props} currentPage={currentPage} />);
        const buttons = wrapper.find({ 'data-test-id': 'button' });

        buttons.forEach((button, i) => {
            expect(button.text()).toBe(expectedButtons[i]);
            expect(button.prop('$active')).toBe(Number(button.text()) === currentPage);
        });
    });

    it('should disabled skip forward button if skip value is greater than remaining buttons', () => {
        const wrapper = shallow(<PaginatedButtons {...props} currentPage={6} skip={5} />);
        expect(wrapper.find({ 'data-test-id': 'skip' }).last().prop('disabled')).toBe(true);
    });

    it('should render less buttons if there are less pages than requested buttons to display', () => {
        const wrapper = shallow(<PaginatedButtons {...props} numberOfPages={4} />);
        expect(wrapper.find({ 'data-test-id': 'button' }).length).toBe(4);
    });
});
