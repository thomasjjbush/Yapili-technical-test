import React, { FC, ReactElement, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { loadCharacters } from './home.redux';
import { AspectRatio } from '../../components/aspect-ratio/aspect-ratio';
import { PaginatedButtons } from '../../components/paginated-buttons/paginated-buttons';
import { Image } from '../../components/image/image';
import { AspectRatios, Home as HomeState, Store, StyledProps } from '../../../types';
import { Grid } from '../../components/grid/grid';

const Character = styled(Link)<StyledProps>`
    background-color: ${({ theme }): string => theme.colors.darkGrey};
    border-bottom: solid 5px ${({ theme }): string => theme.colors.marvelRed};
    overflow: hidden;
`;

const CharacterInfo = styled.div`
    overflow: hidden;
    padding: 20px;
`;

const Description = styled.p`
    margin: 20px 0 0;
`;

const Name = styled.h1`
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const Home: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const { results, total } = useSelector<Store, HomeState>((state) => state.home);
    const page = Math.max(Number(new URLSearchParams(useLocation().search).get('page')), 1);

    const to = useCallback((i: number) => ({ search: `page=${i}` }), []);

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(loadCharacters(page - 1));
    }, [page]);

    return (
        <div>
            <Grid desktop={4} gap={30} mobile={1} tablet={2}>
                {results?.map(({ description, id, name, thumbnail }) => (
                    <Character to={`/character/${id}`} key={id}>
                        <AspectRatio ratio={AspectRatios['1:1']}>
                            {thumbnail && (
                                <Image
                                    extension={thumbnail.extension}
                                    height="100%"
                                    path={thumbnail.path}
                                    width="100%"
                                />
                            )}
                        </AspectRatio>
                        <CharacterInfo>
                            <Name>{name}</Name>
                            {description && <Description>{description}</Description>}
                        </CharacterInfo>
                    </Character>
                ))}
            </Grid>
            {total && (
                <PaginatedButtons
                    currentPage={page}
                    numberOfButtons={5}
                    numberOfPages={Math.floor(total / 20)}
                    skip={5}
                    to={to}
                />
            )}
        </div>
    );
};
