const express=require('express');
const app=express();
const cors=require('cors');
const corsOptions={
    origin:["http://localhost:5173"],
}
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const authRouter=require('./routes/authRouter');
require('dotenv').config();
const saveRouter=require('./routes/predictionRouter');


main().then(()=>{
    console.log("Connected to Db");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err.message));
}






app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/auth',authRouter);
app.use('/models',saveRouter);





app.listen(8080,(req,res)=>{
    console.log("App is running on port 8080");
});
