import React, { FC, ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { loadCharacter } from './character.redux';
import { Grid } from '../../components/grid/grid';
import { Image } from '../../components/image/image';
import {
    Character as CharacterS,
    CharacterActions,
    Dimensions,
    Resource as ResourceT,
    Store,
    StyledProps,
} from '../../../types';

const Container = styled.div`
    margin: auto;
    max-width: 800px;
    position: relative;

    img {
        margin-bottom: 30px;
    }
`;

const List = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
`;

const ListItem = styled.li<StyledProps>`
    padding: 10px;
    &:not(:last-of-type) {
        border-bottom: solid 2px ${({ theme }) => theme.colors.marvelRed};
    }
`;

const Resource = styled.div`
    border: solid 2px #ffffff;
    border-radius: 5px;
`;

const renderResource = (name: string, items: ResourceT[]): ReactElement => (
    <Resource>
        <h1>{name}</h1>
        <List>
            {items.map(({ resourceURI, name }) => (
                <ListItem key={resourceURI}>{name}</ListItem>
            ))}
        </List>
    </Resource>
);

export const Character: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const { comics, error, name, series, stories, thumbnail } = useSelector<Store, CharacterS>(
        (state) => state.character,
    );
    const { goBack } = useHistory();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        dispatch(loadCharacter(Number(id)));
        return () => dispatch({ type: CharacterActions.CLEARED });
    }, [id]);

    if (error) return <p>error!</p>;
    if (!name) return <p>loading!</p>;

    return (
        <Container>
            <h1>{name}</h1>
            {thumbnail && (
                <Image
                    dimension={Dimensions.LANDSCAPE}
                    extension={thumbnail.extension}
                    path={thumbnail.path}
                    width="100%"
                />
            )}
            <Grid contentHeight desktop={3} gap={30} mobile={1} tablet={2}>
                {renderResource('Comics', comics.items)}
                {renderResource('Series', series.items)}
                {renderResource('Stories', stories.items)}
            </Grid>
            <button aria-label="Go back" onClick={goBack} type="button">
                🏠
            </button>
        </Container>
    );
};
