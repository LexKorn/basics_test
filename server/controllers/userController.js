const bcrypt = require('bcrypt');
const uuid = require('uuid');
const path = require('path');

const User = require('../models/User');


class UserController {
    async getAll(req, res) {
        try {
            const users = await User.find(req.params);
            return res.json(users);

        } catch(err) {
            res.status(500).json({message: 'Ops, something wrong with getAll...'});
            console.log('Ошибка запроса...');
        }
    }

    async getONe(req, res) {
        try {
            const user = await User.findOne({_id: req.params.id});
            return res.json(user);

        } catch(err) {
            res.status(500).json({message: 'Ops, something wrong with getOne...'});
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
            res.status(500).json({message: 'Ops, something wrong with update...'});
            console.log('Ошибка запроса...');
        }
    }
};

module.exports = new UserController();