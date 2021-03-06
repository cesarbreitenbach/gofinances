import React from 'react';
import { Container, Category, Icon } from './stype';


interface Props {
    title: string;
    onPress: () => void;
}

export function CategorySelectButtom({title, onPress}: Props){
    return (
        <Container onPress={onPress}>
            <Category>{title}</Category>
            <Icon name="chevron-down" />
        </Container>
    )
}