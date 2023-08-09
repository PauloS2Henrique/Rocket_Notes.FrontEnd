import { useState } from "react"
import { FiMail, FiLock} from "react-icons/fi"
import { Link } from 'react-router-dom'

import { userAuth } from '../../hooks/auth'

import { Input } from '../../components/input'
import { Button } from '../../components/button'

import { Container, Form, Background } from './styles'

export function SignIn(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { signIn} = userAuth();

    function handleSingIn(){
        signIn({email, password})
    }

    return(
        <Container>
            <Form>
                <h1>
                    Rocket Notes
                </h1>

                <p>
                    Aplicação para salvar e gerenciar seus link uteis.
                </p>

                <h2>
                    Faça seu login 
                </h2>

                <Input 
                placeholder="E-mail"
                type="text"
                icon={FiMail}
                onChange={e => setEmail(e.target.value)}
                />

                
                <Input 
                placeholder="Senha"
                type="password"
                icon={FiLock}
                onChange={e => setPassword(e.target.value)}
                />

                <Button title ="Entrar" onClick={handleSingIn}/>

                <Link to="/register">
                    Criar conta
                </Link>
            </Form>

            <Background />
        </Container>
    )
}