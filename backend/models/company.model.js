import mongoose from "mongoose";
const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    
    },
    Description: {
        type: String,
        required: true, 
    },
    location: {
        type: String,
        required: true,
    },  
    website: {
        type: String,
        required: true,     
    },
    logo: {
        type: String,
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true });       
export default mongoose.model("Company", companySchema);









})