import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

interface ContainerProps{
    color: string;
}

export const Container = styled.View<ContainerProps>`
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    background-color: ${({theme}) => theme.colors.shape};
    border-left-width: 5px;
    border-left-color: ${({color}) => color};
    border-radius: 5px;
    padding: 14px 25px;
`

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.medium};
    font-size: ${RFValue(15)}px;
    line-height: ${RFValue(22)}px;
`;

export const Amount = styled.Text`
    font-family: ${({theme}) => theme.fonts.bold};
    font-size: ${RFValue(15)}px;
    line-height: ${RFValue(22)}px;
    `;