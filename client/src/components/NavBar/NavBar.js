import React, {useContext} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {Navbar, Nav, Container, Button} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

import {Context} from '../../index';
import { ACCOUNT_ROUTE, PEOPLE_ROUTE } from "../../utils/consts";

import './navBar.sass';


const NavBar = observer(() => {
    const {auth} = useContext(Context);
    const navigate = useNavigate();

    const logOut = () => {
        auth.setIsAuth(false);
        auth.setUserId('');
        localStorage.clear();
    };

    return (
        <>
            {auth.isAuth ?
                <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" sticky="top">
                    <Container>
                        <NavLink className="nav-link" to={ACCOUNT_ROUTE}>ПРОФИЛЬ</NavLink>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav" className='justify-content-around'>
                            <Nav className="ms-auto" style={{color: 'white'}}>
                                <Button
                                    variant={"outline-light"}
                                    className="me-2 nav-btn"
                                    onClick={() => navigate(PEOPLE_ROUTE)}
                                    >Пользователи
                                </Button>                                                         
                                <Button 
                                    variant={"outline-light"} 
                                    onClick={() => logOut()} 
                                    className="ms-2 nav-btn"
                                    >Выйти
                                </Button>  
                            </Nav>
                        </Navbar.Collapse>       
                    </Container>
                </Navbar>
            :
            <div></div>
            }
        </>       
    );
});

export default NavBar;