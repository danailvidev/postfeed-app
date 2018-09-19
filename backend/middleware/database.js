const mongoose = require('mongoose')
const chalk = require('chalk')
const config = require('../config/config')

module.exports = function () {
    const options = {
        useNewUrlParser: true
    }

    mongoose.set('useCreateIndex', true)

    mongoose.connect(
        config.mlabCom,
        options, (err) => {
            if (!err) {
                console.log(chalk.underline.green.bold('MongoDB connected'))
            } else {
                console.error(err);
                console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
                process.exit();
            }
        })
}