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


class AuthController {
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
            const token = generateJwt(user._id, user.email);

            await user.save();

            return res.json({token});

        } catch(err) {
            res.status(500).json({message: 'Ops, something wrong with register...'});
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

            const token = generateJwt(user._id, user.email);
            return res.json({token});

        } catch(err) {
            res.status(500).json({message: 'Ops, something wrong with login...'});
            console.log('Ошибка запроса...');
        }
    }
    
    async check(req, res, next) {
        try {
            const token = generateJwt(req.user.id, req.user.email);
            return res.json({token});
        } catch(err) {
            res.status(500).json({message: 'Ops, something wrong with check...'});
            console.log('Ошибка запроса...');
        }        
    }
};

module.exports = new AuthController();