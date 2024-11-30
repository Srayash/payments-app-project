const express = require("express");
const { authMiddleware } = require("../middleware");
const { Account } = require("../db");
const { route } = require("./user");
const z = require("zod");
const mongoose = require("mongoose");

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res)=>{
    const account = await Account.findOne({
        userId: req.userId
    });

    res.json({
        balance: account.balance
    })
});

const transferBody = z.object({
    amount: z.number(),
    to: z.string()
})

router.put("/transfer", authMiddleware, async (req, res)=>{
    const session = await mongoose.startSession();
    session.startTransaction();

    const {success} = transferBody.safeParse(req.body);
    if(!success){
        await session.abortTransaction();
        return res.status(411).json({
            message: "invalid Inputs"
        })
    }
    
    const { amount, to } = req.body

    const fromAccount = await Account.findOne({ userId: req.userId }).session(session);

    if(!fromAccount || fromAccount.balance < amount) {
        await session.abortTransaction();
        console.log(fromAccount.balance, typeof fromAccount.balance);
        res.status(400).json({
            message: "Insufficient Balance"
        });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    await Account.updateOne({ userId: req.userId }, {$inc: {balance: -amount}}).session(session);
    await Account.updateOne({ userId: to }, {$inc: {balance: amount}}).session(session);

    session.commitTransaction();
    res.json({
        message: "Transaction Successfull"
    })
});

module.exports = router;