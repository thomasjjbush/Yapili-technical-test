import React, { FC, ReactElement, Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { StyledProps } from '../../../types';
import { store } from '../../store/store';
import { lazy } from '../../utils/lazy/lazy';

const GlobalStyles = createGlobalStyle<StyledProps>`
    body {
        background-color: ${({ theme }): string => theme.colors.mediumGrey};
        font-family: Sans-serif;
        margin: 0;
        padding: 30px;

        * {
            box-sizing: border-box;
            color: #ffffff;
            text-decoration: none;

            &:focus {
                outline: dashed 2px ${({ theme }): string => theme.colors.marvelRed};
            }
        }
    }
`;

const routes = [
    { path: '/', component: lazy(import('./../home/home'), 'Home') },
    { path: '/character/:id', component: lazy(import('./../character/character'), 'Character') },
];

const theme = {
    breakpoints: { desktop: 1200, tabletLandscape: 1024, tabletPortrait: 768 },
    colors: { marvelRed: '#e62429', darkGrey: '#151515', mediumGrey: '#202020' },
};

export const App: FC = (): ReactElement => {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <GlobalStyles />
                <Router>
                    <Suspense fallback={<p>Loading!</p>}>
                        <Switch>
                            {routes.map(({ component: Component, path }) => (
                                <Route exact key={path} path={path}>
                                    <Component />
                                </Route>
                            ))}
                        </Switch>
                    </Suspense>
                </Router>
            </ThemeProvider>
        </Provider>
    );
};
