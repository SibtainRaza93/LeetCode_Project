import express from "express";

const authRouter = express();

// Register
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout); 
authRouter.get("/get-me", getProfile);
// Login
// Logout
//GetProfile