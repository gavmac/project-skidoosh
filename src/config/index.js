const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const url = 'mongodb://gavmac:282820g@ds147746.mlab.com:47746/jeerio';

mongoose.connect(url, { useNewUrlParser: true });
mongoose.connection.once('open', () => console.log(`Connected to mongo at ${url}`));