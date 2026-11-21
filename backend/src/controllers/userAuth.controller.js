import User from "../models/user.models.js";
import validate from "../utils/validator.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
    try {
        validate(req.body);

        const { firstName, emailId, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            firstName,
            emailId,
            password: hashedPassword,
        });

        const token = jwt.sign(
            { _id: user._id, emailId },
            process.env.JWT_SECRET_KEY,
            { expiresIn: 60 * 60 }
        );

        res.cookie("token", token, {
            maxAge: 60 * 60 * 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        res.status(201).send("User registered successfully");
    } catch (error) {
        console.error(error);
        res.status(400).send("Error: " + error.message);
    }
};

const login = async(req, res)=>{
    try {
        const {emailId, password} = req.body;

        if(!emailId){
            throw new Error("Invalid Credential")
        }
        if(!password){
            throw new Error("Invalid Credential")
        }

        const user = await User.findOne({emailId});


         if (!user) {
            throw new Error("Invalid credentials");
        }

        const match = await bcrypt.compare(password, user.password);

        if(!match){
            throw new Error("Invalid Credential");
        }

        const token = jwt.sign(
            { _id: user._id, emailId },
            process.env.JWT_SECRET_KEY,
            { expiresIn: 60 * 60 }
        );

        res.cookie("token", token, {
            maxAge: 60 * 60 * 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        res.status(201).send("Logged In Successfully")
    } catch (error) {
        res.status(401).send("Error: "+error)
    }
}

const logout = async(req, res)=>{
    try {
        
    } catch (error) {
        
    }
}
export { register, login };