const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const uuid = require('uuid');
const path = require('path');

const User = require('../models/User');

require('dotenv').config();

const generateJwt = (id, email) => {
    return jwt.sign(
        {id, email}, 
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    );
};


class UserController {
    async register(req, res) {
        try {            
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Некорректный username или password", errors})
            }

            const {name, email, password, birthday, sex} = req.body;

            const {photo} = req.files;
            let fileName = uuid.v4() + ".jpg";

            photo.mv(path.resolve(__dirname, '..', 'static', fileName));

            const candidate = await User.findOne({email});
            if (candidate) {
                return res.status(400).json({message: "Пользователь с таким именем уже существует!", errors})
            }

            const hashPassword = await bcrypt.hash(password, 5);
            const user = new User({name, email, password: hashPassword, birthday, sex, photo: fileName});
            const token = generateJwt(user.id, user.email);

            await user.save();

            return res.json({token});

        } catch(err) {
            res.status(500).json({message: 'Ops, something wrong...'});
            console.log('Ошибка запроса...');
        }
    }

    async login(req, res) {
        try {
            const {email, password} = req.body;

            const user = await User.findOne({email});
            if (!user) {
                return res.status(400).json({message: 'Такого пользователя нет!'});
            }

            let comparePassword = bcrypt.compareSync(password, user.password);
            if (!comparePassword) {
                return res.status(400).json({message: 'Пароль не совпал!'});
            }

            const token = generateJwt(user.id, user.email);
            return res.json({token});

        } catch(err) {
            res.status(500).json({message: 'Ops, something wrong...'});
            console.log('Ошибка запроса...');
        }
    }

    async check(req, res) {
        try {
            const token = generateJwt(req.user.id, req.user.email);
            return res.json({token});
        } catch(err) {
            res.status(500).json({message: 'Ops, something wrong...'});
            console.log('Ошибка запроса...');
        }        
    }

    async getAll(req, res) {
        try {
            const users = await User.find(req.params);
            return res.json(users);

        } catch(err) {
            res.status(500).json({message: 'Ops, something wrong...'});
            console.log('Ошибка запроса...');
        }
    }

    async getONe(req, res) {
        try {
            const user = await User.findOne({_id: req.params.id});
            return res.json(user);

        } catch(err) {
            res.status(500).json({message: 'Ops, something wrong...'});
            console.log('Ошибка запроса...');
        }
    }

    async update(req, res) {
        try {
            const {name, password} = req.body;
            const hashPassword = await bcrypt.hash(password, 5);

            const {photo} = req.files;
            let fileName = uuid.v4() + ".jpg";
            photo.mv(path.resolve(__dirname, '..', 'static', fileName));

            await User.findByIdAndUpdate(
                { _id: req.params.id },
                {$set: { name, password: hashPassword, photo: fileName }},
                { new: true }
            );

            return res.status(200).json({message: 'User был обновлен'});

        } catch(err) {
            res.status(500).json({message: 'Ops, something wrong...'});
            console.log('Ошибка запроса...');
        }
    }
};

module.exports = new UserController();