import React, { useState } from 'react';
import {Text} from 'react-native';
import { Buttom } from '../../components/Form/Buttom';
import { CategorySelect } from '../../components/Form/CategorySelect';
import { Input } from '../../components/Form/Input';
import { TransactionTypeButtom } from '../../components/Form/TransactionTypeButtom';
import { 
    Container,
    Form,
    Header,
    Title,
    Fields,
    TransactionArea,
} from './styles';

export function Register(){
    const [activeTransaction, setActiveTransaction] = useState('');

    function handleActiveTransaction(active: string){
        setActiveTransaction(active);
    }

    return (
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>
            <Form>
               <Fields> 
                  <Input placeholder='Nome'/>
                  <Input placeholder='Preço'/>
                  <TransactionArea>
                     <TransactionTypeButtom 
                        type='up' 
                        title='Entrada' 
                        isActive={activeTransaction === 'up'}
                        onPress={() => handleActiveTransaction('up')}/>
                     <TransactionTypeButtom 
                        type='down' 
                        title='Saida' 
                        isActive={activeTransaction === 'down'}
                        onPress={() => handleActiveTransaction('down')}/>
                  </TransactionArea>
                  <CategorySelect title="Categoria" />
               </Fields>
               <Buttom title='Enviar' />
            </Form>
        </Container>
    );
}