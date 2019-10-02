const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

const postsRoute = require('./routes/posts')

//middleware    
app.use(bodyParser.json());
app.use('/posts', postsRoute);

// DB connection
mongoose.set("useUnifiedTopology", true)
mongoose.set("useNewUrlParser", true)
mongoose.connect(process.env.DB_CONNECTION, () => console.log('connected to DB'))


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`now listening on port ${PORT}`))
