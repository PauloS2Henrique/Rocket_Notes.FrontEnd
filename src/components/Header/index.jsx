import { RiShutDownLine } from 'react-icons/ri'
import { userAuth } from '../../hooks/auth'
import { Container, Profile, Logout } from "./styles";
import { api } from '../../services/api'

import avatarPlaceholder from "../../assets/avatar.svg"
import { useNavigate } from 'react-router-dom';

export function Header() {
    const { signOut, user } = userAuth();
    const navigation = useNavigate();

    function handleSignOut (){
        navigation("/");
        signOut();
    };

    const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;

    return (   
        <Container>
            <Profile to="/profile">
                <img 
                src={avatarUrl} 
                alt={user.name}
                />

                <div>
                    <span>Bem vindo</span>
                    <strong>{user.name}</strong>
                </div>
            </Profile>

                <Logout onClick={handleSignOut}> 
                    <RiShutDownLine />
                </Logout>

        </Container>
    )
}