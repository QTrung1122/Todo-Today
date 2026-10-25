const express = require('express');
const taskRouter = require('./routes/task.route');
require('dotenv').config();
const sequelize = require('./config/database')
const taskModel = require('./models/task.model')

const PORT = process.env.PORT || 3000;

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', taskRouter);

async function connectDB() {
    try{
        await sequelize.authenticate();
    } catch(err) {
        console.log(err)
    }
}
connectDB()

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
