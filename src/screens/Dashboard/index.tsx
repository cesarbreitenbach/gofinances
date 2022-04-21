import React from 'react';
import { HightlightCard } from '../../components/HightlightCard';

import { 
    Container,
    Header,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    UserWrapper,
    Icon
 } from './styles';

export function DashBoard(){
    return (
        <Container>
            <Header>
                <UserWrapper>
                <UserInfo>
                    <Photo source={{uri: "https://avatars.githubusercontent.com/u/23219213?s=400&u=3e152e251feac26d80af7c0fa28afab18f4ebbe3&v=4.png"}} />
                    <User>
                        <UserGreeting>Olá, </UserGreeting>
                        <UserName>César</UserName>
                    </User>
                </UserInfo>
                <Icon name="power" />
                </UserWrapper>
            </Header>

            <HightlightCard />
            
        </Container>
    )
}
