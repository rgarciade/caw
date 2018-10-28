const mongoose = require('mongoose')
const Constants = require('./constants');
const app = require('./src/app');
const port = Constants.App.port
    //connection Database
mongoose.Promise = global.Promise;
mongoose.connect(Constants.Database.route, { useMongoClient: true })
    .then(() => {
        console.log("con okk")
        app.listen(port, () => {
            console.log('servidor corriendo en puerto:' + port)
        })

    })
    .catch(() => {
        console.log('error en la conexion, ejecute nodemond')
    })