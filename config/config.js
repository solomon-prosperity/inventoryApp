const mongoose = require ('mongoose')

const db = async () => {
    try {
    await mongoose.connect(process.env.DB_CONNECT ,
    { useNewUrlParser: true, 
    useUnifiedTopology: true ,
    useFindAndModify: false } );
    console.log ('connected to database')
    } catch (error) {
    console.log(error)
    }
}
    

module.exports= db