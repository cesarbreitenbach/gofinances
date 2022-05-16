import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
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
    TransactionList,
    LogoutButton,
    LodingArea
 } from './styles';


 interface HightlightCardProps {
     amount: string;
     lastDate: string;
 }
 interface HightlightCards {
    incomings: HightlightCardProps;
    expensives: HightlightCardProps;
    total: HightlightCardProps;
 }

 export interface DataListProps extends TransactionCardProps {
     id: string;
 } 

export function DashBoard(){
    const [data, setData] = useState<DataListProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [hightlightCards, setHightlightCards] = useState<HightlightCards>({} as HightlightCards)
    
    useEffect(() => {

        getTransactions();

    }, [])

    useFocusEffect(useCallback(() => {
        getTransactions();
    }, []))

    function getLastTransactionDate(collection: DataListProps[], type: 'positive' | 'negative'){
        const lastDate = 
           Math.max.apply(Math, collection
                         .filter(item => item.type === type)
                         .map(item => new Date(item.date).getTime()))
        return new Date(lastDate).toLocaleDateString('pt-BR', {day: '2-digit', month: 'long'})
    }

    async function getTransactions(){
        const dataKey = "@gofinance:transactions";
        const result = await AsyncStorage.getItem(dataKey);
        const transactions = result ? JSON.parse(result) : [];

        setLoading(true);
        let incomings = 0;
        let expensives = 0;
        let totals = 0;

        const transactionsFormatted: DataListProps[] = transactions.map((item: DataListProps) => {

            if(item.type === 'positive') {
                incomings += Number(item.amount);
            } else {
                expensives += Number(item.amount);
            }
            
            
            const amount = Number(item.amount).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            })
            

            const date = new Date(item.date).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit'
            })

            return { 
                id: item.id,
                name: item.title,
                type: item.type, 
                category: item.category, 
                amount,
                date,
            }

        }); 

        totals = incomings - expensives;

        const lastIncomingsDate = getLastTransactionDate(transactions, 'positive');
        const lastExpensivesDate = getLastTransactionDate(transactions, 'negative');
        const interval = `01 à ${lastExpensivesDate}`

        setHightlightCards({ 
            incomings: { 
                amount: incomings.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'}),
                lastDate:  `Última entrada dia ${lastIncomingsDate}`
            },
            expensives: {
                amount: expensives.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'}),
                lastDate:  `Última saida dia ${lastExpensivesDate}`
            },
            total: {
                amount: totals.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'}),
                lastDate: interval
            }
        });
        setData(transactionsFormatted);
        setLoading(false);
    }


    return (
        <Container>
        {loading ? 
            <LodingArea>
                <ActivityIndicator size="large" color="#f00" />
            </LodingArea> : <>
            <Header>
                <UserWrapper>
                <UserInfo>
                    <Photo source={{uri: "https://avatars.githubusercontent.com/u/23219213?s=400&u=3e152e251feac26d80af7c0fa28afab18f4ebbe3&v=4.png"}} />
                    <User>
                        <UserGreeting>Olá, </UserGreeting>
                        <UserName>César</UserName>
                    </User>
                </UserInfo>
                <LogoutButton  onPress={() => {}}>
                   <Icon name="power" />
                </LogoutButton>
                </UserWrapper>
            </Header>
            <HightlightCards > 
                <HightlightCard type="up" title='Entradas' amount={hightlightCards.incomings.amount} lastTransaction={hightlightCards.incomings.lastDate}/>
                <HightlightCard type="down" title='Saidas' amount={hightlightCards.expensives.amount} lastTransaction={hightlightCards.expensives.lastDate}/>
                <HightlightCard type="total" title='Total' amount={hightlightCards.total.amount} lastTransaction={hightlightCards.total.lastDate}/>
            </HightlightCards>

            <Transactions>
                <Title>Listagem</Title>
                <TransactionList 
                  data={data}
                  keyExtractor={ item => item.id }
                  renderItem={({ item }) => <TransactionCard data={item} />}
                />
            </Transactions>
        </>}
        </Container>
    )
}
