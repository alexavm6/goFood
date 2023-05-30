const mongoose = require('mongoose');

const { BUSSPRESS_HOST, BUSSPRESS_DATABASE } = process.env; 
const MONGODB_URI = `mongodb://${BUSSPRESS_HOST}/${BUSSPRESS_DATABASE}`;

mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(db => console.log('Database is connected'))
    .catch(err => console.log(err)); 