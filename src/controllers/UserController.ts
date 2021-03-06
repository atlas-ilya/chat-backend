import express from "express";
import {UserModel} from "../models";
import { IUser } from "../models/User";
class UserController {

    show(req: express.Request, res: express.Response) {
        const id: string = req.params.id;
        UserModel.findById(id, (err: any, user: any) => {
            if (err) {
                return res.status(404).json({
                    message: "User not found"
                })
            }
            res.json(user)
        })
    };

    getMe() {

    }

    create(req: express.Request, res: express.Response) {
        const postData = {
            email: req.body.email,
            fullName: req.body.fullName,
            password: req.body.password,
        }

        const user = new UserModel(postData);
        user
            .save()
            .then((obj: any) => {
                res.json(obj)
            })
            .catch(reason => {
                res.json(reason);
            });
    }

    delete(req: express.Request, res: express.Response) {
        const id: string = req.params.id;
        UserModel.findOneAndDelete({_id: id})
            .then(user => {
                if (user) {
                    res.json({
                        message: `User ${user.fullName} deleted`
                    });
                }
            })
            .catch(() => {
                res.json({
                    message: 'User not found'
                })
            })
    };
};


export default UserController;