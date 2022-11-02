import {makeAutoObservable} from 'mobx';

export default class UserStore {
    constructor() {
       this._isAuth = true;
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