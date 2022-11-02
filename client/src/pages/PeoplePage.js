import React, {useEffect, useState, useContext} from 'react';
import {Card, Container, Image, Spinner} from 'react-bootstrap';

import { fetchUsers } from '../http/userAPI';
import { calc } from '../utils/calc';
import {Context} from '../index';

import './peoplePage.sass';


const PeoplePage = () => {
    const {auth} = useContext(Context);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers()
            .then((data) => setUsers(data))
            .finally(() => setLoading(false));
    }, []);

    const usersWithoutAuth = users.filter(user => user._id !== auth.userId);

    if (loading) {
        return <Spinner animation={"border"}/>
    }

    return (
        <Container className="people">
            <h1 className="people__title">Пользователи системы</h1>
            <div className="people__wrapper">
                {usersWithoutAuth.map(user =>
                    <Card key={user.id} className="people__card shadow" >
                        <Image className="people__img" src={process.env.REACT_APP_API_URL + user.photo} />
                        <div className="people__text">
                            <div><span>{user.name}</span></div>
                            <div>Возраст: {calc(user.birthday)}</div>
                        </div>
                    </Card>  
                )}
            </div>            
        </Container>
    );
};

export default PeoplePage;