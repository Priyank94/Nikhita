const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/Nikhita', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
        callServer();

    } else {
        console.log('Error in DB connection : ' + err)
    }
});

function callServer() {
    require('./models/schema');
    const express = require('express');
    const path = require('path');
    const exphbs = require('express-handlebars');
    const bodyparser = require('body-parser');
    const cors = require('cors');

    // const employeeController = require('./controllers/employeeController');
    const sellController = require('./controllers/sellController');

    var app = express();
    app.options('*', cors()) // include before other routes
    app.use(cors());
    app.use(bodyparser.urlencoded({
        extended: true
    }));
    app.use(bodyparser.json());
    app.set('views', path.join(__dirname, '/views/'));
    app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
    app.set('view engine', 'hbs');
    app.listen(3000, () => {
        console.log('Express server started at port : 3000');
    });

    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname + '/index.html'));
    });
    // Server is rocking!!! 
    // app.use('/employee', employeeController);
    app.use('/sell', sellController);

}