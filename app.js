const express = require ('express')
const app = express()
const productRoute = require ('./routes/productRoute')
const userRoute = require('./routes/userRoute')
const dotenv = require('dotenv')
const cookieParser = require ('cookie-parser') 



dotenv.config();

const port = process.env.PORT
const db = require('./config/config')
db()

app.use('/productImage' ,express.static('uploads/productImages'))
app.use('/avatar' ,express.static('uploads/userImages'))
app.use(express.json());
app.use(cookieParser());

app.use('/api/user/products' , productRoute )
app.use('/api/v1/user' , userRoute)


app.listen(port, () => {
    console.log(`Server is Listening on port ${port}`)
})