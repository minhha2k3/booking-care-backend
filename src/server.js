const path = require('path');
const express = require('express')
const morgan =  require('morgan');
const { engine } = require('express-handlebars');

const route = require('./routes');
const db = require('./config/db');

//Connect to DB
db.connect();

const app = express()
const port = 3000

//HTTP logger
app.use(morgan('combined'));

//View engine 
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
    }),
);

app.use(express.static(path.join(__dirname, 'public')));

//middleware xử lý dữ liệu từ form submit lên
app.use(
    express.urlencoded({
        extended: true,
    }),
);
//middleware xử lý dữ liệu js được gửi lên
app.use(express.json());

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

route(app);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})