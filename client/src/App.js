import React, { useContext, useState, useEffect } from "react";
import {BrowserRouter} from 'react-router-dom';
import { observer } from "mobx-react-lite";
import { Spinner } from "react-bootstrap";

import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar/NavBar";
import { Context } from "./index";
import { check } from "./http/authAPI";


const App = observer(() => {
    const {auth} = useContext(Context);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        check()
            .then((data) => {
                auth.setIsAuth(true);
                auth.setUserId(data.id);
            })
            .finally(() => setLoading(false));
    }, []);

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