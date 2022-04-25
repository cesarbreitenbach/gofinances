import styled from 'styled-components/native';
import { FlatList, FlatListProps } from 'react-native'
import { Platform } from 'react-native';
import { Feather } from '@expo/vector-icons'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper'

import { DataListProps } from '.'

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
`

export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(42)}px;
  background-color: ${({theme}) => theme.colors.primary};
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
`

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const Photo = styled.Image` 
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;
  border-radius: ${RFValue(24)}px;
`;
export const User = styled.View`
  margin-left: 17px;
`;
export const UserWrapper = styled.View`
  flex-direction: row;
  width: 100%;
  padding: 0 24px;
  justify-content: space-between;
  align-items: center;
  margin-top: ${ Platform.OS === 'ios' ? getStatusBarHeight() + RFValue(28) : RFValue(38)}px;
`;
export const UserGreeting = styled.Text`
  color: ${({theme}) => theme.colors.shape};
  font-size: ${RFValue(18)}px;
  font-family: ${({theme}) => theme.fonts.regular};
`;
export const UserName = styled.Text` 
  color: ${({theme}) => theme.colors.shape};
  font-size: ${RFValue(18)}px;
  font-family: ${({theme}) => theme.fonts.bold};
`;

export const Icon = styled(Feather)`
  color: ${({theme}) => theme.colors.secundary};
  font-size: ${RFValue(24)}px;
`;

export const HightlightCards = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingLeft: 24 },
})`
  width: 100%;
  position: absolute;
  margin-top: ${RFPercentage(20)}px;
`

export const Transactions = styled.View`
  flex: 1;
  padding: 0 24px;

  margin-top: ${RFPercentage(12)}px;
`

export const Title = styled.Text`
  margin-bottom: 16px;
  color: ${({theme}) => theme.colors.text_dark};
  font-size: ${RFValue(18)}px;
  font-family: ${({theme}) => theme.fonts.regular};
`

export const TransactionList = styled(
  FlatList as new (props: FlatListProps<DataListProps>) => FlatList<DataListProps>
  ).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle:{
    paddingBottom: getBottomSpace()
  }
})`
`;