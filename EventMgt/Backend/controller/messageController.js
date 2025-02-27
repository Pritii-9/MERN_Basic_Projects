
import { Message } from "../models/messageSchema.js";
import validator from 'validator';

export const sendMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all fields"
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address"
      });
    }

    await Message.create({ name, email, subject, message });

    return res.status(201).json({
      success: true,
      message: "Message sent successfully"
    });
  } catch (error) {


    if(error.name ==="ValidationError"){
        let errorMessage = "";
        if(error.errors.name){
            errorMessage += error.errors.name.message + "\n";
        }
        if(error.errors.email){
            errorMessage += error.errors.email.message + "\n";
        }
        if(error.errors.subject){
            errorMessage += error.errors.subject.message + "\n";
        }
        if(error.errors.message){
            errorMessage += error.errors.message.message + "\n";
        }
        return res.status(200).json({
            success: false,
            message: errorMessage
            });
    };


    return res.status(500).json({
      success: false,
      message:"Unknown error"
    });
  }
};

