import React, { useContext } from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import {observer} from "mobx-react-lite";

import { authRoutes, publicRoutes } from '../routes';
import { MAIN_ROUTE, ACCOUNT_ROUTE } from '../utils/consts';
import { Context } from '../index';


const AppRouter= observer(() => { 
    const {auth} = useContext(Context);

    return (
        <Routes>
            {auth.isAuth ? 
                authRoutes.map(({path, Component}) => 
                    <Route key={path} path={path} element={<Component />} />
                ):
                publicRoutes.map(({path, Component}) => 
                    <Route key={path} path={path} element={<Component />} />
                )
            }
            {auth.isAuth ?
                <Route path='*' element={<Navigate to={ACCOUNT_ROUTE} />} />
                :
                <Route path='*' element={<Navigate to={MAIN_ROUTE} />} />
            }
        </Routes>
    );
});

export default AppRouter;