import mongoose from "mongoose";
const companySchema = new mongoose.Schema({

    Job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true,
    },
    Applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "accepted","rejected"],
        default: "pending"
    },
},
 { timestamps: true });

export default mongoose.model("Application", applicationSchema);








})
