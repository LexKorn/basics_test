import {makeAutoObservable} from 'mobx';

export default class AuthStore {
    constructor() {
       this._isAuth = false;
       this._userId = '';
       makeAutoObservable(this); 
    };

    setIsAuth(bool) {
        this._isAuth = bool;
    };
    setUserId(id) {
        this._userId = id;
    }

    get isAuth() {
        return this._isAuth;
    };
    get userId() {
        return this._userId;
    }
};