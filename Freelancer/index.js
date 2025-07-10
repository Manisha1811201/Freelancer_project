const express= require("express");
const app=express();
const port=5005;
const config=require("./config/db")
const Seeder=require("./config/seeder")
Seeder.adminSeeder()

app.use(express.urlencoded({extended:false}))
app.use(express.json({limit:"50mb"}))
const routes=require("./routes/apiroutes");
app.use("/api",routes)

app.listen(port,()=>{
    console.log("My project is runing on port:"+" "+port)
})

