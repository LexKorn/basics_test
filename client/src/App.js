import React, { useContext, useState, useEffect } from "react";
import {BrowserRouter} from 'react-router-dom';
import { observer } from "mobx-react-lite";
import { Spinner } from "react-bootstrap";

import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar/NavBar";
import { Context } from "./index";
import { check } from "./http/userAPI";


const App = observer(() => {
    const {user} = useContext(Context);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        check()
            .then((data) => {
                user.setIsAuth(true);
                user.setUserId(data);
            })
            .finally(() => setLoading(false));
    }, []);

    console.log(user.userId);

    if (loading) {
        return <Spinner animation={"border"}/>
    }

    return (
        <BrowserRouter>
            <NavBar />
            <AppRouter />
        </BrowserRouter>
    );
});

export default App;