import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUsersForSidebar = async (req,res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        res.status(200).json(filteredUsers);

    } catch (error) {
        console.log("error in fetUserForSidebar",error.message);
        res.status(500).json({ message: "Error fetching users for sidebar" });
    }
};

export const getMessages = async (req,res) =>{
    try {
        const { id:userToChatId } = req.params;
        const myId = req.user._id;
        const messages = await Message.find({
            $or:[
                { sender: myId, receiver: userToChatId },
                { sender: userToChatId, receiver: myId }
            ]
        });
        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessage controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const sendMessage = async (req,res) =>{

    try {
        const {text,image} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            //upload base64 img to clodinary
            const uploadReponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadReponse.secure_url;

        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });
        await newMessage.save();

        // real time functionality => socket.io
        res.status(201).json(newMessage);
} catch (error) {
    console.log("Error in sendMessage controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
}
}
