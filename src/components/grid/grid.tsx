import styled from 'styled-components';

export const Grid = styled.div<{
    contentHeight?: boolean;
    desktop?: number;
    gap?: number;
    mobile: number;
    tablet?: number;
}>`
    display: grid;
    grid-gap: ${({ gap }): number => gap || 0}px;
    grid-template-columns: repeat(1, 1fr);

    ${({ contentHeight }) => contentHeight && `align-items: start;`}

    ${({ tablet, theme }) =>
        tablet &&
        `
        @media only screen and (min-width: ${theme.breakpoints.tabletPortrait}px) {
            grid-template-columns: repeat(${tablet}, 1fr);
        }
    `}

    ${({ desktop, theme }) =>
        desktop &&
        `
        @media only screen and (min-width: ${theme.breakpoints.desktop}px) {
            grid-template-columns: repeat(${desktop}, 1fr);
        }
    `}
`;
