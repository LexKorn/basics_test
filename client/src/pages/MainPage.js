import React, {useState, useContext, useEffect} from 'react';
import {Container, Form, Card, Button, Dropdown} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {observer} from 'mobx-react-lite'

import {ACCOUNT_ROUTE} from '../utils/consts';
import { login, registration } from '../http/userAPI';
import {Context} from '../index';


const MainPage = observer(() => {
    const {user} = useContext(Context);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [file, setFile] = useState(null);
    const [sex, setSex] = useState('');
    const [toggle, setToggle] = useState(true);

    const selectFile = e => { 
        setFile(e.target.files[0]);
    };

    const onRegister = async () => {
        if (!email.trim() || !password.trim() || !name.trim() || !birthday.trim() || !sex.trim()) {
            return alert('Все поля обязательны для заполнения');
        } else if (!file) {
            return alert('Фото необходимо загрузить');
        }

        try {
            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);
            formData.append('name', name);   
            formData.append('birthday', birthday);          
            formData.append('photo', file);
            formData.append('sex', sex);

            await registration(formData);

            user.setIsAuth(true);
            navigate(ACCOUNT_ROUTE);
            
        } catch (err) {
            alert(err);
        }
    };

    const onLogin = async () => {
        try {
            await login(email, password);
            user.setIsAuth(true);
            navigate(ACCOUNT_ROUTE);
        } catch(err) {
            alert(err);
        }        
    };

    return (
        <Container 
            className='d-flex justify-content-center align-items-center'
            style ={{height: window.innerHeight - 54}}
        >
            {toggle ? 
                <Card style={{width: 600}} className="p-5">
                    <h2 className='m-auto'>Регистрация</h2>
                    <Form className="d-flex flex-column">
                        <Form.Control
                            className="mt-3"
                            placeholder="Введите ваш email..."
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <Form.Control
                            className="mt-3"
                            placeholder="Введите ваш пароль..."
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type='password'
                        />
                        <Form.Control
                            className="mt-3"
                            placeholder="Введите ваше имя..."
                            value={name}
                            onChange={e => setName(e.target.value)}
                            type='text'
                        />
                        <Form.Control
                            className="mt-3"
                            placeholder="Введите дату рождения в формате ГГГГ-ММ-ДД"
                            value={birthday}
                            onChange={e => setBirthday(e.target.value)}
                            type='text'
                        />
                        <label htmlFor="file" className="mt-3">Загрузите фото</label> 
                        <Form.Control
                            type="file"
                            onChange={selectFile}
                        />
                        <Dropdown className="mt-3 mb-2">
                            <Dropdown.Toggle>{sex ? sex : 'Выберите пол'}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => setSex('мужской')} >мужской</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setSex('женский')} >женский</Dropdown.Item>
                            </Dropdown.Menu> 
                        </Dropdown>
                        <div className="d-flex justify-content-between mt-3">                            
                            <div>
                                Есть аккаунт? 
                                <Button 
                                    variant={"outline-secondary"} 
                                    onClick={() => setToggle(prev => !prev)}
                                    style={{border: 'none'}}
                                    >Войдите!
                                </Button>
                            </div>                                             
                            <Button 
                                onClick={onRegister}
                                variant={"outline-success"}
                                >Регистрация
                            </Button>
                        </div>                  
                    </Form>
                </Card> 
            : 
                <Card style={{width: 600}} className="p-5">
                    <h2 className='m-auto'>Авторизация</h2>
                    <Form className="d-flex flex-column">
                        <Form.Control
                            className="mt-3"
                            placeholder="Введите ваш email..."
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <Form.Control
                            className="mt-3"
                            placeholder="Введите ваш пароль..."
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type='password'
                        />
                        <div className="d-flex justify-content-between mt-3">
                            <div>
                                Нет аккаунта? 
                                <Button 
                                    variant={"outline-secondary"} 
                                    onClick={() => setToggle(prev => !prev)}
                                    style={{border: 'none'}}
                                    >Зарегистрируйтесь
                                </Button>
                            </div>                        
                            <Button 
                                onClick={onLogin}
                                variant={"outline-success"}
                                >Войти
                            </Button>
                        </div>                   
                    </Form>
                </Card> 
            }
        </Container>
    );
});

export default MainPage;