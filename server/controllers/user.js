import bcrypt from 'bcrypt';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';


//google login
// export const addUser = (req, res) => {
//     console.log(req.body);
//     res.send("USER Google LOGGED IN");
// }

export const signupUser = async (req, res) => {
    console.log(req.body);
    const {firstName, lastName, email, password} = req.body;
    //if(password!==repeatPassword){return res.status(404).json({message: "PASSWORD DO NOT MATCH! TRY AGAIN!"});}
    const hashedPassword = await bcrypt.hash(password, 12);

    try{
        
        const user = await User.create({
            name: `${firstName} ${lastName}`,
            email: email,
            password: hashedPassword,
        })
        const token = jwt.sign({email: user.email, id: user._id},process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1hr'});

        res.status(201).json({...user.toObject(), token});

    }catch(e){
        console.log(e);
        res.status(400).send("Email already exists");
    }
}

export const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try{
        const loggedUser = await User.findOne({email: email});
        if(!loggedUser){
            console.log("Email do not exist");
            throw new Error("User not found")
        }
        const match = await bcrypt.compare(password, loggedUser.password);
        if(match){
            const token = jwt.sign({email: loggedUser.email, id: loggedUser._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'});
            res.status(200).json({...loggedUser.toObject(), token}); //mongoose return type Document so convert JS object so you can
        }
        else{
            console.log("Password Mismatch");
            throw new Error("User not Found")
        }
    }catch(e){
        console.log('e.message: ',e.message);
        res.status(401).send(e.message);
    }

}