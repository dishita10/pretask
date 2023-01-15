//mongodb
const mongoose=require('mongoose');
const emailValidator=require('email-validator');
const bcrypt=require('bcrypt');

mongoose.set('strictQuery', true);
const db_link='mongodb+srv://admin:KBZYNFkj39lH3glE@cluster0.p5siu2i.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_link)
.then(function(db){
    //console.log(db);
    console.log('db connected');
})
.catch(function(err){
    console.log(err);
});

//schema
const userSchema=mongoose.Schema({
    name:{
       type:String,
       required:true
    },
    email:{
       type: String,
       required:true,
       unique:true,
       validate:function(){
        return emailValidator.validate(this.email);
       }
    },
    password:{
       type: String,
       required:true,
       unique:true,
       minLength:8
    },
    confirmPassword:{
        type: String,
        required:true,
        unique:true,
        minLength:8,
        validate:function(){
            return this.confirmPassword==this.password;
        }
     },
     role:{
        type:String,
        enum:['admin','user','restaurantowner','deliveryboy'],
        default:'user'
     },
     profileImage:{
        type:String,
        default:'img/users/default.jpeg'
     }
});
//pre post hooks
//before save event occurs in db
// userSchema.pre('save',function(){
//     console.log('before saving in db',this);
// });
// //after save event occurs in db
// userSchema.post('save',function(doc){
//     console.log('after saving in db',doc);
// });
userSchema.pre('save',function(){
    this.confirmPassword=undefined;
});

// userSchema.pre('save', async function(){
//     let salt=await bcrypt.genSalt();
//     let hashedString=await bcrypt.hash(this.password,salt);
//     this.password=hashedString;
// });

//model
const userModel=mongoose.model('userModel',userSchema);
module.exports=userModel;
// (async function createUser(){
//     let user={
//        name:'Jasbir',
//        email:'abcd@gmail.com',
//        password:'123456789',
//        confirmPassword:'123456789'
//     };
//     let data=await userModel.create(user);
//     console.log(data);
// })();