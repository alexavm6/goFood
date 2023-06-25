const {Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs'); 

const UserSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    document_type:  {
        type: String,
        required: true
    },
    document_number:  {
        type: String,
        required: true
    },
    names:  {
        type: String,
        required: true
    },
    last_names:  {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password:  {
        type: String,
        required: true
    },
    address:  {
        type: String,
        required: true
    },
    phone_number:  {
        type: String,
        required: true
    },
    start_service:  {
        type: String,
        required: true
    },
    end_service:  {
        type: String,
        required: true
    }
});

UserSchema.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

UserSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}



module.exports = model('User', UserSchema, 'users');

