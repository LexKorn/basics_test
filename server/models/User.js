const {Schema, model} = require('mongoose');

const schema = new Schema ({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    birthday: {type: Date, required: true},
    sex: {type: String, required: true},
    photo: {type: String, required: true}
});

module.exports = model('User', schema);