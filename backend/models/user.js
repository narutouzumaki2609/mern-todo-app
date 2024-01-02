import mongoose from 'mongoose';
//creating mongoose schema
const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
    },
    username:{
        type: String,
    },
    password:{
        type:String,
        required:true,
    },
    list:[{
        type:mongoose.Types.ObjectId,
        ref: 'List'
    }]
})
// const User = mongoose.models.users;
// export default User;
export default mongoose.model('User',userSchema);