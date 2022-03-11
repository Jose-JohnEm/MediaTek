import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import UserModel from '../models/users'
import {Request, Response} from 'express'

import nodemailer from 'nodemailer';

export const emailCodeSend = (email: string, code: number) => {
    let transporter = nodemailer.createTransport({
        service: 'yahoo',
        auth: {
            user: 'mediatek.taker@yahoo.com',
            pass: 'ehmv mvqa yxli ydcb'
        }
    });

    let mailOptions = {
        from: 'MediaTek <mediatek.taker@yahoo.com>',
        to: email,
        subject: 'Code de Vérification',
        text: "Bonjour, votre code secret est le suivant : " + code.toString(),
    };

    transporter.sendMail(mailOptions, function (error :any, info: any) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            return res.status(400).send({status: 400, message: "'email' and 'password' are required"});
        }
        const user = await UserModel.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ user_id: user._id, email }, process.env.JWT_TOKEN as string, { expiresIn: "1h" });
            user.token = token;
            await user.save()
            return res.status(200).json(user);
        }
        return res.status(400).send({status: 400, message: "Invalid Credentials"});
    } catch (err) {
        console.log(err);
        return res.status(401).send({status: 401, message: err});
    }
}

export const register = async (req: Request, res: Response) => {

    try {
        const { email, password, pseudo } = req.body;

        if (!(email && password && pseudo)) {
            return res.status(400).json({status: 400, message: "'email', 'password' and 'pseudo' are required"});
        }

        const oldUser = await UserModel.findOne({ email });

        if (oldUser) {
            return res.status(409).send({status: 409, message: "User Already Exist. Please login"});
        }

        var encryptedPassword = await bcrypt.hash(password, 10);

        const user = await UserModel.create({
            pseudo,
            email: email.toLowerCase(),
            password: encryptedPassword,
            certificat: {
                code: Math.floor(Math.random() * (10000 - 1000) + 1000)
            }
        });

        emailCodeSend(email.toLowerCase(), user.certificat!.code!)

        const token = jwt.sign({user_id: user._id, email}, process.env.JWT_TOKEN as string, { expiresIn: "1h" });
        user.token = token;

        await user.save()

      res.status(201).json(user);
    } catch (err) {
        console.log(err);
        return res.status(401).json({status: 401, message: err});
    }
}