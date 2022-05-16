import React, { useEffect, useState } from 'react';
import {Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';
import { Buttom } from '../../components/Form/Buttom';
import { CategorySelectButtom } from '../../components/Form/CategorySelectButtom';
import { InputForm } from '../../components/Form/InputForm';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {NavigationProp, ParamListBase, useNavigation} from '@react-navigation/native';
import { useForm,  } from 'react-hook-form';
import { TransactionTypeButtom } from '../../components/Form/TransactionTypeButtom';
import { CategorySelect } from '../CategorySelect';
import { 
    Container,
    Form,
    Header,
    Title,
    Fields,
    TransactionArea,
} from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

interface FormData {
    name: string;
    amount: string;
    error: string;
}

const schema = Yup.object().shape({
    name: Yup.string()
             .required('Nome é obrigatorio'),
    amount: Yup.number()
               .typeError('Informe um valor numerico')
               .positive('O valor não po222de ser negativo'),
})

export function Register(){
    const dataKey = "@gofinance:transactions";
    const [activeTransaction, setActiveTransaction] = useState('');
    const { navigate }: NavigationProp<ParamListBase> = useNavigation();
    const [showModal, setShowModal] = useState(false);
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    });

    const { 
        control,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm({
        resolver: yupResolver(schema)
    });

    function handleActiveTransaction(active: string){
        setActiveTransaction(active);
    }

    function handleOpenModal() {
        setShowModal(true);
    }

    function handleCloseModal() {
        setShowModal(false);
    }

    async function handleRegister(form: Partial<FormData>) {
        if(!activeTransaction) 
           return Alert.alert('Selecione o tipo de transaçao');
        
        if(category.key === 'category')
           return Alert.alert('Selecione uma categoria');
        
        const newData = {
            id: String(uuid.v4()),
            name: form.name,
            amount: form.amount,
            type: activeTransaction === 'up' ? 'positive' : 'negative',
            category: category.key,
            date: new Date(),

        }

        try {

           const data =  await AsyncStorage.getItem(dataKey);

           const currentData = data ? JSON.parse(data) : [];

           const formattedData = [
               ...currentData,
               newData,
           ]

           await AsyncStorage.setItem(dataKey, JSON.stringify(formattedData));  
           
           setActiveTransaction('');
           setCategory({
            key: 'category',
            name: 'Categoria',
           });
           reset();
           navigate('Listagem');

        } catch (err) {
            console.log(err);
            Alert.alert('Não consegui salvar');
        }
    }

    // useEffect(() => {
    //     async function getStorage(){
    //      await AsyncStorage.removeItem(dataKey);
    //      const data: any = await AsyncStorage.getItem(dataKey);
    //      console.log(JSON.parse(data));
    //     }
    //     getStorage();
    // }, [])

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <Header>
                    <Title>Cadastro</Title>
                </Header>
                <Form>
                <Fields> 
                    <InputForm
                        control={control}
                        name="name" 
                        placeholder='Nome'
                        autoCapitalize='sentences'
                        autoCorrect={false}
                        error={errors.name && errors.name.message}
                    />
                    <InputForm
                        control={control}
                        name="amount" 
                        keyboardType='numeric'
                        placeholder='Preço'
                        error={errors.amount && errors.amount.message}
                        />
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
                    <CategorySelectButtom title={category.name} onPress={handleOpenModal}/>
                </Fields>
                <Buttom title='Enviar' onPress={handleSubmit(handleRegister)} />
                </Form>

                <Modal visible={showModal}>
                    <CategorySelect 
                        category={category}
                        setCategory={setCategory}
                        closeSelectCategory={handleCloseModal}                
                    />
                </Modal>
            </Container>
        </TouchableWithoutFeedback>
    );
}