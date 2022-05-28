import React, { useContext } from 'react';
import { Container, Header, SigninTitle, Title, TitleWrapper, Footer, FooterWrapper } from './styles';

import Applesvg from '../../assets/apple.svg';
import Googlesvg from '../../assets/google.svg';
import Logosvg from '../../assets/logo.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import { SignInSocialButton } from '../../components/SignInSocialButton';

import { useAuth } from '../../hooks/auth';

export function Signin(){
    const data = useAuth();
    console.log(data)
    return(
        <Container>
            <Header>
                <TitleWrapper>
                    <Logosvg
                        width={RFValue(50)}
                        height={RFValue(50)} 
                    />
                    <Title>
                      Controle suas {`\n`}
                      finanças de forma {`\n`}
                      muito simples {`\n`}
                    </Title>
                </TitleWrapper>
                <SigninTitle> 
                    Faça seu login com {`\n`}
                    uma das contas abaixo
                </SigninTitle>
            </Header>

            <Footer>
                <FooterWrapper>
                    <SignInSocialButton title='Entrar com o Google' svg={Googlesvg} />
                    <SignInSocialButton title='Entrar com a Apple' svg={Applesvg} />
                </FooterWrapper>

            </Footer>

        </Container>
    );
} 