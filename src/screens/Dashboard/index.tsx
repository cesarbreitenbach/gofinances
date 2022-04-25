import React from 'react';
import { HightlightCard } from '../../components/HightlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';

import { 
    Container,
    Header,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    UserWrapper,
    Icon,
    HightlightCards,
    Transactions,
    Title,
    TransactionList
 } from './styles';

 export interface DataListProps extends TransactionCardProps {
     id: string;
 } 

export function DashBoard(){
    const data: DataListProps[] = [
    {
        id: '1',
        type: 'positive',
        title: 'Desenvolvimento de Site', 
        amount: "R$ 12.000,00", 
        category: {
            name: "vendas", 
            icon: "dollar-sign",
        },
        date:"12/12/2021",
    },
    {
        id: '2',
        type: 'negative',
        title: 'Hamburger', 
        amount: "R$ 40,00", 
        category: {
            name: "alimentação", 
            icon: "coffee",
        },
        date:"13/12/2021",
    },
    {
        id: '3',
        type: 'negative',
        title: 'Pagamento aluguel', 
        amount: "R$ 1.000,00", 
        category: {
            name: "casa", 
            icon: "shopping-bag",
        },
        date:"12/12/2021",
    },
];
    return (
        <Container>
            <Header>
                <UserWrapper>
                <UserInfo>
                    <Photo source={{uri: "https://avatars.githubusercontent.com/u/23219213?s=400&u=3e152e251feac26d80af7c0fa28afab18f4ebbe3&v=4.png"}} />
                    <User>
                        <UserGreeting>Olá, </UserGreeting>
                        <UserName>César</UserName>
                    </User>
                </UserInfo>
                <Icon name="power" />
                </UserWrapper>
            </Header>
            <HightlightCards > 
                <HightlightCard type="up" title='Entradas' amount='R$ 17.400,00' lastTransaction="Última entrada dia 13 de abril"/>
                <HightlightCard type="down" title='Saidas' amount='R$ 400,00' lastTransaction="Última saída dia 03 de abril"/>
                <HightlightCard type="total" title='Total' amount='R$ 17.000,00' lastTransaction="01 à 16 de abril"/>
            </HightlightCards>

            <Transactions>
                <Title>Listagem</Title>
                <TransactionList 
                  data={data}
                  keyExtractor={ item => item.id }
                  renderItem={({ item }) => <TransactionCard data={item} />}
                />
            </Transactions>
        </Container>
    )
}
