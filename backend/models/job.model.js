import mongoose from "mongoose";
const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
    jobType: {
    type: String,
    required: true,
  },
  positions: {
    type: String,
    required: true,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  applicantion: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "applicantion",
    default:null,
  }],
}, { timestamps: true });

const Job = mongoose.model("Job", jobSchema);
export default Job;
