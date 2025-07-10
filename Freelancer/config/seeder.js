const user=require("../Server/User/userModel")
const bcrypt=require("bcrypt")
const roundValue=10;

adminSeeder=()=>{
    user.findOne({email:"admin@gmail.com"})
    .then((userData)=>{
        if(!userData){
            let userObj=new user()
            userObj.name="admin"
            userObj.email="admin@gmail.com"
            userObj.password=bcrypt.hashSync("admin123",roundValue)
            userObj.save()
            console.log("Admin Seeder")
        }
        else{
            console.log("Admin already exits.")
        }
    })
    .catch((err)=>{
        console.log(err)
    })
}

module.exports={
    adminSeeder
}