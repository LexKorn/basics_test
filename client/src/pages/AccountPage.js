import React, {useEffect, useState} from 'react';
import {Button, Container, Image, Spinner} from 'react-bootstrap';

import { fetchOneUser } from '../http/userAPI';
import { calc } from '../utils/calc';

import './accountPage.sass';


const AccountPage = () => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const id = '6360fca55155fad393194656';

    useEffect(() => {
        fetchOneUser(id)
            .then((data) => setUser(data))
            .finally(() => setLoading(false));
    }, []);

    const onEdit = () => {};

    if (loading) {
        return <Spinner animation={"border"}/>
    }

    return (
        <Container className="account">
            <h1 className="account__title">Профиль {user.email}</h1>
            <div className="account__wrapper">
                <Image className="account__img" src={process.env.REACT_APP_API_URL + user.photo} />
                <div className="account__text">
                    <div>Имя: <span>{user.name}</span></div>
                    <div>Дата рождения : {user.birthday.slice(0, 10)} (возраст: {calc(user.birthday)})</div>
                    <div>Пол: {user.sex}</div>
                    <Button 
                        variant={"outline-dark"} 
                        onClick={onEdit} 
                        className="mt-3"
                        >Редактировать
                    </Button>  
                </div> 
            </div>                                   
        </Container>
    );
};

export default AccountPage;