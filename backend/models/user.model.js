import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  
  password: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: String,
    required: true,
  },
  RadioNodeList: {
    type: String,
    enum: ["student", "recruiter"],
    default: "student",
    required: true,
  },
  profile:{
    bio:{
        type:String,
    },
    skills:[{
        type:[String],
    }],
    resume:{
        type:String,
    },
    resumeorigialname:{
        type:String,
  },
  company:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Company",
  },
  profilePicture:{
    type:String,
    default:'',
  },
  }
}, { timestamps: true })  ;

const User = mongoose.model("User", userSchema);
export default User;

