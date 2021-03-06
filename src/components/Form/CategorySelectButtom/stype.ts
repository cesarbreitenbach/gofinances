import styled from 'styled-components/native';
import {Feather} from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';


export const Container = styled.TouchableOpacity.attrs({
    activityOpacity: 0.7,
})`
    background-color: ${({theme}) => theme.colors.shape};
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 16px 18px;
    margin-top: 16px;
`;

export const Category = styled.Text`
   font-family:  ${({theme}) => theme.fonts.regular};
   font-size: ${RFValue(14)}px;
   color: ${({theme}) => theme.colors.text}
`;

export const Icon = styled(Feather)``;