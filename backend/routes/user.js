const express = require("express");
const z = require("zod");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const  {User, Account} = require("../db");
const { authMiddleware } = require("../middleware");

const router = express.Router();

const signupBody = z.object({
    username: z.string().email(),
    password: z.string(),
    firstname: z.string(),
    lastname: z.string(),
})

router.post("/signup", async (req, res) => {
    console.log(req.body);
    const {success} = signupBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message: "Invalid Inputs"
        })
    }

    const exisitingUser = await User.findOne({
        username: req.body.username
    })

    if(exisitingUser){
        res.status(411).json({
            message: "Email already in use."
        })
        return;
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
    })
    const userId = user._id;

    //  gives some random balance to the user so that I dont have to worry about making banking api calls

    await Account.create({
        userId,
        balance: 1 + Math.random()*10000
    })

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        message: "User Created Succesfully",
        token: token,
        name: user.firstname
    })
});

const signinBody = z.object({
    username: z.string().email(),
    password: z.string()
})

router.post("/signin", async (req,res) => {
    const { success } = signinBody.safeParse(req.body);
    if(!success){
        res.status(411).json({
            message:"Invalid Inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    })

    if(!user){
        res.status(403).json({
            message: "invalid credentials"
        })
        return
    }

    const token = jwt.sign({
        userId: user._id
    }, JWT_SECRET);

    res.json({
        token: token,
        name: user.firstname
    })
});

const updateBody = z.object({
    password: z.string(),
    firstname: z.string(),
    lastname: z.string()
})

router.put("/", authMiddleware, async (req, res) => {
    const {success} = updateBody.safeParse(req.body);
    if(!success){
        res.status(411).json({
            message: "Invalid Inputs"
        });
    }

    await User.updateOne({ _id: req.userId }, req.body);

    res.json({
        message: "User Updated"
    });
})

router.get("/bulk", authMiddleware ,async (req, res) => {
    
    const filter = req.query.filter || ""; 

    const users = await User.find({
        $or: [{
            firstname: {
                "$regex": filter
            }
        }, {
            lastname: {
                "$regex": filter
            }
        }]
    })
    const filteredUsers = users.filter((user) => user._id.toString() !== req.userId);

    res.json({
        user: filteredUsers.map((user) => ({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            _id: user._id 
        }))
    })
})

module.exports = router;