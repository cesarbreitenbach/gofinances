import React from 'react';
import { FlatList } from 'react-native';
import { Buttom } from '../../components/Form/Buttom';
import { categories } from '../../utils/categories';
import { Container, Header, Title, Category, Icon, Name, Separator, Footer } from './style';

interface Category {
    key: string;
    name: string;
}

interface Props {
    category: Category;
    setCategory: (category: Category) => void;
    closeSelectCategory: () => void;
}

export function CategorySelect({category, setCategory, closeSelectCategory}: Props){
    function handleSetCategory(c: Category) {
        if(category.key === c.key) {
            setCategory({
                key: 'category',
                name: 'Categoria',
            });
            return;
        }
        setCategory(c);
    }
    return(
        <Container>
            <Header>
                <Title>Categoria</Title>
            </Header>

            <FlatList 
               data={categories}
               style={{ flex: 1, width: '100%' }}
               keyExtractor={(item) => item.key}
               renderItem={({item}) => (
                   <Category isActive={item.key === category.key} onPress={() => handleSetCategory(item)}>
                       <Icon name={item.icon} />
                       <Name>{item.name}</Name>
                   </Category>
               )}
               ItemSeparatorComponent={() => <Separator />}
            />

            <Footer>
                <Buttom title="Selecionar" onPress={closeSelectCategory}/>
            </Footer>
        </Container>
    )
}