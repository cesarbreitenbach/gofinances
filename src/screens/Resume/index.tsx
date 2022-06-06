import React, {useCallback, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ResumeCard } from '../../components/ResumeCard';
import { Container, Content, Header, Title, MonthSelect, MonthSelectButton, MonthSelectIcon, Month } from './styles';
import { categories } from '../../utils/categories';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {useTheme} from 'styled-components';
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';
interface TransactionsProps {
    type: 'positive' | 'negative',
    title: string;
    amount: string;
    category: string;
    date: string;
}

interface CategoryData {
    id: string;
    name: string;
    totalFormatted: string;
    total: number;
    color: string;
    percent: string;
}

export function Resume(){

    const [data, setData] = useState<CategoryData[]>([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const { user } = useAuth();

    const theme = useTheme()

    function handleChangeDate(action: 'next' | 'prev') {
        if (action === 'next') {
            setSelectedDate(addMonths(selectedDate, 1));
        } else {
            setSelectedDate(subMonths(selectedDate, 1));
        }
    }

    async function loadData(){
        const dataKey = `@gofinance:transactions_user:${user.id}`
        const response = await AsyncStorage.getItem(dataKey);
        const responseFormatted = response ? JSON.parse(response) : [];

        const outcommings = responseFormatted.filter((item: TransactionsProps) => 
           item.type === 'negative' 
           && new Date(item.date).getFullYear() === new Date(selectedDate).getFullYear() && 
          new Date(item.date).getMonth() === new Date(selectedDate).getMonth()
        );

        const totalOutcommings = outcommings.reduce((sum: number, item: TransactionsProps) => {
           return sum + item.amount
        }, 0);

        const totalByCategories: CategoryData[] = [];

        categories.forEach(category => {
            let categorySum = 0;

            outcommings.forEach((item: TransactionsProps) => {
                if (item.category === category.key) {
                    categorySum += Number(item.amount);
                }
            
            });

            if (categorySum >  0 ) {
                let total = categorySum.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })

                let percent = `${((categorySum / totalOutcommings) * 100).toFixed(0)}%`;
    
                totalByCategories.push({
                    id: category.key,
                    name: category.name,
                    color: category.color,
                    total: categorySum,
                    totalFormatted: total,
                    percent,
                })
            }

        });

        setData(totalByCategories);

    }

    useFocusEffect(useCallback(() => {
        loadData();
    }, [selectedDate]))

    return (
        <Container>
            <Header>
                <Title>Resumo por categoria</Title>
            </Header>

            <Content
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{padding: 16, flexGrow: 1}}
            >
                <MonthSelect>
                    <MonthSelectButton onPress={() => handleChangeDate('prev')}>
                        <MonthSelectIcon name="chevron-left"/>
                    </MonthSelectButton>
                <Month>{ format(selectedDate, 'MMMM yyyy', { locale: ptBR})}</Month>
                    <MonthSelectButton onPress={() => handleChangeDate('next')}>
                        <MonthSelectIcon name="chevron-right" />
                    </MonthSelectButton>
                </MonthSelect>
                <VictoryPie 
                    data={data}
                    style={{ labels: {
                        fontSize: RFValue(18),
                        fontWeight: 'bold',
                        fill: theme.colors.shape
                    } }}
                    labelRadius={110}
                    colorScale={data.map(item => item.color)}
                    x="percent" 
                    y="total"
                />
                {data.map((item: CategoryData) => (
                    <ResumeCard key={item.id} title={item.name} amount={item.totalFormatted} color={item.color} />
                ))}
            </Content>


        </Container>
    )
}