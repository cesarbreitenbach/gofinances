import React from 'react';
import { ResumeCard } from '../../components/ResumeCard';
import { Container, Header, Title } from './styles';

export function Resume(){
    return (
        <Container>
            <Header>
                <Title>Resumo por categoria</Title>
            </Header>
            <ResumeCard title="Teste" amount="200,00" color="red" />
        </Container>
    )
}