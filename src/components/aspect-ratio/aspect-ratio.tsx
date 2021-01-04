import React, { FC, ReactElement } from 'react';
import styled from 'styled-components';
import { AspectRatios, AspectRatioProps as Props, StyledProps } from '../../../types';

const Container = styled.div<StyledProps<{ ratio: AspectRatios }>>`
    padding-bottom: ${({ ratio }) => ratio}%;
    position: relative;
`;

const Child = styled.div`
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
`;

export const AspectRatio: FC<Props> = ({ children, ratio }: Props): ReactElement => (
    <Container ratio={ratio}>
        <Child>{children}</Child>
    </Container>
);
