import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ResumeCard } from '../../components/ResumeCard';
import { Container, Content, Header, Title } from './styles';
import { categories } from '../../utils/categories';

interface TransactionsProps {
    type: 'positive' | 'negative',
    title: string;
    amount: string;
    category: string;
    date: string;
}

interface CategoryData {
    name: string;
    total: string;
    color: string;
}

export function Resume(){

    const [data, setData] = useState<CategoryData[]>([]);

    async function loadData(){
        const dataKey = "@gofinance:transactions";
        const response = await AsyncStorage.getItem(dataKey);
        const responseFormatted = response ? JSON.parse(response) : [];

        const outcommings = responseFormatted.filter((item: TransactionsProps) => item.type === 'negative');

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
    
                totalByCategories.push({
                    name: category.name,
                    color: category.color,
                    total
                })
            }

        });

        setData(totalByCategories);

    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <Container>
            <Header>
                <Title>Resumo por categoria</Title>
            </Header>

            <Content>
                {data.map((item: CategoryData) => (
                    <ResumeCard title={item.name} amount={item.total} color={item.color} />
                ))}
            </Content>


        </Container>
    )
}