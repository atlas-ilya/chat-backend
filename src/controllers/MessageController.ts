import express from "express";
import {MessageModel} from "../models";

class MessageController {

    index (req: express.Request, res: express.Response){
        const dialogId: any = req.query.dialog;

        MessageModel.find({ dialog: dialogId })
            .populate(['dialog'])
            .exec(function (err, messages) {
                if (err) {
                    return res.status(404).json({
                        message: 'Messages not found',
                    });
                }
                return res.json(messages);
            });
    };

    create(req: express.Request, res: express.Response) {
        const userId = "604003ef21286c30ccf8fdb7";

        const postData = {
            text: req.body.text,
            user: userId,
            dialog: req.body.dialog_id,
        }
        const message = new MessageModel(postData);
        message
            .save()
            .then((obj: any) => {
                res.json(obj)
            })
            .catch(reason => {
                res.json(reason);
            });
    };

   /* delete(req: express.Request, res: express.Response) {
        const id: string = req.params.id;
        MessageModel.findOneAndDelete({_id: id})
            .then(dialog => {
                if (dialog) {
                    res.json({
                        message: `Dialog  deleted`
                    });
                }
            })
            .catch(() => {
                res.json({
                    message: 'Dialog not found'
                })
            })
    };*/
};


export default MessageController;