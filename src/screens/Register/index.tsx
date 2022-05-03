import React, { useState } from 'react';
import {Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';
import { Buttom } from '../../components/Form/Buttom';
import { CategorySelectButtom } from '../../components/Form/CategorySelectButtom';
import { InputForm } from '../../components/Form/InputForm';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
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
    const [activeTransaction, setActiveTransaction] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    });

    const { 
        control,
        handleSubmit,
        formState: {errors}
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

    function handleRegister(form: Partial<FormData>) {
        if(!activeTransaction) 
           return Alert.alert('Selecione o tipo de transaçao');
        
        if(category.key === 'category')
           return Alert.alert('Selecione uma categoria');
        
        const data = {
            name: form.name,
            amount: form.amount,
            activeTransaction,
            category: category.key,

        }
        console.log(data)
    }

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