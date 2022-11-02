import React, {useEffect, useState, useContext} from 'react';
import {Button, Container, Image, Spinner, Form} from 'react-bootstrap';
import {observer} from 'mobx-react-lite'

import { fetchOneUser, updateUser } from '../http/userAPI';
import { calc } from '../utils/calc';
import {Context} from '../index';

import './accountPage.sass';


const AccountPage = observer(() => {
    const {auth} = useContext(Context);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(false);    
    const [name, setName] = useState(user.name);
    const [password, setPassword] = useState('');
    const [file, setFile] = useState(null);

    useEffect(() => {
        fetchOneUser(auth.userId)
            .then((data) => setUser(data))
            .finally(() => setLoading(false));
    }, []);

    const selectFile = e => { 
        setFile(e.target.files[0]);
    };

    const onEdit = async () => {
        if (!password.trim() || !name.trim()) {
            return alert('Все поля обязательны для заполнения');
        } else if (!file) {
            return alert('Фото необходимо загрузить');
        }

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('password', password);          
            formData.append('photo', file);

            await updateUser(auth.userId, formData);
            setVisible(false);
            window.location.reload();
            
        } catch (err) {
            alert(err);
        }
    };

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
                        onClick={() => setVisible(true)} 
                        className="mt-3"
                        >Редактировать
                    </Button>  
                    { visible && <div>
                        <Form className="d-flex flex-column mt-3">
                            <Form.Control
                                className="mt-3"
                                placeholder="Введите новое имя..."
                                value={name}
                                onChange={e => setName(e.target.value)}
                                type='text'
                            />
                            <Form.Control
                                className="mt-3"
                                placeholder="Введите новый пароль..."
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                type='password'
                            />                        
                            <label htmlFor="file" className="mt-3">Загрузите новое фото</label> 
                            <Form.Control
                                type="file"
                                onChange={selectFile}
                            />
                            <div className="d-flex justify-content-between mt-3">                            
                                <Button 
                                    onClick={() => setVisible(false)}
                                    variant={"outline-secondary"}
                                    >Отмена
                                </Button>                                           
                                <Button 
                                    onClick={onEdit}
                                    variant={"outline-danger"}
                                    >Обновить
                                </Button>
                            </div>    
                        </Form>                        
                    </div>}                    
                </div> 
            </div>
        </Container>
    );
});

export default AccountPage;