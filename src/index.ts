import mongoose from "mongoose";
import express from "express";
import BodyParser from "body-parser";


import {UserController, DialogController, MessageController} from "./controllers";

const app = express();

app.use(BodyParser.json());

const User = new UserController();
const Dialog = new DialogController();
const  Messages = new MessageController();

mongoose.connect('mongodb://localhost:27017/chat', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
},
    (err: any) => {
        if (err) {
            throw Error(err);
        }
    }
);

app.get("/user/:id", User.show);
app.delete("/user/:id", User.delete);
app.post("/user/registration", User.create);

app.get("/dialogs", Dialog.index);
app.delete("/dialogs/:id", Dialog.delete);
app.post("/dialogs", Dialog.create);

app.get("/messages", Messages.index);
app.post("/messages", Messages.create);

app.listen(3000, () => {
    console.log("server start")
})