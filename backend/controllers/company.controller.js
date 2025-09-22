import Company from "../models/company.model.js";
export const registercompany = async (req, res) => {
  try {
    const {companyname}= req.body;
    if(!companyname){   
      return res.status(400).json({ message: "Company name is required", success: false });
    }
    let company = await Company.findOne({

  } catch (error) {
    console.error( error);
    
  }
};